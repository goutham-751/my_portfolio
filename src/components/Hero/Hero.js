import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="container hero__inner hero-stagger">

                {/* Micro label */}
                <p className="hero__label hero-animate text-mono">
                    PROFILE_LOADED · VIT CHENNAI · INDIA · 2025
                </p>

                {/* Headline */}
                <h1 className="hero__headline hero-animate">
                    <span className="hero__line1 text-display">Goutham Kumar</span>
                    <span className="hero__line2 text-display">builds systems</span>
                    <span className="hero__line3 text-display">that think.</span>
                </h1>

                {/* Bio */}
                <p className="hero__bio hero-animate text-body">
                    Full-stack engineer and ML practitioner pursuing B.Tech in Computer
                    Science &amp; Data Science at VIT Chennai (CGPA: 8.83). I build products
                    that use data and AI to solve problems with real stakes — from atomic
                    research labs to hackathon stages.
                </p>

                {/* Tech strip */}
                <div className="hero__strip hero-animate text-mono">
                    {['Python', 'React', 'FastAPI', 'TensorFlow', 'AWS', 'Docker'].map((t, i) => (
                        <React.Fragment key={t}>
                            {i > 0 && <span className="hero__strip-sep" />}
                            <span className="hero__strip-item">{t}</span>
                        </React.Fragment>
                    ))}
                </div>

                {/* CTAs */}
                <div className="hero__ctas hero-animate">
                    <a href="#work" className="hero__cta-primary text-mono">
                        View Work <span className="hero__arrow">→</span>
                    </a>
                    <a href="/resume.pdf" download="Goutham_Kumar_Resume.pdf" className="hero__cta-secondary text-mono" target="_blank" rel="noopener noreferrer">
                        Download Resume ↓
                    </a>
                </div>
            </div>

            {/* Rotating circular text */}
            <div className="hero__orbit" aria-hidden="true">
                <div className="hero__orbit-glow" />
                <svg className="hero__orbit-svg" viewBox="0 0 200 200" width="200" height="200">
                    <defs>
                        <path id="circlePath" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                    </defs>
                    <text className="hero__orbit-text">
                        <textPath href="#circlePath">
                            GOUTHAM · KUMAR · CS · DATA · AI · GOUTHAM · KUMAR · CS · DATA · AI ·&nbsp;
                        </textPath>
                    </text>
                </svg>
            </div>
        </section>
    );
}

export default Hero;
