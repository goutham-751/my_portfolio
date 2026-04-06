import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Work', idx: 1 },
    { label: 'Research', idx: 2 },
    { label: 'About', idx: 3 },
    { label: 'Contact', idx: 4 },
  ];

  const handleNav = (idx) => {
    onNavigate(idx);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <button className="navbar__monogram" onClick={() => onNavigate(0)} aria-label="Go to top">
            GK
          </button>
          <nav className="navbar__links" aria-label="Main navigation">
            {links.map((link, i) => (
              <React.Fragment key={link.label}>
                {i > 0 && <span className="navbar__sep">·</span>}
                <button className="navbar__link" onClick={() => handleNav(link.idx)}>
                  {link.label}
                </button>
              </React.Fragment>
            ))}
            <span className="navbar__sep">·</span>
            <a href="/resume.pdf" download="Goutham_Kumar_Resume.pdf" className="navbar__link" style={{ textDecoration: 'none', color: 'var(--accent-warm)' }}>
              Resume ↓
            </a>
          </nav>
          <button
            className="navbar__menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`navbar__overlay${menuOpen ? ' open' : ''}`}>
        <button
          className="navbar__overlay-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          Close
        </button>
        <nav className="navbar__overlay-links">
          {links.map((link) => (
            <button
              key={link.label}
              className="navbar__overlay-link"
              onClick={() => handleNav(link.idx)}
            >
              {link.label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            download="Goutham_Kumar_Resume.pdf"
            className="navbar__overlay-link"
            style={{ textDecoration: 'none', color: 'var(--accent-warm)' }}
            onClick={() => setMenuOpen(false)}
          >
            Resume ↓
          </a>
        </nav>
      </div>
    </>
  );
}

export default Navbar;