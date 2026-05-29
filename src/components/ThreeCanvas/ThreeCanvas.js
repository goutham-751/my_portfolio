/**
 * ThreeCanvas.js
 * ─────────────────────────────────────────────────────────
 * React wrapper that:
 *  1. Mounts a fixed <canvas> behind all HTML content
 *  2. Lazy-loads Three.js after first paint (dynamic import)
 *  3. Initialises SceneEngine + all sub-systems
 *  4. Skips Three.js on mobile (< 768px or touch) →
 *     CSS 3D fallbacks take over
 *  5. Cleans up on unmount (disposes GPU resources)
 * ─────────────────────────────────────────────────────────
 */

import React, { useEffect, useRef } from 'react';
import './ThreeCanvas.css';

export default function ThreeCanvas() {
  const canvasRef = useRef(null);
  // Keep engine references so we can dispose on unmount
  const engineRef = useRef(null);
  const systemsRef = useRef([]);

  useEffect(() => {
    // ── Mobile guard ──────────────────────────────────────
    // Skip Three.js entirely on small/touch screens.
    // CSS 3D transforms in the component stylesheets provide the fallback.
    const isMobile =
      window.innerWidth < 768 ||
      navigator.maxTouchPoints > 0;

    if (isMobile) return;

    // ── Lazy-load Three.js after first paint ──────────────
    // requestIdleCallback (or setTimeout fallback) ensures above-fold
    // HTML is painted before we start the heavy WebGL init.
    let disposed = false;

    const initScene = async () => {
      if (disposed) return;

      // Dynamic imports — Three.js only loads when we need it
      const [
        { SceneEngine },
        { ParticleField },
        { HeroMesh },
        { Lighting },
        { GridFloor },
        { ScrollCamera },
      ] = await Promise.all([
        import('../../three/SceneEngine'),
        import('../../three/ParticleField'),
        import('../../three/HeroMesh'),
        import('../../three/Lighting'),
        import('../../three/GridFloor'),
        import('../../three/ScrollCamera'),
      ]);

      if (disposed || !canvasRef.current) return;

      // ── Boot the engine ───────────────────────────────────
      const engine = new SceneEngine(canvasRef.current);
      engineRef.current = engine;

      // ── Lighting (first — other systems may reference it) ─
      const lighting = new Lighting(engine.scene);
      engine.addTick((d, e) => lighting.tick(d, e));
      systemsRef.current.push(lighting);

      // ── Particle field ────────────────────────────────────
      const particles = new ParticleField(engine.scene);
      engine.addTick((d, e) => particles.tick(d, e));
      systemsRef.current.push(particles);

      // ── Grid floor ────────────────────────────────────────
      const grid = new GridFloor(engine.scene);
      engine.addTick((d, e) => grid.tick(d, e));
      systemsRef.current.push(grid);

      // ── Hero mesh (icosahedron) ───────────────────────────
      const heroMesh = new HeroMesh(engine.scene, engine.camera, engine.renderer);
      engine.addTick((d, e) => heroMesh.tick(d, e));
      systemsRef.current.push(heroMesh);

      // ── Scroll-driven camera ──────────────────────────────
      const scrollCam = new ScrollCamera(engine.camera, lighting);
      engine.addTick((d, e) => scrollCam.tick(d, e));
      systemsRef.current.push(scrollCam);

      // ── Start the RAF loop ────────────────────────────────
      engine.start();

      // Trigger initial section lighting (hero)
      lighting.transitionToSection(
        (await import('../../three/ScrollCamera')).SECTION_LIGHT_TARGETS[0]
      );
    };

    // Use requestIdleCallback for post-paint scheduling
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(initScene, { timeout: 2000 });
      return () => {
        disposed = true;
        cancelIdleCallback(id);
        cleanupSystems();
      };
    } else {
      const tid = setTimeout(initScene, 100);
      return () => {
        disposed = true;
        clearTimeout(tid);
        cleanupSystems();
      };
    }
  }, []);

  function cleanupSystems() {
    // Dispose all sub-systems in reverse order
    for (let i = systemsRef.current.length - 1; i >= 0; i--) {
      if (systemsRef.current[i]?.dispose) {
        systemsRef.current[i].dispose();
      }
    }
    systemsRef.current = [];
    if (engineRef.current) {
      engineRef.current.dispose();
      engineRef.current = null;
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className="three-canvas"
      aria-hidden="true"   // hidden from screen readers — purely decorative
    />
  );
}
