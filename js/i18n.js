// js/i18n.js: optional content translation. Console labels, codes, clocks and names stay English.
// SI-assisted code (Claude), reviewed by La Shara Cordero. See AI_DISCLOSURE.md.

let dict = null;

export function currentLang() {
  try {
    const param = new URLSearchParams(window.location.search).get('lang') || 'en';
    return param.toLowerCase().startsWith('ru') ? 'ru' : 'en';
  } catch (err) {
    return 'en';
  }
}

export async function loadDict(lang) {
  if (lang !== 'ru') {
    dict = null;
    return null;
  }
  try {
    const res = await fetch('data/i18n-ru.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    dict = await res.json();
  } catch (err) {
    // A missing translation must never break the app: fall back to English.
    dict = null;
  }
  return dict;
}

export function t(key, fallback) {
  return (dict && dict.ui && dict.ui[key]) || fallback;
}

export function localizeWorld(world) {
  if (!dict || !dict.ghosts || !world || !Array.isArray(world.ghosts)) return world;
  const ghosts = world.ghosts.map((g) => {
    const tr = dict.ghosts[g.id];
    if (!tr) return g;
    return Object.assign({}, g, {
      job: tr.job || g.job,
      story: tr.story || g.story,
      qs: Array.isArray(tr.qs) && tr.qs.length ? tr.qs : g.qs,
      reply: tr.reply || g.reply
    });
  });
  return Object.assign({}, world, { ghosts });
}
