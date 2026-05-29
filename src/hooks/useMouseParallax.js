/**
 * useMouseParallax.js
 * ─────────────────────────────────────────────────────────
 * Returns normalized mouse position (-1 to +1 in both axes)
 * updated via a passive mousemove listener.
 *
 * Used by React components for CSS 3D tilt effects.
 * Three.js sub-systems listen to mousemove directly (no React overhead).
 * ─────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';

export function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return mouse;
}
