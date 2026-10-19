/**
 * experience.js
 * Renders career timeline items with achievements and tech tags.
 */

const EXPERIENCES = [
  {
    role: 'Frontend Developer Intern',
    company: 'Tech Solutions Studio',
    duration: '2023 — Present',
    type: 'Remote / Full-time',
    responsibilities: [
      'Developed responsive, accessible, and high-performance single-page web interfaces using React.js and modern CSS.',
      'Collaborated with designers and product managers to translate Figma prototypes into modular, reusable UI components.',
      'Integrated Firebase services including Authentication, Cloud Firestore, and Cloud Storage for real-time data handling.',
      'Audited web accessibility (WCAG) and optimized Core Web Vitals to achieve 90+ Lighthouse performance scores.',
    ],
    technologies: ['React.js', 'JavaScript (ES6+)', 'Firebase', 'Tailwind CSS', 'Git & GitHub', 'REST APIs'],
  },
  {
    role: 'Junior Web Developer & Freelancer',
    company: 'Self-Employed / Client Projects',
    duration: '2022 — 2023',
    type: 'Freelance & Contract',
    responsibilities: [
      'Delivered custom web applications and landing pages for diverse clients, maintaining clean code and strict deadlines.',
      'Implemented robust client-side validation, interactive UI widgets, and secure asynchronous API communications.',
      'Ensured full responsive design across desktop, tablet, and mobile devices with seamless cross-browser support.',
    ],
    technologies: ['HTML5', 'CSS3 / SASS', 'JavaScript', 'Node.js', 'Express.js', 'Responsive Design'],
  },
];

export function initExperience() {
  const container = document.getElementById('timeline');
  if (!container) return;

  container.innerHTML = EXPERIENCES.map((exp, index) => `
    <div class="timeline-item reveal reveal-delay-${index + 1}">
      <div class="timeline-dot" aria-hidden="true"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-title">${exp.role}</h3>
            <span class="timeline-company">${exp.company}</span>
          </div>
          <div class="timeline-meta">
            <span class="timeline-duration">
              <i class="far fa-calendar-alt" aria-hidden="true"></i> ${exp.duration}
            </span>
            <span class="timeline-type">${exp.type}</span>
          </div>
        </div>
        <div class="timeline-responsibilities">
          <h4 class="timeline-responsibilities-title">Key Responsibilities & Achievements</h4>
          <ul class="timeline-resp-list" role="list">
            ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
        <div class="timeline-tech">
          ${exp.technologies.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // Observe for scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  container.querySelectorAll('.timeline-item').forEach((item) => observer.observe(item));
}
