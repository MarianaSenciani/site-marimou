# Mari Mou — Brand Styleguide
> Version 1.0 | AI-Optimized Design System
> Use this document as the single source of truth for all brand, design, and interface decisions related to Mari Mou.

---

## 1. Brand Identity

### 1.1 Brand Name
**Mari Mou**

### 1.2 Mission Statement
We empower every small business to succeed with the most uncomplicated, actionable and impactful Marketing Solutions.

### 1.3 Brand Tagline
> "Create. Change. Grow."

Each word stands alone, punctuated with a period. Always write the tagline in this format — never as a single sentence, always in bold, always stacked vertically in visual contexts.

### 1.4 Brand Positioning
- **Audience:** Small business owners
- **Category:** Marketing solutions / Creative strategy
- **Promise:** Simplicity that drives real results
- **Tone:** Empowering, direct, human, energetic

### 1.5 Brand Personality Attributes
1. **Energetic** — never flat or corporate
2. **Playful** — creative without being chaotic
3. **Direct** — communicates clearly, no fluff
4. **Empowering** — the brand exists to elevate others
5. **Bold** — confident in its aesthetic and voice

---

## 2. Color System

> All colors must be applied using the roles defined below. Do not use colors arbitrarily.

### 2.1 Primary Palette

| Token Name         | Hex       | RGB              | Role                                      |
|--------------------|-----------|------------------|-------------------------------------------|
| `--color-lime`     | `#B9D440` | rgb(185, 212, 64)| Primary brand color, key backgrounds, CTAs |
| `--color-magenta`  | `#CE3FD4` | rgb(206, 63, 212)| Accent, highlights, energetic emphasis    |
| `--color-purple`   | `#6D3FD4` | rgb(109, 63, 212)| Secondary accent, interactive elements    |

### 2.2 Secondary Palette

| Token Name          | Hex       | RGB               | Role                                    |
|---------------------|-----------|-------------------|-----------------------------------------|
| `--color-sage`      | `#92A150` | rgb(146, 161, 80) | Softer lime, supporting tones           |
| `--color-olive`     | `#6B6E4D` | rgb(107, 110, 77) | Mid-tone earthy neutral                 |

### 2.3 Dark & Neutral Palette

| Token Name              | Hex       | RGB             | Role                                         |
|-------------------------|-----------|-----------------|----------------------------------------------|
| `--color-charcoal`      | `#515443` | rgb(81, 84, 67) | Body text on light backgrounds, borders      |
| `--color-plum-dark`     | `#544354` | rgb(84, 67, 84) | Dark purple-toned neutral                    |
| `--color-near-black`    | `#3A3B35` | rgb(58, 59, 53) | Primary text color, dark UI elements         |
| `--color-forest-black`  | `#303324` | rgb(48, 51, 36) | Deepest dark, backgrounds in dark mode       |

### 2.4 Background & Surface Colors

| Token Name              | Hex (approx) | Usage                                         |
|-------------------------|--------------|-----------------------------------------------|
| `--color-bg-cream`      | `#F5FAE2`    | Default light background (lime-tinted white)  |
| `--color-bg-blush`      | `#FAEEF2`    | Soft pink surface for pattern areas           |
| `--color-bg-lilac`      | `#E8DEFF`    | Soft purple surface, illustration backgrounds |

### 2.5 Color Usage Rules

- **DO** pair `--color-lime` with `--color-near-black` or `--color-forest-black` for high-contrast layouts.
- **DO** use `--color-magenta` and `--color-purple` as accents — never dominant backgrounds for large areas.
- **DO** use `--color-bg-cream` as the default page/canvas background.
- **DO NOT** use pure black (`#000000`) or pure white (`#FFFFFF`) — always use the brand's near-blacks and cream tones.
- **DO NOT** mix `--color-magenta` and `--color-purple` as the only two colors in one section — add lime or dark as a grounding element.

### 2.6 Color Combinations (Approved Pairings)

| Foreground           | Background               | Use Case                              |
|----------------------|--------------------------|---------------------------------------|
| `--color-near-black` | `--color-lime`           | Hero sections, primary CTAs           |
| `--color-lime`       | `--color-forest-black`   | Dark section headlines (Portfolio, Services, About) |
| `--color-bg-cream`   | `--color-forest-black`   | Body text on dark sections            |
| `--color-near-black` | `--color-bg-cream`       | Body copy, cards on light backgrounds |
| `--color-bg-cream`   | `--color-purple`         | Accent blocks                         |
| `--color-near-black` | `--color-bg-blush`       | Pattern/texture areas                 |
| `--color-magenta`    | `--color-forest-black`   | Accent text / highlighted labels on dark |
| `--color-lime`       | `--color-near-black`     | Card borders on dark backgrounds      |

---

## 3. Typography

### 3.1 Font Family
**Alexandria** — used exclusively across all brand touchpoints.

- **Source:** Google Fonts (free, no license required)
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@400;700&display=swap');`
- **HTML link tag:** `<link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;700&display=swap" rel="stylesheet">`
- **CSS usage:** `font-family: "Alexandria", sans-serif;`
- **Fallback stack:** `"Alexandria", "DM Sans", "Helvetica Neue", sans-serif`

> Note to AI tools: Alexandria is available via Google Fonts and must always be loaded before use. It is a geometric sans-serif with strong, modern character well-suited for bold headlines and clean body text. Avoid Inter, Roboto, and generic system fonts.

### 3.2 Type Scale

| Level | Tag    | Weight  | Approximate Size | Usage                              |
|-------|--------|---------|------------------|------------------------------------|
| H1    | `<h1>` | **Bold (700)** | 64–96px / 4–6rem | Hero headlines, brand statements  |
| H2    | `<h2>` | **Bold (700)** | 40–56px / 2.5–3.5rem | Section titles                |
| H3    | `<h3>` | **Bold (700)** | 28–36px / 1.75–2.25rem | Sub-section headers          |
| H4    | `<h4>` | Regular (400)  | 22–26px / 1.375–1.625rem | Card titles, labels         |
| H5    | `<h5>` | Regular (400)  | 18–20px / 1.125–1.25rem | Supporting headers           |
| Body  | `<p>`  | Regular (400)  | 16–18px / 1–1.125rem | Paragraph text               |
| Small | `<small>` | Regular (400) | 12–14px / 0.75–0.875rem | Captions, labels           |

### 3.3 Typography Rules

- **Headlines are bold and impactful.** H1, H2, H3 must always use Bold (700).
- **Sentence case preferred** for body copy and UI labels; ALL CAPS can be used for very short accent labels only.
- **Line height:** 1.1–1.15 for headlines; 1.5–1.65 for body text.
- **Letter spacing:** Tight for headlines (`-0.02em` to `-0.04em`); normal for body (`0` to `0.01em`).
- **DO NOT** use italic styles as a primary typographic tool — the brand uses weight and size for emphasis.
- **DO NOT** use more than two type sizes in a single component.

### 3.4 Headline Style Reference

The tagline "Create. Change. Grow." exemplifies the brand's typographic voice:
- Each word is isolated, bold, large
- Punctuation (period) is used deliberately for dramatic pause
- Stacked alignment (one word per line) in visual contexts
- Paired with small, regular-weight supporting copy below

---

## 4. Visual Identity & Decorative Elements

### 4.1 Background Texture
The brand's signature background is a **grid/graph paper texture** in a very light lime-tinted tone, with a **radial vignette**: the grid is fully visible at the center and dissolves smoothly toward all edges, fading into the cream background. This creates a subtle sense of depth — as if the surface curves away from the viewer at the borders.

- Grid lines: extremely subtle, low-opacity (7–8%)
- Color: `--color-lime` at 7% opacity on `--color-bg-cream`
- **Edge behavior:** The grid fades to `--color-bg-cream` from ~50% outward — no hard edge, no blur, just a clean mathematical dissolve
- **Effect intent:** 3D-like focal depth, center feels "closer", edges recede naturally
- This texture should appear on hero sections and key brand moments
- Implementation: three-layer `background-image` — radial vignette on top, grid lines below

```css
/* Grid texture with radial edge fade (vignette effect) */
background-color: var(--color-bg-cream);
background-image:
  radial-gradient(ellipse at center, transparent 45%, var(--color-bg-cream) 82%),
  linear-gradient(rgba(185, 212, 64, 0.07) 1px, transparent 1px),
  linear-gradient(90deg, rgba(185, 212, 64, 0.07) 1px, transparent 1px);
background-size: auto, 32px 32px, 32px 32px;
```

> **Note to AI tools:** The radial gradient is the top layer and acts as a mask — it is transparent at center (exposing the grid) and gradually becomes opaque cream toward all four edges. Do NOT add blur, box-shadow, or any secondary effect. The fade must be smooth and purely radial.

### 4.1.1 Dark Section Variant (bg-grid--dark)
The site uses **two background modes**: the light cream hero and a **dark olive background** for internal sections (Portfolio, Services, About). Both use the grid texture.

- Background: `--color-forest-black` (`#303324`)
- Grid lines: `--color-lime` at 6% opacity
- No radial vignette needed on dark sections — grid is evenly visible
- Headlines on dark backgrounds: `--color-lime`
- Body text on dark backgrounds: `--color-bg-cream`
- Card borders on dark backgrounds: `--color-lime` (1–2px solid)

```css
/* Dark section with grid texture */
.bg-grid--dark {
  background-color: var(--color-forest-black);
  background-image:
    linear-gradient(rgba(185, 212, 64, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(185, 212, 64, 0.06) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

### 4.2 Organic / Squiggly Shapes
The brand uses **abstract, hand-drawn curvilinear shapes** as decorative elements.

- **Style:** Loose, organic, squiggly lines — like handwritten loops and spirals
- **Colors used:** `--color-lime`, `--color-purple`, `--color-magenta`, muted tones
- **Format:** SVG illustrations, not raster
- **Placement:** Pattern fills, section dividers, card backgrounds, illustration backgrounds
- **Scale:** Can be large and tiled or small and scattered
- **DO NOT** use geometric shapes (rectangles, hard circles) as decoration — the brand vocabulary is organic and curved

### 4.3 Spark / Star Elements
Small **4-pointed or 6-pointed star/spark doodles** appear as accents within illustrations.

- Style: Hand-drawn, irregular
- Colors: `--color-bg-cream` or `--color-lime` on dark backgrounds
- Use sparingly — as punctuation in illustrations, not as primary elements

### 4.4 Pattern Language
Repeating patterns are constructed from the organic squiggly shapes and are used in:
- Social media posts
- Card backgrounds
- Section fills
- Product mockups

Pattern backgrounds use soft surface colors (`--color-bg-blush`, `--color-bg-lilac`) to keep the organic shapes legible without high contrast.

### 4.5 Illustration Style
When sourcing or generating illustrations for the brand:
- **Style:** Playful, abstract, doodle-like — NOT flat 2D icons or 3D renders
- **Color palette:** Must use brand colors exclusively
- **Lines:** Thick, imprecise, hand-drawn feel
- **Subjects:** Abstract shapes, curvy organic forms, sparks/stars — NOT literal depictions
- **Backgrounds for illustrations:** Soft lilac (`--color-bg-lilac`) or blush (`--color-bg-blush`)

---

## 5. Layout & Spacing

### 5.1 Grid System
- **Base unit:** 8px
- **Column grid:** 12 columns on desktop; 4 columns on mobile
- **Gutters:** 24px (desktop) / 16px (mobile)
- **Max content width:** 1200–1280px
- **Section padding:** 80–120px vertical (desktop); 48–64px (mobile)

### 5.2 Spacing Scale (8px base)

| Token             | Value  | Usage                             |
|-------------------|--------|-----------------------------------|
| `--space-xs`      | 4px    | Micro gaps, icon padding          |
| `--space-sm`      | 8px    | Inner padding, small components   |
| `--space-md`      | 16px   | Default gap between elements      |
| `--space-lg`      | 24px   | Card padding, section inner gaps  |
| `--space-xl`      | 40px   | Between components                |
| `--space-2xl`     | 64px   | Section spacing                   |
| `--space-3xl`     | 96px   | Major section separators          |

### 5.3 Border Radius

- **Default components (cards, buttons):** 12–16px
- **Pill buttons:** 999px (fully rounded)
- **Images:** 8–12px (soft corners, not square)
- **DO NOT** use perfectly square corners — the brand's organic feel extends to component shapes

### 5.4 Layout Principles
- **Asymmetry is welcome.** Not every layout needs perfect symmetry.
- **Bold typography can function as a layout element** — headlines can bleed, overlap, or break the grid intentionally.
- **Generous white space** is part of the brand's "uncomplicated" promise.
- **Decorative elements live outside the grid** — organic shapes should break containment.

---

## 6. Components (UI Patterns)

### 6.1 Buttons

**Primary Button:**
- Background: `--color-lime`
- Text: `--color-near-black`
- Weight: Bold
- Padding: 14px 28px
- Border radius: 999px (pill)
- Hover: darken lime slightly or add subtle scale transform

**Secondary Button:**
- Background: transparent
- Border: 2px solid `--color-near-black`
- Text: `--color-near-black`
- Hover: fill with `--color-lime`

**Accent Button:**
- Background: `--color-purple`
- Text: `--color-bg-cream`

### 6.2 Cards
- Background: `--color-bg-cream` or white
- Border: 1px solid rgba of `--color-charcoal` at 15%
- Border radius: 16px
- Box shadow: subtle, warm-toned (avoid cold grey shadows)
- Optional: top accent strip in `--color-lime` or `--color-purple`

### 6.3 Tags / Badges
- Pill shape (border-radius: 999px)
- Small text (12–14px), bold
- Colors: `--color-lime` + `--color-near-black`, or `--color-bg-lilac` + `--color-purple`

---

## 7. Voice & Tone

### 7.1 Writing Principles

| Principle      | Meaning                                                                  |
|----------------|--------------------------------------------------------------------------|
| **Direct**     | Say what you mean. Short sentences. No jargon.                          |
| **Empowering** | Speak to the reader's capability, not their problems.                   |
| **Human**      | Warm, friendly — like a knowledgeable friend, not a corporate voice.    |
| **Confident**  | No hedging ("maybe", "perhaps", "we think"). State things clearly.      |
| **Energetic**  | Bring momentum to the copy. Use active verbs.                           |

### 7.2 Copy Style

- **Headlines:** Bold, short, punchy. 1–5 words. Often structured as standalone words with periods.
- **Body copy:** Conversational but informative. Max 2–3 sentences per paragraph.
- **CTAs:** Action-first. Start with a verb. ("Start growing", "Get your plan", "Let's work")
- **Avoid:** corporate buzzwords, passive voice, overly complex vocabulary

### 7.3 Examples

| ❌ Avoid                                         | ✅ Prefer                               |
|--------------------------------------------------|-----------------------------------------|
| "Leveraging our synergistic approach..."         | "Here's how we help you grow."          |
| "Solutions for your marketing needs"            | "Marketing that actually works."        |
| "We are a full-service marketing agency"        | "We make marketing simple and powerful."|
| "Please don't hesitate to get in touch with us" | "Talk to us."                           |

---

## 8. Motion & Animation

### 8.1 Principles
- **Purposeful:** Every animation should have a reason — reveal, feedback, delight.
- **Energetic but smooth:** Fast-ish entrances (0.3–0.5s), ease-out curves.
- **Organic feel:** Slight overshoot (spring/bounce) on playful elements.

### 8.2 Recommended Easings

```css
/* Primary easing — most UI transitions */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);

/* Playful bounce — decorative elements, illustrations */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Smooth fade — text, overlays */
--ease-fade: cubic-bezier(0.4, 0, 0.2, 1);
```

### 8.3 Transition Speeds

| Token             | Duration | Use                                    |
|-------------------|----------|----------------------------------------|
| `--speed-fast`    | 150ms    | Hover states, button feedback          |
| `--speed-default` | 300ms    | Component transitions, drawers         |
| `--speed-slow`    | 500ms    | Page entrances, hero animations        |
| `--speed-xslow`   | 800ms    | Decorative, illustration movements     |

### 8.4 Animation Patterns
- **Staggered text reveals:** Hero headlines should animate in word-by-word or line-by-line
- **Organic shape animations:** Decorative squiggly elements can have slow, looping path animations
- **Scroll-triggered reveals:** Sections fade + slide up on scroll entry

---

## 9. Do's and Don'ts (Quick Reference for AI Tools)

### ✅ DO
- Use Alexandria Bold (700) for all headlines — load from Google Fonts
- Use the grid texture as hero backgrounds
- Use lime (`#B9D440`) as the primary brand color
- Use organic, curvy, hand-drawn shapes as decorative elements
- Stack bold headlines vertically, each word on its own line
- Keep copy short, direct, and empowering
- Use pill-shaped (fully rounded) buttons
- Combine dark backgrounds with lime text for impact
- Keep layouts clean with generous white space

### ❌ DON'T
- Use pure black or pure white — use brand near-blacks and creams
- Use geometric/hard-edged decorative shapes
- Use Inter, Roboto, or system fonts
- Use gradients as a primary design tool (flat colors preferred)
- Use more than 3 colors in a single component
- Write long, corporate, passive-voice copy
- Make magenta or purple the dominant background color
- Add drop shadows with cold grey tones

---

## 10. CSS Custom Properties (Token Reference)

Paste this block into any project's `:root` to set up the brand token system:

```css
/* === GOOGLE FONTS IMPORT — must be first line === */
@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@400;700&display=swap');

:root {
  /* === COLORS === */
  /* Primary */
  --color-lime: #B9D440;
  --color-magenta: #CE3FD4;
  --color-purple: #6D3FD4;

  /* Secondary */
  --color-sage: #92A150;
  --color-olive: #6B6E4D;

  /* Neutral / Dark */
  --color-charcoal: #515443;
  --color-plum-dark: #544354;
  --color-near-black: #3A3B35;
  --color-forest-black: #303324;

  /* Backgrounds */
  --color-bg-cream: #F5FAE2;
  --color-bg-blush: #FAEEF2;
  --color-bg-lilac: #E8DEFF;

  /* === TYPOGRAPHY === */
  --font-primary: "Alexandria", "DM Sans", "Helvetica Neue", sans-serif;
  --font-weight-regular: 400;
  --font-weight-bold: 700;

  /* Type Scale */
  --text-h1: clamp(3rem, 6vw, 6rem);
  --text-h2: clamp(2rem, 4vw, 3.5rem);
  --text-h3: clamp(1.5rem, 2.5vw, 2.25rem);
  --text-h4: clamp(1.25rem, 1.8vw, 1.625rem);
  --text-body: clamp(1rem, 1.2vw, 1.125rem);
  --text-small: 0.875rem;

  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;

  /* Letter Spacing */
  --tracking-tight: -0.03em;
  --tracking-normal: 0em;

  /* === SPACING === */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 64px;
  --space-3xl: 96px;

  /* === BORDER RADIUS === */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* === MOTION === */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-fade: cubic-bezier(0.4, 0, 0.2, 1);
  --speed-fast: 150ms;
  --speed-default: 300ms;
  --speed-slow: 500ms;

}

/* === GRID TEXTURE WITH RADIAL VIGNETTE ===
   Apply this class to any hero or full-bleed section.
   The radial gradient (top layer) fades the grid to cream at all edges,
   creating a 3D depth feel — grid is strongest at center, dissolves outward.
   No blur. No extra effects. Just the gradient fade. */
.bg-grid {
  background-color: var(--color-bg-cream);
  background-image:
    radial-gradient(ellipse at center, transparent 45%, var(--color-bg-cream) 82%),
    linear-gradient(rgba(185, 212, 64, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(185, 212, 64, 0.07) 1px, transparent 1px);
  background-size: auto, 32px 32px, 32px 32px;
}

/* Tighter grid variant (24px) for denser sections */
.bg-grid--tight {
  background-color: var(--color-bg-cream);
  background-image:
    radial-gradient(ellipse at center, transparent 45%, var(--color-bg-cream) 82%),
    linear-gradient(rgba(185, 212, 64, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(185, 212, 64, 0.07) 1px, transparent 1px);
  background-size: auto, 24px 24px, 24px 24px;
}

/* Dark section variant — used for Portfolio, Services, About sections */
.bg-grid--dark {
  background-color: var(--color-forest-black);
  background-image:
    linear-gradient(rgba(185, 212, 64, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(185, 212, 64, 0.06) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

---

## 11. Summary for AI Prompting

When generating design or code for **Mari Mou**, always follow these core directives:

> **Brand:** Mari Mou — marketing solutions for small businesses.
> **Feeling:** Energetic, playful, bold, empowering, and uncomplicated.
> **Colors:** Lime green (#B9D440) as primary. Electric purple (#6D3FD4) and magenta (#CE3FD4) as accents. Dark near-black (#3A3B35) for text. Cream (#F5FAE2) as light background. Forest black (#303324) as dark section background.
> **Two background modes:** Light (cream #F5FAE2 + grid with radial vignette) for hero; Dark (forest black #303324 + grid) for interior sections like Portfolio, Services, About.
> **Typography:** Alexandria Bold (700) for all headlines — Google Fonts. Alexandria Regular (400) for body. Bold, stacked, punchy headlines.
> **On dark backgrounds:** headlines in lime, body text in cream, card borders in lime.
> **Shapes:** Organic, squiggly, hand-drawn illustration style. Grid texture backgrounds on both light and dark sections.
> **Voice:** Direct, short, action-oriented. Empower the reader. No corporate language.
> **Buttons:** Lime + dark text, pill-shaped. On dark sections: lime button remains, magenta used for accents.
> **Avoid:** Pure black/white, Inter font, cold greys, geometric decorations, passive voice, gradients as main tool.

---

*This styleguide was generated from the official Mari Mou moodboard. Keep this file updated as the brand evolves.*
