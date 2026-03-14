# 🚀 Acedu Bootcamp Website & AI Assistant

An interactive, production‑ready landing website for **Acedu BootCamp** — a modern software development training academy. Built with **React (Vite)**, **Tailwind CSS**, and **Framer Motion**, the project combines a marketing website with a smart **AI Assistant** and an optional **Node/Express backend** for live AI integration.

---

## 📌 Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Running the App](#running-the-app)
8. [AI Assistant & Tutor](#ai-assistant--tutor)
9. [AI Chat Page](#ai-chat-page)
10. [Developer Notes](#developer-notes)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)

---

## 🧠 Overview

This repository contains the full front‑end for **Acedu BootCamp**, designed to:

* Showcase courses, projects, and bootcamp offerings
* Guide visitors using a floating **AI Assistant**
* Provide a **guided tutor mode** that walks users through the site
* Optionally connect to **DeepSeek (or any LLM provider)** via a backend for live AI responses

By default, the app runs entirely with a **fake AI (Smart Guide)** — no API key required. When you’re ready, you can enable live AI without changing the UX.

---

## ✨ Key Features

### 🌐 Marketing Website

* Home
* About
* Courses (`/course/:id`)
* Projects
* Register / Enroll
* Dedicated AI Chat Page (`/ai-chat`)

Fully responsive and styled with Tailwind CSS.

---

### 🤖 AI Assistant (Smart Guide)

* Floating chat widget available site‑wide
* Chat UI with quick prompts
* Answers common questions about:

  * Courses
  * Duration & fees
  * Career paths
  * Enrollment
* Can **navigate users** to pages and **scroll to specific sections**

---

### 🧭 Tutor Mode (Guided Tour)

Trigger phrases:

* `SHOW ME AROUND`
* `TELL ME ABOUT ACEDU`

Tutor flow:

```js
['home', 'about', 'course', 'project', 'AIpage', 'Enroll']
```

Behavior:

* Automatically navigates and scrolls through the site
* Explains each section step‑by‑step
* Stores progress in `localStorage` (`acedu_tutor_state`) for **10 minutes**
* Supports:

  * Resume (`continue tutor`, `resume tutor`)
  * Restart (`restart tutor`, `start over`)
  * Stop (`stop`, `enough`, `thank you`, `bye`)

---

### 🧠 Live AI (Optional)

When enabled:

* Frontend sends chat messages to a Node/Express backend
* Backend forwards requests to **DeepSeek** (or another AI provider)
* Responses are returned to the UI
* **Navigation and tutor logic remain deterministic** via the fake assistant

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* React Router
* Tailwind CSS
* Framer Motion
* React Icons
* Lucide / Lucide‑React

### Backend (Optional)

* Node.js (18+ recommended)
* Express
* CORS
* dotenv
* DeepSeek API (or any LLM provider)

---

## 📁 Project Structure

```text
.
├─ server.js                    # Optional Express backend (DeepSeek proxy)
├─ package.json
├─ vite.config.js
├─ src
│  ├─ main.jsx                  # React entry
│  ├─ App.jsx                   # Main router & layout
│  ├─ data
│  │  └─ Data.js                # Courses, projects, site content
│  ├─ ai
│  │  ├─ fakeAssistant.js       # Smart Guide + Tutor logic
│  │  └─ liveAssistant.js       # Frontend helper for live AI
│  ├─ components
│  │  ├─ AIAssistant.jsx        # Floating AI widget
│  │  ├─ AppButton.jsx          # Reusable button
│  │  ├─ AlertToast.jsx         # Animated alert (optional)
│  │  ├─ Navbar.jsx             # Navigation bar
│  │  └─ Footer.jsx
│  ├─ pages
│  │  ├─ Homepage.jsx
│  │  ├─ AboutPage.jsx
│  │  ├─ CoursePage.jsx
│  │  ├─ ProjectsPage.jsx
│  │  ├─ Register.jsx
│  │  └─ AIChatPage.jsx         # Full‑screen AI chat
│  └─ ScrollToTop.jsx
└─ ...
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js **18+** (Node 22 works fine)
* npm

### 1. Clone the Repository

```bash
git clone <your-repo-url> acedu-bootcamp
cd acedu-bootcamp
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

### Frontend (Vite)

Create `.env` or `.env.local` in the project root:

```env
VITE_ENABLE_LIVE_AI=false
VITE_API_BASE_URL=http://localhost:3000
```

* `false` → use built‑in fake AI (recommended for development)
* `true` → enable live AI via backend

---

### Backend (Optional)

Create `.env` next to `server.js`:

```env
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
```

⚠️ **Never commit this file to GitHub**

---

## ▶️ Running the App

### Start Backend (Optional)

```bash
npm run server
```

Runs at: `http://localhost:3000`

### Start Frontend

```bash
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

---

## 🤖 AI Assistant & Tutor

### Smart Guide (Fake AI)

* Implemented in `src/ai/fakeAssistant.js`
* Returns structured responses:

```js
{
  text,
  navigateTo,
  scrollToSectionId
}
```

### Navigation Behavior

* If `navigateTo` exists → React Router navigation
* If `scrollToSectionId` exists → smooth scroll

### Tutor State

Stored in `localStorage`:

```json
{
  "active": true,
  "index": 2,
  "updatedAt": 1730000000000
}
```

Expires after **10 minutes**.

---

## 💬 AI Chat Page

`/ai-chat` provides a full‑screen chat experience:

* Uses Smart Guide logic
* Styled with dark / red theme
* Quick prompts included
* Ideal for long conversations

The floating assistant remains available site‑wide.

---

## 🖼 New Maker (Image Box Creator)

A lightweight, admin-only editor for creating floating image boxes that appear across the site. It ships as `src/components/NewMaker.jsx` and supports uploads, scheduling, mobile-specific sizing, and automatic expiry cleanup.

- **Uploads:** Images are uploaded to Cloudinary (5 MB limit) via an in-component helper. The component uses a `cloudName` and `uploadPreset` configured inside the file — consider moving these secrets to your backend or environment in production.
- **Boxes:** Maximum of 4 active boxes. Each box supports:
  - Image, fit & position
  - Desktop + optional mobile-specific width/height
  - Position (top-left, top-right, bottom-left, bottom-right)
  - Background type (solid / gradient / glass), blur, opacity, border radius
  - Button with text / link (predefined internal routes or custom)
  - Animation presets and display duration / schedule
- **Scheduling & Expiry:** Boxes can be shown always, for a duration (days since creation), or scheduled between start/end dates and times. Expired boxes are automatically detected and removed; the component also attempts Cloudinary cleanup for deleted images.
- **Carousel & Auto-rotate:** If multiple visible boxes exist, the component can auto-rotate them (carousel behavior) with configurable timing.
- **API / Backend:** New Maker expects a small backend API to persist boxes and to clean Cloudinary images. The component currently points at `https://school-backend-frri.onrender.com/api`. Required endpoints:
  - `GET /boxes` — list boxes
  - `POST /boxes` — create box
  - `PUT /boxes/:id` — update box
  - `DELETE /boxes/:id` — delete box
  - `POST /delete-cloudinary-image` — remove an image by public id (optional helper)

Notes:
- The component contains helpful defaults but is intended to be wired to a backend for production use.
- Consider adding a small `.env.example` with `VITE_API_BASE_URL` and moving Cloudinary secrets into the backend for security.


## 🧑‍💻 Developer Notes

* Tailwind utility‑first styling
* Framer Motion for animations
* Deterministic navigation logic (AI cannot break routing)
* Easy to swap AI providers in the backend

---

## 🧯 Troubleshooting

* Ensure Node version is compatible
* Check port conflicts (5173, 3000)
* Verify `.env` variables if live AI fails
* Inspect backend logs for API errors

---



## ⚖️ License

This project is released under the MIT License. See the included [LICENSE](LICENSE) file for full terms. Update the license or the copyright holder as appropriate for your project.

## 📬 Contact

If you'd like to get in touch

- **Maintainer** Aboyade Matthew
- **Email:** aboyadematthew@gmail.com
- **Phone:** 09125701625

