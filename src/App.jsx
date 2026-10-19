import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ToastContainer from './components/Toast.jsx';
import BackToTop from './components/BackToTop.jsx';

export default function App() {
  useEffect(() => {
    // Setup global scroll reveal animations
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

    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
