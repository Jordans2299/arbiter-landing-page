# Arbiter — Private AI on Your Device (Landing Page)

This repository contains the **public marketing site** for Arbiter, a private AI assistant that runs locally on user devices. The site presents the product vision, features, team, and FAQ, and provides calls to action for beta participation.

Live site: **[https://www.askarbiter.ai/](https://askarbiter.ai)**

---

## Overview

The landing page is a single HTML file with inline CSS and JavaScript. It features:

- **Floating planets background** for visual identity.
- **Hero section** with tagline and beta sign-up buttons.
- **Slideshow** showcasing app screens.
- **Feature highlights** with iconography.
- **Mission statement** explaining Arbiter’s privacy-first approach.
- **Team section** with clickable bios.
- **FAQ** addressing privacy, offline use, supported devices, and models.
- **Contact** email in footer.

---

## File Structure

```
/ (root)
├─ index.html             # Main page (all HTML/CSS/JS inline)
├─ newlogo.png            # Header logo
├─ up-right-...svg        # Expand icon for team cards
└─ README.md              # This file
```

---

## Content Sections

### Hero
- Tagline: “A.I. designed for you, only for you.”
- Buttons:
  - **Join the TestFlight Beta** (placeholder link)
  - **Request Invite** (opens modal)

### Slideshow
- Four screens:
  1. Creative AI Conversations
  2. Model Settings
  3. Technical Conversations
  4. Code Generation

### Features
- Manage multiple models  
- Chat privately on-device  
- Hybrid inference for speed & flexibility  
- Search augmentation  
- Multimodal input (planned)  
- Open-source foundation

### Mission
Arbiter empowers users to run AI locally for privacy, control, and transparency, reducing reliance on external servers.

### Team
- Jordan Stone — CEO & CTO  
- Yousef Abu-Salah — CDO  
- Harpreet Singh — CFO  
- Smith Patel — COO  

Each profile links to LinkedIn and email (modal view).

### FAQ
Topics:
- Privacy & data security
- Offline usage
- How local AI works
- Supported devices
- Available models

### Contact
Email: **hello@askarbiter.ai**

---

## Visual & UX Details

- **Planets**: Positioned left, right, and center, animated with gentle float. Hidden on mobile for clarity and performance.
- **Team cards**: Equalized heights for consistency. Expand icon signals clickability.
- **Colors**: Purple theme defined in CSS `:root` for easy updates.
- **Responsive design**: Scales across desktop, tablet, and mobile.

---

## Deployment

- Hosted via **GitHub Pages**
- Public branch: `main`
- No build process — `index.html` is served directly.
