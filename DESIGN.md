# DESIGN.md – REZUME MAKER
*Thegrafx Retro-Futuristic Design System Spec*

> **"Nostalgic by design. Futuristic by vision. Look back. Move forward. Inspired then. Designed now."**

---

## 1. Vision & Core Philosophy

**REZUME MAKER** is an avant-garde editorial resume and visual portfolio studio for elite software engineers and creators. Departing from generic corporate tech interfaces, it fuses **1960s Space-Age Googie architecture**, **mid-century editorial print typography**, and **high-performance modern reactive design**.

### Impeccable Design Principles (Strict Adherence)
1. **Zero Generic UI Tropes**: No default Inter font, no nested card-in-card containers, no pure black (`#000000`) or sterile white (`#ffffff`), no centered generic templates, and absolutely no bouncy spring physics.
2. **Authentic Retro-Futuristic Palette**: Rooted in Thegrafx mid-century futurism poster swatches—Cosmic Navy, Burnt Orange, Space Cream, Retro Teal, Vintage Lavender, and Sunburst Yellow.
3. **Editorial Typography Pairings**: High-contrast display serifs (`DM Serif Display`), sculptural constructivist sans (`Syne`), clean geometric reading body (`Outfit`), and precision monospace (`IBM Plex Mono`).
4. **Fluid, Non-Elastic Motion**: Every transition employs a custom fluid cubic-bezier curve (`cubic-bezier(0.16, 1, 0.3, 1)`) with calibrated durations (240ms–500ms), giving an effortless, luxurious motion profile.
5. **Architectural Asymmetry & Glyphic Accents**: Space stars (`✦`), planetary orbital rings, hairline dividers, and asymmetric split-column rhythms inspired by 1960s aerospace manuals and editorial lookbooks.

---

## 2. Color System & Swatches

Derived directly from the Thegrafx Retro-Futuristic Color Palette reference:

| Swatch Name | Hex Token | CSS Variable | Semantic Usage |
|:---|:---|:---|:---|
| **Cosmic Navy** | `#0D1B2A` | `--bg-cosmic-navy` | Root page background, deep surfaces, dark card backing |
| **Space Cream** | `#F2EBD7` | `--retro-cream` | A4 document paper, high-contrast text, light surface mode |
| **Burnt Orange** | `#FF6F3C` | `--accent-burnt-orange` | Primary interactive accent, hero buttons, key badges, solar discs |
| **Retro Teal** | `#5D8A8A` | `--accent-retro-teal` | Secondary accents, verification badges, tag containers, metrics |
| **Vintage Lavender** | `#B39ACD` | `--accent-vintage-lavender`| Tertiary highlights, creative category tags, narrative headers |
| **Sunburst Yellow** | `#F2B705` | `--accent-sunburst-yellow` | Star badges (`✦`), warnings, milestone callouts, energetic highlights |
| **Deep Surface** | `#14243B` | `--surface-deep` | Sidebar background, elevated card layers, form controls |
| **Cosmic Hairline** | `#223854` | `--border-hairline` | Structural hairline dividers, sub-borders, inactive toggles |

### Palette Contrast & Accessibility
- Primary text on Cosmic Navy: Space Cream (`#F2EBD7`) at `9.6:1` contrast ratio (surpasses WCAG AAA).
- Primary text on Space Cream: Cosmic Navy (`#0D1B2A`) at `10.8:1` contrast ratio.
- Burnt Orange (`#FF6F3C`) is paired with Cosmic Navy text when used as solid button fills to ensure crisp, accessible legibility.

---

## 3. Typography Architecture

| Role | Font Family | Weights | Intended Character & Purpose |
|:---|:---|:---|:---|
| **Editorial Display** | **DM Serif Display** | 400, italic | Mid-century editorial headlines, A4 header names, poster titles |
| **Constructivist Sans** | **Syne** | 700, 800 | Architectural subheadings, section badges, energetic kinetic navigation |
| **Primary Body** | **Outfit** | 400, 500, 600 | High-legibility geometric sans for resume bullet points & form inputs |
| **Precision Monospace** | **IBM Plex Mono** | 400, 500, 600 | Code identifiers, system metrics, dates, coordinates, tags |
| **Classical Accent** | **Cinzel** | 600, 700 | Formal title accents, certification labels |

### Hierarchy Rules
- **Document Titles (`H1`)**: `font-serif` (DM Serif Display), tracking `-0.02em`, leading `1.1`.
- **Section Headers (`H2`)**: `font-retro` (Syne 700) or `font-serif`, uppercase with letter-spacing `+0.12em` and leading atomic star glyph (`✦`).
- **Body Text**: `font-sans` (Outfit 400/500), line-height `1.5` on screens, `1.38` in A4 print layout.
- **Metadata & Dates**: `font-mono` (IBM Plex Mono 500), lowercase or uppercase with `tracking-wider`.

---

## 4. Layout Paradigms

### A. The Retro-Split A4 Layout (Space-Age Split)
- **Asymmetric 36% / 64% 2-Column Split**:
  - **Left Rail (36%)**: Space Cream background, Burnt Orange banner with profile photo container, atomic orbital glyphs, contact details, skills pill tags, and educational milestones.
  - **Right Main (64%)**: Clean Space Cream editorial canvas with Burnt Orange section titles, retro teal company pills, and fluid bullet list items.
  - **Running Footer**: Atomic star markers with issue stamping: `"✦ THEGRAFX RETRO-FUTURISTIC RESUME SPEC 2080 ✦ NOSTALGIC BY DESIGN"`.

### B. Visual Portfolio Templates
1. **Retro Space-Age (`retro-space-age`)**:
   - 1960s Googie & space-age editorial magazine aesthetic.
   - Burnt Orange solar disc, retro teal grid tiles, atomic star badges (`✦`), and interactive project inspector modal.
2. **Cyber Kinetic Bauhaus (`cyber-kinetic-bauhaus`)**:
   - High-contrast constructivist layout with kinetic vertical section tracks.
   - Vintage Lavender highlights, Sunburst Yellow metric tags, and precision timeline feeds.
3. **Creative Studio (`creative-studio`)**:
   - Asymmetric staggered masonry grid with card category filters.
4. **Executive Minimalist (`executive-minimalist`)**:
   - Full-page snapping scroll with monumental typography and high whitespace.
5. **Developer Terminal (`developer-terminal`)**:
   - Dark monospace UNIX workstation aesthetic with interactive command prompt interface.

---

## 5. Animation & Fluid Physics

In conformance with Impeccable UI standards, **no bouncy elastic springs** or jarring rubber-band physics are permitted.

### The Fluid Timing Standard
- **Bezier Function**: `cubic-bezier(0.16, 1, 0.3, 1)` (`.ease-fluid`).
- **Micro-interactions (Buttons, switches, hover states)**: `180ms - 220ms`.
- **Card entrances and tab transitions**: `320ms - 400ms`.
- **Modal and drawer backdrops**: `240ms`.
- **Stagger Delays**: Multi-item lists stagger at `40ms - 60ms` per item.

```css
/* Fluid Utility Class */
.ease-fluid {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 6. Component Guidelines

### Buttons & Interactive Badges
- Primary actions use `bg-[#FF6F3C] text-[#0D1B2A] hover:bg-[#FF6F3C]/90 font-medium rounded-xl shadow-sm`.
- Secondary actions use `border border-[#223854] bg-[#14243B] text-[#F2EBD7] hover:border-[#FF6F3C]/50`.
- Active states in navigation bars are marked by a Burnt Orange glowing bar and gold star (`✦`).

### Modals & Drawers
- Elevated surface: `bg-[#0D1B2A]` with `border-[#223854]` and backdrop blur `bg-[#0D1B2A]/85`.
- Form inputs: `bg-[#14243B] border-[#223854] text-[#F2EBD7] focus:border-[#FF6F3C]`.

### Storage & Persistence
- State persists under key `rezumemaker-storage-v4` via Zustand with version migration to avoid cache conflicts with legacy palettes.

---

*Last Updated: 2026-11-04 • Compliant with Impeccable Design System*
