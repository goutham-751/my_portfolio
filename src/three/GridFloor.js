/**
 * GridFloor.js
 * ─────────────────────────────────────────────────────────
 * Wireframe receding grid floor — "deep space research lab" floor plane.
 *
 * Rendered as a transparent grid that fades into the distance via
 * scene fog. Tilted slightly to sit below the content area.
 * Slow drift animation gives it a sense of infinite motion.
 * ─────────────────────────────────────────────────────────
 */

import * as THREE from 'three';

export class GridFloor {
  constructor(scene) {
    this.scene = scene;

    // GridHelper: 80 world units wide, 40 divisions, teal color
    // Colors: [center line color, grid line color]
    this.grid = new THREE.GridHelper(
      80,    // size
      40,    // divisions
      new THREE.Color('#4DFFC4'), // center lines — accent teal
      new THREE.Color('#1A1A28')  // grid lines — border-subtle
    );

    // Push the grid below the camera's view line
    this.grid.position.set(0, -6, -5);

    // Make it partially transparent to stay subtle
    this.grid.material.transparent = true;
    this.grid.material.opacity = 0.22;
    this.grid.material.depthWrite = false;

    scene.add(this.grid);
  }

  tick(delta, elapsed) {
    // Very slow Z drift — creates sense of forward motion through space
    this.grid.position.z = -5 + ((elapsed * 0.4) % 2.0);
    // Subtle Y oscillation
    this.grid.position.y = -6 + Math.sin(elapsed * 0.15) * 0.3;
  }

  dispose() {
    this.grid.material.dispose();
    this.grid.geometry.dispose();
    this.scene.remove(this.grid);
  }
}
