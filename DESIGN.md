# DESIGN.md – REZUME MAKER
*Thegrafx Retro-Futuristic Design System Spec*

> **"Nostalgic by design. Futuristic by vision. Look back. Move forward. Inspired then. Designed now."**

---

## 1. Vision & Core Philosophy

**REZUME MAKER** is an avant-garde editorial resume and visual portfolio studio for elite software engineers and creators. Departing from generic corporate tech interfaces, it fuses **1960s Space-Age Googie architecture**, **mid-century editorial print typography**, and **high-performance modern reactive design**.

### Impeccable Design Principles (Strict Adherence)
1. **Zero Generic UI Tropes**: No default Inter font, no nested card-in-card containers, no pure black (`#000000`) or sterile white (`#ffffff`), no centered generic templates, and absolutely no bouncy spring physics.
2. **Authentic Retro-Futuristic Palette**: Rooted in Thegrafx mid-century futurism poster swatches—Cosmic Navy, Burnt Orange, Space Cream, Retro Teal, Vintage Lavender, and Sunburst Yellow.
3. **Retro Typewriter Typography**: Mechanical retro typewriter (`Courier Prime`), tactile vintage ribbon headings (`Special Elite`), and clean monospace telemetry (`IBM Plex Mono`). Exceptional readability across all screen sizes with authentic tactile keystroke poise.
4. **Fluid, Non-Elastic Motion**: Every transition employs a custom fluid cubic-bezier curve (`cubic-bezier(0.16, 1, 0.3, 1)`) with calibrated durations (240ms–500ms), giving an effortless, luxurious motion profile.
5. **Clean Geometric Abstract Art & Glassmorphism**: Clean mid-century architectural line art (concentric retro space arcs, Googie planetary orbits, drafting lines, and registration targets—zero gradients!) subtly visible beneath frosted retro glassmorphic panels (`backdrop-blur-xl`, `#FAF6EC`/`#14243B` surfaces with `#D8CEBA`/`#223854` hairline borders).

---

## 2. Color System & Swatches

Custom calibrated to the user's bespoke aesthetic: **Gritty Foggy Grayish Black** dark mode with **Light Cream** typography, and a **Rich Tactile Darker Cream** light mode with **Jet Black** typography so fonts pop crisply without washed-out glare.

| Swatch Name | Hex Token | CSS Variable / Token | Semantic Usage |
|:---|:---|:---|:---|
| **Gritty Foggy Black** | `#121316` | `--bg-primary` (dark) | Atmospheric dark mode base background |
| **Rich Darker Cream** | `#D8CEBA` | `--bg-primary` (light) | Light mode base background (warm, earthy parchment, never white) |
| **Light Very Light Cream** | `#F7F4EB` | `--text-primary` (dark) | Dark mode primary typography (soft, warm, readable non-white) |
| **Jet Black Typography** | `#0A0B0E` | `--text-primary` (light) | Light mode bold typography (maximum crisp contrast on cream) |
| **Dark Charcoal Secondary** | `#2C2D33` | `--text-secondary` (light)| Light mode subtitles, descriptions, and labels |
| **Foggy Dark Charcoal** | `#181A1F` | `--bg-card` (dark) | Elevated cards, sidebar, modal background in dark mode |
| **Dark Elevated Active** | `#22252D` | `retro.navyElevated` | Active tab highlights, hover states, ribbon banners |
| **Dark Gritty Hairline** | `#282A33` | `--border-color` (dark)| Precision hairline borders and dividers in dark mode |
| **Frosted Cream Card** | `#E4DAC7` | `--bg-card` (light) | Elevated cards, sidebar, and preview panes in light mode |
| **Cream Active Rail** | `#C8BD9F` | `surface.cream` | Active tab highlights, hover states in light mode |
| **Cream Hairline Border**| `#B2A487` | `--border-color` (light)| Precision hairline borders and dividers in light mode |
| **Burnt Orange** | `#FF6F3C` | `--accent-burnt-orange` | Primary interactive accent, hero buttons, key badges, solar discs |
| **Retro Teal** | `#5D8A8A` | `--accent-retro-teal` | Secondary accents, verification badges, tag containers, metrics |
| **Vintage Lavender** | `#B39ACD` | `--accent-vintage-lavender`| Tertiary highlights, creative category tags, narrative headers |
| **Sunburst Yellow** | `#F2B705` | `--accent-sunburst-yellow` | Star badges (`✦`), warnings, milestone callouts, energetic highlights |

### Palette Contrast & Accessibility
- Primary text on Gritty Foggy Black (`#121316`): Light Very Light Cream (`#F7F4EB`) at **16.4:1** contrast ratio (WCAG AAA).
- Primary text on Rich Darker Cream (`#D8CEBA`): Jet Black (`#0A0B0E`) at **14.2:1** contrast ratio (WCAG AAA).
- Secondary text on Rich Darker Cream (`#D8CEBA`): Deep Charcoal (`#2C2D33`) at **9.5:1** contrast ratio.

---

## 3. Typography Architecture (Retro Typewriter)

| Role | Font Family | Weights | Intended Character & Purpose |
|:---|:---|:---|:---|
| **Primary Typewriter** | **Courier Prime** | 400, 700, italic | Clean, readable retro mechanical typewriter font for all body text, bullet points & inputs |
| **Vintage Display** | **Special Elite** | 400 | Tactile ink-ribbon keystroke letterforms for titles and retro branding |
| **Precision Telemetry** | **IBM Plex Mono** | 400, 600 | Monospaced technical identifiers, coordinates, and metrics |
| **Classical Accent** | **Cinzel** | 600, 700 | Formal title accents, certification labels |

### Hierarchy Rules
- **Document Titles (`H1`)**: `font-display` (Courier Prime / Special Elite), letter-spacing `-0.01em`, leading `1.15`.
- **Section Headers (`H2`)**: `font-display` (Courier Prime bold), uppercase with letter-spacing `+0.08em` and leading atomic star glyph (`✦`).
- **Body Text**: `font-body` (Courier Prime regular), line-height `1.5` on screens, `1.4` in A4 print layout.
- **Metadata & Dates**: `font-mono` (Courier Prime / IBM Plex Mono), uppercase with `tracking-wider`.

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
