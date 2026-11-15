// js/globe.js: Three.js 0.187.0 3D Moon and Mars globe with NASA textures, drag/target rotation, and room scale awareness
// SI-assisted code (Claude, Antigravity), reviewed by La Shara Cordero. See AI_DISCLOSURE.md.

import { latLonToXYZ, getTargetRotationForSite, worldToViewportPx } from './projection.js';
import { showErrorBanner } from './data.js';

const THREE_CDN = 'https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.min.js';
const TEXTURE_URLS = {
  moon: 'assets/nasa/lroc_color_2k.jpg',
  mars: 'assets/nasa/mars_2k.jpg'
};

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

    const loader = new THREE.TextureLoader();
    const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
    const textures = {};

    function loadWorldTexture(worldKey) {
      if (textures[worldKey]) {
        return Promise.resolve(textures[worldKey]);
      }
      const url = TEXTURE_URLS[worldKey] || TEXTURE_URLS.moon;
      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (tex) => {
            tex.colorSpace = THREE.NoColorSpace;
            tex.anisotropy = maxAniso;
            textures[worldKey] = tex;
            resolve(tex);
          },
          undefined,
          () => reject(new Error('Failed to load globe texture ' + url))
        );
      });
    }

    let currentWorld = options.initialWorld === 'mars' ? 'mars' : 'moon';
    const initialTexture = await loadWorldTexture(currentWorld);
    // Preload the other world texture in background
    loadWorldTexture(currentWorld === 'mars' ? 'moon' : 'mars').catch(() => {});

    // Shader replicates tools/render_moon.py view-space upper-left lighting, with warm Mars lighting tint when uIsMars > 0.5
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: initialTexture },
        uIsMars: { value: currentWorld === 'mars' ? 1.0 : 0.0 }
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
        uniform float uIsMars;
        varying vec2 vUv;
        varying vec3 vViewNormal;
        void main() {
          vec4 tex = texture2D(uMap, vUv);
          vec3 L = normalize(vec3(-0.45, 0.35, 0.82));
          float d = clamp(dot(normalize(vViewNormal), L), 0.0, 1.0);
          float shade = 0.18 + 0.92 * pow(d, 0.8);
          vec3 tint = mix(vec3(1.0, 1.0, 1.0), vec3(1.12, 0.93, 0.82), uIsMars);
          vec3 rgb = clamp(tex.rgb * tint * shade * 1.05, 0.0, 1.0);
          gl_FragColor = vec4(rgb, 1.0);
        }
      `
    });

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const sphere = new THREE.Mesh(geometry, material);
    // Align u = 0.5 (0 deg lon in NASA LRO & Viking maps) toward +Z camera
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

    function getDefaultRotation(worldKey) {
      if (worldKey === 'mars') {
        // Mars start/reset view centers on 0° N, 30° W (lat: 0, lon: -30)
        return getTargetRotationForSite(0, -30);
      }
      return { rotX: 0, rotY: 0 };
    }

    const initRot = getDefaultRotation(currentWorld);
    globeGroup.rotation.x = initRot.rotX;
    globeGroup.rotation.y = initRot.rotY;
    containerEl.classList.toggle('moon-canvas-wrap--mars', currentWorld === 'mars');

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

    function setTargetRotation(rotX, rotY, immediate = false) {
      if (immediate || prefersReducedMotion()) {
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

    function rotateToSite(latDeg, lonDeg, immediate = false) {
      const { rotX, rotY } = getTargetRotationForSite(latDeg, lonDeg);
      setTargetRotation(rotX, rotY, immediate);
    }

    function faceEarth(immediate = false) {
      const def = getDefaultRotation(currentWorld);
      setTargetRotation(def.rotX, def.rotY, immediate);
    }

    function getRotation() {
      return {
        rotX: targetRotX !== null ? targetRotX : globeGroup.rotation.x,
        rotY: targetRotY !== null ? targetRotY : globeGroup.rotation.y
      };
    }

    async function setWorld(worldKey, savedRotation = null) {
      currentWorld = worldKey === 'mars' ? 'mars' : 'moon';
      containerEl.classList.toggle('moon-canvas-wrap--mars', currentWorld === 'mars');
      material.uniforms.uIsMars.value = currentWorld === 'mars' ? 1.0 : 0.0;
      const tex = await loadWorldTexture(currentWorld);
      material.uniforms.uMap.value = tex;
      material.needsUpdate = true;

      if (savedRotation && typeof savedRotation.rotX === 'number' && typeof savedRotation.rotY === 'number') {
        setTargetRotation(savedRotation.rotX, savedRotation.rotY, true);
      } else {
        faceEarth(true);
      }
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
      resize,
      setWorld,
      getRotation
    };
  } catch (err) {
    showErrorBanner('3D GLOBE INIT ERROR: ' + (err && err.message ? err.message : String(err)));
    throw err;
  }
}
