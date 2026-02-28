import React from 'react';
import './About.css';

const skills = [
  { domain: 'Languages', stack: 'Python · JavaScript · Java · C/C++ · SQL · R' },
  { domain: 'Frameworks', stack: 'React · Streamlit · FastAPI' },
  { domain: 'Dev Tools', stack: 'AWS · GitHub · Docker · VS Code · PyCharm' },
  { domain: 'Libraries', stack: 'Pandas · NumPy · Matplotlib · Seaborn · Bootstrap · TensorFlow' },
  { domain: 'Security', stack: 'CTF · Community · Fundamentals' },
];

const education = [
  {
    period: '2023 – 2027',
    institution: 'Vellore Institute of Technology, Chennai',
    degree: 'B.Tech Computer Science Engineering (Data Science)',
    score: 'CGPA: 8.83 / 10',
  },
  {
    period: '2022 – 2023',
    institution: 'Adhyapana School, Madurai',
    degree: '12th Class',
    score: 'Percentage: 94.2%',
  },
];

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <p className="section-label reveal">04 ── ABOUT</p>

        <div className="about__split">
          {/* Bio */}
          <div className="about__bio reveal">
            <p className="text-body about__bio-text">
              I'm Goutham — a CS and Data Science student at VIT Chennai,
              building at the edge of systems, ML, and product. I've analysed
              dose data at a nuclear research facility, shipped AI platforms
              people actually use, and won bounties for blockchain systems that
              solve real economic problems for gig workers.
            </p>
            <p className="text-body about__bio-text">
              I care about work that has stakes. Software that runs something
              important. Systems that hold.
            </p>

            {/* Education */}
            <div className="about__education">
              <h3 className="about__edu-title text-mono">EDUCATION</h3>
              {education.map((edu) => (
                <div key={edu.institution} className="about__edu-row">
                  <div className="about__edu-header">
                    <span className="about__edu-degree text-mono">{edu.degree}</span>
                    <span className="about__edu-period text-mono">{edu.period}</span>
                  </div>
                  <span className="about__edu-institution text-mono">{edu.institution}</span>
                  <span className="about__edu-score text-mono">{edu.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills table */}
          <div className="about__skills reveal">
            <table className="skills-table text-mono">
              <thead>
                <tr>
                  <th className="skills-table__header">DOMAIN</th>
                  <th className="skills-table__header">STACK</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((row) => (
                  <tr key={row.domain} className="skills-table__row">
                    <td className="skills-table__domain">{row.domain}</td>
                    <td className="skills-table__stack">{row.stack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;