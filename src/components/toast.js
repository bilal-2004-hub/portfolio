/**
 * toast.js
 * Lightweight toast notification system. No external dependencies.
 */

const TOAST_DURATION = 4000; // ms

/**
 * Show a toast notification.
 * @param {'success'|'error'|'info'} type
 * @param {string} title
 * @param {string} message
 */
export function showToast(type = 'info', title, message = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: '<i class="fas fa-check-circle" aria-hidden="true"></i>',
    error:   '<i class="fas fa-exclamation-circle" aria-hidden="true"></i>',
    info:    '<i class="fas fa-info-circle" aria-hidden="true"></i>',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] ?? icons.info}</span>
    <div class="toast-content">
      <p class="toast-title">${escapeHtml(title)}</p>
      ${message ? `<p class="toast-message">${escapeHtml(message)}</p>` : ''}
    </div>
    <button class="toast-close" aria-label="Dismiss notification">
      <i class="fas fa-times" aria-hidden="true"></i>
    </button>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  // Close button
  toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));

  // Auto-dismiss
  const timer = setTimeout(() => dismissToast(toast), TOAST_DURATION);

  // Pause timer on hover
  toast.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    const progress = toast.querySelector('.toast-progress');
    if (progress) progress.style.animationPlayState = 'paused';
  });

  toast.addEventListener('mouseleave', () => {
    setTimeout(() => dismissToast(toast), 1500);
  });
}

function dismissToast(toast) {
  if (!toast || !toast.isConnected) return;
  toast.classList.add('toast-exiting');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
