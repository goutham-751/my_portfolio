/**
 * Lighting.js
 * ─────────────────────────────────────────────────────────
 * Scene lighting that creates the deep-space-research-lab mood:
 *
 *  • AmbientLight (0.25) — dim fill, preserves dark theme
 *  • 3 PointLights in accent palette (teal, purple, cyan)
 *    that drift slowly in orbits
 *  • SpotLight aimed at origin — transitions intensity per section
 *
 * Decision: Low AmbientLight forces accent lights to carry the mood.
 * Additive color mixing from the three points creates interesting
 * color blending on the icosahedron and particle field.
 * ─────────────────────────────────────────────────────────
 */

import * as THREE from 'three';
import gsap from 'gsap';

const LIGHT_CONFIGS = [
  // [color hex,  intensity, orbit radius, orbit speed, height]
  ['#4DFFC4',  2.5,  8,  0.25,  3.0],   // Teal  — accent-signal
  ['#7c3aed',  2.0,  10, 0.17, -2.0],   // Purple
  ['#06b6d4',  1.8,  7,  0.33,  0.5],   // Cyan
];

export class Lighting {
  constructor(scene) {
    this.scene = scene;

    // ── Ambient (base fill) ────────────────────────────────
    // Very low — keeps the scene dark; accent lights do the work
    this.ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(this.ambient);

    // ── Accent PointLights ────────────────────────────────
    this._pointLights = LIGHT_CONFIGS.map(([color, intensity, radius, speed, h]) => {
      const light = new THREE.PointLight(new THREE.Color(color), intensity, 35, 2);
      light.position.set(radius, h, 0);
      scene.add(light);
      return { light, radius, speed, h, phase: Math.random() * Math.PI * 2 };
    });

    // ── SpotLight — aimed at scene origin ─────────────────
    // Transitions to active section by GSAP tweening its target position
    this.spot = new THREE.SpotLight(new THREE.Color('#4DFFC4'), 1.0, 40, Math.PI / 6, 0.4, 1.5);
    this.spot.position.set(0, 12, 6);
    this.spot.target.position.set(0, 0, 0);
    scene.add(this.spot);
    scene.add(this.spot.target);
  }

  /**
   * Smoothly transition the spotlight to illuminate a section's world position.
   * Called by ScrollCamera when active section changes.
   * @param {THREE.Vector3} targetPos  world position of the active section anchor
   */
  transitionToSection(targetPos) {
    gsap.to(this.spot.target.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.2,
      ease: 'power2.inOut',
    });
    gsap.to(this.spot, {
      intensity: 1.4,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });
  }

  tick(delta, elapsed) {
    // ── Drift PointLights in lazy orbits ──────────────────
    for (const { light, radius, speed, h, phase } of this._pointLights) {
      const t = elapsed * speed + phase;
      light.position.x = Math.cos(t) * radius;
      light.position.z = Math.sin(t) * radius * 0.6; // elliptical orbit (shallower Z)
      light.position.y = h + Math.sin(elapsed * 0.3 + phase) * 1.5;
    }

    // SpotLight target auto-update is handled by three.js when target is in scene
    this.spot.target.updateMatrixWorld();
  }

  dispose() {
    this.scene.remove(this.ambient);
    this.scene.remove(this.spot);
    this.scene.remove(this.spot.target);
    this._pointLights.forEach(({ light }) => this.scene.remove(light));
  }
}
