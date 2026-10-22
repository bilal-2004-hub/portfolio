import React, { useEffect, useRef, useState } from 'react';
import kestralWorksImg from '../assets/images/project-kestral-works.png';
import studentPortalImg from '../assets/images/project-student-portal.png';
import memoryVaultImg from '../assets/images/project-memory-vault.png';
import expenseFlowImg from '../assets/images/project-expense-flow.png';

const PROJECTS = [
  {
    title: 'Kestral Works',
    description:
      'Kestral Works is a client portal and project management system designed to streamline communication between clients and service providers. It enables clients to track project progress, manage tasks, submit feedback, and receive notifications. The platform was built to improve collaboration, increase transparency, and simplify project management through a centralized digital workspace.',
    image: kestralWorksImg,
    tags: ['React.js', 'Client Portal', 'Task Management', 'Tailwind CSS', 'REST API'],
    github: 'https://github.com/bilal-2004-hub/Kestral-works',
    live: 'https://kestral-works-nine.vercel.app/',
    featured: true,
  },
  {
    title: 'Student Portal',
    description:
      'Student Portal is a web-based learning management platform that allows students to create accounts, explore available courses, and enroll in their preferred programs. Students can take quizzes after enrollment and earn certificates based on their results. The system was developed to simplify course management, enhance learning accessibility, and provide a structured online educational experience.',
    image: studentPortalImg,
    tags: ['React.js', 'LMS', 'Course Management', 'Quizzes & Certificates', 'Firebase'],
    github: 'https://github.com/bilal-2004-hub/Portal',
    live: 'https://portal-eta-gules.vercel.app/',
    featured: true,
  },
  {
    title: 'Memory Vault',
    description:
      'Memory Vault is a personal memory management application designed to help users preserve meaningful experiences, thoughts, and special moments. It allows users to create, organize, and revisit their memories through an intuitive interface. The project was developed to provide a convenient digital space for personal reflection, emotional expression, and keeping important life moments organized.',
    image: memoryVaultImg,
    tags: ['React.js', 'Memory Management', 'Local Storage', 'Tailwind CSS', 'UI/UX'],
    github: 'https://github.com/bilal-2004-hub/memory-vault',
    live: 'https://memory-vault-vddh.vercel.app/',
    featured: false,
  },
];

const EXTRA_PROJECTS = [
  {
    title: 'Expense Flow',
    description:
      'Expense Flow is a smart money management application designed to help users track every dollar and grow their savings effortlessly. It provides a beautiful dashboard to monitor spending, plan budgets, and hit savings goals — all in one calm interface. The platform was built to simplify personal finance tracking with intuitive visualizations and real-time budget insights.',
    image: expenseFlowImg,
    tags: ['React.js', 'Node.js', 'Expense Tracker', 'MongoDB', 'REST API'],
    github: 'https://github.com/bilal-2004-hub/Expense-Flow',
    live: 'https://expense-flow-client-nine.vercel.app/',
    featured: false,
  },
];


export default function Projects() {
  const containerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

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
      { threshold: 0.1 }
    );

    const cards = containerRef.current.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [showMore]);

  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <section id="projects" className="projects section" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What I've built</span>
          <h2 id="projects-heading" className="section-title">
            My Projects
          </h2>
          <div className="section-divider" aria-hidden="true"></div>
        </div>
        <div className="projects-grid" id="projects-grid" ref={containerRef}>
          {PROJECTS.map((project, index) => (
            <article
              key={project.title}
              className={`project-card reveal reveal-delay-${(index % 3) + 1}`}
            >
              <div className="project-img-wrapper">
                <img
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  loading="lazy"
                  width="600"
                  height="340"
                />
              </div>
              <div className="project-content">
                <h3 className="project-name">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-buttons">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-github"
                    aria-label={`Source code for ${project.title}`}
                  >
                    <i className="fab fa-github" aria-hidden="true"></i> Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-live"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* Show More / Plus Button */}
          {!showMore && (
            <button
              className="project-show-more-btn reveal reveal-delay-1"
              onClick={handleToggle}
              aria-label="Show more projects"
            >
              <div className="show-more-inner">
                <div className="show-more-icon">
                  <i className="fas fa-plus" aria-hidden="true"></i>
                </div>
                <span className="show-more-text">More Projects</span>
              </div>
            </button>
          )}

          {/* Extra projects with animation */}
          {showMore &&
            EXTRA_PROJECTS.map((project, index) => (
              <article
                key={project.title}
                className={`project-card project-card-extra reveal reveal-delay-${(index % 3) + 1}`}
              >
                <div className="project-img-wrapper">
                  <img
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    loading="lazy"
                    width="600"
                    height="340"
                  />
                </div>
                <div className="project-content">
                  <h3 className="project-name">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-buttons">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn project-btn-github"
                      aria-label={`Source code for ${project.title}`}
                    >
                      <i className="fab fa-github" aria-hidden="true"></i> Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn project-btn-live"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Live Demo
                    </a>
                  </div>
                </div>
              </article>
            ))}

          {/* Show Less Button */}
          {showMore && (
            <button
              className="project-show-more-btn project-show-less reveal revealed"
              onClick={handleToggle}
              aria-label="Show less projects"
            >
              <div className="show-more-inner">
                <div className="show-more-icon show-less-icon">
                  <i className="fas fa-minus" aria-hidden="true"></i>
                </div>
                <span className="show-more-text">Show Less</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
