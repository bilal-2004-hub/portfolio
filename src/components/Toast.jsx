import React, { useState, useEffect } from 'react';

// Event bus for toasts
const toastListeners = new Set();

export function showToast(type = 'info', title, message = '') {
  const id = Date.now() + Math.random().toString(36).substring(2, 9);
  const toast = { id, type, title, message };
  toastListeners.forEach((listener) => listener(toast));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleNewToast = (toast) => {
      setToasts((prev) => [...prev, toast]);
    };

    toastListeners.add(handleNewToast);
    return () => {
      toastListeners.delete(handleNewToast);
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div id="toast-container" role="alert" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      dismiss();
    }, 4000);

    return () => clearTimeout(timer);
  }, [isPaused]);

  const dismiss = () => {
    setIsExiting(true);
  };

  const handleAnimationEnd = (e) => {
    if (isExiting && e.animationName === 'toastOut') {
      onRemove();
    }
  };

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
  };

  return (
    <div
      className={`toast toast-${toast.type} ${isExiting ? 'toast-exiting' : ''}`}
      role="alert"
      onAnimationEnd={handleAnimationEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="toast-icon">
        <i className={icons[toast.type] || icons.info} aria-hidden="true"></i>
      </span>
      <div className="toast-content">
        <p className="toast-title">{toast.title}</p>
        {toast.message && <p className="toast-message">{toast.message}</p>}
      </div>
      <button
        className="toast-close"
        aria-label="Dismiss notification"
        onClick={dismiss}
      >
        <i className="fas fa-times" aria-hidden="true"></i>
      </button>
      <div
        className="toast-progress"
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      ></div>
    </div>
  );
}
