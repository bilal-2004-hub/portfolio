# Muhammad Bilal Javed — Portfolio Setup & Deployment Guide

This is a modern, high-performance personal portfolio website built with **Vite**, **Vanilla JavaScript (ES Modules)**, and **Vanilla CSS** featuring a professional Blue + Grey + White color scheme, fluid typography, smooth animations, accessible components, and Firebase Storage integration.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18 or later recommended
- **npm** (comes bundled with Node.js)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The development server will start at `http://localhost:5173` with instant Hot Module Replacement (HMR).

### 4. Build for Production
```bash
npm run build
```
This produces an optimized, minified production bundle in the `dist/` directory.

---

## ⚡ Firebase Storage Setup (CV Download Feature)

The "Download CV" button in the Hero section is powered by **Firebase Storage**. To activate real file downloads:

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and follow the on-screen steps.

### 2. Register a Web App
1. In your Firebase project overview, click the **Web icon (`</>`)** to register a web app.
2. Enter an app nickname (e.g. `bilal-portfolio`) and click **Register app**.
3. Firebase will show your `firebaseConfig` object with your API keys.

### 3. Configure Environment Variables
1. Create a `.env` file in the project root by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:...
   VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
   ```

---

## 📬 Contact Form Email Setup (Web3Forms)

The Contact Form sends messages directly to your Gmail (`bilaljavedd056@gmail.com`) via **Web3Forms**:

1. Go to [web3forms.com](https://web3forms.com/).
2. Enter your Gmail address (`bilaljavedd056@gmail.com`) and click **Create Your Access Key**.
3. You will immediately receive your free **Access Key** in your Gmail inbox.
4. Open your `.env` file and set:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
5. If deploying to **Vercel** / **Netlify**, add `VITE_WEB3FORMS_ACCESS_KEY` to the **Environment Variables** in your hosting dashboard.

---

### 4. Upload your CV PDF
1. In Firebase Console, open **Storage** from the left navigation.
2. Click **Get Started** if Storage isn't enabled yet.
3. Create the following folder structure:
   ```
   portfolio/
   └── cv/
       └── my-cv.pdf
   ```
4. Upload your PDF file named `my-cv.pdf` into `portfolio/cv/`.

### 5. Configure Storage Security Rules
Under **Storage > Rules** in Firebase Console, set the following rules so anyone can download the CV:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // CV is publicly readable
    match /portfolio/cv/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

> **Note**: If `.env` is not set up yet, the portfolio automatically handles this gracefully by displaying an informative toast notification without crashing or breaking the UI.

---

## 🛠️ Customization Guide

### Personal Details & Bio
- Edit [`index.html`](./index.html):
  - Change title, meta descriptions, and social links.
  - Modify the **About Me** section facts and stats.

### Projects
- Edit [`src/components/projects.js`](./src/components/projects.js):
  - Add or update project entries in the `PROJECTS` array.
  - Replace images in `src/assets/images/`.

### Skills & Proficiencies
- Edit [`src/components/skills.js`](./src/components/skills.js):
  - Add or modify skills in the `SKILLS` array with Font Awesome icons and percentage bars.

### Work Experience
- Edit [`src/components/experience.js`](./src/components/experience.js):
  - Update career milestones, roles, and accomplishments in the `EXPERIENCES` array.

### Color Palette & Theme Tokens
- Edit [`src/styles/base.css`](./src/styles/base.css):
  - The `:root` selector contains all CSS variables for primary blue shades (`--clr-primary-*`), neutral grays (`--clr-grey-*`), surfaces, and typography tokens.

---

## 🌐 Deployment

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select 'dist' as the public directory
# Configure as a single-page app: Yes
npm run build
firebase deploy --only hosting
```

### Deploy to Vercel or Netlify
1. Connect your GitHub repository to Vercel or Netlify.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Add your `VITE_FIREBASE_*` environment variables in your project settings.
