/**
 * footer.js
 * Sets dynamic year and smooth back-to-top interaction.
 */

export function initFooter() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
