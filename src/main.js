/**
 * main.js
 * Main entry point for the personal portfolio application.
 */

// Import all styling modules
import './styles/base.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/skills.css';
import './styles/projects.css';
import './styles/experience.css';
import './styles/contact.css';
import './styles/footer.css';
import './styles/animations.css';

// Import component initializers
import { initNavbar } from './components/navbar.js';
import { initHero } from './components/hero.js';
import { initSkills } from './components/skills.js';
import { initProjects } from './components/projects.js';
import { initExperience } from './components/experience.js';
import { initContact } from './components/contact.js';
import { initFooter } from './components/footer.js';

// Initialize all sections
function startApp() {
  initNavbar();
  initHero();
  initSkills();
  initProjects();
  initExperience();
  initContact();
  initFooter();
  initGlobalScrollAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

/**
 * Observes all elements marked with reveal classes and activates them on scroll.
 */
function initGlobalScrollAnimations() {
  const revealElements = document.querySelectorAll(
    '.about-text, .about-details, .about-stats .stat-card, .section-header, .contact-info, .contact-form-wrapper'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    if (el.classList.contains('stat-card')) {
      el.classList.add(`reveal-delay-${index + 1}`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
    observer.observe(el);
  });
}
