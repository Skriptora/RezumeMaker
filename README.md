# RezumeMaker

A React and TypeScript resume builder built with Vite.

## Development

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## GitHub Pages deployment

Pushing to `main` or `master` builds the app and deploys `dist/` to GitHub Pages
using the workflow in `.github/workflows/deploy.yml`. The first deployment may
require enabling **Settings → Pages → Build and deployment → GitHub Actions**.
