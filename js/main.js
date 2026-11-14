// js/main.js: Main application state, boot sequence, clocks, audio, keyboard, photo modal, and 3D globe integration

import { loadGhostData, showErrorBanner } from './data.js';
import { createMoonGlobe } from './globe.js';
import { initSiteMarkers } from './markers.js';
import { initPanels } from './card.js';

function p2(n) {
  return String(n).padStart(2, '0');
}

function since(iso, nowMs) {
  const s = new Date(iso);
  const n = new Date(nowMs);
  let y = n.getUTCFullYear() - s.getUTCFullYear();
  let m = n.getUTCMonth() - s.getUTCMonth();
  let d = n.getUTCDate() - s.getUTCDate();
  if (d < 0) {
    m -= 1;
    d += new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), 0)).getUTCDate();
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }
  const secs = Math.floor(((nowMs - s.getTime()) / 1000) % 86400);
  const hh = p2(Math.floor(secs / 3600));
  const mm = p2(Math.floor(secs / 60) % 60);
  const ss = p2(secs % 60);
  return {
    y: p2(y),
    m: p2(m),
    d: p2(d),
    hms: hh + ':' + mm + ':' + ss,
    hm: hh + ':' + mm
  };
}

// Synthesized console sounds (Web Audio, no files), from design/mission-control-prototype.dc.html
function makeAudio() {
  let ctx = null;
  const get = () => {
    try {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      return ctx;
    } catch (e) {
      return null;
    }
  };
  const tone = (freq, start, dur, type, vol) => {
    const c = get();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, c.currentTime + start);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start(c.currentTime + start);
    o.stop(c.currentTime + start + dur + 0.02);
  };
  const noise = (dur, vol) => {
    const c = get();
    if (!c) return;
    const b = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      d[i] = (Math.random() * 2 - 1) * (0.5 + 0.5 * Math.sin(i / 900));
    }
    const s = c.createBufferSource();
    const g = c.createGain();
    const f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 1800;
    s.buffer = b;
    g.gain.value = vol;
    s.connect(f);
    f.connect(g);
    g.connect(c.destination);
    s.start();
  };
  return {
    click: () => tone(1400, 0, 0.04, 'square', 0.05),
    calling: () => noise(1.5, 0.06),
    ping: () => {
      tone(1320, 0, 0.5, 'sine', 0.18);
      tone(1320, 0.55, 0.5, 'sine', 0.12);
      tone(1320, 1.1, 0.5, 'sine', 0.07);
    },
    nosignal: () => {
      tone(220, 0, 0.18, 'square', 0.05);
      tone(180, 0.24, 0.3, 'square', 0.05);
    },
    done: () => {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.3, 'triangle', 0.08));
    }
  };
}

async function startApp() {
  let data;
  try {
    data = await loadGhostData();
  } catch (err) {
    return;
  }

  const { ghosts, sites, bootLines } = data;
  const sfx = makeAudio();

  const state = {
    phase: 'boot',
    step: 0,
    sel: null,
    call: null,
    openQ: null,
    now: Date.now(),
    checked: {},
    muted: false,
    phoneSheetOpen: false,
    photoModalOpen: false,
    photoTriggerEl: null
  };

  let bootTimer = null;
  let callTimer = null;
  let globeController = null;
  let markersController = null;

  // DOM Elements
  const gmtValEl = document.getElementById('gmt-val');
  const moonClockLabelEl = document.getElementById('moon-clock-label');
  const moonClockValEl = document.getElementById('moon-clock-val');
  const muteBtnEl = document.getElementById('mute-btn');
  const replayBtnEl = document.getElementById('replay-btn');
  replayBtnEl.textContent = 'REPLAY\nPOWER-ON';

  const bootPanelEl = document.getElementById('boot-panel');
  const bootLinesEl = document.getElementById('boot-lines');
  const bootCursorEl = document.getElementById('boot-cursor');
  const beginBtnEl = document.getElementById('begin-btn');
  const bootDimmerEl = document.getElementById('boot-dimmer');
  const skipIntroBtnEl = document.getElementById('skip-intro-btn');

  const mainContentEl = document.getElementById('main-content');
  const moonCanvasWrapEl = document.getElementById('moon-canvas-wrap');
  const faceEarthBtnEl = document.getElementById('face-earth-btn');
  const photoModalCloseEl = document.getElementById('photo-modal-close');

  function playSound(name) {
    if (!state.muted && sfx[name]) {
      try {
        sfx[name]();
      } catch (e) {}
    }
  }

  function isPhoneWidth() {
    return window.innerWidth <= 599;
  }

  function renderClocks() {
    const nd = new Date(state.now);
    const gmt = p2(nd.getUTCHours()) + ':' + p2(nd.getUTCMinutes()) + ':' + p2(nd.getUTCSeconds());
    const clocksOn = state.phase !== 'boot' || state.step >= 3;
    gmtValEl.textContent = clocksOn ? gmt : '--:--:--';

    const g = ghosts.find((x) => x.id === state.sel) || null;
    moonClockLabelEl.textContent =
      'TIME ON THE MOON · ' + (g ? g.name.toUpperCase() : 'PICK A GHOST');

    if (!g) {
      moonClockValEl.textContent = isPhoneWidth()
        ? '--Y --M --D --:--'
        : '--Y --M --D --:--:--';
    } else {
      const c = since(g.landed, state.now);
      const timePart = isPhoneWidth() ? c.hm : c.hms;
      moonClockValEl.textContent = c.y + 'Y ' + c.m + 'M ' + c.d + 'D ' + timePart;
    }

    muteBtnEl.textContent = state.muted ? 'SOUND OFF' : 'SOUND ON';
    muteBtnEl.setAttribute('aria-pressed', state.muted ? 'true' : 'false');
  }

  function renderBoot() {
    const showBoot = state.phase === 'boot';
    bootPanelEl.hidden = !showBoot;
    bootDimmerEl.hidden = !showBoot;
    skipIntroBtnEl.hidden = !showBoot;
    mainContentEl.hidden = showBoot;

    if (showBoot) {
      while (bootLinesEl.firstChild) {
        bootLinesEl.removeChild(bootLinesEl.firstChild);
      }
      const visibleLines = bootLines.slice(0, state.step);
      visibleLines.forEach((lineText) => {
        const p = document.createElement('p');
        p.className = 'boot-line';
        p.textContent = '> ' + lineText;
        bootLinesEl.appendChild(p);
      });
      const done = state.step >= bootLines.length;
      bootCursorEl.hidden = done;
      beginBtnEl.hidden = !done;
    } else if (globeController) {
      globeController.resize();
    }
  }

  function updateAll() {
    renderBoot();
    renderClocks();
    panels.render(state);
    if (markersController) {
      const g = ghosts.find((x) => x.id === state.sel) || null;
      const showPing = Boolean(state.call === 'done' && g && g.answers);
      markersController.updateSelectionAndLabels(g, showPing);
      if (globeController) {
        markersController.updatePositions(globeController.projectLatLon, showPing);
      }
    }
  }

  function openPhotoModal(triggerEl) {
    const g = ghosts.find((x) => x.id === state.sel) || null;
    if (!g || !g.hasPhoto) return;
    playSound('click');
    state.photoModalOpen = true;
    state.photoTriggerEl = triggerEl || null;
    updateAll();
    photoModalCloseEl.focus();
  }

  function closePhotoModal() {
    if (!state.photoModalOpen) return;
    playSound('click');
    state.photoModalOpen = false;
    const trigger = state.photoTriggerEl;
    state.photoTriggerEl = null;
    updateAll();
    if (trigger && typeof trigger.focus === 'function') {
      trigger.focus();
    }
  }

  function pickGhostById(id) {
    if (state.phase === 'boot') return;
    clearTimeout(callTimer);
    playSound('click');
    state.sel = id;
    state.call = null;
    state.openQ = null;
    state.phoneSheetOpen = true;
    state.photoModalOpen = false;

    const g = ghosts.find((x) => x.id === id);
    if (g && globeController) {
      const site = sites[g.site];
      const lat = site ? site.lat : g.lat;
      const lon = site ? site.lon : g.lon;
      globeController.rotateToSite(lat, lon);
    }
    updateAll();
  }

  function pickSitePin(siteKey, siteGhosts) {
    if (!siteGhosts || siteGhosts.length === 0) return;
    const currentIdx = siteGhosts.findIndex((x) => x.id === state.sel);
    const nextIdx = currentIdx >= 0 ? (currentIdx + 1) % siteGhosts.length : 0;
    pickGhostById(siteGhosts[nextIdx].id);
  }

  function doCall() {
    if (state.phase === 'boot') return;
    const g = ghosts.find((x) => x.id === state.sel);
    if (!g) {
      playSound('nosignal');
      state.call = 'nosel';
      updateAll();
      return;
    }
    clearTimeout(callTimer);
    playSound('calling');
    state.call = 'calling';
    state.openQ = null;
    updateAll();

    callTimer = setTimeout(() => {
      const wasAllDone = ghosts.every((x) => state.checked[x.id]);
      state.checked = Object.assign({}, state.checked, { [g.id]: true });
      const nowAllDone = ghosts.every((x) => state.checked[x.id]);
      playSound(g.answers ? 'ping' : 'nosignal');
      if (nowAllDone && !wasAllDone) {
        setTimeout(() => playSound('done'), 1700);
      }
      state.call = 'done';
      updateAll();
    }, 1600);
  }

  function toggleQuestion(qIndex) {
    playSound('click');
    state.openQ = state.openQ === qIndex ? null : qIndex;
    updateAll();
  }

  const panels = initPanels(data, {
    onPickGhostId: pickGhostById,
    onToggleQuestion: toggleQuestion,
    onCallGhost: doCall,
    onClosePhoneSheet: () => {
      playSound('click');
      state.phoneSheetOpen = false;
      updateAll();
    },
    onOpenPhoneSheet: () => {
      playSound('click');
      state.phoneSheetOpen = true;
      updateAll();
    },
    onOpenPhotoModal: openPhotoModal,
    onClosePhotoModal: closePhotoModal
  });

  markersController = initSiteMarkers(sites, ghosts, pickSitePin);

  function startBootSequence() {
    clearInterval(bootTimer);
    let reduce = false;
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    if (reduce) {
      state.step = bootLines.length;
      updateAll();
      return;
    }

    bootTimer = setInterval(() => {
      if (state.step >= bootLines.length) {
        clearInterval(bootTimer);
        updateAll();
        return;
      }
      state.step += 1;
      updateAll();
    }, 420);
  }

  beginBtnEl.addEventListener('click', () => {
    clearInterval(bootTimer);
    playSound('click');
    state.phase = 'main';
    state.step = bootLines.length;
    updateAll();
  });

  skipIntroBtnEl.addEventListener('click', () => {
    clearInterval(bootTimer);
    state.phase = 'main';
    state.step = bootLines.length;
    updateAll();
  });

  replayBtnEl.addEventListener('click', () => {
    clearTimeout(callTimer);
    state.phase = 'boot';
    state.step = 0;
    state.sel = null;
    state.call = null;
    state.openQ = null;
    state.checked = {};
    state.phoneSheetOpen = false;
    state.photoModalOpen = false;
    if (globeController) {
      globeController.faceEarth();
    }
    updateAll();
    startBootSequence();
  });

  muteBtnEl.addEventListener('click', () => {
    state.muted = !state.muted;
    updateAll();
  });

  faceEarthBtnEl.addEventListener('click', () => {
    playSound('click');
    if (globeController) {
      globeController.faceEarth();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Escape') {
      if (state.photoModalOpen) {
        closePhotoModal();
        return;
      }
      if (state.phoneSheetOpen) {
        state.phoneSheetOpen = false;
        updateAll();
        return;
      }
    }
    if (state.phase === 'boot' || state.photoModalOpen) return;
    if (e.key >= '1' && e.key <= '6') {
      const idx = Number(e.key) - 1;
      if (ghosts[idx]) {
        pickGhostById(ghosts[idx].id);
      }
    } else if (e.key === 'c' || e.key === 'C') {
      doCall();
    }
  });

  window.addEventListener('resize', () => {
    renderClocks();
  });

  setInterval(() => {
    state.now = Date.now();
    renderClocks();
  }, 1000);

  updateAll();
  startBootSequence();

  // Initialize Three.js 0.187.0 Globe
  try {
    globeController = await createMoonGlobe(moonCanvasWrapEl, (projectLatLon) => {
      if (!markersController || state.phase === 'boot') return;
      const g = ghosts.find((x) => x.id === state.sel) || null;
      const showPing = Boolean(state.call === 'done' && g && g.answers);
      markersController.updatePositions(projectLatLon, showPing);
    });
    updateAll();
  } catch (err) {
    showErrorBanner('3D Moon Globe failed to initialize: ' + (err && err.message ? err.message : String(err)));
  }
}

startApp();
