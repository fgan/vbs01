# vbs01

Frontend-only helper app for a game. React + TypeScript + Vite, hosted on
GitHub Pages at **https://fgan.github.io/vbs01/**.

There is no backend. All state lives in the browser via `localStorage`
(see `src/useLocalStorage.ts`).

## Develop

```sh
npm install
npm run dev      # http://localhost:5173/vbs01/
```

## Build

```sh
npm run build    # type-check + bundle to dist/
npm run preview  # serve dist/ locally, exactly as Pages will
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. No manual step.

## Notes

- `vite.config.ts` sets `base: '/vbs01/'` because the site is served from a
  subpath. Renaming the repo means updating that value.
- If you add client-side routing, use `HashRouter` — Pages has no server to
  rewrite deep links to `index.html`.
