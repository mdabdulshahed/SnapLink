---
name: SnapLink
description: A short link is a mail forwarding order, printed on postal redirection stock.
colors:
  postal: "#c8102e"
  postal-dark: "#9e0c24"
  airmail: "#1c3f94"
  ink: "#141414"
  muted: "#4a5068"
  placeholder: "#676d85"
  envelope: "#eef1f8"
  rule: "#c9d0e0"
  label-white: "#ffffff"
typography:
  display:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
  headline:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.333
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  body-lead:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    letterSpacing: "0.05em"
  button:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  none: "0px"
spacing:
  gutter: "16px"
  gutter-wide: "24px"
  panel: "20px"
  panel-wide: "28px"
  stack-sm: "8px"
  stack-md: "24px"
  stack-lg: "32px"
  stack-xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.postal}"
    textColor: "{colors.label-white}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.postal-dark}"
  button-copy:
    backgroundColor: "{colors.airmail}"
    textColor: "{colors.label-white}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "48px"
  button-copy-hover:
    backgroundColor: "{colors.ink}"
  field:
    backgroundColor: "{colors.label-white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "48px"
  field-label:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  order-panel:
    backgroundColor: "{colors.label-white}"
    rounded: "{rounded.none}"
    padding: "20px"
  wordmark:
    textColor: "{colors.postal}"
    typography: "{typography.display}"
---

# Design System: SnapLink

## Overview

**Creative North Star: "Postal Redirection Stock"**

SnapLink treats every short link as a mail forwarding order: mail for this short address goes to that long one, valid until a date. The page is a cool airmail-blue envelope; the working surfaces are white labels edged in postal red; the result is stamped with a blue circular date mark. Density is low and the column is narrow, because the tool is one form and one result.

The world is flat printed stock. Depth comes from coloured rules and the white label sitting on the tinted page, never from shadow or rounding. Type is a condensed poster face for anything that would be printed on a form (headings, field names, buttons, the short URL), with a plain humanist sans for everything a person reads.

**Key Characteristics:**
- Airmail chevron stripe (red / white / blue, 8px) edges the top of every page.
- White label panels with a 2px postal-red border on a pale envelope ground.
- Square corners everywhere.
- Barlow Condensed uppercase for form vocabulary; Barlow for reading text.
- One signature motion: the date stamp lands once with the result.

## Colors

Two postal inks on cool paper: red owns the shell and the order, blue carries links, focus, and the stamp.

### Primary
- **Postal Red** (`postal`): wordmark, primary submit button, the 2px border of the order panel and forwarding label, the 1px rule under the label header, error box border, `theme-color`, favicon ground, text caret.
- **Franking Red** (`postal-dark`): primary button hover and error message text.

### Secondary
- **Airmail Blue** (`airmail`): every link, the focus outline, the copy button, the postmark, the select chevron, text selection, form `accent-color`, scrollbar thumb.

### Neutral
- **Ink** (`ink`): body text, field text, short URL on the label, copy button hover.
- **Slate Muted** (`muted`): explanatory text, helper text, row terms, footer, the `programicle.com/` prefix.
- **Slate Placeholder** (`placeholder`): input placeholders only.
- **Envelope** (`envelope`): page ground.
- **Ledger Rule** (`rule`): 1px field borders, row dividers inside the label, footer top rule.
- **Label White** (`label-white`): panels, fields, button text.

### Named Rules
**The Two Inks Rule.** Red marks the order (what you fill in and submit); blue marks the post office's response (links, focus, stamp, copy). Don't swap them.

**The White Label Rule.** Working surfaces are white on the envelope ground; the page itself is never white.

## Typography

**Display Font:** Barlow Condensed (fallback Barlow, sans-serif), self-hosted, weights 600 and 700
**Body Font:** Barlow (fallback system-ui, sans-serif), self-hosted, weights 400, 500, 600

**Character:** A condensed grotesque printed on forms and labels, paired with its own humanist regular width for reading. Same family, two jobs.

### Hierarchy
- **Display** (700, 48px / 60px from 640px, line-height 1, uppercase): page H1 and the SnapLink wordmark (wordmark at 30px, tracking 0.025em).
- **Headline** (700, 30px / 48px, line-height 1.25): the short URL on the forwarding label, in ink, at poster scale.
- **Title** (600, 24px, uppercase): section heads on Terms.
- **Body** (400, 16px, 1.5): form text, label rows, messages. Reading measure 65–70ch.
- **Body lead** (400, 18px): intro line under the H1 and Terms paragraphs.
- **Body small** (400, 14px): helper text, the hobby notice, header nav on phones, footer.
- **Label** (600, 18px, 0.05em, uppercase): field names and label row terms (row terms at 16px in muted).
- **Button** (600, 20px, 0.05em, uppercase).

### Named Rules
**The Tabular Dates Rule.** Dates and times in label rows use tabular figures.

**The Form Vocabulary Rule.** Barlow Condensed uppercase is for things printed on the form (headings, field names, row terms, buttons, the short URL). Sentences are Barlow in sentence case.

## Layout

Single left-aligned column (display steps to 60px and headline to 48px at 640px), max 768px, centred in the viewport, with 16px gutters (24px from 640px). Header row: wordmark left, two text links right. Main content starts 24px below the header (40px from 640px); footer sits under a 1px rule. Panels pad 20px (28px from 640px). Vertical rhythm uses 8 / 16 / 24 / 32 / 40px steps. The only breakpoint is 640px: alias and expiry go from stacked to two columns, the submit button from full width to auto, and the postmark moves from bottom-right (80px) to top-right (128px). The H1 is left-aligned, never centred.

## Elevation & Depth

Flat. There are no shadows. Depth is the white label on the envelope ground, bounded by red rules, and the stamp overprinted on the label.

### Named Rules
**The Printed Stock Rule.** Separation is a rule or a ground change, never a shadow or blur.

## Shapes

Square corners (0px) on every panel, field, button, and box. Borders are 1px ledger rule for fields and dividers, 1px postal red for errors and the label's header rule, 2px postal red for the order panel and forwarding label. The only round form is the postmark (two concentric blue rings with ring text), set at -8deg. Icons are drawn SVG with square line caps.

## Components

### Buttons
- **Shape:** square (0px), 48px tall, 32px horizontal padding, Button type.
- **Primary (Create short link):** Postal Red ground, white text; hover to Franking Red (colour transition). Disabled: 70% opacity, wait cursor, label reads "Creating…". Full width under 640px.
- **Copy:** Airmail Blue ground, white text; hover to Ink. Confirms in text ("Copied" on the button plus a polite live message), not only by colour.
- **Focus:** 2px Airmail Blue outline, 2px offset (global).

### Inputs / Fields
- **Style:** white, 1px ledger rule border, 0px radius, 48px tall, 12px padding, 16px Barlow ink text, Slate Placeholder placeholders.
- **Focus:** border shifts to Airmail Blue plus the 2px blue outline. Prefixed field (alias) carries the focus on the wrapper.
- **Select:** native appearance removed, blue square-capped chevron SVG at right.
- **Prefix:** `programicle.com/` in muted text inside the field.
- **Error:** a 1px postal-red box under the form, Franking Red medium text, `role="alert"`.

### Order Panel
White, 2px postal-red border, 20px / 28px padding. Holds the whole form; the hobby notice sits directly beneath it in body small.

### Forwarding Label (signature)
White, 2px postal-red border. Top block: short URL in Headline, wrapping after the slash, then the Copy button. A 1px postal-red rule divides it from ruled rows (Forwards to / Created / Expires): 120px term column in condensed muted uppercase, value column in body with tabular figures, rows split by 1px ledger rules. The postmark sits in the corner.

### Postmark
Blue SVG stamp: 56r ring at 3px, 34r ring at 1.5px, ring text "FORWARDED BY SNAPLINK · PROGRAMICLE.COM ·", day and month over year in Barlow Condensed. Lands once (420ms, scale 1.35 to 1, rotate -16deg to -8deg, `cubic-bezier(0.16, 1, 0.3, 1)`); reduced motion shows it at rest.

### Navigation
Header text links in Airmail Blue, medium weight, 14px / 16px, 1px underline at 4px offset thickening to 2px on hover. Wordmark is the home link, Postal Red, no underline.

### Airmail Stripe
8px band at the very top: repeating -45deg red 12px / white 6px / blue 12px / white 6px.

## Do's and Don'ts

### Do:
- **Do** put working surfaces on white with a 2px Postal Red border over the Envelope ground.
- **Do** use Airmail Blue for every link, focus ring, and post-office response (stamp, copy).
- **Do** set field names, row terms, buttons, and headings in Barlow Condensed uppercase; keep sentences in Barlow.
- **Do** use tabular figures for dates and times.
- **Do** keep the airmail stripe at the top of every page.
- **Do** keep the stamp-landing motion to the one moment a label is issued, with a reduced-motion rest state.

### Don't:
- **Don't** round corners; everything is 0px except the circular postmark.
- **Don't** add drop shadows, blurs, or gradients other than the airmail stripe.
- **Don't** centre page headings; the column reads left-aligned.
- **Don't** use red for links or focus, or blue for the primary submit action.
- **Don't** confirm an action by colour alone; say it in text.
