import React, { useState } from 'react';
import { showToast } from './Toast.jsx';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field, value) => {
    const val = value.trim();
    if (field === 'name') {
      if (!val) return 'Full name is required.';
      if (val.length < 2) return 'Name must be at least 2 characters.';
      return '';
    }
    if (field === 'email') {
      if (!val) return 'Email address is required.';
      if (!EMAIL_REGEX.test(val)) return 'Please enter a valid email address.';
      return '';
    }
    if (field === 'message') {
      if (!val) return 'Message cannot be empty.';
      if (val.length < 10) return 'Message must be at least 10 characters long.';
      return '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const messageErr = validateField('message', formData.message);

    setTouched({ name: true, email: true, message: true });
    setErrors({ name: nameErr, email: emailErr, message: messageErr });

    if (nameErr || emailErr || messageErr) {
      showToast('error', 'Form Incomplete', 'Please correct the highlighted errors before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

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
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Portfolio Message from ${formData.name.trim()}`,
          from_name: formData.name.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        showToast(
          'success',
          'Message Sent Successfully!',
          'Thank you for reaching out, Muhammad Bilal Javed will get back to you shortly.'
        );

        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message.');
      }
    } catch (err) {
      showToast(
        'error',
        'Transmission Failed',
        err.message || 'Something went wrong. Please email directly at bilaljavedd056@gmail.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (field) => {
    if (!touched[field]) return 'form-input';
    if (errors[field]) return 'form-input input-error';
    return 'form-input input-valid';
  };

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Let's work together</span>
          <h2 id="contact-heading" className="section-title">
            Get In Touch
          </h2>
          <div className="section-divider" aria-hidden="true"></div>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-intro">
              I'm currently open to new opportunities and collaborations. Whether you have a project in mind, a question, or just want to say hi — my inbox is always open!
            </p>
            <ul className="contact-details" role="list">
              <li className="contact-detail-item">
                <div className="contact-icon-wrapper" aria-hidden="true">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:bilaljavedd056@gmail.com">bilaljavedd056@gmail.com</a>
                </div>
              </li>
              <li className="contact-detail-item">
                <div className="contact-icon-wrapper" aria-hidden="true">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <strong>Phone</strong>
                  <a href="tel:+923001871710">0300 1871710</a>
                </div>
              </li>
              <li className="contact-detail-item">
                <div className="contact-icon-wrapper" aria-hidden="true">
                  <i className="fab fa-linkedin"></i>
                </div>
                <div>
                  <strong>LinkedIn</strong>
                  <a
                    href="https://www.linkedin.com/in/bilal-javed-4a9a54336"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/bilal-javed
                  </a>
                </div>
              </li>
              <li className="contact-detail-item">
                <div className="contact-icon-wrapper" aria-hidden="true">
                  <i className="fab fa-github"></i>
                </div>
                <div>
                  <strong>GitHub</strong>
                  <a
                    href="https://github.com/bilal-2004-hub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/bilal-2004-hub
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="contact-form-wrapper">
            <form
              id="contact-form"
              className="contact-form"
              noValidate
              aria-label="Contact form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="form-name" className="form-label">
                  Full Name <span aria-hidden="true" className="required">*</span>
                </label>
                <input
                  type="text"
                  id="form-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('name')}
                  placeholder="John Doe"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={touched.name ? (errors.name ? 'true' : 'false') : undefined}
                  aria-describedby="name-error"
                />
                <span id="name-error" className="form-error" role="alert" aria-live="polite">
                  {touched.name && errors.name}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="form-email" className="form-label">
                  Email Address <span aria-hidden="true" className="required">*</span>
                </label>
                <input
                  type="email"
                  id="form-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('email')}
                  placeholder="john@example.com"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={touched.email ? (errors.email ? 'true' : 'false') : undefined}
                  aria-describedby="email-error"
                />
                <span id="email-error" className="form-error" role="alert" aria-live="polite">
                  {touched.email && errors.email}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="form-message" className="form-label">
                  Message <span aria-hidden="true" className="required">*</span>
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${getInputClass('message')} form-textarea`}
                  placeholder="Tell me about your project or just say hello..."
                  rows="5"
                  aria-required="true"
                  aria-invalid={touched.message ? (errors.message ? 'true' : 'false') : undefined}
                  aria-describedby="message-error"
                ></textarea>
                <span id="message-error" className="form-error" role="alert" aria-live="polite">
                  {touched.message && errors.message}
                </span>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                id="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    <span id="form-btn-text">Sending...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" aria-hidden="true"></i>
                    <span id="form-btn-text">Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
