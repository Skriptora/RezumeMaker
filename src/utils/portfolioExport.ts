import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type {
  PortfolioProjectCard,
  PortfolioAnimationType,
  PortfolioTemplateId,
  ProfileData,
  ResumeData,
  CustomWebComponent,
} from '../types/resume'
import { useResumeStore } from '../store/useResumeStore'

/**
 * Extracts base64 payload and file extension from a Data URL
 */
function parseDataUrl(dataUrl: string): { extension: string; base64: string } | null {
  const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/)
  if (!match) return null
  let extension = match[1].toLowerCase()
  if (extension === 'jpeg') extension = 'jpg'
  if (extension.includes('svg')) extension = 'svg'
  return { extension, base64: match[2] }
}

/**
 * Generates animation CSS rules according to selected animation preset
 */
function generateAnimationCSS(animation: PortfolioAnimationType): string {
  switch (animation) {
    case 'slide-up':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: translateY(45px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .portfolio-card, .timeline-card, .skill-pill {
          animation: entranceAnim 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: calc(var(--index, 0) * 0.08s);
        }
      `
    case 'fade-in':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .portfolio-card, .timeline-card, .skill-pill {
          animation: entranceAnim 0.7s ease-out both;
          animation-delay: calc(var(--index, 0) * 0.09s);
        }
      `
    case 'scale-up':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        .portfolio-card, .timeline-card, .skill-pill {
          animation: entranceAnim 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          animation-delay: calc(var(--index, 0) * 0.08s);
        }
      `
    case 'stagger':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .portfolio-card, .timeline-card, .skill-pill {
          animation: entranceAnim 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: calc(var(--index, 0) * 0.12s);
        }
      `
    case 'flip-up':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: perspective(1000px) rotateX(45deg) translateY(35px); }
          to { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0); }
        }
        .portfolio-card, .timeline-card, .skill-pill {
          animation: entranceAnim 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: calc(var(--index, 0) * 0.1s);
        }
      `
    case 'bounce':
      return `
        @keyframes entranceAnim {
          0% { opacity: 0; transform: translateY(70px) scale(0.9); }
          65% { opacity: 1; transform: translateY(-10px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .portfolio-card, .timeline-card, .skill-pill {
          animation: entranceAnim 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
          animation-delay: calc(var(--index, 0) * 0.12s);
        }
      `
    default:
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .portfolio-card, .timeline-card, .skill-pill {
          animation: entranceAnim 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: calc(var(--index, 0) * 0.08s);
        }
      `
  }
}

/**
 * Template visual styles definition
 */
function getTemplateThemeConfig(template: PortfolioTemplateId) {
  switch (template) {
    case 'retro-space-age':
      return {
        bg: '#D8CEBA',
        cardBg: '#E4DAC7',
        cardBorder: '#B2A487',
        cardHover: '#FF6F3C',
        text: '#0A0B0E',
        textMuted: '#3E3A33',
        accent: '#FF6F3C',
        accentGlow: 'rgba(255, 111, 60, 0.25)',
        secondary: '#5D8A8A',
        tagBg: 'rgba(10, 11, 14, 0.08)',
        headerFont: "'Courier Prime', 'Space Grotesk', monospace, sans-serif",
        bodyFont: "'Courier Prime', monospace, sans-serif",
        badge: 'RETRO SPACE AGE // 2080 SPEC',
      }
    case 'cyber-kinetic-bauhaus':
      return {
        bg: '#121316',
        cardBg: '#181A1F',
        cardBorder: '#282A33',
        cardHover: '#FF6F3C',
        text: '#F7F4EB',
        textMuted: '#A8A49A',
        accent: '#FF6F3C',
        accentGlow: 'rgba(255, 111, 60, 0.28)',
        secondary: '#5D8A8A',
        tagBg: 'rgba(247, 244, 235, 0.08)',
        headerFont: "'Space Grotesk', 'Courier Prime', sans-serif",
        bodyFont: "'Courier Prime', monospace, sans-serif",
        badge: 'CYBER KINETIC // BAUHAUS MESH',
      }
    case 'developer-terminal':
      return {
        bg: '#0B0D10',
        cardBg: '#101418',
        cardBorder: '#1F292E',
        cardHover: '#22C55E',
        text: '#86EFAC',
        textMuted: '#4ADE80',
        accent: '#22C55E',
        accentGlow: 'rgba(34, 197, 94, 0.25)',
        secondary: '#059669',
        tagBg: 'rgba(34, 197, 94, 0.1)',
        headerFont: "'IBM Plex Mono', 'Courier Prime', monospace",
        bodyFont: "'IBM Plex Mono', monospace",
        badge: 'VT-100 TERMINAL // LIVE DEPLOY',
      }
    case 'executive-minimalist':
      return {
        bg: '#FAFAF9',
        cardBg: '#FFFFFF',
        cardBorder: '#E7E5E4',
        cardHover: '#1C1917',
        text: '#1C1917',
        textMuted: '#57534E',
        accent: '#1C1917',
        accentGlow: 'rgba(28, 25, 23, 0.15)',
        secondary: '#78716C',
        tagBg: 'rgba(28, 25, 23, 0.06)',
        headerFont: "'Cinzel', 'DM Serif Display', Georgia, serif",
        bodyFont: "'Outfit', system-ui, sans-serif",
        badge: 'EXECUTIVE EDITORIAL ARCHIVE',
      }
    case 'creative-studio':
    default:
      return {
        bg: '#0F1014',
        cardBg: '#16171B',
        cardBorder: '#262832',
        cardHover: '#FF6F3C',
        text: '#FFFFFF',
        textMuted: '#94A3B8',
        accent: '#FF6F3C',
        accentGlow: 'rgba(255, 111, 60, 0.25)',
        secondary: '#5D8A8A',
        tagBg: 'rgba(255, 255, 255, 0.08)',
        headerFont: "'Outfit', 'Space Grotesk', sans-serif",
        bodyFont: "'Outfit', system-ui, sans-serif",
        badge: 'CREATIVE STUDIO ARCHIVE',
      }
  }
}

/**
 * Builds the standalone index.html content injecting the user's Zustand data
 */
function buildStandaloneHTML(
  profile: ProfileData,
  cards: { card: PortfolioProjectCard; relativeImagePath: string }[],
  animation: PortfolioAnimationType,
  template: PortfolioTemplateId = 'retro-space-age',
  resumeData?: ResumeData,
  _webComponents?: CustomWebComponent[]
): string {
  const animationCSS = generateAnimationCSS(animation)
  const theme = getTemplateThemeConfig(template)
  const allTags = Array.from(new Set(cards.flatMap((c) => c.card.tags)))

  const experiences = resumeData?.experience || []
  const skillsList = resumeData?.skills || []

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.fullName} — Visual Portfolio & Engineered Works</title>
  <meta name="description" content="${profile.fullName} — ${profile.headline} based in ${profile.location}.">

  <!-- Retro & Modern WebFonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@500;700;900&family=Special+Elite&family=Syne:wght@700;800&display=swap" rel="stylesheet">

  <!-- Framer Motion CDN for motion physics & entrance animations -->
  <script src="https://cdn.jsdelivr.net/npm/framer-motion@11.11.17/dist/framer-motion.js"></script>

  <style>
    :root {
      --bg: ${theme.bg};
      --card-bg: ${theme.cardBg};
      --card-border: ${theme.cardBorder};
      --card-hover: ${theme.cardHover};
      --text: ${theme.text};
      --text-muted: ${theme.textMuted};
      --accent: ${theme.accent};
      --accent-glow: ${theme.accentGlow};
      --secondary: ${theme.secondary};
      --tag-bg: ${theme.tagBg};
      --header-font: ${theme.headerFont};
      --body-font: ${theme.bodyFont};
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--body-font);
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.6;
      padding: 0;
      overflow-x: hidden;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    h1, h2, h3, h4, .brand-font {
      font-family: var(--header-font);
    }

    /* Ambient noise/grid overlay */
    .bg-grid {
      position: fixed;
      inset: 0;
      pointer-events: none;
      opacity: 0.05;
      background-size: 28px 28px;
      background-image:
        linear-gradient(to right, var(--text) 1px, transparent 1px),
        linear-gradient(to bottom, var(--text) 1px, transparent 1px);
      z-index: 0;
    }

    /* Top Nav */
    nav.top-nav {
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(16px);
      background: rgba(var(--bg), 0.85);
      border-bottom: 1px solid var(--card-border);
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      font-size: 1.05rem;
      color: var(--text);
      text-decoration: none;
      letter-spacing: -0.02em;
    }

    .brand-mark {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #121316;
      font-size: 14px;
      font-weight: 900;
    }

    .nav-links {
      display: flex;
      gap: 1.25rem;
      align-items: center;
      list-style: none;
    }

    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .nav-links a:hover {
      color: var(--accent);
    }

    /* Hero Header */
    header.hero {
      position: relative;
      z-index: 10;
      padding: 4.5rem 1.5rem 3rem;
      text-align: center;
      max-width: 920px;
      margin: 0 auto;
    }

    .spec-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 1rem;
      border-radius: 9999px;
      background: var(--tag-bg);
      border: 1px solid var(--card-border);
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 1.25rem;
    }

    h1.hero-title {
      font-size: clamp(2.25rem, 5.5vw, 3.75rem);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 0.85rem;
      color: var(--text);
    }

    .hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--secondary);
      font-weight: 600;
      margin-bottom: 1.25rem;
    }

    .hero-bio {
      color: var(--text-muted);
      font-size: 1rem;
      max-width: 680px;
      margin: 0 auto 2rem;
      line-height: 1.7;
    }

    .contact-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .contact-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--text);
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .contact-link:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
      box-shadow: 0 4px 14px var(--accent-glow);
    }

    /* Filter Bar */
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      margin: 2.5rem 0 1rem;
    }

    .filter-btn {
      background: var(--tag-bg);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      padding: 0.45rem 1rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s ease;
    }

    .filter-btn:hover, .filter-btn.active {
      background: var(--accent);
      color: #121316;
      border-color: var(--accent);
      box-shadow: 0 4px 12px var(--accent-glow);
    }

    /* Main Container */
    main.container {
      position: relative;
      z-index: 10;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem 5rem;
    }

    /* Cards Grid */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .portfolio-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 1.25rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(12px);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .portfolio-card:hover {
      transform: translateY(-6px);
      border-color: var(--card-hover);
      box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.25), 0 0 25px var(--accent-glow);
    }

    .card-thumb {
      position: relative;
      width: 100%;
      height: 220px;
      background: rgba(0, 0, 0, 0.15);
      overflow: hidden;
    }

    .card-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .portfolio-card:hover .card-thumb img {
      transform: scale(1.05);
    }

    .card-badge {
      position: absolute;
      top: 0.85rem;
      left: 0.85rem;
      background: rgba(18, 19, 22, 0.85);
      color: #FFF;
      border: 1px solid var(--card-border);
      backdrop-filter: blur(8px);
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .card-body {
      padding: 1.35rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.6rem;
      color: var(--text);
    }

    .card-desc {
      color: var(--text-muted);
      font-size: 0.88rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
      flex: 1;
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.25rem;
    }

    .tag-pill {
      font-size: 0.72rem;
      padding: 0.2rem 0.6rem;
      background: var(--tag-bg);
      border: 1px solid var(--card-border);
      border-radius: 4px;
      color: var(--text-muted);
      font-weight: 600;
    }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid var(--card-border);
    }

    .card-link {
      color: var(--accent);
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: gap 0.2s ease;
    }

    .card-link:hover {
      gap: 0.6rem;
    }

    /* Experience & Skills Sections */
    section.extra-section {
      margin-top: 5rem;
      padding-top: 3rem;
      border-top: 1px solid var(--card-border);
    }

    .section-heading {
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: 2rem;
      text-align: center;
      color: var(--text);
    }

    .timeline-grid {
      display: grid;
      gap: 1.5rem;
      max-width: 860px;
      margin: 0 auto;
    }

    .timeline-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 1rem;
      padding: 1.5rem;
    }

    .timeline-role {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text);
    }

    .timeline-company {
      color: var(--secondary);
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .timeline-desc {
      color: var(--text-muted);
      font-size: 0.88rem;
      line-height: 1.6;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      max-width: 860px;
      margin: 0 auto;
    }

    .skill-pill {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text);
    }

    /* Replay & Floating Control */
    .replay-btn {
      position: fixed;
      bottom: 1.75rem;
      right: 1.75rem;
      background: var(--accent);
      color: #121316;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 9999px;
      font-weight: 800;
      font-size: 0.82rem;
      letter-spacing: 0.04em;
      cursor: pointer;
      box-shadow: 0 10px 25px var(--accent-glow);
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      font-family: inherit;
    }

    .replay-btn:hover {
      transform: translateY(-3px) scale(1.02);
    }

    footer {
      text-align: center;
      padding: 3rem 1.5rem;
      color: var(--text-muted);
      font-size: 0.82rem;
      border-top: 1px solid var(--card-border);
    }

    ${animationCSS}
  </style>
</head>
<body>
  <div class="bg-grid"></div>

  <!-- Navigation -->
  <nav class="top-nav">
    <a href="#" class="brand-logo">
      <div class="brand-mark">⚡</div>
      <span>${profile.fullName}</span>
    </a>
    <ul class="nav-links">
      <li><a href="#projects">Projects</a></li>
      ${experiences.length > 0 ? '<li><a href="#experience">Experience</a></li>' : ''}
      ${skillsList.length > 0 ? '<li><a href="#skills">Skills</a></li>' : ''}
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <!-- Hero Header -->
  <header class="hero">
    <div class="spec-pill">
      <span>●</span> ${theme.badge}
    </div>
    <h1 class="hero-title">${profile.fullName}</h1>
    <p class="hero-subtitle">${profile.headline} • ${profile.location}</p>
    <p class="hero-bio">${profile.summary}</p>

    <!-- Social / Contact Bar -->
    <div class="contact-bar" id="contact">
      ${profile.website ? `<a href="${profile.website}" target="_blank" rel="noreferrer" class="contact-link">Website</a>` : ''}
      ${profile.github ? `<a href="${profile.github}" target="_blank" rel="noreferrer" class="contact-link">GitHub</a>` : ''}
      ${profile.linkedin ? `<a href="${profile.linkedin}" target="_blank" rel="noreferrer" class="contact-link">LinkedIn</a>` : ''}
      ${profile.email ? `<a href="mailto:${profile.email}" class="contact-link">${profile.email}</a>` : ''}
    </div>

    <!-- Category Filter Bar -->
    ${
      allTags.length > 0
        ? `<div class="filter-bar">
            <button class="filter-btn active" onclick="filterCards('All', this)">All Works</button>
            ${allTags
              .map(
                (tag) =>
                  `<button class="filter-btn" onclick="filterCards('${tag}', this)">${tag}</button>`
              )
              .join('\n')}
          </div>`
        : ''
    }
  </header>

  <!-- Visual Projects Grid -->
  <main class="container" id="projects">
    <div class="cards-grid" id="cardsGrid">
      ${cards
        .map(
          ({ card, relativeImagePath }, idx) => `
      <article class="portfolio-card" style="--index: ${idx}" data-tags="${card.tags.join(',')}">
        <div class="card-thumb">
          <img src="${relativeImagePath}" alt="${card.title}" loading="lazy" />
          ${card.badge ? `<span class="card-badge">${card.badge}</span>` : ''}
        </div>
        <div class="card-body">
          <h2 class="card-title">${card.title}</h2>
          <p class="card-desc">${card.description}</p>
          <div class="card-tags">
            ${card.tags.map((t) => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
          <div class="card-footer">
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Spec Card</span>
            ${card.linkUrl ? `<a href="${card.linkUrl}" target="_blank" rel="noreferrer" class="card-link">View Project →</a>` : ''}
          </div>
        </div>
      </article>`
        )
        .join('\n')}
    </div>

    <!-- Career Experience Section -->
    ${
      experiences.length > 0
        ? `<section class="extra-section" id="experience">
            <h2 class="section-heading">Engineered Career History</h2>
            <div class="timeline-grid">
              ${experiences
                .map(
                  (exp, i) => `
                <div class="timeline-card" style="--index: ${i}">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem;">
                    <div class="timeline-role">${exp.role}</div>
                    <div style="font-size: 0.8rem; color: var(--accent); font-weight: 700;">${exp.startDate} — ${exp.current ? 'Present' : exp.endDate}</div>
                  </div>
                  <div class="timeline-company">${exp.company} • ${exp.location}</div>
                  <p class="timeline-desc">${exp.description}</p>
                </div>`
                )
                .join('\n')}
            </div>
          </section>`
        : ''
    }

    <!-- Skills Section -->
    ${
      skillsList.length > 0
        ? `<section class="extra-section" id="skills">
            <h2 class="section-heading">Core Competencies & Frameworks</h2>
            <div class="skills-grid">
              ${skillsList
                .flatMap((c) => c.skills)
                .map((skill, i) => `<span class="skill-pill" style="--index: ${i}">⚡ ${skill}</span>`)
                .join('\n')}
            </div>
          </section>`
        : ''
    }
  </main>

  <button class="replay-btn" onclick="replayAnimations()">
    ↺ Replay Entrance
  </button>

  <footer>
    <p>© 2026 ${profile.fullName}. Built & Exported with REZUME MAKER Workers' Studio.</p>
  </footer>

  <script>
    // Framer Motion entrance integration
    window.addEventListener('DOMContentLoaded', () => {
      if (window.Motion || window.framerMotion) {
        const motion = window.Motion || window.framerMotion;
        if (typeof motion.animate === 'function') {
          const cards = document.querySelectorAll('.portfolio-card');
          motion.animate(
            cards,
            { opacity: [0, 1], y: [35, 0], scale: [0.97, 1] },
            { duration: 0.6, easing: [0.16, 1, 0.3, 1], delay: motion.stagger ? motion.stagger(0.08) : 0.08 }
          );
        }
      }
    });

    // Tag filtering logic
    function filterCards(selectedTag, buttonElement) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      buttonElement.classList.add('active');

      const cards = document.querySelectorAll('.portfolio-card');
      let visibleIndex = 0;

      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(',');
        if (selectedTag === 'All' || tags.includes(selectedTag)) {
          card.style.display = 'flex';
          card.style.setProperty('--index', visibleIndex++);
          // Restart animation
          card.style.animation = 'none';
          card.offsetHeight; // trigger reflow
          card.style.animation = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Replay entrance animations
    function replayAnimations() {
      const cards = document.querySelectorAll('.portfolio-card, .timeline-card, .skill-pill');
      cards.forEach(card => {
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = '';
      });
      if (window.Motion || window.framerMotion) {
        const motion = window.Motion || window.framerMotion;
        if (typeof motion.animate === 'function') {
          motion.animate(
            cards,
            { opacity: [0, 1], y: [30, 0] },
            { duration: 0.5, easing: [0.16, 1, 0.3, 1] }
          );
        }
      }
    }
  </script>
</body>
</html>`
}

/**
 * Main export function using JSZip and file-saver.
 * Takes the active portfolio template, injects user's Zustand data into standalone index.html,
 * includes framer-motion CDN for entrance animations, and packages into downloadable portfolio.zip.
 */
export async function exportPortfolioZip(
  profile?: ProfileData,
  portfolioCards?: PortfolioProjectCard[],
  portfolioAnimation?: PortfolioAnimationType,
  portfolioTemplate?: PortfolioTemplateId
): Promise<void> {
  // Read full state from Zustand store as baseline fallback
  const storeState = useResumeStore.getState()

  const finalProfile = profile || storeState.resumeData.profile
  const finalCards = portfolioCards || storeState.portfolioCards
  const finalAnimation = portfolioAnimation || storeState.portfolioAnimation || 'stagger'
  const finalTemplate = portfolioTemplate || storeState.portfolioTemplate || 'retro-space-age'
  const finalResumeData = storeState.resumeData
  const finalWebComponents = storeState.webComponents

  const zip = new JSZip()
  const assetsFolder = zip.folder('assets')

  const processedCards: { card: PortfolioProjectCard; relativeImagePath: string }[] = []

  // Process all cards and bundle local image assets if present
  for (let i = 0; i < finalCards.length; i++) {
    const card = finalCards[i]
    let relativeImagePath = card.imageUrl

    if (card.imageUrl.startsWith('data:image/')) {
      const parsed = parseDataUrl(card.imageUrl)
      if (parsed && assetsFolder) {
        const filename = `project-${i + 1}-${card.title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .slice(0, 20)}.${parsed.extension}`

        assetsFolder.file(filename, parsed.base64, { base64: true })
        relativeImagePath = `assets/${filename}`
      }
    }

    processedCards.push({ card, relativeImagePath })
  }

  // Generate the standalone index.html
  const htmlContent = buildStandaloneHTML(
    finalProfile,
    processedCards,
    finalAnimation,
    finalTemplate,
    finalResumeData,
    finalWebComponents
  )
  zip.file('index.html', htmlContent)

  // Generate README.md
  const readmeContent = `# ${finalProfile.fullName} — Visual Portfolio

Standalone interactive portfolio compiled and exported from **REZUME MAKER Workers' Studio**.

## Specifications:
- **Active Template**: \`${finalTemplate}\`
- **Entrance Animation Preset**: \`${finalAnimation}\`
- **Animation Engine**: Includes **Framer Motion CDN** + hardware-accelerated CSS animations
- **Local Assets**: Packaged directly within \`assets/\`
- **Autonomous & Offline-Ready**: Pure HTML5/CSS/JS without npm or build step. Double-click \`index.html\` to view offline.

## Instant One-Click Deployment:
1. **GitHub Pages**: Upload repository or drop contents to \`gh-pages\` branch.
2. **Netlify**: Drag and drop this unzipped folder into [Netlify Drop](https://app.netlify.com/drop).
3. **Vercel**: Deploy directly with \`npx vercel\`.
`
  zip.file('README.md', readmeContent)

  // Compile ZIP file with maximum DEFLATE compression
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  })

  // Trigger download as portfolio.zip
  saveAs(zipBlob, 'portfolio.zip')
}
