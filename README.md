# Youth Sports App

Team dashboard for a youth basketball season, built with React + Vite + Tailwind CSS.

## What It Does

- Shows schedule, standings, roster, and weekly focus.
- Calculates team record from game outcomes.
- Uses a mobile-first card UI styled with Tailwind.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the URL printed by Vite (usually `http://localhost:5173`).

## Scripts

- `npm run dev`: start local dev server with HMR.
- `npm run build`: production build into `dist/`.
- `npm run preview`: preview production build locally.
- `npm run lint`: run ESLint checks.

## Project Structure

- `src/App.jsx`: top-level app state and orchestration.
- `src/components/`: UI sections and reusable visual components.
- `src/components/ui/`: low-level primitives (`Card`, `Badge`).
- `src/data/constants.js`: app seed data and static configuration.
- `src/lib/`: schedule helpers.
- `src/assets/`: team graphics.

## Quality Checks

Run before committing:

```bash
npm run lint
npm run build
```
