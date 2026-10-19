import React from 'react';

export default function About() {
  const stats = [
    { number: '10+', label: 'Projects Built' },
    { number: '5+', label: 'Technologies' },
    { number: '100%', label: 'Dedication' },
  ];

  const facts = [
    {
      icon: 'fas fa-code',
      title: 'Focus',
      desc: 'Frontend Development & Full-Stack Web Apps',
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Education',
      desc: 'Computer Science / Software Engineering',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      desc: 'Pakistan 🇵🇰',
    },
    {
      icon: 'fas fa-heart',
      title: 'Interests',
      desc: 'Open Source, UI/UX Design, Tech Trends',
    },
    {
      icon: 'fas fa-bullseye',
      title: 'Goal',
      desc: 'Build impactful products that solve real problems',
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      desc: (
        <a href="mailto:bilaljavedd056@gmail.com">bilaljavedd056@gmail.com</a>
      ),
    },
  ];

  return (
    <section id="about" className="about section" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Get to know me</span>
          <h2 id="about-heading" className="section-title">
            About Me
          </h2>
          <div className="section-divider" aria-hidden="true"></div>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <h3 className="about-subtitle">Who Am I?</h3>
            <p>
              I'm <strong>Muhammad Bilal Javed</strong>, a passionate Frontend Developer based in Pakistan with a strong focus on building user-friendly, responsive web applications. I combine clean code practices with modern design principles to deliver exceptional digital experiences.
            </p>
            <p>
              My journey in software development began with a deep curiosity for how websites work. That curiosity evolved into a full-fledged passion for crafting beautiful, functional interfaces using technologies like <strong>React.js, Node.js, and Firebase</strong>.
            </p>
            <p>
              I believe great software is not just about functionality — it's about how it feels to use. Every project I take on, I aim to build something that users genuinely enjoy interacting with.
            </p>
            <div className="about-stats">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-details">
            <h3 className="about-subtitle">Quick Facts</h3>
            <ul className="about-facts" role="list">
              {facts.map((fact, idx) => (
                <li key={idx} className="fact-item">
                  <i className={fact.icon} aria-hidden="true"></i>
                  <div>
                    <strong>{fact.title}</strong>
                    <span>{fact.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
