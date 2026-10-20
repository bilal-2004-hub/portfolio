/**
 * contact.js
 * Form validation with live error feedback and submission handling.
 */

import { showToast } from './toast.js';

export function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  const submitBtn = document.getElementById('form-submit-btn');
  const btnText = document.getElementById('form-btn-text');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input, errorEl, validator) {
    const errorMsg = validator(input.value.trim());
    if (errorMsg) {
      input.classList.add('input-error');
      input.classList.remove('input-valid');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = errorMsg;
      return false;
    } else {
      input.classList.remove('input-error');
      input.classList.add('input-valid');
      input.setAttribute('aria-invalid', 'false');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  }

  const validators = {
    name: (val) => {
      if (!val) return 'Full name is required.';
      if (val.length < 2) return 'Name must be at least 2 characters.';
      return '';
    },
    email: (val) => {
      if (!val) return 'Email address is required.';
      if (!EMAIL_REGEX.test(val)) return 'Please enter a valid email address.';
      return '';
    },
    message: (val) => {
      if (!val) return 'Message cannot be empty.';
      if (val.length < 10) return 'Message must be at least 10 characters long.';
      return '';
    },
  };

  // Real-time validation on input / blur
  nameInput?.addEventListener('input', () => validateField(nameInput, nameError, validators.name));
  nameInput?.addEventListener('blur', () => validateField(nameInput, nameError, validators.name));

  emailInput?.addEventListener('input', () => validateField(emailInput, emailError, validators.email));
  emailInput?.addEventListener('blur', () => validateField(emailInput, emailError, validators.email));

  messageInput?.addEventListener('input', () => validateField(messageInput, messageError, validators.message));
  messageInput?.addEventListener('blur', () => validateField(messageInput, messageError, validators.message));

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameError, validators.name);
    const isEmailValid = validateField(emailInput, emailError, validators.email);
    const isMessageValid = validateField(messageInput, messageError, validators.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      showToast('error', 'Form Incomplete', 'Please correct the highlighted errors before submitting.');
      return;
    }

    // Submit state
    const originalText = btnText ? btnText.textContent : 'Send Message';
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      const accessKey = import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        showToast(
          'error',
          'Setup Required',
          'Please configure VITE_WEB3FORMS_ACCESS_KEY in your .env file to receive emails.'
        );
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim(),
          subject: `Portfolio Message from ${nameInput.value.trim()}`,
          from_name: nameInput.value.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        showToast(
          'success',
          'Message Sent Successfully!',
          'Thank you for reaching out, Muhammad Bilal Javed will get back to you shortly.'
        );

        form.reset();
        [nameInput, emailInput, messageInput].forEach((input) => {
          input?.classList.remove('input-valid', 'input-error');
          input?.removeAttribute('aria-invalid');
        });
        [nameError, emailError, messageError].forEach((el) => {
          if (el) el.textContent = '';
        });
      } else {
        throw new Error(data.message || 'Failed to send message.');
      }
    } catch (err) {
      showToast('error', 'Transmission Failed', err.message || 'Something went wrong. Please email directly at bilaljavedd056@gmail.com');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = originalText;
    }
  });
}
