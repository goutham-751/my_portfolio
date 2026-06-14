import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, maskReveal, staggerContainer, EASING } from '../../lib/animations';
import { useMagneticButton } from '../../hooks/useMagneticButton';
import './Hero.css';

function Hero() {
    const { ref: ctaRef, pos, handleMouseMove, handleMouseLeave } = useMagneticButton(0.3);

    return (
        <motion.section 
            className="hero" 
            id="hero"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
        >
            <div className="container">
                <div className="hero__inner">
                    {/* Available for Internships badge */}
                    <motion.div variants={fadeUp} custom={0} className="hero__internship-badge">
                        <span className="hero__internship-pulse" />
                        <span className="hero__internship-text text-mono">
                            Open to Work · 2026
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="hero__headline">
                        <motion.span variants={maskReveal} className="hero__line1 text-display" style={{ display: 'inline-block', overflow: 'hidden' }}>Goutham Kumar</motion.span>
                        
                    </h1>

                    {/* Professional Summary */}
                    <motion.div variants={fadeUp} className="hero__summary" style={{ maxWidth: '650px', marginBottom: '3rem' }}>
                        <p className="text-body" style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                            I'm an AI/ML engineer and full-stack developer currently doing my final year  btech in VIT Chennai. I specialize in building end-to-end intelligent systems — from architecting scalable RAG pipelines and predictive maintenance models to shipping robust, production-ready applications. I am passionate about creating software that bridges complex data with intuitive user experiences.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={fadeUp} className="hero__ctas">
                        <motion.a 
                            href="#work" 
                            className="hero__cta-primary text-mono"
                            ref={ctaRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            animate={{ x: pos.x, y: pos.y }}
                            transition={EASING.spring}
                        >
                            View Projects <span className="hero__arrow">→</span>
                        </motion.a>
                        <a href="/resume.pdf" download="Goutham_Kumar_Resume.pdf" className="hero__cta-secondary text-mono" target="_blank" rel="noopener noreferrer">
                            Download Resume ↓
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Rotating circular text */}
            <div className="hero__orbit" aria-hidden="true">
                <div className="hero__orbit-glow" />
                <svg className="hero__orbit-svg" viewBox="0 0 200 200" width="200" height="200">
                    <defs>
                        <path id="circlePath" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                    </defs>
                    
                </svg>
            </div>
        </motion.section>
    );
}

export default Hero;
