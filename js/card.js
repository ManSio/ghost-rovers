// js/card.js: Render side screens, hardware plot, photo takeover, console monitor, phone sheet, photo viewer, and mission complete badge using textContent only

function p2(n) {
  return String(n).padStart(2, '0');
}

// Draw the 1969 Console Junior Flight Controller Badge on <canvas>
// Contest rule: NO NASA logo, insignia, mission patch, or flag
export function drawMissionBadge(canvas) {
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Outer console slate plate
  ctx.fillStyle = '#0B0E0D';
  ctx.fillRect(0, 0, w, h);

  // Subtle grid background
  ctx.strokeStyle = 'rgba(201, 221, 224, 0.07)';
  ctx.lineWidth = 1;
  for (let x = 20; x < w; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 20; y < h; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Outer and inner brass/amber borders
  ctx.strokeStyle = '#C9B871';
  ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, w - 12, h - 12);

  ctx.strokeStyle = 'rgba(255, 233, 176, 0.45)';
  ctx.lineWidth = 1;
  ctx.strokeRect(12, 12, w - 24, h - 24);

  // Corner console rivets
  const rivets = [
    [18, 18],
    [w - 18, 18],
    [18, h - 18],
    [w - 18, h - 18]
  ];
  rivets.forEach(([rx, ry]) => {
    ctx.fillStyle = '#8C978F';
    ctx.beginPath();
    ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Left Emblem: Geometric Moon Globe with 4 Landing Site Squares
  const cx = 74;
  const cy = h / 2;
  const r = 46;

  ctx.fillStyle = '#162224';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#C9DDE0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Latitude/Longitude crosshairs
  ctx.strokeStyle = 'rgba(201, 221, 224, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.lineTo(cx + r, cy);
  ctx.moveTo(cx, cy - r);
  ctx.lineTo(cx, cy + r);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(cx, cy, r * 0.55, r, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 4 Site hollow squares on the Moon emblem (A11 lit green)
  const emblemSites = [
    { x: cx + 16, y: cy - 2, lit: true },
    { x: cx - 18, y: cy + 5, lit: false },
    { x: cx + 3, y: cy - 22, lit: false },
    { x: cx + 21, y: cy - 16, lit: false }
  ];
  emblemSites.forEach((pt) => {
    ctx.strokeStyle = pt.lit ? '#7BE495' : '#FFFFFF';
    ctx.lineWidth = pt.lit ? 2 : 1.5;
    ctx.strokeRect(pt.x - 4, pt.y - 4, 8, 8);
  });

  // Right Typography Block
  const tx = 138;

  // Top red Dymo-style strip
  ctx.fillStyle = '#9E2B25';
  ctx.fillRect(tx, 26, 204, 20);
  ctx.fillStyle = '#F4F4F0';
  ctx.font = '700 11px "IBM Plex Mono", monospace';
  ctx.fillText('CONSOLE 7 · MISSION COMPLETE', tx + 8, 40);

  // Main Badge Title
  ctx.fillStyle = '#FFE9B0';
  ctx.font = '700 21px "Archivo Narrow", Arial, sans-serif';
  ctx.fillText('JUNIOR FLIGHT CONTROLLER', tx, 74);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px "Archivo Narrow", Arial, sans-serif';
  ctx.fillText('GHOST ROVERS · LUNAR HARDWARE CHECK', tx, 97);

  // Divider
  ctx.strokeStyle = 'rgba(201, 184, 113, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(tx, 110);
  ctx.lineTo(w - 24, 110);
  ctx.stroke();

  // Telemetry verification lines
  ctx.fillStyle = '#C9DDE0';
  ctx.font = '600 11px "IBM Plex Mono", monospace';
  ctx.fillText('LOG STATUS : 06 OF 06 MACHINES CHECKED', tx, 132);

  ctx.fillStyle = '#9BEFB0';
  ctx.fillText('ACTIVE LINK: A11 LASER MIRROR (2.5 SEC)', tx, 152);

  ctx.fillStyle = '#8FA5A9';
  ctx.font = '400 10px "IBM Plex Mono", monospace';
  ctx.fillText('4 APOLLO & SURVEYOR SITES · NEAR SIDE', tx, 172);
}

export function initPanels(data, callbacks) {
  const { ghosts, sites } = data;
  const {
    onPickGhostId,
    onToggleQuestion,
    onClearQuestion,
    onCallGhost,
    onResetConsole,
    onBackToMoon,
    onToggleSpeech,
    onClosePhoneSheet,
    onOpenPhoneSheet,
    onOpenPhotoModal,
    onClosePhotoModal,
    onCloseMissionComplete,
    onSaveBadge
  } = callbacks;

  // 1. Build Static Legend on Main Screen (4 SITES · 6 MACHINES)
  const legendListEl = document.getElementById('site-legend-list');
  Object.keys(sites).forEach((siteKey) => {
    const site = sites[siteKey];
    const gs = ghosts.filter((x) => x.site === siteKey);
    const row = document.createElement('div');
    row.className = 'legend-row';

    const codeSpan = document.createElement('span');
    codeSpan.className = 'legend-code';
    codeSpan.textContent = site.legendCode;

    const textSpan = document.createElement('span');
    textSpan.className = 'legend-text';
    textSpan.textContent = site.name.toUpperCase() + ': ' + gs.map((x) => x.name).join(', ');

    row.appendChild(codeSpan);
    row.appendChild(textSpan);
    legendListEl.appendChild(row);
  });

  // 2. Build Left Side Screen Clickable Timeline (LANDED · BY YEAR) + TODAY row
  const timelineListEl = document.getElementById('timeline-list');
  const sortedByLanded = ghosts.slice().sort((a, b) => (a.landed < b.landed ? -1 : 1));
  const timelineItems = sortedByLanded.map((g) => {
    const li = document.createElement('li');
    li.className = 'timeline-item';

    const dot = document.createElement('span');
    dot.className = 'timeline-dot';
    dot.setAttribute('aria-hidden', 'true');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'timeline-btn';
    btn.setAttribute('aria-pressed', 'false');

    const year = document.createElement('span');
    year.className = 'timeline-year';
    year.textContent = g.landed.slice(0, 4);

    const label = document.createElement('span');
    label.className = 'timeline-label';
    label.textContent = g.name.toUpperCase();

    btn.appendChild(year);
    btn.appendChild(label);
    btn.addEventListener('click', () => onPickGhostId(g.id));

    li.appendChild(dot);
    li.appendChild(btn);
    timelineListEl.appendChild(li);

    return { id: g.id, dot, btn, year, label };
  });

  // Append non-button TODAY row at the bottom of the timeline
  const todayLi = document.createElement('li');
  todayLi.className = 'timeline-today';
  todayLi.textContent = 'TODAY · All 6 are still there. 1 still answers.';
  timelineListEl.appendChild(todayLi);

  // 3. Build Right Side Screen Ghost Log (GHOST LOG)
  const logListEl = document.getElementById('log-list');
  const logItems = ghosts.map((g) => {
    const li = document.createElement('li');
    li.className = 'log-item';

    const lamp = document.createElement('span');
    lamp.className = 'log-lamp';
    lamp.setAttribute('aria-hidden', 'true');

    const col = document.createElement('span');
    col.className = 'log-text-col';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'log-name';

    const statusSpan = document.createElement('span');
    statusSpan.className = 'log-status';

    col.appendChild(nameSpan);
    col.appendChild(statusSpan);
    li.appendChild(lamp);
    li.appendChild(col);
    logListEl.appendChild(li);

    return { ghost: g, lamp, nameSpan, statusSpan };
  });

  // 4. Build 6 Console Ghost Buttons
  const btnGridEl = document.getElementById('ghost-btn-grid');
  const ghostButtons = ghosts.map((g, i) => {
    const keyNum = String(i + 1);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ghost-btn' + (g.answers ? ' ghost-btn--answers' : '');
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-keyshortcuts', keyNum);

    const codeSpan = document.createElement('span');
    codeSpan.className = 'ghost-btn-code';
    codeSpan.textContent = '[' + keyNum + '] ' + g.code;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'ghost-btn-name';
    nameSpan.textContent = g.name;

    btn.appendChild(codeSpan);
    btn.appendChild(nameSpan);
    btn.addEventListener('click', () => onPickGhostId(g.id));
    btnGridEl.appendChild(btn);

    return { ghost: g, btn };
  });

  // 5. Wire Question Buttons (3 per ghost), Clear Answer, Read To Me, Call, Reset, Close, Photo Buttons
  const qBtns = [
    document.getElementById('q-btn-0'),
    document.getElementById('q-btn-1'),
    document.getElementById('q-btn-2')
  ];
  const phoneQBtns = [
    document.getElementById('phone-q-btn-0'),
    document.getElementById('phone-q-btn-1'),
    document.getElementById('phone-q-btn-2')
  ];

  qBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => onToggleQuestion(idx));
  });
  phoneQBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => onToggleQuestion(idx));
  });

  const fileAnswerClearBtn = document.getElementById('file-answer-clear');
  const phoneFileAnswerClearBtn = document.getElementById('phone-file-answer-clear');
  fileAnswerClearBtn.addEventListener('click', onClearQuestion);
  phoneFileAnswerClearBtn.addEventListener('click', onClearQuestion);

  const readBtn = document.getElementById('read-btn');
  const phoneReadBtn = document.getElementById('phone-read-btn');
  readBtn.addEventListener('click', onToggleSpeech);
  phoneReadBtn.addEventListener('click', onToggleSpeech);

  const callBtn = document.getElementById('call-btn');
  const phoneCallBtn = document.getElementById('phone-call-btn');
  callBtn.addEventListener('click', onCallGhost);
  phoneCallBtn.addEventListener('click', onCallGhost);

  const resetBtn = document.getElementById('reset-btn');
  const phoneResetBtn = document.getElementById('phone-reset-btn');
  resetBtn.addEventListener('click', onResetConsole);
  phoneResetBtn.addEventListener('click', onResetConsole);

  const backToMoonBtn = document.getElementById('back-to-moon-btn');
  backToMoonBtn.addEventListener('click', onBackToMoon);

  const phoneSheetCloseBtn = document.getElementById('phone-sheet-close');
  phoneSheetCloseBtn.addEventListener('click', onClosePhoneSheet);

  const compactOpenFileBtn = document.getElementById('compact-open-file-btn');
  compactOpenFileBtn.addEventListener('click', onOpenPhoneSheet);

  const plotPhotoBtn = document.getElementById('plot-photo-btn');
  const takeoverPhotoBtn = document.getElementById('takeover-photo-btn');
  const phoneSheetPhotoBtn = document.getElementById('phone-sheet-photo-btn');

  plotPhotoBtn.addEventListener('click', () => onOpenPhotoModal(plotPhotoBtn));
  takeoverPhotoBtn.addEventListener('click', () => onOpenPhotoModal(takeoverPhotoBtn));
  phoneSheetPhotoBtn.addEventListener('click', () => onOpenPhotoModal(phoneSheetPhotoBtn));

  // Photo Viewer Modal DOM
  const photoModalEl = document.getElementById('photo-modal');
  const photoModalBackdropEl = document.getElementById('photo-modal-backdrop');
  const photoModalCloseEl = document.getElementById('photo-modal-close');
  const photoModalCaptionEl = document.getElementById('photo-modal-caption');
  const photoModalImgEl = document.getElementById('photo-modal-img');

  photoModalCloseEl.addEventListener('click', onClosePhotoModal);
  photoModalBackdropEl.addEventListener('click', onClosePhotoModal);

  // Mission Complete Panel DOM
  const missionCompletePanelEl = document.getElementById('mission-complete-panel');
  const closeCompleteBtn = document.getElementById('close-complete-btn');
  const saveBadgeBtn = document.getElementById('save-badge-btn');
  const badgeCanvasEl = document.getElementById('badge-canvas');
  let badgeDrawn = false;

  closeCompleteBtn.addEventListener('click', onCloseMissionComplete);
  saveBadgeBtn.addEventListener('click', () => onSaveBadge(badgeCanvasEl));

  // DOM References for Dynamic Updates
  const takeoverPhotoWrap = document.getElementById('takeover-photo-wrap');
  const takeoverPhotoImg = document.getElementById('takeover-photo-img');
  const takeoverPhotoBadge = document.getElementById('takeover-photo-badge');
  const moonViewportEl = document.getElementById('moon-viewport');

  const plotLegendWrap = document.getElementById('plot-legend-wrap');
  const plotSelectedWrap = document.getElementById('plot-selected-wrap');
  const plotGhostName = document.getElementById('plot-ghost-name');
  const plotGhostMeta = document.getElementById('plot-ghost-meta');
  const plotPhotoFig = document.getElementById('plot-photo-fig');
  const plotPhotoImg = document.getElementById('plot-photo-img');
  const plotPhotoCap = document.getElementById('plot-photo-cap');
  const plotPhotoPlaceholder = document.getElementById('plot-photo-placeholder');
  const plotSignalText = document.getElementById('plot-signal-text');

  const logCountEl = document.getElementById('log-count');
  const logAllDoneEl = document.getElementById('log-all-done');
  const compactLogTextEl = document.getElementById('compact-log-text');

  const monitorIdleEl = document.getElementById('monitor-idle');
  const monitorWarnEl = document.getElementById('monitor-warn');
  const monitorFileEl = document.getElementById('monitor-file');
  const fileHeaderEl = document.getElementById('file-header');
  const fileJobEl = document.getElementById('file-job');
  const fileBodyEl = document.getElementById('file-body');
  const fileAnswerBoxEl = document.getElementById('file-answer-box');
  const fileAnswerTextEl = document.getElementById('file-answer-text');
  const nasaLinkEl = document.getElementById('nasa-link');

  const signalLampEl = document.getElementById('signal-lamp');
  const noSignalLampEl = document.getElementById('nosignal-lamp');

  // Phone Sheet DOM References
  const phoneSheetEl = document.getElementById('phone-sheet');
  const phoneSheetPhoto = document.getElementById('phone-sheet-photo');
  const phoneSheetPlaceholder = document.getElementById('phone-sheet-placeholder');
  const phoneSheetName = document.getElementById('phone-sheet-name');
  const phoneSheetPhotoId = document.getElementById('phone-sheet-photoid');
  const phoneFileHeader = document.getElementById('phone-file-header');
  const phoneFileJob = document.getElementById('phone-file-job');
  const phoneFileBody = document.getElementById('phone-file-body');
  const phoneFileAnswerBox = document.getElementById('phone-file-answer-box');
  const phoneFileAnswerText = document.getElementById('phone-file-answer-text');
  const phoneNasaLink = document.getElementById('phone-nasa-link');
  const phoneSheetSignalText = document.getElementById('phone-sheet-signal-text');
  const phoneSignalLamp = document.getElementById('phone-signal-lamp');
  const phoneNoSignalLamp = document.getElementById('phone-nosignal-lamp');

  function render(state) {
    const g = ghosts.find((x) => x.id === state.sel) || null;
    const nChecked = ghosts.filter((x) => state.checked[x.id]).length;
    const allDone = nChecked === ghosts.length;
    const answered = state.call === 'done';
    const calling = state.call === 'calling';
    const ping = Boolean(answered && g && g.answers);
    const isPhone = window.innerWidth <= 599;
    const isPhotoTakeover = Boolean(!isPhone && g && g.hasPhoto && state.viewMode === 'photo');

    // 1. Update Left Timeline
    timelineItems.forEach((item) => {
      const on = Boolean(g && g.id === item.id);
      item.dot.style.background = on ? '#FFFFFF' : '#6F8A8F';
      item.dot.style.boxShadow = on ? '0 0 8px #FFFFFF' : 'none';
      item.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      item.btn.classList.toggle('timeline-btn--selected', on);
      item.year.style.color = on ? '#FFFFFF' : '#B7CDD1';
      item.label.style.color = on ? '#FFFFFF' : '#B7CDD1';
    });

    // 2. Update Right Ghost Log & Compact Strip
    logItems.forEach((item) => {
      const x = item.ghost;
      const on = Boolean(g && g.id === x.id);
      const done = Boolean(state.checked[x.id]);

      const lampColor = on ? '#F6F2E2' : done ? (x.answers ? '#7BE495' : '#E8735C') : '#3A403C';
      const lampGlow = on
        ? '0 0 10px rgba(246,242,226,0.8)'
        : done
          ? x.answers
            ? '0 0 10px rgba(123,228,149,0.8)'
            : '0 0 8px rgba(232,115,92,0.7)'
          : 'none';

      item.lamp.style.background = lampColor;
      item.lamp.style.boxShadow = lampGlow;
      item.nameSpan.textContent = (done ? '✓ ' : '') + x.name;
      item.statusSpan.textContent = done
        ? x.answers
          ? 'CHECKED · ANSWERS'
          : 'CHECKED · QUIET SINCE ' + x.quiet
        : 'NOT CHECKED YET';
      item.statusSpan.style.color = done ? (x.answers ? '#9BEFB0' : '#F2A08F') : '#A9B4AD';
    });

    const checkedStr = p2(nChecked) + ' OF 06 CHECKED';
    logCountEl.textContent = checkedStr;
    compactLogTextEl.textContent = 'GHOST LOG · ' + checkedStr;
    logAllDoneEl.hidden = !allDone;

    // 3. Update Console Ghost Buttons
    ghostButtons.forEach((item) => {
      const x = item.ghost;
      const on = Boolean(g && g.id === x.id);
      item.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      item.btn.classList.toggle('ghost-btn--selected', on);
      item.btn.classList.toggle('ghost-btn--answers', !on && x.answers);
    });

    // 4. Update Photo Takeover & Corner Map vs Full Moon Viewport
    const wasCorner = moonViewportEl.classList.contains('moon-viewport--corner');
    if (isPhotoTakeover) {
      takeoverPhotoWrap.hidden = false;
      takeoverPhotoBtn.setAttribute('aria-label', 'View larger photo of ' + g.name);
      takeoverPhotoImg.src = g.photo;
      takeoverPhotoImg.alt = g.photoAlt;
      takeoverPhotoBadge.textContent = 'PHOTO: ' + g.photoId;
      moonViewportEl.classList.add('moon-viewport--corner');
    } else {
      takeoverPhotoWrap.hidden = true;
      moonViewportEl.classList.remove('moon-viewport--corner');
    }

    // 5. Update Main Screen Hardware Plot & Status Box
    if (!g) {
      plotLegendWrap.hidden = false;
      plotSelectedWrap.hidden = true;
      plotSignalText.className = '';
      if (state.call === 'nosel') {
        plotSignalText.textContent = 'PICK A GHOST FIRST, THEN CALL.';
        plotSignalText.style.color = '#F2A08F';
      } else {
        plotSignalText.textContent = 'Pick a machine, then press CALL GHOST to radio it. See who answers.';
        plotSignalText.style.color = '#B7CDD1';
      }
    } else {
      plotLegendWrap.hidden = true;
      plotSelectedWrap.hidden = false;
      plotGhostName.textContent = g.name;

      if (isPhotoTakeover) {
        plotPhotoFig.hidden = true;
        plotPhotoPlaceholder.hidden = true;
        plotGhostMeta.hidden = false;
        plotGhostMeta.textContent =
          g.mission.toUpperCase() + ' · ' + g.siteName.toUpperCase() + '\nLANDED ' + g.landedTxt;
        plotGhostMeta.style.whiteSpace = 'pre-line';
      } else {
        plotGhostMeta.hidden = true;
        if (g.hasPhoto) {
          plotPhotoFig.hidden = false;
          plotPhotoPlaceholder.hidden = true;
          plotPhotoBtn.setAttribute('aria-label', 'View larger photo of ' + g.name);
          plotPhotoImg.src = g.photo;
          plotPhotoImg.alt = g.photoAlt;
          plotPhotoCap.textContent = 'PHOTO: ' + g.photoId;
        } else {
          plotPhotoFig.hidden = true;
          plotPhotoPlaceholder.hidden = false;
          plotPhotoPlaceholder.textContent = 'PHOTO ' + g.photoId + '\nLOADING IN BUILD';
        }
      }

      if (calling) {
        if (state.laserActive) {
          plotSignalText.textContent =
            'LASER BEAM IN FLIGHT... ' + state.laserElapsed.toFixed(1) + ' SEC';
          plotSignalText.style.color = '#9BEFB0';
          plotSignalText.className = '';
        } else {
          plotSignalText.textContent = 'Radioing the Moon… 1.3 seconds each way.';
          plotSignalText.style.color = '#FFFFFF';
          plotSignalText.className = 'blink';
        }
      } else if (answered) {
        plotSignalText.textContent = g.reply;
        plotSignalText.style.color = g.answers ? '#9BEFB0' : '#F2A08F';
        plotSignalText.className = '';
      } else {
        plotSignalText.textContent = 'SIGNAL CHECK: PRESS CALL GHOST';
        plotSignalText.style.color = '#B7CDD1';
        plotSignalText.className = '';
      }
    }

    // 6. Update Console Monitor & Phone Sheet
    if (!g) {
      monitorIdleEl.hidden = false;
      monitorFileEl.hidden = true;
      monitorWarnEl.hidden = state.call !== 'nosel';
      phoneSheetEl.hidden = true;
      compactOpenFileBtn.hidden = true;
    } else {
      monitorIdleEl.hidden = true;
      monitorFileEl.hidden = false;

      const headerLine =
        'FILE ' + g.num + ' · ' + g.mission + ' · LANDED ' + g.landedTxt + ' · ' + g.siteName;
      const openAnswer = state.openQ !== null && g.qs[state.openQ] ? g.qs[state.openQ][1] : null;

      fileHeaderEl.textContent = headerLine;
      fileJobEl.textContent = g.job;
      fileBodyEl.textContent = g.story;
      nasaLinkEl.href = g.nasaUrl;

      if (openAnswer) {
        fileAnswerBoxEl.hidden = false;
        fileAnswerTextEl.textContent = openAnswer;
      } else {
        fileAnswerBoxEl.hidden = true;
        fileAnswerTextEl.textContent = '';
      }

      qBtns.forEach((btn, idx) => {
        if (g.qs[idx]) {
          btn.hidden = false;
          btn.textContent = g.qs[idx][0];
          btn.setAttribute('aria-expanded', state.openQ === idx ? 'true' : 'false');
          btn.classList.toggle('q-btn--open', state.openQ === idx);
        } else {
          btn.hidden = true;
        }
      });

      // Speech synthesis button state
      readBtn.hidden = !state.speechSupported;
      phoneReadBtn.hidden = !state.speechSupported;
      if (state.speechSupported) {
        const readLabel = state.speaking ? 'STOP' : 'READ TO ME';
        readBtn.textContent = readLabel;
        readBtn.setAttribute('aria-pressed', state.speaking ? 'true' : 'false');
        phoneReadBtn.textContent = readLabel;
        phoneReadBtn.setAttribute('aria-pressed', state.speaking ? 'true' : 'false');
      }

      // Phone Sheet updates
      phoneSheetName.textContent = g.name;
      phoneSheetPhotoId.textContent = 'PHOTO: ' + g.photoId;
      if (g.hasPhoto) {
        phoneSheetPhotoBtn.hidden = false;
        phoneSheetPlaceholder.hidden = true;
        phoneSheetPhotoBtn.setAttribute('aria-label', 'View larger photo of ' + g.name);
        phoneSheetPhoto.src = g.photo;
        phoneSheetPhoto.alt = g.photoAlt;
      } else {
        phoneSheetPhotoBtn.hidden = true;
        phoneSheetPlaceholder.hidden = false;
        phoneSheetPlaceholder.textContent = 'PHOTO ' + g.photoId + '\nLOADING IN BUILD';
      }

      phoneFileHeader.textContent = headerLine.toUpperCase();
      phoneFileJob.textContent = g.job;
      phoneFileBody.textContent = g.story;
      phoneNasaLink.href = g.nasaUrl;

      if (openAnswer) {
        phoneFileAnswerBox.hidden = false;
        phoneFileAnswerText.textContent = openAnswer;
      } else {
        phoneFileAnswerBox.hidden = true;
        phoneFileAnswerText.textContent = '';
      }

      phoneQBtns.forEach((btn, idx) => {
        if (g.qs[idx]) {
          btn.hidden = false;
          btn.textContent = g.qs[idx][0];
          btn.setAttribute('aria-expanded', state.openQ === idx ? 'true' : 'false');
          btn.classList.toggle('q-btn--open', state.openQ === idx);
        } else {
          btn.hidden = true;
        }
      });

      phoneSheetSignalText.textContent = plotSignalText.textContent;
      phoneSheetSignalText.style.color = plotSignalText.style.color;
      phoneSheetSignalText.className = plotSignalText.className;

      phoneSheetEl.hidden = !state.phoneSheetOpen;
      compactOpenFileBtn.hidden = state.phoneSheetOpen;
    }

    // 7. Update Photo Viewer Modal
    if (state.photoModalOpen && g && g.hasPhoto) {
      photoModalEl.hidden = false;
      photoModalCaptionEl.textContent = 'PHOTO: ' + g.photoId;
      photoModalImgEl.src = g.photo;
      photoModalImgEl.alt = g.photoAlt;
    } else {
      photoModalEl.hidden = true;
    }

    // 8. Update Mission Complete Panel & Badge
    if (allDone && !state.missionCompleteDismissed) {
      missionCompletePanelEl.hidden = false;
      if (!badgeDrawn) {
        drawMissionBadge(badgeCanvasEl);
        badgeDrawn = true;
      }
    } else {
      missionCompletePanelEl.hidden = true;
    }

    // 9. Update CALL GHOST Button & Lamps
    const callLabel = (calling ? 'CALLING...' : 'CALL GHOST') + ' [C]';
    callBtn.textContent = callLabel;
    phoneCallBtn.textContent = callLabel;

    const sigOn = ping;
    const noSigOn = Boolean(answered && g && !g.answers);

    signalLampEl.classList.toggle('round-lamp--signal-on', sigOn);
    noSignalLampEl.classList.toggle('round-lamp--nosignal-on', noSigOn);
    phoneSignalLamp.classList.toggle('round-lamp--signal-on', sigOn);
    phoneNoSignalLamp.classList.toggle('round-lamp--nosignal-on', noSigOn);

    return { viewportChanged: wasCorner !== isPhotoTakeover };
  }

  return { render };
}
