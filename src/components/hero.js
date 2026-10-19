/**
 * hero.js
 * Typed text animation + Download CV button with state machine.
 */

import { downloadCV, CV_ERROR_MESSAGES } from '../utils/downloadCV.js';
import { showToast } from './toast.js';

const TYPED_STRINGS = [
  'Frontend Developer',
  'React.js Enthusiast',
  'Node.js Developer',
  'Firebase Specialist',
  'UI/UX Passionate',
];

const TYPING_SPEED   = 90;   // ms per character
const DELETING_SPEED = 50;   // ms per character
const PAUSE_AFTER    = 1800; // ms to pause when word is complete
const PAUSE_BEFORE   = 400;  // ms before deleting starts

// ---- CV Button states ----
const CV_STATES = {
  idle:    { icon: 'fa-download', text: 'Download CV',   disabled: false },
  loading: { icon: 'fa-spinner fa-spin', text: 'Preparing CV...', disabled: true  },
  success: { icon: 'fa-check',  text: 'CV Downloaded',  disabled: true  },
  error:   { icon: 'fa-exclamation-triangle', text: 'Download Failed', disabled: false },
};

export function initHero() {
  initTypedText();
  initDownloadButton();
}

// ---- Typed Text ----
function initTypedText() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  let stringIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function tick() {
    const current = TYPED_STRINGS[stringIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
      // Word complete — pause then start deleting
      delay = PAUSE_AFTER;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Word deleted — move to next
      isDeleting = false;
      stringIndex = (stringIndex + 1) % TYPED_STRINGS.length;
      delay = PAUSE_BEFORE;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 600);
}

// ---- Download CV Button ----
function initDownloadButton() {
  const btn     = document.getElementById('download-cv-btn');
  const btnIcon = document.getElementById('cv-btn-icon');
  const btnText = document.getElementById('cv-btn-text');

  if (!btn || !btnIcon || !btnText) return;

  let isDownloading = false;

  function setState(state) {
    const s = CV_STATES[state];
    btnIcon.className = `fas ${s.icon}`;
    btnText.textContent = s.text;
    btn.disabled = s.disabled;
  }

  btn.addEventListener('click', async () => {
    // Prevent multiple simultaneous downloads
    if (isDownloading) return;
    isDownloading = true;

    setState('loading');

    const result = await downloadCV();

    if (result.success) {
      setState('success');
      showToast('success', 'Download Started', 'Your CV is downloading now.');
      // Return to idle after short delay
      setTimeout(() => {
        setState('idle');
        isDownloading = false;
      }, 2500);
    } else {
      setState('error');
      const msg = CV_ERROR_MESSAGES[result.error] ?? CV_ERROR_MESSAGES.unknown;
      showToast('error', 'Download Failed', msg);
      // Return to idle so user can try again
      setTimeout(() => {
        setState('idle');
        isDownloading = false;
      }, 3000);
    }
  });
}
