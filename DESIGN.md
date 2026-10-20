---
version: "alpha"
name: "Roche Diagnostics Product Page (AXELIOS 1)"
description: "Clean, light, product-detail style for a life-science instrument. Ideal for product pages, spec sheets, field tools and calculators that should sit comfortably beside the AXELIOS 1 product page."
source: "https://diagnostics.roche.com/us/en/products/systems/axelios-1-sys-597.html (observed October 19, 2026)"
colors:
  primary: "#0B41CD"        # Roche blue: links, primary buttons, active states
  primary-dark: "#022366"   # navy: deep accents, hover on primary
  primary-tint: "#D7E0F7"   # light blue: badges (RUO pill), selected rows
  ink: "#000000"            # headings and body on the live site
  ink-soft: "#312F2E"       # table cells, long-form text
  muted: "#544F4F"          # secondary text, utility nav
  muted-2: "#706B69"        # inactive tabs, captions
  line: "#DBD6D1"           # warm divider
  line-strong: "#C2BAB5"    # warm border
  band: "#F5F5F2"           # warm off-white hero band
  surface: "#FFFFFF"
  surface-2: "#FBFBFA"
typography:
  display:
    fontFamily: "Roche Sans Light (proprietary) → Noto Sans 300, Arial, sans-serif"
    fontSize: 2.5rem
    fontWeight: 300-500
    lineHeight: 1.2
  h2:
    fontSize: 1.875rem
    fontWeight: 500
    lineHeight: 1.2
  h3:
    fontSize: 1.75rem
    fontWeight: 700
  body:
    fontFamily: "Roche Sans Light → Noto Sans 300/400"
    fontSize: 1.125rem
    lineHeight: 1.6
  ui:
    fontFamily: "Roche Sans Regular → Noto Sans 400"
    fontSize: 1rem
rounded:
  none: 0px      # buttons, cards, tables, inputs
  pill: 999px    # status badges only (RUO)
spacing:
  base: 8px
  table-cell: "12px 16px"
  section: "64px to 96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: 0px
    padding: "16px 32px"
  link:
    textColor: "{colors.primary}"
  badge-ruo:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-dark}"
    rounded: pill
---

## Overview

The AXELIOS 1 product page reads like a well-made spec sheet: lots of white, a warm off-white band behind the title, a very large light-weight headline, and one saturated blue that does all the work. Nothing is rounded except the small RUO status pill. Weight carries hierarchy more than color does; the body text is set light and generous, and the blue is reserved for things you can click.

- Density: 3/10, airy
- Variance: 2/10, very structured
- Motion: 2/10, almost none

- **Style:** Clinical, calm, precise, product-led
- **Keywords:** light type, single blue accent, warm greys, square corners, spec tables, tabs
- **Light/Dark:** the live site is light only. A dark variant is derived below for tools that must follow the viewer's theme.

## Colors

- **Roche blue** (#0B41CD): links, primary buttons, focus, active tab underline, chart emphasis.
- **Navy** (#022366): hover on blue, deep accents, badge text.
- **Light blue** (#D7E0F7): RUO pill and soft highlights. Never as large backgrounds.
- **Warm greys** (#312F2E, #544F4F, #706B69): text below headline level. The greys lean warm, not neutral.
- **Warm lines** (#DBD6D1, #C2BAB5): dividers and borders.
- **Band** (#F5F5F2): the off-white strip behind the page title.
- **Semantic** colors are not part of the observed brand. Use a muted green for gains and an amber for cautions, kept small.

Derived dark variant: background #0E1525 (navy-black), surface #141D31, text #F5F5F2, muted #B9B3AE, lines #2A3550, blue lifted to #6E9BFF for contrast, light-blue tint #1B2A52.

## Typography

- Roche Sans is proprietary and must not be copied. Use its declared fallback, **Noto Sans** (Google Fonts), at weights 300, 400, 500 and 700.
- **Display:** 300 to 500 weight, 2.5rem desktop, tight but not negative tracking. Large and light is the signature.
- **Body:** 300 to 400, 1.125rem, line-height 1.6, about 70 characters per line.
- **Tables:** header cells 400 weight in ink, body cells 300 to 400 in ink-soft, 12px 16px padding.
- **Values and units:** JetBrains Mono is an addition for this tool's numbers; the live site does not use a monospace face.

## Layout

- Title band: breadcrumb-like eyebrow, big headline, RUO pill underneath, product action on the right.
- Content sits on a centered column with generous side space; sections separated by space, not boxes.
- Spec tables: full width, thin warm horizontal rules, no vertical rules, no zebra striping.
- Tabs: text tabs with a blue underline on the active tab.
- Mobile: everything stacks to one column below 768px; tables scroll inside their own container.

## Shapes and depth

- Corners are square everywhere (0px) except status pills.
- No drop shadows on cards; separation comes from the warm band, rules and whitespace.

## Components

- **Primary button:** solid Roche blue, white text, square, 16px 32px padding. Hover: navy.
- **Secondary button:** 1px blue outline, blue text, square. Hover: light-blue fill.
- **Link:** Roche blue, no underline at rest, underline on hover.
- **RUO badge:** light-blue pill, navy text, small, sits under the headline.
- **Inputs:** square, 1px warm border, blue 2px focus ring.
- **Selected state:** light-blue fill or blue underline, never a dark inverted block.

## Do's and Don'ts

- Do keep one accent color (Roche blue) and let warm greys carry everything else.
- Do set headlines large and light.
- Do keep the RUO label visible wherever the product is named.
- Don't use the Roche logo, wordmark, or the proprietary Roche Sans files on independent work.
- Don't present an independent page as an official Roche page: keep a clear "not affiliated" credit.
- Don't round cards or buttons, and don't add gradients or heavy shadows.
- Don't use emoji or decorative icons.
