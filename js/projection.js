// js/projection.js: Lunar lat/lon to 3D sphere and 2D viewport projection math

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Convert lunar latitude (N positive) and longitude (E positive)
 * into local 3D coordinates on a unit sphere where (0 N, 0 E) is at (0, 0, +radius).
 */
export function latLonToXYZ(latDeg, lonDeg, radius = 1) {
  const lat = degToRad(latDeg);
  const lon = degToRad(lonDeg);
  return {
    x: radius * Math.cos(lat) * Math.sin(lon),
    y: radius * Math.sin(lat),
    z: radius * Math.cos(lat) * Math.cos(lon)
  };
}

/**
 * Compute target globe Euler angles (order 'YXZ') so that (latDeg, lonDeg)
 * rotates to face the camera (+Z).
 */
export function getTargetRotationForSite(latDeg, lonDeg) {
  return {
    rotX: degToRad(latDeg),
    rotY: -degToRad(lonDeg)
  };
}

/**
 * Project a 3D world position on the unit orthographic Moon globe
 * into 2D pixel coordinates inside a (width x height) viewport.
 */
export function worldToViewportPx(worldVec, width, height) {
  const visible = worldVec.z > 0.02;
  const x = (0.5 + 0.5 * worldVec.x) * width;
  const y = (0.5 - 0.5 * worldVec.y) * height;
  return { x, y, visible };
}
