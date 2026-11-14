// js/data.js: Fetch and validate data/ghosts.json and data/mars.json with try/catch error state

export function showErrorBanner(message) {
  const banner = document.getElementById('error-banner');
  if (!banner) return;
  banner.textContent = message;
  banner.hidden = false;
}

async function fetchWorldJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error('HTTP ' + response.status + ' loading ' + path);
  }
  const data = await response.json();
  if (!data || !Array.isArray(data.ghosts) || !data.sites) {
    throw new Error('Invalid data structure in ' + path);
  }
  return data;
}

export async function loadGhostData() {
  try {
    return await fetchWorldJson('data/ghosts.json');
  } catch (err) {
    const msg = 'CONSOLE DATA FAULT: ' + (err && err.message ? err.message : String(err));
    showErrorBanner(msg);
    throw err;
  }
}

export async function loadAllWorldData() {
  try {
    const [moon, mars] = await Promise.all([
      fetchWorldJson('data/ghosts.json'),
      fetchWorldJson('data/mars.json')
    ]);
    return { moon, mars };
  } catch (err) {
    const msg = 'CONSOLE DATA FAULT: ' + (err && err.message ? err.message : String(err));
    showErrorBanner(msg);
    throw err;
  }
}
