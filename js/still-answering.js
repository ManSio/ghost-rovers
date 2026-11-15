// js/still-answering.js: On Mars only, show the 2 working rovers that still answer Earth, in the mission complete panel
// SI-assisted code (Claude, Antigravity), reviewed by La Shara Cordero. See AI_DISCLOSURE.md.

const PANEL_ID = 'still-answering';
const MARS_BTN_ID = 'world-mars-btn';

function buildPanel(box, info) {
  while (box.firstChild) box.removeChild(box.firstChild);

  const row = document.createElement('div');
  row.className = 'still-answering-row';

  const label = document.createElement('span');
  label.className = 'still-answering-label';
  label.textContent = info.label;
  row.appendChild(label);

  info.rovers.forEach((rover) => {
    const link = document.createElement('a');
    link.className = 'study-tool-btn still-answering-btn';
    link.href = rover.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const name = document.createElement('span');
    name.textContent = rover.name;
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = ' ↗';
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = ' (' + rover.note + ', NASA page, opens in a new tab)';
    link.append(name, arrow, sr);
    row.appendChild(link);
  });

  const note = document.createElement('p');
  note.className = 'still-answering-note';
  note.textContent = info.note;

  box.append(row, note);
}

function isValid(info) {
  return (
    info &&
    typeof info.label === 'string' &&
    typeof info.note === 'string' &&
    Array.isArray(info.rovers) &&
    info.rovers.every((r) => r && typeof r.name === 'string' && typeof r.note === 'string' && /^https:\/\/[a-z.]*nasa\.gov\//.test(r.url))
  );
}

async function init() {
  const box = document.getElementById(PANEL_ID);
  const marsBtn = document.getElementById(MARS_BTN_ID);
  if (!box || !marsBtn) return;

  let info = null;
  try {
    const res = await fetch('data/mars.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    info = data.stillAnswering;
  } catch (err) {
    // Optional extra: if it can't load, the panel simply stays hidden. The game is unaffected.
    console.warn('still-answering: could not load data/mars.json', err);
    return;
  }
  if (!isValid(info)) return;

  buildPanel(box, info);
  const sync = () => {
    box.hidden = marsBtn.getAttribute('aria-pressed') !== 'true';
  };
  sync();
  new MutationObserver(sync).observe(marsBtn, { attributes: true, attributeFilter: ['aria-pressed'] });
}

init();
