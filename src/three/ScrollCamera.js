/**
 * ScrollCamera.js
 * ─────────────────────────────────────────────────────────
 * Drives the Three.js camera based on:
 *  1. Scroll position → moves camera along a CatmullRomCurve3 path
 *  2. Mouse movement → adds a subtle ±5° tilt offset (lerped)
 *
 * The camera spline has one waypoint per section.
 * As the user scrolls, the camera glides through the path —
 * giving the "section as a station" experience without hijacking
 * native scroll (HTML content scrolls normally above the canvas).
 *
 * Decision: native scroll (not Locomotive) keeps React routing,
 * Navbar, and mobile scrolling fully functional.
 * ─────────────────────────────────────────────────────────
 */

import * as THREE from 'three';

// Waypoints for the camera spline: one per section
// [x, y, z] world positions — camera looks at +Z direction from these
const WAYPOINTS = [
  [0,  0.5, 8],    // Hero: eye-level, pulled back
  [-2, 0,   6],    // Projects: slight left lean, closer
  [2,  1,   7],    // Research: slight right, slightly elevated
  [-1, 0.5, 6.5],  // About: left lean
  [0,  0,   5.5],  // Contact: close and centered
];

// SpotLight section anchors (world positions for Lighting.transitionToSection)
export const SECTION_LIGHT_TARGETS = [
  new THREE.Vector3(4.5, 0.5, -2),  // Hero → icosahedron
  new THREE.Vector3(-3, 0, 0),       // Projects
  new THREE.Vector3(3, 1, 0),        // Research
  new THREE.Vector3(-2, 0, 0),       // About
  new THREE.Vector3(0, 0, 0),        // Contact
];

export class ScrollCamera {
  constructor(camera, lightingRef) {
    this.camera     = camera;
    this.lighting   = lightingRef; // Lighting instance for section transitions

    // Build the CatmullRomCurve3 from waypoints
    this._curve = new THREE.CatmullRomCurve3(
      WAYPOINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      false,        // not closed
      'catmullrom',
      0.5           // tension
    );

    // Scroll state
    this._scrollT      = 0;  // 0..1 normalized scroll progress
    this._targetT      = 0;
    this._currentSect  = -1;

    // Mouse tilt state
    this._mouseX     = 0; // normalized -1..1
    this._mouseY     = 0;
    this._tiltX      = 0; // current lerped tilt (radians)
    this._tiltY      = 0;
    const MAX_TILT   = (5 * Math.PI) / 180; // ±5 degrees in radians
    this._maxTilt    = MAX_TILT;

    // Camera base look-at (always looking toward -Z / the scene)
    this._lookAt = new THREE.Vector3(0, 0, 0);

    this._onScroll    = this._onScroll.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    window.addEventListener('scroll',    this._onScroll,    { passive: true });
    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
  }

  _onScroll() {
    const scrollTop  = window.scrollY;
    const maxScroll  = Math.max(1, document.body.scrollHeight - window.innerHeight);
    this._targetT    = Math.min(1, scrollTop / maxScroll);

    // Detect section change
    const sections = 5;
    const newSect  = Math.min(sections - 1, Math.floor(this._targetT * sections));
    if (newSect !== this._currentSect) {
      this._currentSect = newSect;
      // Tell lighting to transition to this section's anchor
      if (this.lighting) {
        this.lighting.transitionToSection(SECTION_LIGHT_TARGETS[newSect]);
      }
    }
  }

  _onMouseMove(e) {
    this._mouseX =  (e.clientX / window.innerWidth)  * 2 - 1;
    this._mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  tick(delta, elapsed) {
    // ── Scroll lerp — smooth camera glide ─────────────────
    // 0.055 lerp factor = smooth, not instant
    this._scrollT += (this._targetT - this._scrollT) * 0.055;

    // Sample curve position
    const curvePos = this._curve.getPoint(this._scrollT);
    this.camera.position.lerpVectors(this.camera.position, curvePos, 0.08);

    // ── Mouse tilt (add to camera rotation, not position) ──
    const targetTiltY = this._mouseX * this._maxTilt;
    const targetTiltX = this._mouseY * this._maxTilt;
    this._tiltY += (targetTiltY - this._tiltY) * 0.06;
    this._tiltX += (targetTiltX - this._tiltX) * 0.06;

    // Build a look-at target offset by tilt
    const lookTarget = new THREE.Vector3(
      this._tiltY * 4,           // horizontal pan
      this._tiltX * 2,           // vertical tilt
      0
    );
    this.camera.lookAt(lookTarget);

    // Apply tilt rotation on top of lookAt (Euler offset)
    this.camera.rotation.z = this._tiltY * 0.08; // subtle roll
  }

  dispose() {
    window.removeEventListener('scroll',    this._onScroll);
    window.removeEventListener('mousemove', this._onMouseMove);
  }
}
