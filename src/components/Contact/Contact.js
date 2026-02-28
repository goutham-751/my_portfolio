import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <p className="section-label reveal">05 ── LET'S TALK</p>

        <div className="contact__content reveal">
          {/* Availability signal */}
          <div className="contact__signal text-mono">
            <span className="contact__pulse" />
            OPEN TO OPPORTUNITIES
          </div>

          {/* Email */}
          <a href="mailto:kgoutham2k5@gmail.com" className="contact__email text-display">
            kgoutham2k5@gmail.com
          </a>



          {/* Social links */}
          <div className="contact__links text-mono">
            <a href="https://github.com/goutham-751" className="contact__social" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="contact__sep">·</span>
            <a href="https://linkedin.com/in/goutham-kumar7" className="contact__social" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="contact__sep">·</span>
            <a href="/resume.pdf" className="contact__social" target="_blank" rel="noopener noreferrer">Resume PDF</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;