/**
 * SceneEngine.js
 * ─────────────────────────────────────────────────────────
 * Core Three.js orchestrator:
 *  • Creates WebGLRenderer, Scene, PerspectiveCamera
 *  • Manages the single requestAnimationFrame loop
 *  • Handles window resize and pixel ratio
 *  • Exposes an addTick() registry so sub-systems (particles,
 *    lights, mesh) can register their own per-frame callbacks
 *    without knowing about each other.
 * ─────────────────────────────────────────────────────────
 */

import * as THREE from 'three';

export class SceneEngine {
  constructor(canvas) {
    // ── Renderer ───────────────────────────────────────────
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,          // transparent background — dark bg comes from CSS/body
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2× for perf
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);  // fully transparent clear
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    // ── Scene ──────────────────────────────────────────────
    this.scene = new THREE.Scene();
    // Slight depth fog that matches the dark theme (#05050A)
    this.scene.fog = new THREE.FogExp2(0x05050A, 0.018);

    // ── Camera ─────────────────────────────────────────────
    // PerspectiveCamera: 65° FOV, typical for cinematic feel
    this.camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.camera.position.set(0, 0, 8); // start pulled back from origin

    // ── Tick registry ──────────────────────────────────────
    // Each subsystem registers a callback: engine.addTick(fn)
    // fn receives (deltaTime, elapsedTime) each frame
    this._ticks = [];
    this._clock = new THREE.Clock();
    this._rafId = null;
    this._running = false;

    // ── Resize handler ─────────────────────────────────────
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize, { passive: true });
  }

  /** Register a per-frame callback. Returns an unsubscribe fn. */
  addTick(fn) {
    this._ticks.push(fn);
    return () => {
      this._ticks = this._ticks.filter(t => t !== fn);
    };
  }

  /** Start the animation loop. */
  start() {
    if (this._running) return;
    this._running = true;
    const loop = () => {
      this._rafId = requestAnimationFrame(loop);
      const delta = this._clock.getDelta();
      const elapsed = this._clock.getElapsedTime();
      // Fire all registered subsystem ticks
      for (let i = 0; i < this._ticks.length; i++) {
        this._ticks[i](delta, elapsed);
      }
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  /** Stop the loop and clean up GPU resources. */
  dispose() {
    this._running = false;
    if (this._rafId) cancelAnimationFrame(this._rafId);
    window.removeEventListener('resize', this._onResize);
    this.renderer.dispose();
  }

  _onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
