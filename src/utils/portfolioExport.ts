import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type {
  PortfolioProjectCard,
  PortfolioAnimationType,
  PortfolioTemplateId,
  ProfileData,
} from '../types/resume'

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
 * Generates animation CSS rules according to selected animation
 */
function generateAnimationCSS(animation: PortfolioAnimationType): string {
  switch (animation) {
    case 'slide-up':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: translateY(45px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .portfolio-card {
          animation: entranceAnim 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: calc(var(--index) * 0.08s);
        }
      `
    case 'fade-in':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .portfolio-card {
          animation: entranceAnim 0.7s ease-out both;
          animation-delay: calc(var(--index) * 0.09s);
        }
      `
    case 'scale-up':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: scale(0.82); }
          to { opacity: 1; transform: scale(1); }
        }
        .portfolio-card {
          animation: entranceAnim 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          animation-delay: calc(var(--index) * 0.08s);
        }
      `
    case 'stagger':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .portfolio-card {
          animation: entranceAnim 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: calc(var(--index) * 0.14s);
        }
      `
    case 'flip-up':
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: perspective(1000px) rotateX(45deg) translateY(35px); }
          to { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0); }
        }
        .portfolio-card {
          animation: entranceAnim 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: calc(var(--index) * 0.1s);
        }
      `
    case 'bounce':
      return `
        @keyframes entranceAnim {
          0% { opacity: 0; transform: translateY(70px) scale(0.9); }
          65% { opacity: 1; transform: translateY(-10px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .portfolio-card {
          animation: entranceAnim 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
          animation-delay: calc(var(--index) * 0.12s);
        }
      `
    default:
      return `
        @keyframes entranceAnim {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .portfolio-card {
          animation: entranceAnim 0.5s ease both;
          animation-delay: calc(var(--index) * 0.08s);
        }
      `
  }
}

/**
 * Builds the standalone index.html content
 */
function buildStandaloneHTML(
  profile: ProfileData,
  cards: { card: PortfolioProjectCard; relativeImagePath: string }[],
  animation: PortfolioAnimationType,
  template: PortfolioTemplateId = 'creative-studio'
): string {
  const animationCSS = generateAnimationCSS(animation)
  const allTags = Array.from(new Set(cards.flatMap((c) => c.card.tags)))

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.fullName} — Visual Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@500;700;900&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: ${template === 'retro-space-age' ? '#F2EBD7' : '#0D1B2A'};
      --card-bg: ${template === 'retro-space-age' ? '#FAF6EC' : '#14243B'};
      --card-border: ${template === 'retro-space-age' ? '#0D1B2A' : '#223854'};
      --card-hover: ${template === 'retro-space-age' ? '#FF6F3C' : '#FF6F3C'};
      --text: ${template === 'retro-space-age' ? '#0D1B2A' : '#F2EBD7'};
      --text-muted: ${template === 'retro-space-age' ? '#3D5A73' : '#A3B4C8'};
      --accent: #FF6F3C;
      --accent-glow: rgba(255, 111, 60, 0.25);
      --tag-bg: ${template === 'retro-space-age' ? 'rgba(13, 27, 42, 0.08)' : 'rgba(242, 235, 215, 0.08)'};
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Outfit', system-ui, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.5;
      padding: 0;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 {
      font-family: 'DM Serif Display', 'Space Grotesk', serif;
    }
    header {
      padding: 4rem 1.5rem 2.5rem;
      text-align: center;
      max-width: 900px;
      margin: 0 auto;
      position: relative;
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.3);
      color: #93c5fd;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3.25rem);
      font-weight: 900;
      letter-spacing: -0.04em;
      background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.75rem;
    }
    .headline {
      font-size: 1.125rem;
      color: #60a5fa;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    .bio {
      color: var(--text-muted);
      font-size: 0.95rem;
      max-width: 650px;
      margin: 0 auto 1.5rem;
      line-height: 1.6;
    }
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      margin: 2rem 0;
    }
    .filter-btn {
      background: var(--tag-bg);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      padding: 0.4rem 0.9rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .filter-btn:hover, .filter-btn.active {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
      box-shadow: 0 4px 12px var(--accent-glow);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem 5rem;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
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
      box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.5), 0 0 25px var(--accent-glow);
    }
    .card-thumb {
      position: relative;
      width: 100%;
      height: 220px;
      background: #0f172a;
      overflow: hidden;
    }
    .card-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .portfolio-card:hover .card-thumb img {
      transform: scale(1.06);
    }
    .card-badge {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(6px);
      color: #f8fafc;
      font-size: 0.7rem;
      font-weight: 700;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      gap: 1rem;
    }
    .card-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.4rem;
    }
    .card-desc {
      color: var(--text-muted);
      font-size: 0.875rem;
      line-height: 1.6;
    }
    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .tag {
      background: var(--tag-bg);
      border: 1px solid var(--card-border);
      color: #cbd5e1;
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-family: ui-monospace, Consolas, monospace;
    }
    .card-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--accent);
      text-decoration: none;
      margin-top: 0.5rem;
      transition: color 0.2s;
    }
    .card-link:hover {
      color: #93c5fd;
      text-decoration: underline;
    }
    footer {
      border-top: 1px solid var(--card-border);
      text-align: center;
      padding: 3rem 1.5rem;
      color: var(--text-muted);
      font-size: 0.8rem;
    }
    .replay-btn {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 100;
      background: var(--accent);
      color: white;
      border: none;
      padding: 0.6rem 1.1rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4), 0 0 20px var(--accent-glow);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: transform 0.2s, background 0.2s;
    }
    .replay-btn:hover {
      transform: scale(1.05);
      background: #2563eb;
    }
    ${animationCSS}
  </style>
</head>
<body>
  <header>
    <div class="badge-pill">
      <span>●</span>
      <span>${cards.length} Projects Shipped</span>
      <span>•</span>
      <span>${template.replace('-', ' ').toUpperCase()}</span>
      <span>•</span>
      <span>${animation.toUpperCase()} ANIMATION</span>
    </div>
    <h1>${profile.fullName}</h1>
    <div class="headline">${profile.headline}</div>
    ${profile.summary ? `<p class="bio">${profile.summary}</p>` : ''}

    <div class="filter-bar">
      <button class="filter-btn active" onclick="filterCards('All', this)">All</button>
      ${allTags.map((tag) => `<button class="filter-btn" onclick="filterCards('${tag}', this)">${tag}</button>`).join('\n      ')}
    </div>
  </header>

  <main class="container">
    <div class="cards-grid" id="cardsGrid">
      ${cards
        .map(
          ({ card, relativeImagePath }, index) => `
      <article class="portfolio-card" data-tags="${card.tags.join(',')}" style="--index: ${index};">
        <div class="card-thumb">
          <img src="${relativeImagePath}" alt="${card.title}" loading="lazy">
          ${card.badge ? `<span class="card-badge">${card.badge}</span>` : ''}
        </div>
        <div class="card-body">
          <div>
            <h2 class="card-title">${card.title}</h2>
            <p class="card-desc">${card.description}</p>
          </div>
          <div>
            <div class="card-tags">
              ${card.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
            </div>
            ${card.linkUrl ? `<a href="${card.linkUrl}" target="_blank" rel="noreferrer" class="card-link">View Project →</a>` : ''}
          </div>
        </div>
      </article>`
        )
        .join('\n')}
    </div>
  </main>

  <button class="replay-btn" onclick="replayAnimations()">
    ↺ Replay Entrance
  </button>

  <footer>
    <p>© ${new Date().getFullYear()} ${profile.fullName}. Built & Exported with REZUME MAKER Studio.</p>
  </footer>

  <script>
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

    function replayAnimations() {
      const cards = document.querySelectorAll('.portfolio-card');
      cards.forEach(card => {
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = '';
      });
    }
  </script>
</body>
</html>`
}

/**
 * Main function using JSZip and file-saver to package the standalone portfolio and local assets
 */
export async function exportPortfolioZip(
  profile: ProfileData,
  portfolioCards: PortfolioProjectCard[],
  portfolioAnimation: PortfolioAnimationType,
  portfolioTemplate: PortfolioTemplateId = 'creative-studio'
): Promise<void> {
  const zip = new JSZip()
  const assetsFolder = zip.folder('assets')

  const processedCards: { card: PortfolioProjectCard; relativeImagePath: string }[] = []

  // Process all cards and local image assets
  for (let i = 0; i < portfolioCards.length; i++) {
    const card = portfolioCards[i]
    let relativeImagePath = card.imageUrl

    if (card.imageUrl.startsWith('data:image/')) {
      // Local uploaded image
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
  const htmlContent = buildStandaloneHTML(profile, processedCards, portfolioAnimation, portfolioTemplate)
  zip.file('index.html', htmlContent)

  // Add README.md
  const readmeContent = `# ${profile.fullName} — Visual Portfolio

This is a standalone, self-contained interactive portfolio website compiled and exported from **REZUME MAKER**.

## Features Included:
- **Responsive Grid**: Fluid layout optimized for mobile, tablet, and desktop viewports.
- **Entrance Animations**: Preset with **${portfolioAnimation.toUpperCase()}** animations.
- **Local Assets**: All local image assets are bundled inside \`assets/\`.
- **Zero Dependencies**: Pure HTML5, modern inline CSS, and vanilla JS. Double-click \`index.html\` to open offline in any browser.

## Deployment:
To deploy this portfolio online for free:
1. Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop) or [Vercel](https://vercel.com).
2. Or push to GitHub and enable **GitHub Pages**.
`
  zip.file('README.md', readmeContent)

  // Generate and trigger download with file-saver
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  })

  const safeFileName = `${profile.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-portfolio.zip`
  saveAs(zipBlob, safeFileName)
}
