---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/TermsPage.tsx"]
---

# Surface: SnapLink shortener (`/`) and Terms (`/terms`)

Mode: Operate. Audience: link makers (paste, copy, leave) and evaluators (try once, then
look for how it works). Task: create a short link with optional expiry and alias, copy it.
Constraints: required hobby notice verbatim near the form; Terms link in footer; no
accounts/history; free-tier cold starts of up to ~60 s must be explained while loading.

## Direction contract

THESIS: A short link is a mail forwarding order: mail for this short address goes to that
long one, valid until a date. Refuses the category default of a centred card with one
input and an indigo button floating on a soft gradient.

OWN-WORLD: Postal redirection stock. White label ground on a cool airmail-blue-tinted page,
postal red (#c8102e) owns the shell (wordmark, primary action, label rules), airmail blue
(#1c3f94) carries links, focus, and the date stamp, ink #141414. An airmail chevron stripe
edges the top of the page. Barlow / Barlow Condensed (self-hosted), tabular figures for dates.
Square corners, 1px and 2px red rules, no soft shadows.

STORY: Visitors see what it does in one line, paste, choose expiry or alias, and get a
forwarding label they can copy at once. Evaluators find "How it works" and "Source" in the
header without hunting.

FIRST VIEWPORT: Airmail stripe; header row with the red SnapLink wordmark left and How it
works / Source right. Left-aligned heading and one-line explanation, then the order form:
full-width Long URL, then Expires and Custom alias (with programicle.com/ prefix) side by
side, then a red Create short link button. The hobby notice sits directly under the form.
After creation, the forwarding label lands below: the short URL at poster scale with Copy,
ruled rows for Forwards to / Created / Expires, and a blue circular date stamp. The
signature move is the stamp landing once with the label.

FORM: Mail forwarding order (postal redirection label), IMPECCABLE'S PICK, ranked 1 of 7
on my grounded list; seed key 4b884ebc.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
