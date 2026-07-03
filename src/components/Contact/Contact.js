import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="chapter chapter-padding" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-inverse)', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="grid-container">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ gridColumn: '2 / 12', marginBottom: 'var(--space-xl)' }}
        >
          <h2 className="text-mono" style={{ color: 'var(--text-inverse-sec)' }}>05 — Contact</h2>
          <h3 className="text-display text-huge" style={{ marginTop: 'var(--space-sm)' }}>LET'S BUILD.</h3>
        </motion.div>

        {/* Links */}
        <div style={{ gridColumn: '2 / 12', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {[
            { label: 'Email', value: 'kgoutham2k5@gmail.com', href: 'mailto:kgoutham2k5@gmail.com' },
            { label: 'LinkedIn', value: 'linkedin.com/in/goutham-kumar7', href: 'https://linkedin.com/in/goutham-kumar7' },
            { label: 'GitHub', value: 'github.com/goutham-751', href: 'https://github.com/goutham-751' },
          ].map((link, index) => (
            <motion.div 
              key={link.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}
            >
              <div className="text-mono" style={{ color: 'var(--accent-color)' }}>
                {link.label}
              </div>
              <a 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-display text-xl"
                style={{ 
                  color: 'var(--text-inverse)', 
                  textDecoration: 'none',
                  textTransform: 'none',
                  transition: 'opacity 0.2s ease',
                  opacity: 0.8
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                {link.value} ↗
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Contact;