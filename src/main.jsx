import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import Tailwind CSS
import './styles/tailwind.css';

// Import design system and section styling
import './styles/base.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/skills.css';
import './styles/projects.css';
import './styles/experience.css';
import './styles/contact.css';
import './styles/footer.css';
import './styles/animations.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
