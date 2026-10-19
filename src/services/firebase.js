/**
 * firebase.js
 * Initializes Firebase app and exports the Storage instance.
 * Firebase credentials are read exclusively from environment variables — 
 * never hardcoded here.
 */

import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// ---- Build config from Vite env vars ----
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// ---- Validate that required keys are present ----
const REQUIRED_KEYS = [
  'apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId',
];

function validateConfig(config) {
  const missing = REQUIRED_KEYS.filter(
    (key) => !config[key] || config[key].includes('your_')
  );
  if (missing.length > 0) {
    throw new Error(
      `Firebase configuration is incomplete. Missing or placeholder values for: ${missing.join(', ')}.\n` +
      'Please copy .env.example to .env and fill in your Firebase project credentials.'
    );
  }
}

// ---- Initialize Firebase (avoid duplicate app error) ----
let app;
let storage;
let initError = null;

try {
  validateConfig(firebaseConfig);
  // Reuse existing app if already initialized (e.g. HMR in dev)
  app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];
  storage = getStorage(app);
} catch (err) {
  initError = err;
  // Log to console in development only — never expose to the user
  if (import.meta.env.DEV) {
    console.warn('[Firebase]', err.message);
  }
}

export { storage, initError };
