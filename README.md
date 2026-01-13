# Dario Mazza - Personal Portfolio

This is the source code for my personal portfolio website. It serves as a showcase of my technical projects, professional experience, and certifications.

The site is built with **Astro** for optimal performance, using a content-driven approach with TypeScript for type safety.

## ✨ Features & Tech Stack

- **Framework:** [Astro](https://astro.build/) (v5.x)
- **UI & Interactivity:** React components with Framer Motion for smooth animations.
- **Styling:** Custom CSS with a focus on dark mode and high-performance rendering.
- **Icons:** [Astro Icon](https://www.astroicon.dev/) leveraging Iconify (Heroicons, MDI).
- **Typography:** Inter and JetBrains Mono via Fontsource.
- **Package Manager:** pnpm

## 📂 Project Structure

```text
/
├── public/           # Static assets (Resume, PDF reports, favicons)
├── src/
│   ├── assets/       # Optimized images and media
│   ├── components/   # UI Components (.astro and .tsx)
│   ├── data/         # Content definitions (experience.ts, projects.ts)
│   ├── layouts/      # Page layouts (Base and Home)
│   ├── pages/        # File-based routing (index.astro, archive.astro)
│   └── styles/       # Global CSS and themes
└── package.json      # Dependencies and scripts
```

## 🛠️ Development

### Setup

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Start development server:**
    ```bash
    pnpm dev
    ```

### Build

To generate the static site for production:
```bash
pnpm build
```

## 🎨 Credits & Inspiration

The design and layout of this portfolio are heavily inspired by the work of **[Brittany Chiang](https://brittanychiang.com/)**. I've adapted the aesthetic to suit my personal branding and technical needs.

---
© 2026 Dario Mazza