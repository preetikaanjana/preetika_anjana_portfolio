# 🌸 Preetika Anjana — Creative Portfolio & Space 🌸

Welcome to the official repository of **Preetika Anjana's** personal portfolio. Designed to be *"girly but professional"*, this single-page website showcases expertise in the MERN stack and Machine Learning, wrapped in a premium, fluid aesthetic (combining a cozy pastel **Sakura Light** mode and a sleek dark **Rose Pine** mode).

---

## ✨ Features at a Glance

*   **🌸 Dual Aesthetic Modes**: Toggle between a soft cream/rose gold light mode and a deep plum/mauve dark mode.
*   **✨ Sparkle Ambient Physics**: A dynamic HTML5 Canvas particle engine that creates floating sakura petals, stars, and hearts that react to clicks.
*   **💻 Balanced Grid Layouts**: 
    *   Left-aligned, square tech stack cards (wrapping cleanly on desktop and stacking on mobile).
    *   Featured projects grid supporting a maximum of 3 columns to prevent layout gaps.
*   **✉️ Silent Contact Delivery**: Integrates **Web3Forms AJAX API** to deliver client messages straight to your inbox silently without redirecting the page.
*   **📱 Phone Responsive**: Tailored media queries that scale typography and fit logo emblems cleanly down to 320px viewports, including a custom dark pink sliding mobile menu.
*   **📄 Direct Resume Access**: Features an active header button to open your PDF resume natively inside the active browser tab.

---

## 🛠️ Tech Stack

<div align="left">
  <table>
    <tr>
      <td><b>Frontend</b></td>
      <td>HTML5, CSS3 (Vanilla Variables), JavaScript (ES6+), Lucide Icons</td>
    </tr>
    <tr>
      <td><b>Interactivity</b></td>
      <td>HTML5 Canvas (Particle Physics), Intersection Observer (Scroll Reveal), Typewriter Engine</td>
    </tr>
    <tr>
      <td><b>Forms & Mail</b></td>
      <td>Web3Forms AJAX API Integration</td>
    </tr>
    <tr>
      <td><b>Theme Colors</b></td>
      <td>🌸 Sakura Light Theme, 🌲 Rose Pine Dark Theme</td>
    </tr>
  </table>
</div>

---

## 📂 Project Structure

All assets are cleanly organized to keep the root directory neat:

```bash
preetika_anjana_portfolio/
├── images/                           # 📸 All graphic assets & icons
│   ├── fevicon.png                   # Custom browser tab icon
│   ├── github_logo.png               # Custom white outline GitHub logo
│   ├── linkedin_logo.png             # Custom white outline LinkedIn logo
│   ├── instagram_logo.png            # Custom white outline Instagram logo
│   └── image.png                     # Main profile photo / branding emblem
├── index.html                        # 📄 Main HTML5 entry file
├── style.css                         # 🎨 Vanilla CSS design system & responsiveness
├── script.js                         # ⚙️ Interactive loops & form handlers
├── preetika_anjana_resume.pdf        # 📄 Native PDF resume document
└── README.md                         # 🌸 This aesthetic guide
```

---

## 🚀 Quick Start

1.  **Run Locally**: Simply double-click the `index.html` file or open the folder using a local server extension (like VS Code Live Server).
2.  **Edit Contact Form Key**: The contact form is currently configured to send messages directly to your Gmail inbox. If you ever need to change your Web3Forms access key, open `script.js` and edit the `access_key` value inside `initContactForm()`:
    ```javascript
    body: JSON.stringify({
      access_key: "YOUR_ACCESS_KEY_HERE",
      name: name,
      email: email,
      message: message
    })
    ```

---

## 📝 Customization Guide

### 🎨 Changing Theme Colors
To customize the color palette, open [style.css](style.css) and adjust the HSL/HEX custom variables inside the `:root` and `[data-theme="dark"]` selectors:
```css
:root {
  --bg-primary: #FAF6F0;       /* Light mode background */
  --accent-primary: #FF85A2;   /* Light mode signature pink */
}

[data-theme="dark"] {
  --bg-primary: #191724;       /* Dark mode background */
  --accent-primary: #ebbcba;   /* Dark mode signature pink */
}
```

### 🌸 Adding New Projects
To add more projects, duplicate a `.project-card` block inside the `.projects-grid` container in [index.html](index.html). Since the layout uses a `grid-template-columns: repeat(3, 1fr)` template on desktop, adding projects in multiples of 3 will keep the grid balanced!

---

<p align="center">
  Crafted with ❤, code, and pastel pixels by Preetika Anjana.
</p>
