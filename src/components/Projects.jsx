import React, { useEffect, useRef, useState } from 'react';
import kestralWorksImg from '../assets/images/project-kestral-works.png';
import studentPortalImg from '../assets/images/project-student-portal.png';
import memoryVaultImg from '../assets/images/project-memory-vault.png';
import expenseFlowImg from '../assets/images/project-expense-flow.png';

const PROJECTS = [
  {
    id: 'kestral',
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
    id: 'portal',
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
    id: 'memory-vault',
    title: 'Memory Vault',
    description:
      'Memory Vault is a personal memory management application designed to help users preserve meaningful experiences, thoughts, and special moments. It allows users to create, organize, and revisit their memories through an intuitive interface. The project was developed to provide a convenient digital space for personal reflection, emotional expression, and keeping important life moments organized.',
    image: memoryVaultImg,
    tags: ['React.js', 'Memory Management', 'Local Storage', 'Tailwind CSS', 'UI/UX'],
    github: 'https://github.com/bilal-2004-hub/memory-vault',
    live: 'https://memory-vault-vddh.vercel.app/',
    featured: false,
  },
  {
    id: 'expense-flow',
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
  const trackRef = useRef(null);
  const firstCardRef = useRef(null);
  const [isSwiped, setIsSwiped] = useState(false);
  const [cardShift, setCardShift] = useState(0);
  const [showMoreMobile, setShowMoreMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (firstCardRef.current && trackRef.current && containerRef.current) {
        const cardWidth = firstCardRef.current.getBoundingClientRect().width;
        const computedStyle = window.getComputedStyle(trackRef.current);
        const gap = parseFloat(computedStyle.gap) || 32;
        const maxShift = trackRef.current.scrollWidth - containerRef.current.clientWidth;
        setCardShift(maxShift > 0 ? maxShift : cardWidth + gap);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [isSwiped, showMoreMobile]);

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

        <div className="projects-slider-wrapper">
          <div className="projects-viewport" ref={containerRef}>
            <div
              className="projects-track"
              ref={trackRef}
              style={{
                transform: isSwiped ? `translateX(-${cardShift}px)` : 'translateX(0px)',
              }}
            >
              {PROJECTS.map((project, index) => {
                const isExtra = index === 3;
                return (
                  <article
                    key={project.id || project.title}
                    ref={index === 0 ? firstCardRef : null}
                    className={`project-card reveal reveal-delay-${(index % 3) + 1} ${
                      isExtra ? 'project-card-4 project-card-extra-mobile' : ''
                    } ${isExtra && showMoreMobile ? 'is-visible' : ''}`}
                  >
                    {/* Top-Right Minus Button on 4th Project */}
                    {index === 3 && (
                      <button
                        type="button"
                        className="project-card-minus-btn"
                        onClick={() => setIsSwiped(false)}
                        title="Swipe Back"
                        aria-label="Close 4th project"
                      >
                        <i className="fas fa-minus" aria-hidden="true"></i>
                      </button>
                    )}

                    {/* Left Floating Minus Button on 4th Project */}
                    {index === 3 && isSwiped && (
                      <button
                        type="button"
                        className="project-swipe-btn project-minus-btn"
                        onClick={() => setIsSwiped(false)}
                        title="Swipe Back to Previous Projects"
                        aria-label="Swipe back"
                      >
                        <i className="fas fa-minus" aria-hidden="true"></i>
                        <span className="swipe-btn-hint">Back</span>
                      </button>
                    )}

                    {/* Right Floating Plus Button on 3rd Project */}
                    {index === 2 && !isSwiped && (
                      <button
                        type="button"
                        className="project-swipe-btn project-plus-btn"
                        onClick={() => setIsSwiped(true)}
                        title="Swipe Right for Expense Flow"
                        aria-label="Swipe right for next project"
                      >
                        <i className="fas fa-plus" aria-hidden="true"></i>
                        <span className="swipe-btn-hint">More</span>
                        <span className="plus-btn-ping" aria-hidden="true"></span>
                      </button>
                    )}

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
                );
              })}
            </div>
          </div>

          {/* Mobile Show More / Show Less Button */}
          <div className="mobile-show-more-wrapper">
            <button
              type="button"
              className="mobile-show-more-btn"
              onClick={() => setShowMoreMobile((prev) => !prev)}
              aria-expanded={showMoreMobile}
              aria-label={showMoreMobile ? 'Show less projects' : 'Show more projects'}
            >
              <i className={`fas fa-${showMoreMobile ? 'minus' : 'plus'}`} aria-hidden="true"></i>
              <span>{showMoreMobile ? 'Show Less' : 'Show More Projects'}</span>
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="projects-nav-bar">
            <button
              className={`nav-swipe-pill ${!isSwiped ? 'active' : ''}`}
              onClick={() => setIsSwiped(false)}
              aria-label="View Projects 1-3"
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
              <span>Projects 1 - 3</span>
            </button>
            <div className="nav-dots">
              <span className={`nav-dot ${!isSwiped ? 'active' : ''}`}></span>
              <span className={`nav-dot ${isSwiped ? 'active' : ''}`}></span>
            </div>
            <button
              className={`nav-swipe-pill ${isSwiped ? 'active' : ''}`}
              onClick={() => setIsSwiped(true)}
              aria-label="View Projects 2-4"
            >
              <span>Project 4 (Expense Flow)</span>
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
