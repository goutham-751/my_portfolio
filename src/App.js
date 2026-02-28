import React, { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Research from './components/Research/Research';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

const SECTIONS = ['hero', 'work', 'research', 'about', 'contact'];

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

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
        <div ref={setSectionRef(0)}><Hero /></div>
        <div ref={setSectionRef(1)}><Projects /></div>
        <div ref={setSectionRef(2)}><Research /></div>
        <div ref={setSectionRef(3)}><About /></div>
        <div ref={setSectionRef(4)}><Contact /></div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
