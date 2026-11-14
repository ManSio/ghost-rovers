// js/markers.js: Build and update landing site <button> overlays, corner-map amber dot, and ping rings

export function initSiteMarkers(initialSitesMap, initialGhosts, onPickGhost) {
  const pinsLayer = document.getElementById('pins-layer');
  const pingLayer = document.getElementById('ping-layer');
  const cornerSiteDot = document.getElementById('corner-site-dot');
  const pingRings = [
    document.getElementById('ping-1'),
    document.getElementById('ping-2'),
    document.getElementById('ping-3')
  ];

  let pinRecords = [];
  let activeSiteKey = null;
  let cornerModeActive = false;

  function buildPins(sitesMap, ghosts) {
    while (pinsLayer.firstChild) {
      pinsLayer.removeChild(pinsLayer.firstChild);
    }
    pinRecords = [];

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
  }

  buildPins(initialSitesMap, initialGhosts);

  function setWorldData(sitesMap, ghosts) {
    activeSiteKey = null;
    cornerModeActive = false;
    if (cornerSiteDot) {
      cornerSiteDot.hidden = true;
    }
    pingLayer.hidden = true;
    buildPins(sitesMap, ghosts);
  }

  function updateSelectionAndLabels(selectedGhost, showPing, isCornerMode = false) {
    activeSiteKey = selectedGhost ? selectedGhost.site : null;
    cornerModeActive = Boolean(isCornerMode && activeSiteKey);

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

    if (!cornerModeActive && cornerSiteDot) {
      cornerSiteDot.hidden = true;
    }
    pingLayer.hidden = !showPing;
  }

  function updatePositions(projectLatLon, showPing) {
    pinRecords.forEach((rec) => {
      const pos = projectLatLon(rec.site.lat, rec.site.lon);

      if (cornerModeActive && rec.key === activeSiteKey && cornerSiteDot) {
        if (!pos.visible) {
          cornerSiteDot.hidden = true;
        } else {
          cornerSiteDot.hidden = false;
          cornerSiteDot.style.left = Math.round(pos.x - 5) + 'px';
          cornerSiteDot.style.top = Math.round(pos.y - 5) + 'px';
        }
      }

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
    setWorldData,
    updateSelectionAndLabels,
    updatePositions
  };
}
