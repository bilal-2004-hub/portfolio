/**
 * skills.js
 * Renders skill cards and manages level-fill animation.
 */

const SKILLS = [
  { name: 'React.js', icon: 'fab fa-react', color: '#61dafb', level: 90 },
  { name: 'JavaScript (ES6+)', icon: 'fab fa-js-square', color: '#f7df1e', level: 92 },
  { name: 'HTML5', icon: 'fab fa-html5', color: '#e34f26', level: 95 },
  { name: 'CSS3 / Modern CSS', icon: 'fab fa-css3-alt', color: '#1572b6', level: 92 },
  { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933', level: 85 },
  { name: 'Express.js', icon: 'fas fa-server', color: '#94a3b8', level: 82 },
  { name: 'Firebase', icon: 'fas fa-fire', color: '#ffca28', level: 85 },
  { name: 'Git & GitHub', icon: 'fab fa-git-alt', color: '#f05032', level: 88 },
  { name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#38bdf8', level: 88 },
  { name: 'TypeScript', icon: 'fas fa-code', color: '#3178c6', level: 80 },
  { name: 'REST APIs', icon: 'fas fa-network-wired', color: '#60a5fa', level: 90 },
  { name: 'Responsive Design', icon: 'fas fa-mobile-alt', color: '#3b82f6', level: 95 },
];

export function initSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  container.innerHTML = SKILLS.map((skill, index) => `
    <div class="skill-card reveal reveal-delay-${(index % 5) + 1}" data-skill="${skill.name}">
      <div class="skill-icon" style="color: ${skill.color}" aria-hidden="true">
        <i class="${skill.icon}"></i>
      </div>
      <span class="skill-name">${skill.name}</span>
      <div class="skill-level" title="${skill.name}: ${skill.level}%" role="progressbar" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100">
        <div class="skill-level-fill" style="width: ${skill.level}%;"></div>
      </div>
    </div>
  `).join('');

  // Trigger animation when skills scroll into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  container.querySelectorAll('.skill-card').forEach((card) => observer.observe(card));
}
