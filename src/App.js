import React, { useEffect, useRef, useState, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';

import { Cursor } from './components/ui/Cursor';
import Lenis from 'lenis';
import './App.css';

const About = lazy(() => import('./components/About/About'));
const Experience = lazy(() => import('./components/Experience/Experience'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Research = lazy(() => import('./components/Research/Research'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Awards = lazy(() => import('./components/Awards/Awards'));
const Contact = lazy(() => import('./components/Contact/Contact'));

const SECTIONS = ['about', 'experience', 'projects', 'research', 'skills', 'awards', 'contact'];

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  /* ── Smooth scroll initialization ─────────────────── */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let rafId;
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  /* ── Scroll reveal (once-only) ────────────────────── */
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Active section tracking ──────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const setSectionRef = useCallback((idx) => (el) => {
    sectionRefs.current[idx] = el;
  }, []);

  const scrollToSection = (idx) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Cursor />
      {/* Simple aesthetic background via CSS instead of Three.js */}

      {/* Vertical section rail */}
      <nav className="section-rail" aria-label="Section navigation">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            className={`rail-indicator${activeSection === i ? ' active' : ''}`}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to section ${String(i + 1).padStart(2, '0')}`}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </nav>

      <div className="main-content">
        <Navbar onNavigate={scrollToSection} />
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <div ref={setSectionRef(0)}><About /></div>
          <div ref={setSectionRef(1)}><Experience /></div>
          <div ref={setSectionRef(2)}><Projects /></div>
          <div ref={setSectionRef(3)}><Research /></div>
          <div ref={setSectionRef(4)}><Skills /></div>
          <div ref={setSectionRef(5)}><Awards /></div>
          <div ref={setSectionRef(6)}><Contact /></div>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}

export default App;
