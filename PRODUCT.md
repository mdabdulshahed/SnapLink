# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite + Tailwind CSS, deployed to Vercel at `snaplink.programicle.com`.
Pinned by the user in the project brief. The API lives in a separate repo
(`SnapLink-backend`, Express on Render at `api.snaplink.programicle.com`).

## Users

Two audiences, weighted equally:

- **People making a short link**: the owner, friends, anyone with a long URL to share. They
  arrive, paste, optionally pick an expiry or alias, copy the result, and leave. Usually a
  few seconds long.
- **Evaluators**: recruiters and interviewers who clicked through from the owner's portfolio
  or CV. They try the tool once, then want a quiet path to how it works (source repos,
  system-design docs).

## Product Purpose

A small URL shortener that turns a long URL into `https://programicle.com/<code>`. It exists
as a portfolio and system-design learning project: it must work properly, and the whole
system must be explainable end to end. Success is a link made and copied in seconds, and an
evaluator who leaves understanding that it's a real, deliberately designed system.

## Positioning

Intentionally small and honest. It's a hobby project with no accounts, analytics, or
dashboard, and its depth is in the engineering (collision-safe codes, expiry semantics,
edge routing), not in features.

## Operating Context

- Short links live on the main domain `programicle.com/<code>`. The UI lives on
  `snaplink.programicle.com`.
- No user accounts, so there is no "my links" history. A created link exists only in the
  result view until the user copies it.
- The free-tier API can be asleep, so the first request after idle can take 30–60 s.

## Capabilities and Constraints

- Create a short link: long URL (http/https only, ≤ 2048 chars), optional custom alias
  (3–30 chars, `A-Z a-z 0-9 - _`, case-insensitive, stored lowercase), optional expiry
  (Never, 1 hour, 1 day, 7 days, 30 days, Custom up to 1 year).
- API errors: 400 validation (message is shown to the user as-is), 409 alias taken,
  429 rate limited (Phase 5), 500.
- Pages: the shortener (`/`) and Terms of Use (`/terms`).
- Required hobby notice near the form, with this exact text: "Please note: SnapLink is a
  hobby project provided for demonstration and personal experimentation. Short URLs may be
  deleted, disabled, or expire at any time. Do not use SnapLink for critical, permanent, or
  commercial links."
- Explicitly out of scope: login, accounts, dashboards, analytics, click tracking, payments,
  admin.
- Code must stay small, simple, and read as human-written.

## Brand Commitments

- Name: **SnapLink**. It has its own identity and is not styled as part of the Programicle
  brand. Programicle is only the domain it runs on.
- Voice: plain, direct, modest. Don't oversell it.

## Evidence on Hand

- Real system docs in the backend repo (`docs/ARCHITECTURE.md`, `HLD.md`, `LLD.md`,
  `DATABASE.md`, `TRADEOFFS.md`, `API.md`).
- Source repos: `github.com/mdabdulshahed/SnapLink` and `github.com/mdabdulshahed/SnapLink-backend`.
- No users, usage numbers, testimonials, or uptime figures exist. Never invent them.

## Product Principles

1. The tool is the page: paste → shorten → copy, with nothing in the way.
2. Honest about limits: hobby status, expiry, and cold starts are stated plainly.
3. Depth on request: engineering detail is one quiet click away, never in the way.
4. Every state is designed: loading (including slow cold starts), errors, and success.

## Accessibility & Inclusion

No product-specific standard was set. The baseline is WCAG 2.2 AA: labelled inputs, visible
focus, errors announced to screen readers, and the copy action confirmed in text, not only by colour.
