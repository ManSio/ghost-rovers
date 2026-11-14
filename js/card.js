// js/card.js: Render side screens, hardware plot, console monitor, and phone sheet using textContent only

function p2(n) {
  return String(n).padStart(2, '0');
}

export function initPanels(data, callbacks) {
  const { ghosts, sites } = data;
  const { onPickGhostId, onToggleQuestion, onCallGhost, onClosePhoneSheet, onOpenPhoneSheet } = callbacks;

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

  // 2. Build Left Side Screen Timeline (LANDED · BY YEAR)
  const timelineListEl = document.getElementById('timeline-list');
  const sortedByLanded = ghosts.slice().sort((a, b) => (a.landed < b.landed ? -1 : 1));
  const timelineItems = sortedByLanded.map((g) => {
    const li = document.createElement('li');
    li.className = 'timeline-item';

    const dot = document.createElement('span');
    dot.className = 'timeline-dot';
    dot.setAttribute('aria-hidden', 'true');

    const year = document.createElement('span');
    year.className = 'timeline-year';
    year.textContent = g.landed.slice(0, 4);

    const label = document.createElement('span');
    label.className = 'timeline-label';
    label.textContent = g.name.toUpperCase();

    li.appendChild(dot);
    li.appendChild(year);
    li.appendChild(label);
    timelineListEl.appendChild(li);

    return { id: g.id, dot, year, label };
  });

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

  // 5. Wire Question Buttons & Call/Close Buttons
  const qBtn0 = document.getElementById('q-btn-0');
  const qBtn1 = document.getElementById('q-btn-1');
  const phoneQBtn0 = document.getElementById('phone-q-btn-0');
  const phoneQBtn1 = document.getElementById('phone-q-btn-1');

  qBtn0.addEventListener('click', () => onToggleQuestion(0));
  qBtn1.addEventListener('click', () => onToggleQuestion(1));
  phoneQBtn0.addEventListener('click', () => onToggleQuestion(0));
  phoneQBtn1.addEventListener('click', () => onToggleQuestion(1));

  const callBtn = document.getElementById('call-btn');
  const phoneCallBtn = document.getElementById('phone-call-btn');
  callBtn.addEventListener('click', onCallGhost);
  phoneCallBtn.addEventListener('click', onCallGhost);

  const phoneSheetCloseBtn = document.getElementById('phone-sheet-close');
  phoneSheetCloseBtn.addEventListener('click', onClosePhoneSheet);

  const compactOpenFileBtn = document.getElementById('compact-open-file-btn');
  compactOpenFileBtn.addEventListener('click', onOpenPhoneSheet);

  // DOM References for Dynamic Updates
  const plotLegendWrap = document.getElementById('plot-legend-wrap');
  const plotSelectedWrap = document.getElementById('plot-selected-wrap');
  const plotGhostName = document.getElementById('plot-ghost-name');
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

    // 1. Update Left Timeline
    timelineItems.forEach((item) => {
      const on = Boolean(g && g.id === item.id);
      item.dot.style.background = on ? '#FFFFFF' : '#6F8A8F';
      item.dot.style.boxShadow = on ? '0 0 8px #FFFFFF' : 'none';
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

    // 4. Update Main Screen Hardware Plot
    if (!g) {
      plotLegendWrap.hidden = false;
      plotSelectedWrap.hidden = window.innerWidth > 599;
      plotSignalText.className = '';
      if (state.call === 'nosel') {
        plotSignalText.textContent = 'PICK A GHOST FIRST, THEN CALL.';
        plotSignalText.style.color = '#F2A08F';
      } else {
        plotSignalText.textContent = 'CONSOLE READY: PICK A GHOST BELOW';
        plotSignalText.style.color = '#B7CDD1';
      }
    } else {
      plotLegendWrap.hidden = true;
      plotSelectedWrap.hidden = false;
      plotGhostName.textContent = g.name;

      if (g.hasPhoto) {
        plotPhotoFig.hidden = false;
        plotPhotoPlaceholder.hidden = true;
        plotPhotoImg.src = g.photo;
        plotPhotoImg.alt = g.photoAlt;
        plotPhotoCap.textContent = 'PHOTO: ' + g.photoId;
      } else {
        plotPhotoFig.hidden = true;
        plotPhotoPlaceholder.hidden = false;
        plotPhotoPlaceholder.textContent = 'PHOTO ' + g.photoId + '\nLOADING IN BUILD';
      }

      if (calling) {
        plotSignalText.textContent = 'CALLING...';
        plotSignalText.style.color = '#FFFFFF';
        plotSignalText.className = 'blink';
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

    // 5. Update Console Monitor & Phone Sheet
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
      const bodyText = state.openQ !== null ? g.qs[state.openQ][1] : g.story;

      fileHeaderEl.textContent = headerLine;
      fileJobEl.textContent = g.job;
      fileBodyEl.textContent = bodyText;
      nasaLinkEl.href = g.nasaUrl;

      qBtn0.textContent = g.qs[0][0];
      qBtn0.setAttribute('aria-expanded', state.openQ === 0 ? 'true' : 'false');
      qBtn0.classList.toggle('q-btn--open', state.openQ === 0);

      qBtn1.textContent = g.qs[1][0];
      qBtn1.setAttribute('aria-expanded', state.openQ === 1 ? 'true' : 'false');
      qBtn1.classList.toggle('q-btn--open', state.openQ === 1);

      // Phone Sheet updates
      phoneSheetName.textContent = g.name;
      phoneSheetPhotoId.textContent = 'PHOTO: ' + g.photoId;
      if (g.hasPhoto) {
        phoneSheetPhoto.hidden = false;
        phoneSheetPlaceholder.hidden = true;
        phoneSheetPhoto.src = g.photo;
        phoneSheetPhoto.alt = g.photoAlt;
      } else {
        phoneSheetPhoto.hidden = true;
        phoneSheetPlaceholder.hidden = false;
        phoneSheetPlaceholder.textContent = 'PHOTO ' + g.photoId + '\nLOADING IN BUILD';
      }

      phoneFileHeader.textContent = headerLine.toUpperCase();
      phoneFileJob.textContent = g.job;
      phoneFileBody.textContent = bodyText;
      phoneNasaLink.href = g.nasaUrl;

      phoneQBtn0.textContent = g.qs[0][0];
      phoneQBtn0.setAttribute('aria-expanded', state.openQ === 0 ? 'true' : 'false');
      phoneQBtn0.classList.toggle('q-btn--open', state.openQ === 0);

      phoneQBtn1.textContent = g.qs[1][0];
      phoneQBtn1.setAttribute('aria-expanded', state.openQ === 1 ? 'true' : 'false');
      phoneQBtn1.classList.toggle('q-btn--open', state.openQ === 1);

      phoneSheetSignalText.textContent = plotSignalText.textContent;
      phoneSheetSignalText.style.color = plotSignalText.style.color;
      phoneSheetSignalText.className = plotSignalText.className;

      phoneSheetEl.hidden = !state.phoneSheetOpen;
      compactOpenFileBtn.hidden = state.phoneSheetOpen;
    }

    // 6. Update CALL GHOST Button & Lamps
    const callLabel = (calling ? 'CALLING...' : 'CALL GHOST') + ' [C]';
    callBtn.textContent = callLabel;
    phoneCallBtn.textContent = callLabel;

    const sigOn = ping;
    const noSigOn = Boolean(answered && g && !g.answers);

    signalLampEl.classList.toggle('round-lamp--signal-on', sigOn);
    noSignalLampEl.classList.toggle('round-lamp--nosignal-on', noSigOn);
    phoneSignalLamp.classList.toggle('round-lamp--signal-on', sigOn);
    phoneNoSignalLamp.classList.toggle('round-lamp--nosignal-on', noSigOn);
  }

  return { render };
}
