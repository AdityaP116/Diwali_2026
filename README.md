<div align="center">

# 🪔 DiwaliVerse — The Digital Festival of Lights

**An immersive, cinematic 3D Diwali celebration web experience blending authentic Indian heritage rituals with creative web engineering.**

[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Explore Live Demo](https://diwali-2026.vercel.app/) • [Report Bug](https://github.com/AdityaP116/Diwali_2026/issues) • [Request Feature](https://github.com/AdityaP116/Diwali_2026/issues)

</div>

---

## 🌟 Overview

**DiwaliVerse** reimagines the sacred atmosphere of Deepavali through interactive digital craftsmanship. From a metallic 3D brass oil lamp with real-time specular highlights to a communal wish sanctuary, an interactive radial mandala rangoli canvas, eco-friendly pyrotechnics, and custom festive greeting cards, DiwaliVerse brings the radiance of the festival directly to the browser.

Lovingly created and shared by **Aditya Pushpakar**.

---

## ✨ Interactive Studios & Key Features

### 🪔 1. Interactive 3D Brass Diya (Centerpiece)
- **Authentic Lathe Geometry**: Modeled after traditional Indian brass *Deepams* with a stepped pedestal foot, fluted oil reservoir, polished bead filigree, and cotton wick.
- **Dynamic WebGL Lighting**: Three.js rendering engine with key, fill, and specular rim lights accentuating high-metalness brass reflections.
- **Organic Flame Animation**: Multi-layered flame core with turbulent noise flickering, warm aura blending, and interactive 360° mouse/touch orbit rotation.
- **Transparent Canvas Composition**: Perfectly blends into the website's midnight-and-gold backdrop without visual seams or rectangular borders.

### 🏛️ 2. Courtyard of Eternal Light (`Light a Diya`)
- **Sacred Dusk Courtyard**: Canvas-based communal sanctum with subtle mandala stone floor geometry.
- **Personalized Dedications**: Choose your flame aura (*Gold, Warm Amber, Sacred Fire, Rose Radiance*), add custom family prayers or peace wishes.
- **Community Interaction**: Browse existing diyas across the courtyard, view blessings, and send warm likes (*persisted locally via `localStorage`*).

### 🎨 3. Rangoli Art Studio
- **Generative Radial Symmetry**: Draw intricate traditional mandalas with instant multi-fold symmetry (`4x`, `6x`, `8x`, `12x`, `16x`).
- **Authentic Color & Brush Effects**: Auspicious palette (*Kumkum Red, Marigold Gold, Peacock Teal, Lotus Rose*) paired with glowing, powder, or solid stroke styles.
- **Artist Tools**: Full undo stack, guideline overlays, and instant high-resolution PNG export.

### 🎆 4. Eco-Friendly Fireworks Playground
- **Zero-Pollution Pyrotechnics**: High-performance particle physics simulating 5 classic firework types (*Chrysanthemum, Willow, Burst, Ring, Chakra*).
- **Realistic Synthesized Sound Engine**: Audio synthesized in real time via the Web Audio API — whistling rocket ascents, deep thuds, and authentic Indian firecracker crackles without external heavy audio samples.

### 💌 5. Wish Studio & Greeting Card Generator
- **Bespoke Festive Cards**: Curated classical blessings in Sanskrit and English, customizable sender & recipient names, and festive motif badges.
- **Theme Customization**: Multiple festive colorways (*Midnight Gold, Sacred Crimson, Royal Emerald, Celestial Indigo*).
- **Social Sharing**: One-click download as a high-resolution PNG ready for WhatsApp, Instagram, and family groups.

### 🎵 6. Festive Ambience Audio Engine
- Ambient classical festive drone and soothing temple bell chimes that can be toggled on demand via the navigation bar.

---

## 🎨 Design System

DiwaliVerse is built with a restrained, luxury midnight-and-gold color palette:

| Color Token | Hex Code | Role |
| :--- | :--- | :--- |
| **Midnight Background** | `#080E1C` | Primary application canvas |
| **Deep Blue Surface** | `#111D32` | Glass containers, card bodies |
| **Slate Blue Elevated** | `#24334B` | Elevated panels, subtle borders |
| **Champagne Gold** | `#D9B66F` | Primary CTAs, active highlights |
| **Warm Ivory** | `#FFF1D8` | Editorial headlines, crisp text |
| **Muted Secondary** | `#A6B0C2` | Subtitles, helper text |

**Typography:**
- **Editorial Headings**: *Cormorant Garamond*
- **UI / Body / Controls**: *Manrope*
- **Sacred Inscriptions**: *Noto Serif Devanagari*

---

## 🏗️ Architecture & Performance

- **Zero-Backend Client Architecture**: Fully serverless and static; runs 100% in the client browser with zero API latency.
- **Code Splitting & Lazy Loading**: All heavy studio modules (`LightADiyaStudio`, `RangoliStudio`, `FireworksPlayground`, `WishStudio`) are loaded dynamically using `React.lazy()` and `Suspense`.
- **Chunk Partitioning**: Third-party runtime dependencies (`three` and `framer-motion`) are segmented into dedicated vendor chunks via Vite's Rollup manual chunk configuration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AdityaP116/Diwali_2026.git
   cd Diwali_2026
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```text
Diwali_2026/
├── index.html                   # HTML entry point with fonts & theme tokens
├── package.json                 # Project dependencies and build scripts
├── tailwind.config.js           # Design tokens, shadows, and radial gradients
├── vite.config.ts               # Vite configuration and code-splitting rules
├── tsconfig.json                # TypeScript compiler configuration
└── src/
    ├── App.tsx                  # Root component with lazy-loaded studio routing
    ├── main.tsx                 # React DOM mount point
    ├── index.css                # Global styles, glass panels, scrollbar tokens
    ├── types/                   # TypeScript interfaces (Diyas, Cards, Wishes)
    ├── utils/
    │   ├── soundEffects.ts      # Web Audio API engine (bells, firecrackers, ambience)
    │   └── diyaStorage.ts       # LocalStorage persistence utility
    └── components/
        ├── Navbar.tsx           # Responsive navigation & audio toggle
        ├── Hero.tsx             # Editorial hero with CTAs and 3D mount
        ├── Diya3DCanvas.tsx     # Three.js 3D brass diya & organic flame
        ├── ExperiencesSection.tsx # Asymmetric studio cards grid
        ├── FestiveMessage.tsx   # Sanskrit blessing & creator attribution
        ├── Footer.tsx           # Festive footer links & copyright
        ├── LightADiyaStudio.tsx # Sanctuary studio wrapper
        ├── DiyaCourtyardCanvas.tsx # 2D canvas for courtyard diyas
        ├── LightDiyaForm.tsx    # Modal form to light new diya
        ├── DiyaWishDetailModal.tsx # Modal to read and bless wishes
        ├── RangoliStudio.tsx    # Generative symmetry rangoli canvas
        ├── FireworksPlayground.tsx # Real-time particle fireworks & sound
        └── WishStudio.tsx       # Custom festive greeting card creator
```

---

## 🌐 Deployment

The repository is deployment-ready for platforms like **Vercel**, **Netlify**, or **GitHub Pages**:

### Deploy to Vercel
1. Push your changes to your GitHub branch (`main`).
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. The build settings are auto-detected:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Lovingly created for Diwali 2026 by <b>Aditya Pushpakar</b> ❤️</sub>
</div>
