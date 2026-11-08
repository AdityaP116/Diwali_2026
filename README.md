# DiwaliVerse 🪔

> **Light Up the Festival. Share the Happiness.**
> *A festive celebration, lovingly created and shared by Aditya Pushpakar.*

An immersive, interactive digital Diwali celebration website crafted with a cinematic festive aesthetic.

---

## ✨ Features

- **Atmospheric Visual Design**: Midnight navy backgrounds (`#080B18`, `#101629`), sacred 16-fold lotus mandala geometry, traditional marigold toran festoons with hanging brass dipams, and fluid floating golden embers.
- **Background Raga Music & Web Audio FX**: Meditative Indian classical raga (Raga Yaman / Bhoopali) with authentic bamboo flute (Bansuri) meend glides, crystal Santoor plucks, continuous tanpura foundation, and temple bell chimes.
- **Realistic Handcrafted Diya Centerpiece**: Traditional terracotta earthen diya with gold-filigree rim, oil pool reflections, cotton wick, and multi-stage organic flickering flame.
- **All 4 Curated Interactive Studios**:
  1. 🪔 **Light a Diya** — Canvas-based sacred courtyard at dusk. Ignite digital diyas, dedicate custom wishes, choose flame auras, and browse community wishes with persistent like counters via `localStorage`.
  2. 🎨 **Rangoli Studio** — Real-time radial drawing engine with multi-fold symmetry (4x, 6x, 8x, 12x), sacred colors, glowing and powder particle brushes, undo history, and PNG export.
  3. 🎆 **Fireworks Playground** — Eco-friendly night sky rocket simulation with realistic trails, 5 explosion patterns (Chrysanthemum, Burst, Willow, Ring, Chakra), and multi-stage audio synthesis.
  4. 💌 **Wish Studio** — Personalized gold-embossed greeting card designer with curated English/Sanskrit blessings, recipient/sender customization, and one-click high-resolution PNG download.
- **Personal Touch**: Subtle creator signatures for **Aditya Pushpakar** on homepage, footer, and optional greeting card watermarks.

---

## 🛠 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **Web Audio API** & **HTML5 Canvas 2D API** (No external heavyweight assets or backend required)

---

## 🚀 Quick Deployment Guide

This project is client-only with zero server or database requirements. It can be deployed in seconds to any static hosting provider.

### Option 1: Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel will automatically detect Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy! (`vercel.json` is pre-configured with SPA routing and asset caching).

### Option 2: Netlify
1. Connect repository on [netlify.com](https://netlify.com).
2. Set build command to `npm run build` and publish directory to `dist`.
3. Deploy! (`public/_redirects` is pre-configured for SPA fallback).

### Option 3: GitHub Pages
1. In `vite.config.ts`, set `base: './'` (or repository name).
2. Run `npm run build` and deploy the `dist/` directory via `gh-pages` or GitHub Actions.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checks and production build
npm run build

# Preview production build locally
npm run preview
```
