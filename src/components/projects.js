/**
 * projects.js
 * Renders portfolio project cards with details, tags, and action buttons.
 */

import kestralWorksImg from '../assets/images/project-kestral-works.png';
import studentPortalImg from '../assets/images/project-student-portal.png';
import memoryVaultImg from '../assets/images/project-memory-vault.png';

const PROJECTS = [
  {
    title: 'Kestral Works',
    description: 'Kestral Works is a client portal and project management system designed to streamline communication between clients and service providers. It enables clients to track project progress, manage tasks, submit feedback, and receive notifications. The platform was built to improve collaboration, increase transparency, and simplify project management through a centralized digital workspace.',
    image: kestralWorksImg,
    tags: ['React.js', 'Client Portal', 'Task Management', 'Tailwind CSS', 'REST API'],
    github: 'https://github.com/bilal-2004-hub',
    live: 'https://github.com/bilal-2004-hub',
    featured: true,
  },
  {
    title: 'Student Portal',
    description: 'Student Portal is a web-based learning management platform that allows students to create accounts, explore available courses, and enroll in their preferred programs. Students can take quizzes after enrollment and earn certificates based on their results. The system was developed to simplify course management, enhance learning accessibility, and provide a structured online educational experience.',
    image: studentPortalImg,
    tags: ['React.js', 'LMS', 'Course Management', 'Quizzes & Certificates', 'Firebase'],
    github: 'https://github.com/bilal-2004-hub',
    live: 'https://github.com/bilal-2004-hub',
    featured: true,
  },
  {
    title: 'Memory Vault',
    description: 'Memory Vault is a personal memory management application designed to help users preserve meaningful experiences, thoughts, and special moments. It allows users to create, organize, and revisit their memories through an intuitive interface. The project was developed to provide a convenient digital space for personal reflection, emotional expression, and keeping important life moments organized.',
    image: memoryVaultImg,
    tags: ['React.js', 'Memory Management', 'Local Storage', 'Tailwind CSS', 'UI/UX'],
    github: 'https://github.com/bilal-2004-hub',
    live: 'https://github.com/bilal-2004-hub',
    featured: false,
  },
];



export function initProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = PROJECTS.map((project, index) => `
    <article class="project-card reveal reveal-delay-${(index % 3) + 1}">
      ${project.featured ? '<span class="project-badge">Featured</span>' : ''}
      <div class="project-img-wrapper">
        <img
          src="${project.image}"
          alt="${project.title} interface preview"
          loading="lazy"
          width="600"
          height="340"
        />
        <div class="project-img-overlay">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" aria-label="View ${project.title} source code">
            <i class="fab fa-github" aria-hidden="true"></i> View Code
          </a>
          <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" aria-label="View ${project.title} live demo">
            <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Live Demo
          </a>
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-name">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-buttons">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-github" aria-label="Source code for ${project.title}">
            <i class="fab fa-github" aria-hidden="true"></i> Code
          </a>
          <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-live" aria-label="Live demo for ${project.title}">
            <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Live Demo
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Observe for scroll reveal
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

  container.querySelectorAll('.project-card').forEach((card) => observer.observe(card));
}
