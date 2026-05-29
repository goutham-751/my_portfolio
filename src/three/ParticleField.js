/**
 * ParticleField.js
 * ─────────────────────────────────────────────────────────
 * Creates a field of ~3000 drifting points (deep-space feel).
 *
 * Behaviour:
 *  • Particles drift slowly in all axes at idle
 *  • On fast scroll → scatter outward (velocity burst)
 *  • On slow/idle   → drift back toward their origin positions
 *  • Color: teal accent (#4DFFC4) at low opacity for depth
 *
 * Uses THREE.Points (NOT InstancedMesh) because each particle
 * needs independent position tracking in the Float32Array.
 * Geometry is BufferGeometry for max GPU performance.
 * ─────────────────────────────────────────────────────────
 */

import * as THREE from 'three';

const PARTICLE_COUNT = 3000;
const SPREAD = 60;           // world-unit spread of the field
const BASE_DRIFT_SPEED = 0.006;
const SCATTER_STRENGTH = 0.15;
const RETURN_LERP = 0.03;   // how fast particles drift back

export class ParticleField {
  constructor(scene) {
    this.scene = scene;

    // Store original (home) positions for return-drift
    this._origins = new Float32Array(PARTICLE_COUNT * 3);
    this._velocities = new Float32Array(PARTICLE_COUNT * 3);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes     = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD;
      const y = (Math.random() - 0.5) * SPREAD;
      const z = (Math.random() - 0.5) * SPREAD * 0.4; // shallower Z for flat feel

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      this._origins[i * 3]     = x;
      this._origins[i * 3 + 1] = y;
      this._origins[i * 3 + 2] = z;

      // Random tiny drift velocity per particle
      this._velocities[i * 3]     = (Math.random() - 0.5) * BASE_DRIFT_SPEED;
      this._velocities[i * 3 + 1] = (Math.random() - 0.5) * BASE_DRIFT_SPEED;
      this._velocities[i * 3 + 2] = (Math.random() - 0.5) * BASE_DRIFT_SPEED * 0.3;

      // Varied sizes: mix of tiny dots and slightly larger glints
      sizes[i] = Math.random() < 0.05 ? 2.5 : Math.random() * 1.2 + 0.3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // PointsMaterial: teal glow color at very low opacity
    const material = new THREE.PointsMaterial({
      color: new THREE.Color('#4DFFC4'),
      size: 0.08,
      sizeAttenuation: true,  // far = smaller
      transparent: true,
      opacity: 0.55,
      depthWrite: false,       // don't occlude HTML behind canvas
      blending: THREE.AdditiveBlending, // glow accumulates nicely on dark bg
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);

    // Scroll velocity tracking
    this._scrollVel = 0;
    this._lastScrollY = window.scrollY;

    this._onScroll = this._onScroll.bind(this);
    window.addEventListener('scroll', this._onScroll, { passive: true });
  }

  _onScroll() {
    const dy = window.scrollY - this._lastScrollY;
    // Burst magnitude capped — prevents extreme explosion on fast scroll
    this._scrollVel = Math.max(-3, Math.min(3, dy * 0.08));
    this._lastScrollY = window.scrollY;
  }

  /** Called each frame by SceneEngine tick */
  tick(delta, elapsed) {
    const pos = this.points.geometry.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2;

      // Apply idle drift velocity
      pos[ix] += this._velocities[ix];
      pos[iy] += this._velocities[iy];
      pos[iz] += this._velocities[iz];

      // Scatter on scroll: push particles in random directions
      if (Math.abs(this._scrollVel) > 0.05) {
        pos[ix] += (Math.random() - 0.5) * SCATTER_STRENGTH * Math.abs(this._scrollVel);
        pos[iy] += this._scrollVel * (Math.random() * 0.3 + 0.05);
        pos[iz] += (Math.random() - 0.5) * SCATTER_STRENGTH * 0.5;
      }

      // Return drift: gently lerp back toward origin
      pos[ix] += (this._origins[ix] - pos[ix]) * RETURN_LERP * delta * 60;
      pos[iy] += (this._origins[iy] - pos[iy]) * RETURN_LERP * delta * 60;
      pos[iz] += (this._origins[iz] - pos[iz]) * RETURN_LERP * delta * 60;
    }

    this.points.geometry.attributes.position.needsUpdate = true;

    // Decay scroll velocity quickly (it's a one-frame burst)
    this._scrollVel *= 0.85;

    // Slow global rotation for extra depth
    this.points.rotation.y = elapsed * 0.012;
    this.points.rotation.x = elapsed * 0.005;
  }

  dispose() {
    window.removeEventListener('scroll', this._onScroll);
    this.points.geometry.dispose();
    this.points.material.dispose();
    this.scene.remove(this.points);
  }
}
