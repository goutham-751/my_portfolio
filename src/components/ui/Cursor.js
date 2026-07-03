import React, { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const dot = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only on pointer-fine (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.style.cursor = 'none';

    let mouseX = 0, mouseY = 0;
    
    // Smooth trailing interpolation
    let dotX = 0, dotY = 0;

    const move = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', move);

    const lerp = (a, b, n) => a + (b - a) * n;
    let raf;
    const tick = () => {
      // Extremely tight lerp for a precise, fast feel
      dotX = lerp(dotX, mouseX, 0.4);
      dotY = lerp(dotY, mouseY, 0.4);
      
      if (dot.current) { 
        dot.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`; 
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Hover state detection for a, button, or elements with data-cursor
    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('[data-cursor]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <div ref={dot} className={`cursor-dot ${isHovering ? 'crosshair' : ''}`} aria-hidden="true" />
  );
}
