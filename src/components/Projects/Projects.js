import React from 'react';
import './Projects.css';

const FEATURED = {
  category: 'AI · FULL-STACK',
  title: 'CampusHire.AI',
  desc: 'AI-powered resume parsing and voice interview platform. Built on Grok AI + spaCy NLP.',
  stack: ['React', 'FastAPI', 'NLP', 'Speech Recognition'],
  link: 'https://github.com/goutham-751/CAMPUSHIRE.AI1',
  code: `# Resume parsing endpoint
@app.post("/api/parse-resume")
async def parse_resume(file: UploadFile):
    text = extract_text(file)
    entities = nlp_pipeline(text)
    score = ats_scorer.evaluate(
        entities, job_description
    )
    return {"entities": entities,
            "ats_score": score}`,
};

const GRID = [
  {
    category: 'DATA · PRODUCT',
    title: 'PricePilot AI',
    desc: 'Competitor pricing intelligence with demand forecasting and revenue optimization.',
    stack: ['React', 'FastAPI', 'Supabase', 'Forecasting'],
    link: 'https://github.com/goutham-751/PricePilot-AI',
  },
  {
    category: 'ML · SYSTEMS',
    title: 'Predictive Maintenance',
    desc: 'End-to-end ML system predicting industrial machine failure from real sensor data. RUL estimation with FastAPI deploy.',
    stack: ['Python', 'Streamlit', 'FastAPI', 'Scikit-learn'],
    link: 'https://github.com/goutham-751/Predictive-Maintenance-of-Industrial-Machines-Using-Sensor-Based-Failure-Prediction',
  },
];

function Projects() {
  return (
    <section className="projects" id="work">
      <div className="container">
        <p className="section-label reveal">02 ── SELECTED WORK</p>

        {/* Featured card */}
        <div className="project-featured reveal">
          <div className="project-featured__content">
            <span className="project-pill text-mono">{FEATURED.category}</span>
            <h2 className="project-featured__title text-display">{FEATURED.title}</h2>
            <p className="project-featured__desc text-body">{FEATURED.desc}</p>
            <div className="project-stack text-mono">
              {FEATURED.stack.map((t) => (
                <span key={t} className="project-stack__item">{t}</span>
              ))}
            </div>
            <a href={FEATURED.link} className="project-link text-mono" target="_blank" rel="noopener noreferrer">
              View Project <span>→</span>
            </a>
          </div>
          <div className="project-featured__code">
            <div className="project-code-header text-mono">
              <span className="project-code-dot" />
              <span className="project-code-dot" />
              <span className="project-code-dot" />
              <span className="project-code-filename">api/routes.py</span>
            </div>
            <pre className="project-code-block text-mono"><code>{FEATURED.code}</code></pre>
          </div>
        </div>

        {/* Grid */}
        <div className="project-grid reveal-stagger">
          {GRID.map((project) => (
            <a
              key={project.title}
              href={project.link}
              className="project-card reveal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="project-pill text-mono">{project.category}</span>
              <h3 className="project-card__title text-display">{project.title}</h3>
              <p className="project-card__desc text-body">{project.desc}</p>
              <div className="project-stack text-mono">
                {project.stack.map((t) => (
                  <span key={t} className="project-stack__item">{t}</span>
                ))}
              </div>
              <span className="project-link text-mono">
                View Project <span>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;