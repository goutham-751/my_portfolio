import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, EASING } from '../../lib/animations';
import { useMagneticButton } from '../../hooks/useMagneticButton';
import './Contact.css';

function Contact() {
  const { ref: btnRef, pos, handleMouseMove, handleMouseLeave } = useMagneticButton(0.1);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kgoutham2k5@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section 
      className="contact" 
      id="contact"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="container contact__inner">
        <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>07 — CONTACT</span>

        <div className="contact__content">
          <motion.div variants={fadeUp} className="contact__info">
            <div className="contact__signal text-mono">
              <span className="contact__pulse" />
              OPEN TO OPPORTUNITIES
            </div>

            <div className="contact__email-wrapper">
              <a href="mailto:kgoutham2k5@gmail.com" className="contact__email text-display">
                kgoutham2k5@gmail.com
              </a>
              <button 
                onClick={handleCopyEmail} 
                className="contact__copy-btn text-mono"
                aria-label="Copy email address"
              >
                {copied ? 'Copied!' : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy Email
                  </>
                )}
              </button>
            </div>

            <div className="contact__links text-mono">
              <a href="https://github.com/goutham-751" className="contact__social" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span className="contact__sep">·</span>
              <a href="https://linkedin.com/in/goutham-kumar7" className="contact__social" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span className="contact__sep">·</span>
              <a href="/resume.pdf" className="contact__social" target="_blank" rel="noopener noreferrer">Resume PDF</a>
            </div>
          </motion.div>

          <motion.form variants={fadeUp} className="contact__form">
            <div className="form-group">
              <label htmlFor="name" className="text-mono">Name</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-mono">Email</label>
              <input type="email" id="email" name="email" required placeholder="john@example.com" />
            </div>
            <div className="form-group form-group--full">
              <label htmlFor="message" className="text-mono">Message</label>
              <textarea id="message" name="message" rows="4" required placeholder="What's on your mind?"></textarea>
            </div>
            
            <div className="form-submit">
              <motion.button 
                type="submit" 
                className="contact__submit text-mono"
                ref={btnRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: pos.x, y: pos.y }}
                transition={EASING.spring}
              >
                Send Message
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;