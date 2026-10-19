import React, { useState, useEffect, useRef } from 'react';
import profileImg from '../assets/images/profile.jpg';
import { downloadCV, CV_ERROR_MESSAGES } from '../utils/downloadCV.js';
import { showToast } from './Toast.jsx';

const TYPED_STRINGS = [
  'Frontend Developer',
  'React.js Enthusiast',
  'Node.js Developer',
  'Firebase Specialist',
  'UI/UX Passionate',
];

const TYPING_SPEED = 90;
const DELETING_SPEED = 50;
const PAUSE_AFTER = 1800;
const PAUSE_BEFORE = 400;

const CV_STATES = {
  idle: { icon: 'fa-download', text: 'Download CV', disabled: false },
  loading: { icon: 'fa-spinner fa-spin', text: 'Preparing CV...', disabled: true },
  success: { icon: 'fa-check', text: 'CV Downloaded', disabled: true },
  error: { icon: 'fa-exclamation-triangle', text: 'Download Failed', disabled: false },
};

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [cvState, setCvState] = useState(CV_STATES.idle);
  const isDownloadingRef = useRef(false);

  // Typing effect
  useEffect(() => {
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const tick = () => {
      const current = TYPED_STRINGS[stringIndex];

      if (isDeleting) {
        setTypedText(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

      if (!isDeleting && charIndex === current.length) {
        delay = PAUSE_AFTER;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % TYPED_STRINGS.length;
        delay = PAUSE_BEFORE;
      }

      timeoutId = setTimeout(tick, delay);
    };

    timeoutId = setTimeout(tick, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle Download CV
  const handleDownload = async () => {
    if (isDownloadingRef.current) return;
    isDownloadingRef.current = true;

    setCvState(CV_STATES.loading);

    const result = await downloadCV();

    if (result.success) {
      setCvState(CV_STATES.success);
      showToast('success', 'Download Started', 'Your CV is downloading now.');
      setTimeout(() => {
        setCvState(CV_STATES.idle);
        isDownloadingRef.current = false;
      }, 2500);
    } else {
      setCvState(CV_STATES.error);
      const msg = CV_ERROR_MESSAGES[result.error] ?? CV_ERROR_MESSAGES.unknown;
      showToast('error', 'Download Failed', msg);
      setTimeout(() => {
        setCvState(CV_STATES.idle);
        isDownloadingRef.current = false;
      }, 3000);
    }
  };

  return (
    <section id="hero" className="hero" aria-label="Hero introduction">
      <div className="hero-bg-grid" aria-hidden="true"></div>
      <div className="container hero-container">
        <div className="hero-text">
          <p className="hero-greeting">👋 Hello, I'm</p>
          <h1 className="hero-name">Muhammad Bilal Javed</h1>
          <h2 className="hero-title">
            <span className="typed-wrapper">
              <span id="typed-text" className="typed-text">
                {typedText}
              </span>
              <span className="typed-cursor" aria-hidden="true">
                |
              </span>
            </span>
          </h2>
          <p className="hero-intro">
            I craft modern, performant web experiences using React, Node.js and Firebase. Passionate about clean code, beautiful UIs, and solving real-world problems through technology.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary" id="view-work-btn">
              <i className="fas fa-eye" aria-hidden="true"></i> View My Work
            </a>
          </div>
          <div className="hero-socials">
            <a
              href="https://github.com/bilal-2004-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
            >
              <i className="fab fa-github" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/bilal-javed-4a9a54336"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-glow" aria-hidden="true"></div>
          <div className="hero-image-ring" aria-hidden="true"></div>
          <img
            src={profileImg}
            alt="Muhammad Bilal Javed — Frontend Developer"
            className="hero-profile-img"
            width="380"
            height="380"
            loading="eager"
          />
        </div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll to About section">
        <i className="fas fa-chevron-down" aria-hidden="true"></i>
      </a>
    </section>
  );
}
