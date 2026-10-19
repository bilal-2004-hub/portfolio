/**
 * navbar.js
 * Sticky navbar: scroll-shadow, active link, hamburger toggle.
 */

export function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  const allLinks = navLinks.querySelectorAll('.nav-link');

  if (!navbar || !hamburger || !navLinks) return;

  // ---- Scroll: add shadow class ----
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on init

  // ---- Hamburger toggle ----
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    // Prevent body scroll when menu is open on mobile
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // ---- Close menu on link click ----
  allLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ---- Close menu on outside click ----
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ---- Active section highlighting ----
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    let current = '';
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    allLinks.forEach((link) => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }
}
