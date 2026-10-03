# SnapLink

The web UI for SnapLink, a small URL shortener that turns a long URL into a short
`programicle.com/<code>` link.

- **Live:** https://snaplink.programicle.com *(after deployment)*
- **API, architecture, and system-design docs:**
  [SnapLink-backend](https://github.com/mdabdulshahed/SnapLink-backend)

## What it does

Paste a URL, optionally pick when it expires (never, 1 hour to 30 days, or a date up to a year
out) and a custom alias, and get a short link to copy. There are no accounts and no
dashboard. That's deliberate: see the backend repo's docs for the reasoning.

## Stack

React + TypeScript + Vite + Tailwind CSS v4, deployed on Vercel. The only network call is
`POST /api/links` (see `src/api.ts`).

```text
src/
├── App.tsx              page shell: header, footer, picks the page by URL path
├── ShortenForm.tsx      the form, loading/error states, expiry calculation
├── ForwardingLabel.tsx  the result: short link, details, copy button, date stamp
├── TermsPage.tsx        /terms
├── api.ts               createLink(): turns API errors into readable messages
└── index.css            Tailwind theme (colours, fonts) and the few custom styles
```

A few decisions worth knowing:

- **No router.** Two pages don't need one. `App.tsx` checks `window.location.pathname`, and
  `vercel.json` sends every path to `index.html`.
- **Expiry is computed in the browser.** "7 days" becomes an absolute `expiresAt` timestamp,
  so the API only has to understand one format. The API enforces the one-year limit itself.
- **Error messages come from the API.** It writes them for people (e.g. *"The alias "github"
  is already taken."*), so the UI shows them as they are instead of keeping a second copy.
- **Cold starts are explained.** The free API host sleeps when idle. If a request takes more
  than 4 seconds, the form says the server is waking up instead of looking frozen.
- **Fonts are self-hosted** via `@fontsource`, with no requests to Google Fonts.

## Running locally

Requirements: Node 22+, and the backend running on `http://localhost:4000` (see its README).

```bash
cp .env.example .env     # VITE_API_URL=http://localhost:4000
npm install
npm run dev              # http://localhost:5173
```

`npm run build` type-checks and builds to `dist/`.

## Deploying (Vercel)

- Framework preset: Vite. Build command `npm run build`, output `dist`.
- Environment variable: `VITE_API_URL=https://api.snaplink.programicle.com`.
- Custom domain: `snaplink.programicle.com` (CNAME → `cname.vercel-dns.com`, DNS only in Cloudflare).
- The API must allow this origin: `FRONTEND_ORIGIN=https://snaplink.programicle.com` on the backend.
