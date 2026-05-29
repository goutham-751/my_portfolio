/**
 * HeroMesh.js
 * ─────────────────────────────────────────────────────────
 * Floating icosahedron + wireframe overlay for the Hero section.
 *
 * Behaviour:
 *  • Slow autorotation on Y and X axes
 *  • Mouse proximity → mesh repels slightly (raycasting)
 *  • On hover: emissive pulse via GSAP
 *  • Positioned to the right/behind the hero text (world coords)
 *  • Wireframe overlay in teal accent creates a "lab blueprint" feel
 *
 * Decision: IcosahedronGeometry chosen over torus-knot because it
 * reads as "scientific structure" matching the deep-space-research-lab
 * aesthetic — angular, precise, not organic.
 * ─────────────────────────────────────────────────────────
 */

import * as THREE from 'three';
import gsap from 'gsap';

export class HeroMesh {
  constructor(scene, camera, renderer) {
    this.scene    = scene;
    this.camera   = camera;
    this.renderer = renderer;

    // ── Icosahedron solid mesh ──────────────────────────────
    const geo = new THREE.IcosahedronGeometry(1.8, 1); // detail=1 for faceted look

    // MeshStandardMaterial: very dark, near-black with teal emissive glow
    this.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#080810'),
      emissive: new THREE.Color('#4DFFC4'),
      emissiveIntensity: 0.08,
      roughness: 0.4,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });

    this.mesh = new THREE.Mesh(geo, this.material);
    this.mesh.position.set(4.5, 0.5, -2); // right side, slightly back
    scene.add(this.mesh);

    // ── Wireframe overlay ──────────────────────────────────
    // Separate slightly-larger icosahedron rendered as lines.
    // Gives a "blueprint cage" look without clipping artifacts.
    const wireGeo  = new THREE.IcosahedronGeometry(1.95, 1);
    const wireMat  = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#4DFFC4'),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    this.wireMesh = new THREE.Mesh(wireGeo, wireMat);
    this.wireMesh.position.copy(this.mesh.position);
    scene.add(this.wireMesh);

    // ── Inner glow sphere ──────────────────────────────────
    // Tiny glowing core that pulses — adds life
    const glowGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#4DFFC4'),
      transparent: true,
      opacity: 0.6,
    });
    this.glowCore = new THREE.Mesh(glowGeo, glowMat);
    this.glowCore.position.copy(this.mesh.position);
    scene.add(this.glowCore);

    // ── Mouse repel state ──────────────────────────────────
    this._mouse      = new THREE.Vector2();
    this._raycaster  = new THREE.Raycaster();
    this._isHovered  = false;
    this._basePos    = this.mesh.position.clone();
    this._targetPos  = this.mesh.position.clone();

    this._onMouseMove = this._onMouseMove.bind(this);
    window.addEventListener('mousemove', this._onMouseMove, { passive: true });

    // ── Entrance animation ─────────────────────────────────
    // Mesh fades in from scale 0 → 1 on load
    this.mesh.scale.setScalar(0);
    this.wireMesh.scale.setScalar(0);
    this.glowCore.scale.setScalar(0);
    gsap.to([this.mesh.scale, this.wireMesh.scale, this.glowCore.scale], {
      x: 1, y: 1, z: 1,
      duration: 1.6,
      delay: 0.8,
      ease: 'elastic.out(1, 0.6)',
    });
  }

  _onMouseMove(e) {
    // Normalized device coords (-1 to +1)
    this._mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    this._mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  tick(delta, elapsed) {
    // ── Autorotation ───────────────────────────────────────
    this.mesh.rotation.y     += 0.004;
    this.mesh.rotation.x     += 0.002;
    this.wireMesh.rotation.y  = this.mesh.rotation.y;
    this.wireMesh.rotation.x  = this.mesh.rotation.x;

    // ── Floating bob ──────────────────────────────────────
    // Gentle sine wave in Y — feels alive
    const bob = Math.sin(elapsed * 0.6) * 0.12;
    this.mesh.position.y     = this._basePos.y + bob;
    this.wireMesh.position.y = this._basePos.y + bob;
    this.glowCore.position.y = this._basePos.y + bob;

    // ── Mouse proximity repel ──────────────────────────────
    this._raycaster.setFromCamera(this._mouse, this.camera);
    const intersects = this._raycaster.intersectObject(this.mesh);

    if (intersects.length > 0 && !this._isHovered) {
      this._isHovered = true;
      // Pulse emissive intensity up
      gsap.to(this.material, {
        emissiveIntensity: 0.45,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(this.glowCore.material, {
        opacity: 1.0,
        duration: 0.3,
      });
    } else if (intersects.length === 0 && this._isHovered) {
      this._isHovered = false;
      gsap.to(this.material, {
        emissiveIntensity: 0.08,
        duration: 0.6,
        ease: 'power2.in',
      });
      gsap.to(this.glowCore.material, {
        opacity: 0.6,
        duration: 0.5,
      });
    }

    // Repel: nudge mesh away from mouse world direction
    if (this._isHovered) {
      const repelX = this._mouse.x * 0.6;
      this._targetPos.x = this._basePos.x - repelX;
      this._targetPos.z = this._basePos.z - Math.abs(repelX) * 0.5;
    } else {
      this._targetPos.copy(this._basePos);
    }

    // Lerp position smoothly
    this.mesh.position.x     += (this._targetPos.x - this.mesh.position.x) * 0.06;
    this.mesh.position.z     += (this._targetPos.z - this.mesh.position.z) * 0.06;
    this.wireMesh.position.x  = this.mesh.position.x;
    this.wireMesh.position.z  = this.mesh.position.z;
    this.glowCore.position.x  = this.mesh.position.x;
    this.glowCore.position.z  = this.mesh.position.z;

    // ── Core pulse ────────────────────────────────────────
    const pulse = (Math.sin(elapsed * 2.2) * 0.5 + 0.5) * 0.4 + 0.6;
    this.glowCore.scale.setScalar(pulse);
  }

  dispose() {
    window.removeEventListener('mousemove', this._onMouseMove);
    this.mesh.geometry.dispose();
    this.material.dispose();
    this.wireMesh.geometry.dispose();
    this.wireMesh.material.dispose();
    this.glowCore.geometry.dispose();
    this.glowCore.material.dispose();
    this.scene.remove(this.mesh, this.wireMesh, this.glowCore);
  }
}
