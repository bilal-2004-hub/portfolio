import React from 'react';
import logoImg from '../assets/images/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="#hero" className="footer-logo" aria-label="Muhammad Bilal Javed — Back to top">
            <img src={logoImg} alt="Muhammad Bilal Javed" className="footer-logo-img" />
          </a>

          <p className="footer-tagline">Building the web, one component at a time.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-socials">
          <a
            href="https://github.com/bilal-2004-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/bilal-javed-4a9a54336"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin" aria-hidden="true"></i>
          </a>
          <a
            href="mailto:bilaljavedd056@gmail.com"
            className="social-link"
            aria-label="Email"
          >
            <i className="fas fa-envelope" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © <span id="footer-year">{currentYear}</span> Muhammad Bilal Javed. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
