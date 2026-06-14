import React, { useEffect, useRef } from 'react';

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    // Only on pointer-fine (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.style.cursor = 'none';

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const move = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', move);

    const lerp = (a, b, n) => a + (b - a) * n;
    let raf;
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (dot.current)  { dot.current.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`; }
      if (ring.current) { ring.current.style.transform = `translate(${ringX}px,  ${ringY}px)  translate(-50%, -50%)`; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
