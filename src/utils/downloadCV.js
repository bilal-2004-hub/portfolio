/**
 * downloadCV.js
 * Isolated CV download logic using Firebase Storage.
 * This module has NO direct knowledge of UI — it returns a result object
 * that the UI layer uses to update button state.
 */

import { ref, getDownloadURL } from 'firebase/storage';
import { storage, initError } from '../services/firebase.js';

/** Path to the CV in Firebase Storage */
const CV_STORAGE_PATH = 'portfolio/cv/my-cv.pdf';

/** Filename that will appear when the user downloads */
const CV_FILENAME = 'Muhammad-Bilal-Javed-CV.pdf';

/**
 * Downloads the CV PDF from Firebase Storage.
 * Uses a Blob approach to force the browser to download (not navigate to) the PDF
 * and to set a clean filename.
 *
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function downloadCV() {
  // Guard: Firebase not initialized (missing config)
  if (initError || !storage) {
    return {
      success: false,
      error: 'config_missing',
    };
  }

  try {
    // 1. Get the Firebase Storage reference
    const cvRef = ref(storage, CV_STORAGE_PATH);

    // 2. Get a temporary download URL
    const url = await getDownloadURL(cvRef);

    // 3. Fetch the file as a Blob so we can control the filename
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const blob = await response.blob();

    // 4. Create an object URL and trigger download
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = CV_FILENAME;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();

    // 5. Cleanup
    document.body.removeChild(anchor);
    // Delay revoke so download has time to start
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000);

    return { success: true };
  } catch (err) {
    // Categorize errors without leaking Firebase internals
    const code = err?.code ?? '';

    if (code === 'storage/object-not-found') {
      return { success: false, error: 'not_found' };
    }
    if (code === 'storage/unauthorized') {
      return { success: false, error: 'unauthorized' };
    }
    if (!navigator.onLine) {
      return { success: false, error: 'offline' };
    }

    // Log full error in dev only
    if (import.meta.env.DEV) {
      console.error('[downloadCV]', err);
    }

    return { success: false, error: 'unknown' };
  }
}

/** Human-readable error messages for each error code */
export const CV_ERROR_MESSAGES = {
  config_missing: 'CV download is not configured yet. Please check back later.',
  not_found:      'CV file not found. Please try again later.',
  unauthorized:   'Download permission denied. Please try again later.',
  offline:        'You appear to be offline. Please check your connection.',
  unknown:        'Unable to download CV right now. Please try again.',
};
