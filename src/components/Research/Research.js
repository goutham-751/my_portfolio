import React from 'react';
import './Research.css';

const entries = [
    {
        year: 'JUN – JUL 2025',
        title: 'Research Intern — Indira Gandhi Centre for Atomic Research',
        location: 'Kalpakkam, Chennai',
        subtitle: 'Completed internship in the Health & Industrial Safety Division, Dept. of Atomic Energy. Performed dose mapping and radiological safety assessment through data collection, preprocessing, and spatial dose analysis. Applied descriptive statistics for trend and variability analysis in radiological monitoring data.',
        badge: { label: 'DEPT. OF ATOMIC ENERGY', type: 'warm' },
    },
    {
        year: 'JUN 2025 – PRESENT',
        title: 'Treasurer — CyberSecurity Student Community, VITC',
        location: 'Chennai',
        subtitle: 'Handle event expenses and oversee financial budgeting for a 200+ member community. Run hands-on workshops and CTFs; oversee educational content. Coordinate events and mentor junior contributors in cybersecurity fundamentals.',
        badge: { label: 'LEADERSHIP', type: 'signal' },
    },
    {
        year: '13 JAN 2026',
        title: '₹50,000 Bounty Winner — DEFY 26 University Hackathon',
        location: 'ThinkRoot Ventures & Shardeum',
        subtitle: 'Won bounty for ParaCipher — a decentralized blockchain application automating insurance payments for gig workers through smart contracts.',
        badge: { label: 'WINNER', type: 'signal' },
    },
];

function Research() {
    return (
        <section className="research" id="research">
            <div className="container">
                <p className="section-label reveal">03 ── EXPERIENCE & RECOGNITION</p>

                <div className="research__table reveal-stagger">
                    {entries.map((entry) => (
                        <div key={entry.title} className="research__row reveal">
                            <div className="research__year-col">
                                <span className="research__year text-mono">{entry.year}</span>
                                {entry.location && (
                                    <span className="research__location text-mono">{entry.location}</span>
                                )}
                            </div>
                            <div className="research__info">
                                <h3 className="research__title text-display">{entry.title}</h3>
                                <p className="research__subtitle text-body">{entry.subtitle}</p>
                            </div>
                            <div className="research__badge-wrapper">
                                <span className={`research__badge research__badge--${entry.badge.type} text-mono`}>
                                    {entry.badge.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Research;
