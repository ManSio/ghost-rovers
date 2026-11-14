// js/globe.js: Three.js 0.187.0 3D Moon globe with NASA LRO texture, drag/target rotation, and room scale awareness

import { latLonToXYZ, getTargetRotationForSite, worldToViewportPx } from './projection.js';
import { showErrorBanner } from './data.js';

const THREE_CDN = 'https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.min.js';
const TEXTURE_URL = 'assets/nasa/lroc_color_2k.jpg';

export async function createMoonGlobe(containerEl, onFrameUpdate, options = {}) {
  let THREE;
  try {
    THREE = await import(THREE_CDN);
  } catch (err) {
    showErrorBanner('3D GLOBE MODULE ERROR: Failed to load Three.js 0.187.0 from CDN.');
    throw err;
  }

  try {
    const width = containerEl.clientWidth || 400;
    const height = containerEl.clientHeight || 400;

    const scene = new THREE.Scene();
    // Orthographic camera matches tools/render_moon.py near-side projection at rest
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    containerEl.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.order = 'YXZ';
    scene.add(globeGroup);

    const texture = await new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load(
        TEXTURE_URL,
        (tex) => resolve(tex),
        undefined,
        () => reject(new Error('Failed to load lunar texture ' + TEXTURE_URL))
      );
    });
    texture.colorSpace = THREE.NoColorSpace;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

    // Shader replicates tools/render_moon.py view-space upper-left lighting
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: texture }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vViewNormal;
        void main() {
          vUv = uv;
          vViewNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        varying vec2 vUv;
        varying vec3 vViewNormal;
        void main() {
          vec4 tex = texture2D(uMap, vUv);
          vec3 L = normalize(vec3(-0.45, 0.35, 0.82));
          float d = clamp(dot(normalize(vViewNormal), L), 0.0, 1.0);
          float shade = 0.18 + 0.92 * pow(d, 0.8);
          vec3 rgb = clamp(tex.rgb * shade * 1.05, 0.0, 1.0);
          gl_FragColor = vec4(rgb, 1.0);
        }
      `
    });

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const sphere = new THREE.Mesh(geometry, material);
    // Align u = 0.5 (0 deg lon in NASA LRO map) toward +Z camera
    sphere.rotation.y = -Math.PI / 2;
    globeGroup.add(sphere);

    let isDragging = false;
    let hasNotifiedDrag = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotX = null;
    let targetRotY = null;

    function prefersReducedMotion() {
      try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch (e) {
        return false;
      }
    }

    const canvas = renderer.domElement;
    const dragSpeed = 0.007;

    canvas.addEventListener('pointerdown', (e) => {
      isDragging = true;
      targetRotX = null;
      targetRotY = null;
      prevX = e.clientX;
      prevY = e.clientY;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) {}
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const scale = options.getRoomScale ? options.getRoomScale() : 1;
      const dx = (e.clientX - prevX) / (scale || 1);
      const dy = (e.clientY - prevY) / (scale || 1);
      if ((Math.abs(dx) > 1 || Math.abs(dy) > 1) && !hasNotifiedDrag) {
        hasNotifiedDrag = true;
        if (options.onFirstDrag) {
          options.onFirstDrag();
        }
      }
      prevX = e.clientX;
      prevY = e.clientY;
      globeGroup.rotation.y += dx * dragSpeed;
      globeGroup.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, globeGroup.rotation.x + dy * dragSpeed)
      );
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      try {
        if (e && e.pointerId !== undefined && canvas.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}
    }

    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    function resize() {
      const w = containerEl.clientWidth || 400;
      const h = containerEl.clientHeight || 400;
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', resize);

    const tempVec = new THREE.Vector3();

    function projectLatLon(latDeg, lonDeg) {
      const w = containerEl.clientWidth || 400;
      const h = containerEl.clientHeight || 400;
      const local = latLonToXYZ(latDeg, lonDeg, 1);
      tempVec.set(local.x, local.y, local.z).applyMatrix4(globeGroup.matrixWorld);
      return worldToViewportPx(tempVec, w, h);
    }

    function setTargetRotation(rotX, rotY) {
      if (prefersReducedMotion()) {
        globeGroup.rotation.x = rotX;
        globeGroup.rotation.y = rotY;
        targetRotX = null;
        targetRotY = null;
      } else {
        // Normalize current Y rotation close to target for shortest path
        while (globeGroup.rotation.y - rotY > Math.PI) globeGroup.rotation.y -= Math.PI * 2;
        while (globeGroup.rotation.y - rotY < -Math.PI) globeGroup.rotation.y += Math.PI * 2;
        targetRotX = rotX;
        targetRotY = rotY;
      }
    }

    function rotateToSite(latDeg, lonDeg) {
      const { rotX, rotY } = getTargetRotationForSite(latDeg, lonDeg);
      setTargetRotation(rotX, rotY);
    }

    function faceEarth() {
      setTargetRotation(0, 0);
    }

    function tick() {
      if (targetRotX !== null && targetRotY !== null && !isDragging) {
        const dx = targetRotX - globeGroup.rotation.x;
        const dy = targetRotY - globeGroup.rotation.y;
        if (Math.abs(dx) < 0.002 && Math.abs(dy) < 0.002) {
          globeGroup.rotation.x = targetRotX;
          globeGroup.rotation.y = targetRotY;
          targetRotX = null;
          targetRotY = null;
        } else {
          globeGroup.rotation.x += dx * 0.14;
          globeGroup.rotation.y += dy * 0.14;
        }
      }

      globeGroup.updateMatrixWorld();
      renderer.render(scene, camera);
      if (onFrameUpdate) {
        onFrameUpdate(projectLatLon);
      }
      requestAnimationFrame(tick);
    }

    globeGroup.updateMatrixWorld();
    renderer.render(scene, camera);
    if (onFrameUpdate) {
      onFrameUpdate(projectLatLon);
    }
    requestAnimationFrame(tick);

    return {
      rotateToSite,
      faceEarth,
      projectLatLon,
      resize
    };
  } catch (err) {
    showErrorBanner('3D GLOBE INIT ERROR: ' + (err && err.message ? err.message : String(err)));
    throw err;
  }
}
