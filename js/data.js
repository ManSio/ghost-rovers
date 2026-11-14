// js/data.js: Fetch and validate data/ghosts.json with try/catch error state

export function showErrorBanner(message) {
  const banner = document.getElementById('error-banner');
  if (!banner) return;
  banner.textContent = message;
  banner.hidden = false;
}

export async function loadGhostData() {
  try {
    const response = await fetch('data/ghosts.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ' loading data/ghosts.json');
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.ghosts) || !data.sites) {
      throw new Error('Invalid data structure in data/ghosts.json');
    }
    return data;
  } catch (err) {
    const msg = 'CONSOLE DATA FAULT: ' + (err && err.message ? err.message : String(err));
    showErrorBanner(msg);
    throw err;
  }
}
