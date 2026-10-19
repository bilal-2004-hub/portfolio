import React, { useEffect, useRef } from 'react';

const EXPERIENCES = [
  {
    role: 'Full Stack Intern',
    company: 'Devarion',
    duration: '2023 — Present',
    type: 'Remote / Full-time',
    responsibilities: [
      'Developed responsive, accessible, and high-performance single-page web interfaces using React.js and modern CSS.',
      'Collaborated with designers and product managers to translate Figma prototypes into modular, reusable UI components.',
      'Integrated Firebase services including Authentication, Cloud Firestore, and Cloud Storage for real-time data handling.',
      'Audited web accessibility (WCAG) and optimized Core Web Vitals to achieve 90+ Lighthouse performance scores.',
    ],
    technologies: ['React.js', 'JavaScript (ES6+)', 'Firebase', 'Tailwind CSS', 'Git & GitHub', 'REST APIs'],
  },
  {
    role: 'Junior Web Developer & Freelancer',
    company: 'Self-Employed / Client Projects',
    duration: '2022 — 2023',
    type: 'Freelance & Contract',
    responsibilities: [
      'Delivered custom web applications and landing pages for diverse clients, maintaining clean code and strict deadlines.',
      'Implemented robust client-side validation, interactive UI widgets, and secure asynchronous API communications.',
      'Ensured full responsive design across desktop, tablet, and mobile devices with seamless cross-browser support.',
    ],
    technologies: ['HTML5', 'CSS3 / SASS', 'JavaScript', 'Node.js', 'Express.js', 'Responsive Design'],
  },
];

export default function Experience() {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = timelineRef.current.querySelectorAll('.timeline-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="experience section section-alt" aria-labelledby="experience-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">My journey</span>
          <h2 id="experience-heading" className="section-title">
            Experience
          </h2>
          <div className="section-divider" aria-hidden="true"></div>
        </div>
        <div className="timeline" id="timeline" ref={timelineRef}>
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.role} className={`timeline-item reveal reveal-delay-${index + 1}`}>
              <div className="timeline-dot" aria-hidden="true"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">{exp.role}</h3>
                    <span className="timeline-company">{exp.company}</span>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-duration">
                      <i className="far fa-calendar-alt" aria-hidden="true"></i> {exp.duration}
                    </span>
                    <span className="timeline-type">{exp.type}</span>
                  </div>
                </div>
                <div className="timeline-responsibilities">
                  <h4 className="timeline-responsibilities-title">Key Responsibilities & Achievements</h4>
                  <ul className="timeline-resp-list" role="list">
                    {exp.responsibilities.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="timeline-tech">
                  {exp.technologies.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
