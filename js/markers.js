// js/markers.js: Build and update the 4 lunar landing site <button> overlays and ping rings

export function initSiteMarkers(sitesMap, ghosts, onPickGhost) {
  const pinsLayer = document.getElementById('pins-layer');
  const pingLayer = document.getElementById('ping-layer');
  const pingRings = [
    document.getElementById('ping-1'),
    document.getElementById('ping-2'),
    document.getElementById('ping-3')
  ];

  const pinRecords = [];

  Object.keys(sitesMap).forEach((siteKey) => {
    const site = sitesMap[siteKey];
    const siteGhosts = ghosts.filter((g) => g.site === siteKey);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'site-pin';
    btn.dataset.site = siteKey;

    btn.addEventListener('click', () => {
      onPickGhost(siteKey, siteGhosts);
    });

    pinsLayer.appendChild(btn);
    pinRecords.push({
      key: siteKey,
      site,
      ghosts: siteGhosts,
      btn
    });
  });

  function updateSelectionAndLabels(selectedGhost, showPing) {
    pinRecords.forEach((rec) => {
      const lit = Boolean(selectedGhost && selectedGhost.site === rec.key);
      rec.btn.classList.toggle('site-pin--lit', lit);
      const count = rec.ghosts.length;
      const countLabel = count === 1 ? '1 ghost' : count + ' ghosts';
      const names = rec.ghosts.map((g) => g.name).join(' and ');
      rec.btn.setAttribute(
        'aria-label',
        rec.key + ': ' + countLabel + ', ' + names + (lit ? ', selected' : '')
      );
    });
    pingLayer.hidden = !showPing;
  }

  function updatePositions(projectLatLon, showPing) {
    pinRecords.forEach((rec) => {
      const pos = projectLatLon(rec.site.lat, rec.site.lon);
      if (!pos.visible) {
        rec.btn.hidden = true;
        if (rec.key === 'A11') {
          pingLayer.hidden = true;
        }
        return;
      }
      rec.btn.hidden = false;
      rec.btn.style.left = Math.round(pos.x - 22) + 'px';
      rec.btn.style.top = Math.round(pos.y - 22) + 'px';

      if (rec.key === 'A11') {
        pingLayer.hidden = !showPing;
        const px = Math.round(pos.x - 40) + 'px';
        const py = Math.round(pos.y - 40) + 'px';
        pingRings.forEach((ring) => {
          if (ring) {
            ring.style.left = px;
            ring.style.top = py;
          }
        });
      }
    });
  }

  return {
    updateSelectionAndLabels,
    updatePositions
  };
}
