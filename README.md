# Goutham's Portfolio

<div align="center">
  <h3><strong><a href="https://goutham-portfolio7.vercel.app/">View Live Portfolio</a></strong></h3>
</div>

<br />

A high-performance, cinematic, 3D-integrated personal portfolio built for modern web browsers. This project serves as a showcase of my work in Software Engineering, AI, and Web Development, wrapped in a premium, highly interactive user experience.

---

##  Key Features

- **3D Graphics Engine:** Custom WebGL implementation using **Three.js** featuring a dynamic particle field, wireframe grids, and an interactive icosahedron mesh.
- **Scroll-Driven Cinematic Lighting:** The 3D scene lighting and camera dynamically transition as the user scrolls through different sections of the page.
- **Fluid & Responsive Design:** Fully responsive layout utilizing CSS `clamp()` functions for continuous, mathematically perfect fluid typography and spacing on any device.
- **Buttery Smooth Scrolling:** Integrated with **Lenis** to provide a high-end, frictionless scroll experience.
- **Hardware-Accelerated Animations:** Scroll-triggered reveals, layout shifts, and micro-interactions powered by **Framer Motion**.
- **Performance First:** The WebGL engine is strictly lazy-loaded *after* the initial DOM paint, ensuring ultra-fast load times. 3D effects elegantly fall back on mobile devices to save battery and performance.

---

## Tech Stack

**Core:**
- **[React 18](https://reactjs.org/)** - UI Framework
- **[Three.js](https://threejs.org/)** - 3D WebGL Rendering Engine
- **[Framer Motion](https://www.framer.com/motion/)** - Declarative Animations

**Styling & UX:**
- **Vanilla CSS3** - Custom design system using advanced CSS variables and flex/grid layouts.
- **[Lenis](https://lenis.studiofreight.com/)** - Smooth Scroll API

**Deployment:**
- **[Vercel](https://vercel.com/)** - CI/CD and Edge Hosting

---

##  Getting Started

To run this project locally on your machine:

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/goutham-751/my_portfolio.git
   cd my_portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **View in browser:**
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🎨 Architecture & Design System

This project abandons heavy component libraries (like Material UI or Tailwind) in favor of a **bespoke Vanilla CSS design system**. 

- **The 3-Color Rule:** Deep charcoals, alabaster/bone backgrounds, and microscopic vibrant teal/red accents.
- **Glassmorphism:** Subtle background blurring to allow the 3D canvas to bleed through without sacrificing text readability.
- **Dynamic Scale:** Spacing and typography automatically adjust to the exact pixel width of the user's monitor.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to fork it, learn from the WebGL integrations, and use it to build your own portfolio!
