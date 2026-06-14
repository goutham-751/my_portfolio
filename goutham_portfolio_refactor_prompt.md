# PORTFOLIO REFACTOR BRIEF — GOUTHAM KUMAR
### For: Antigravity (Gemini Pro High) | Mode: REFACTOR, not rebuild

---

## CONTEXT — READ THIS FIRST

I already have a deployed portfolio at:
**https://my-portfolio-three-dun-97.vercel.app/**

This is a **React SPA** already built with a dark theme (`#05050A` base). Your job is **NOT** to generate a new portfolio from scratch. Your job is to **refactor the existing codebase** — surgically upgrading the design system, content, animations, and missing sections while preserving the existing architecture.

**Workflow:**
1. Fetch and read the existing source code from my repo
2. Audit what's currently implemented (components, sections, styles, animations)
3. Apply the changes listed below as targeted file edits — modify, not replace
4. Only create new files where a section is genuinely missing

**If a section already exists and works — keep it. Only modify what the brief explicitly specifies.**

---

## OWNER INFORMATION (Canonical — override any incorrect data in the existing code)

```
Name:       Goutham Kumar
Title:      AI/ML Engineer · Full-Stack Developer · Data Scientist
Email:      kgoutham2k5@gmail.com
Phone:      +91 88076 25425
GitHub:     github.com/goutham-751
LinkedIn:   linkedin.com/in/goutham-kumar7
Location:   Chennai, India
Education:  VIT Chennai — B.Tech CSE (Data Science), CGPA 8.83/10, 2023–2027
Status:     Actively seeking SDE / AI / ML internships
```

---

## CHANGE LOG — WHAT TO DO

### 1. DESIGN SYSTEM UPGRADE
**Priority: High — affects every component**

Replace or reconcile the existing CSS variables/Tailwind tokens with this system:

```css
/* If using CSS vars — replace :root tokens */
--color-bg:              #080A0F;
--color-surface:         #0D1117;
--color-surface-2:       #161B22;
--color-border:          #21262D;
--color-border-hover:    #30363D;
--color-text-primary:    #F0F6FC;
--color-text-secondary:  #8B949E;
--color-text-tertiary:   #484F58;
--color-accent:          #3FB950;   /* Matrix green — primary accent */
--color-accent-dim:      #1A3825;
--color-accent-glow:     rgba(63, 185, 80, 0.15);
--color-highlight:       #58A6FF;   /* Blue — links, secondary CTAs */
--color-highlight-dim:   #1C2B3A;
--gradient-hero:         radial-gradient(ellipse at 60% 0%, rgba(63,185,80,0.08) 0%, transparent 60%),
                         radial-gradient(ellipse at 10% 80%, rgba(88,166,255,0.06) 0%, transparent 50%);
```

**If the existing palette already uses these or something close — leave it. Only update what diverges.**

---

### 2. TYPOGRAPHY UPGRADE
**Priority: High**

If the portfolio is using generic fonts (Inter, Roboto, system-ui), replace the font stack:

```css
/* In index.html <head> or global CSS — add these Google Fonts imports */
/* Bricolage Grotesque (display), Geist (body), Geist Mono (code/labels) */

@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Instrument+Serif:ital@1&display=swap');
/* Geist and Geist Mono: use @vercel/font or npm install geist */

/* Then in your CSS: */
--font-display:  'Bricolage Grotesque', sans-serif;
--font-body:     'Geist', sans-serif;
--font-mono:     'Geist Mono', monospace;
--font-accent:   'Instrument Serif', serif;
```

Apply the display font to all H1/H2 section headers. Apply mono font to all tech tags, labels, and metric numbers.

**Fluid type scale — replace static font-size values:**
```css
--text-hero: clamp(3.5rem, 2.5rem + 5vw, 7rem);
--text-4xl:  clamp(2rem, 1.5rem + 2.5vw, 3rem);
--text-3xl:  clamp(1.6rem, 1.3rem + 1.5vw, 2rem);
--text-base: clamp(0.9rem, 0.85rem + 0.3vw, 1rem);
```

---

### 3. ANIMATION SYSTEM — ADD / UPGRADE
**Priority: High — install these if not already present**

```bash
npm install framer-motion lenis
```

**Create `src/lib/animations.ts`** (if it doesn't exist) with these shared variants:

```typescript
export const EASING = {
  smooth:   [0.16, 1, 0.3, 1],
  dramatic: [0.76, 0, 0.24, 1],
  spring:   { type: 'spring', stiffness: 300, damping: 30 } as const,
};

export const DURATION = { fast: 0.2, normal: 0.4, slow: 0.7, dramatic: 1.2 };

/* Reusable Framer Motion variants */
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASING.smooth, delay: i * 0.08 }
  }),
};

export const maskReveal = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.8, ease: EASING.smooth } },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
```

**Wrap all sections** that aren't already animated with `motion.section` using `fadeUp` triggered by `whileInView`:
```tsx
<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>
```

**Smooth scroll — initialize Lenis in `main.tsx` or `App.tsx`:**
```typescript
import Lenis from 'lenis';
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

---

### 4. MAGNETIC BUTTONS — ADD
**Priority: Medium**

Create `src/hooks/useMagneticButton.ts`:
```typescript
import { useRef, useState } from 'react';

export function useMagneticButton(strength = 0.3) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return { ref, pos, handleMouseMove, handleMouseLeave };
}
```

Wrap primary CTAs (hero buttons, contact CTA) with this hook using `motion.button` and `animate={{ x: pos.x, y: pos.y }}` with `transition: EASING.spring`.

---

### 5. CUSTOM CURSOR — ADD (desktop only)
**Priority: Medium**

Create `src/components/ui/Cursor.tsx`:
```tsx
import { useEffect, useRef } from 'react';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  useEffect(() => {
    // Only on pointer-fine (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.style.cursor = 'none';

    const move = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', move);

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    let raf: number;
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (dot.current)  { dot.current.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`; }
      if (ring.current) { ring.current.style.transform = `translate(${ringX}px,  ${ringY}px)  translate(-50%, -50%)`; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); document.body.style.cursor = ''; };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  );
}
```

Add to global CSS:
```css
.cursor-dot  { position: fixed; top: 0; left: 0; width: 6px; height: 6px; background: var(--color-accent); border-radius: 50%; pointer-events: none; z-index: 9999; }
.cursor-ring { position: fixed; top: 0; left: 0; width: 36px; height: 36px; border: 1px solid var(--color-accent); border-radius: 50%; pointer-events: none; z-index: 9998; opacity: 0.6; }
```

Mount `<Cursor />` in `App.tsx` above the router.

---

### 6. HERO SECTION — SPECIFIC CHANGES
**Priority: High**

Find the existing Hero component and apply these targeted changes:

**a) Headline — if not already using a mask/clip reveal:**
```tsx
// Wrap each hero line in:
<motion.span variants={maskReveal} initial="hidden" animate="visible"
  style={{ display: 'inline-block', overflow: 'hidden' }}>
  {line}
</motion.span>
```

**b) Add the "Available for Internships" badge above the H1** (if missing):
```tsx
<motion.div variants={fadeUp} custom={0}
  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-accent-dim)] bg-[var(--color-accent-dim)] mb-6">
  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
  <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-accent)]">
    Available for Internships · 2026
  </span>
</motion.div>
```

**c) Update hero tagline** (if different from current):
```
H1:   "Goutham Kumar"
H2:   "I build intelligent systems."   ← Instrument Serif, italic
Body: "AI/ML engineer and full-stack developer at VIT Chennai.
       From RAG pipelines to real-time analytics — I ship products that work."
```

**d) Add bottom metrics bar** (if missing):
```tsx
<div className="flex gap-8 mt-10 pt-8 border-t border-[var(--color-border)]">
  {[
    { value: '8.83', label: 'CGPA' },
    { value: '4',    label: 'PRODUCTION PROJECTS' },
    { value: '₹50K', label: 'HACKATHON BOUNTY' },
    { value: '200+', label: 'COMMUNITY MEMBERS' },
  ].map(({ value, label }) => (
    <div key={label}>
      <div className="font-mono text-2xl font-bold text-[var(--color-accent)]">{value}</div>
      <div className="font-mono text-xs tracking-widest uppercase text-[var(--color-text-tertiary)]">{label}</div>
    </div>
  ))}
</div>
```

---

### 7. PROJECT CARDS — UPGRADE HOVER EFFECT
**Priority: Medium**

Add a spotlight (cursor-tracking radial gradient) to each project card:

```tsx
// In your ProjectCard component
const cardRef = useRef<HTMLDivElement>(null);

const handleMouseMove = (e: React.MouseEvent) => {
  const rect = cardRef.current!.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  cardRef.current!.style.setProperty('--mouse-x', `${x}%`);
  cardRef.current!.style.setProperty('--mouse-y', `${y}%`);
};
```

Add to card CSS:
```css
.project-card {
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease;
}
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    var(--color-accent-glow), transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.project-card:hover::before { opacity: 1; }
.project-card:hover { border-color: var(--color-border-hover); }
```

---

### 8. PROJECTS — CONTENT CORRECTIONS
**Priority: High — use this as the canonical project data**

Update your projects data file (wherever project content lives — `constants.ts`, `data.ts`, `projects.json`, or hardcoded in JSX) with the following:

```typescript
export const projects = [
  {
    id: 'campushire',
    title: 'CampusHire.AI',
    type: 'Full-Stack AI SaaS',
    label: 'Featured',
    stack: ['React.js', 'FastAPI', 'Llama-3', 'Framer Motion', 'Python'],
    headline: 'An AI-native recruitment platform replacing manual resume screening and mock interviews.',
    bullets: [
      'Real-time ATS resume analysis with scoring, parsing, and feedback',
      'AI-powered interview simulation with live speech analytics integration',
      'Multi-agent workflow (Llama-3) for automated candidate evaluation and ranking',
      'Responsive frontend with Framer Motion-driven live feedback visualization',
      'RESTful APIs for resume scoring, interview orchestration, and state management',
    ],
    github: 'https://github.com/goutham-751/CAMPUSHIRE.AI',
  },
  {
    id: 'rag-api',
    title: 'Multi-Tenant RAG API',
    type: 'Backend SaaS Infrastructure',
    label: 'Production-Ready',
    stack: ['FastAPI', 'ChromaDB', 'LangChain', 'Docker', 'HuggingFace', 'Groq', 'SentenceTransformers'],
    headline: 'Production-grade, multi-tenant RAG API with enterprise security and hybrid vector search.',
    bullets: [
      'Natural language querying over private documents — zero hallucination via Groq LLM',
      'Multi-tenant data isolation using persistent ChromaDB + SQLite/SQLModel',
      'Hybrid retrieval: Dense Embeddings (SentenceTransformers) + Sparse BM25 + Reciprocal Rank Fusion',
      'Deployed via Docker on HuggingFace Spaces with bcrypt auth, rate limiting, TTL caching',
    ],
    github: 'https://github.com/goutham-751/Multi-tenant-RAG-API',
  },
  {
    id: 'pricepilot',
    title: 'PricePilot.AI',
    type: 'Data Intelligence Platform',
    label: 'Full-Stack',
    stack: ['React', 'FastAPI', 'Supabase', 'PostgreSQL', 'Python'],
    headline: 'Pricing intelligence engine synthesizing competitor signals and demand forecasts into revenue-optimizing decisions.',
    bullets: [
      'Synthesizes competitor pricing, market trends, and demand signals in real time',
      'Price elasticity analysis and accurate demand prediction pipeline',
      'Supabase (PostgreSQL) for large-scale historical pricing data at query speed',
      'Executive-facing React dashboard with live analytics and recommendation cards',
    ],
    github: 'https://github.com/goutham-751/PricePilot-AI',
  },
  {
    id: 'predictive-maintenance',
    title: 'Predictive Maintenance System',
    type: 'Industrial ML System',
    label: 'ML Engineering',
    stack: ['Python', 'FastAPI', 'Streamlit', 'Scikit-learn'],
    headline: 'End-to-end ML system for forecasting industrial machine failure and estimating remaining useful life.',
    bullets: [
      'Classifies failure probability + regresses Remaining Useful Life (RUL) from raw sensor streams',
      'Class-imbalance techniques (SMOTE/weighted loss) to enhance accuracy on skewed datasets',
      'FastAPI backend serving trained models at production inference speed',
      'Real-time + batch prediction visualized in interactive Streamlit dashboard',
    ],
    github: 'https://github.com/goutham-751/Predictive-Maintenance-of-Industrial-Machines-Using-Sensor-Based-Failure-Prediction',
  },
];
```

---

### 9. ADD: RESEARCH SECTION (if missing)
**Priority: High — this is a major differentiator**

If there is no dedicated Research section, create `src/components/sections/Research.tsx` and add it to the page between Projects and Skills:

```tsx
// Visual treatment: single premium card, dark surface, subtle grid overlay
// Content:

const research = {
  title: 'CalibSSL: Reliability and Calibration of Self-Supervised Neural Networks on Tabular Data',
  status: 'Ongoing — Targeting DMKD / AISTATS',
  abstract: 'Investigating why self-supervised models fail silently on tabular data — and fixing it through calibration-aware training objectives and entropy regularization.',
  contributions: [
    'Calibration-aware loss: cross-entropy + entropy-based confidence penalty to reduce overconfidence',
    'ViME (Value Imputation & Mask Estimation) for SSL pretraining on unlabeled tabular data',
    'Benchmarked against 6 baselines (RF, XGBoost, MLP variants) across 5 datasets',
    '5 label-scarcity settings (5%–100%) — 600+ total experiments',
    'Full statistical significance pipeline: paired t-tests, Wilcoxon, Friedman tests',
    'Publication-ready visualizations and reproducible experimental pipeline',
  ],
  tags: ['Self-Supervised Learning', 'Calibration', 'Tabular Data', 'PyTorch', 'Statistical Testing'],
  github: 'https://github.com/goutham-751/CalibSSL-Reliability-and-Calibration-of-Self-supervised-Neural-networks-on-Tabular-data-',
};
```

Section label: `[ 04 — RESEARCH ]`
Visual: Monospace typewriter font for the abstract. Tags rendered as `--font-mono` ALL-CAPS badges. Status badge with amber color (`#D29922`).

---

### 10. ADD: AWARDS SECTION (if missing)
**Priority: Medium**

If there is no awards/achievements section, create one after Research:

```typescript
const awards = [
  {
    title: '₹50,000 Bounty — DEFY 26 University Hackathon',
    date: 'January 2026',
    project: 'ParaCipher',
    description: 'A decentralized blockchain application automating insurance payments for gig workers via smart contracts on the Shardeum network.',
    awardedBy: 'ThinkRoot Ventures × Shardeum',
    tags: ['Blockchain', 'Smart Contracts', 'DeFi', 'Shardeum'],
  },
];
```

Render as a glowing feature card — accent green border, `₹50K` in large mono font as the visual anchor.

---

### 11. EXPERIENCE — CONTENT UPDATE
**Priority: High**

Ensure both experience entries match this canonical data exactly:

```typescript
export const experience = [
  {
    role: 'Summer Research Intern',
    org: 'IGCAR — Indira Gandhi Centre for Atomic Research',
    division: 'Health & Industrial Safety Division, Department of Atomic Energy',
    period: 'Jun 2025 – Jul 2025',
    location: 'Kalpakkam, Chennai',
    bullets: [
      'Radiological data analysis for dose mapping using statistical modeling',
      'Data preprocessing, spatial analysis, and anomaly detection on monitoring data',
      'Descriptive statistics and trend analysis to evaluate radiation exposure patterns',
      'Contributed to safety assessment models for industrial and healthcare environments',
    ],
    tags: ['Python', 'Statistical Modeling', 'Anomaly Detection', 'Spatial Analysis'],
  },
  {
    role: 'Treasurer',
    org: 'CyberSecurity Student Community, VITC',
    period: 'Jun 2025 – Present',
    location: 'VIT Chennai',
    bullets: [
      'Manage financial budgeting and event expenses across community operations',
      'Run hands-on CTF workshops for a 200+ member community',
      'Coordinate events and mentor junior contributors in cybersecurity fundamentals',
    ],
    tags: ['Leadership', 'CTF', 'Community', 'Cybersecurity'],
  },
];
```

---

### 12. NAV — ADD "OPEN TO WORK" BADGE
**Priority: Medium**

In the Navbar component, add a pulsing status badge in the right section (before the Resume/CTA button):

```tsx
<div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-accent-dim)] bg-[var(--color-accent-dim)]">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
  </span>
  <span className="text-xs font-mono text-[var(--color-accent)] tracking-widest uppercase hidden sm:inline">
    Open to Work
  </span>
</div>
```

---

### 13. SECTION LABELS — STANDARDIZE
**Priority: Low-Medium**

Every section should have a consistent label above the H2 in this format:
```tsx
<span className="font-mono text-xs tracking-widest uppercase text-[var(--color-text-tertiary)] mb-3 block">
  {String(index).padStart(2, '0')} — {title}
</span>
```

Use: `01 — ABOUT`, `02 — EXPERIENCE`, `03 — PROJECTS`, `04 — RESEARCH`, `05 — SKILLS`, `06 — AWARDS`, `07 — CONTACT`

---

### 14. CONTACT SECTION — CONTENT UPDATE
**Priority: Medium**

If contact section exists, ensure headline and subtext are:
```
Headline:  "Let's build something."
Subtext:   "I'm actively looking for AI/ML and SDE internship opportunities.
            If you're working on something interesting, I'd love to hear about it."
Email CTA: kgoutham2k5@gmail.com  →  [Copy] [Open in Mail]
Links:     GitHub · LinkedIn · Download Resume
```

Add a "Copy email" button with micro-animation: checkmark morph + "Copied!" tooltip on click.

---

### 15. PERFORMANCE — VERIFY THESE
**Priority: Medium**

- `React.lazy()` + `Suspense` on every section component that isn't above the fold
- All fonts: `font-display: swap` + `<link rel="preload">` in `index.html`
- `will-change: transform` added only during active animation (add on `animationstart`, remove on `animationend`)
- `prefers-reduced-motion` media query: wrap all Framer Motion animations
  ```typescript
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Pass duration: prefersReduced ? 0 : DURATION.normal
  ```

---

## DO NOT CHANGE

1. The existing routing / page structure — don't reorganize sections that already work
2. Any existing section that is already animated with Framer Motion — just apply `animations.ts` refactor if the variants differ
3. The existing `#05050A` / dark base — align it to `--color-bg: #080A0F` (minor tweak only)
4. Any existing social links, GitHub URLs, or contact info that already matches the canonical data above
5. The existing deployment config (`vercel.json`, `vite.config.ts`) — don't touch

---

## DELIVERABLES

Output a list of **changed/created files only** with full file content. Format:

```
--- CHANGED: src/lib/animations.ts ---
[full file content]

--- CHANGED: src/components/sections/Hero.tsx ---
[full file content]

--- CREATED: src/components/sections/Research.tsx ---
[full file content]

... etc
```

Do not output unchanged files. Do not output the full project tree unless asked.
Every code change must be production-ready, TypeScript strict-clean, and deployable without modification.
