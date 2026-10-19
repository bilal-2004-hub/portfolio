import React, { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/images/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 120;
      let current = '';

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPos) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navItems = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      id="navbar"
      ref={navRef}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container container">
        <a href="#hero" className="nav-logo" aria-label="Muhammad Bilal Javed — Home">
          <img src={logoImg} alt="Muhammad Bilal Javed" className="nav-logo-img" />
        </a>



        <button
          className="hamburger"
          id="hamburger-btn"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="nav-links"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="nav-links" role="list">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
