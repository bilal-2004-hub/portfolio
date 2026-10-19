import React, { useEffect, useRef } from 'react';

const SKILLS = [
  { name: 'React.js', icon: 'fab fa-react', color: '#61dafb', level: 90 },
  { name: 'JavaScript (ES6+)', icon: 'fab fa-js-square', color: '#f7df1e', level: 92 },
  { name: 'HTML5', icon: 'fab fa-html5', color: '#e34f26', level: 95 },
  { name: 'CSS3 / Modern CSS', icon: 'fab fa-css3-alt', color: '#1572b6', level: 92 },
  { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933', level: 85 },
  { name: 'Express.js', icon: 'fas fa-server', color: '#94a3b8', level: 82 },
  { name: 'Firebase', icon: 'fas fa-fire', color: '#ffca28', level: 85 },
  { name: 'Git & GitHub', icon: 'fab fa-git-alt', color: '#f05032', level: 88 },
  { name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#38bdf8', level: 88 },
  { name: 'TypeScript', icon: 'fas fa-code', color: '#3178c6', level: 80 },
  { name: 'REST APIs', icon: 'fas fa-network-wired', color: '#60a5fa', level: 90 },
  { name: 'Responsive Design', icon: 'fas fa-mobile-alt', color: '#3b82f6', level: 95 },
];

export default function Skills() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = containerRef.current.querySelectorAll('.skill-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills section section-alt" aria-labelledby="skills-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What I work with</span>
          <h2 id="skills-heading" className="section-title">
            My Skills
          </h2>
          <div className="section-divider" aria-hidden="true"></div>
        </div>
        <div className="skills-grid" id="skills-grid" ref={containerRef}>
          {SKILLS.map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-card reveal reveal-delay-${(index % 5) + 1}`}
              data-skill={skill.name}
            >
              <div className="skill-icon" style={{ color: skill.color }} aria-hidden="true">
                <i className={skill.icon}></i>
              </div>
              <span className="skill-name">{skill.name}</span>
              <div
                className="skill-level"
                title={`${skill.name}: ${skill.level}%`}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="skill-level-fill" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
