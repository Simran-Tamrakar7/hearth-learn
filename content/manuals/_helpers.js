/** Path helpers for GitHub Pages / Next basePath. */
export const asset = (path) => {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '')
  return `${base}/${String(path).replace(/^\//, '')}`
}

export const genres = [
  { id: 'all', label: 'All', blurb: 'Every path in the library.', color: '#0B3D2E' },
  { id: 'automation', label: 'Automation', blurb: 'QA, E2E, APIs, pipelines.', color: '#0F766E' },
  { id: 'quality', label: 'Quality Craft', blurb: 'Testing craft, a11y, perf, security.', color: '#0369A1' },
  { id: 'delivery', label: 'Delivery', blurb: 'Agile, PM, product, work tracking.', color: '#C2410C' },
  { id: 'design', label: 'Design', blurb: 'Visual craft, Figma, product UI.', color: '#B45309' },
  { id: 'ai', label: 'AI & Prompts', blurb: 'Talk to models like a pro.', color: '#0D9488' },
  { id: 'foundations', label: 'Foundations', blurb: 'Languages, Git, data.', color: '#A16207' },
  { id: 'ops', label: 'Ops & Systems', blurb: 'CLI, cloud, observability, docs.', color: '#1D4ED8' },
  { id: 'career', label: 'Career', blurb: 'Resume, portfolio, job hunt.', color: '#BE123C' },
  { id: 'soft-skills', label: 'Soft Skills', blurb: 'Communicate, lead, collaborate.', color: '#15803D' },
]

/** Normalize a lesson-step resource pill. */
export function stepResource(label, url, kind = 'Docs') {
  return { label, url, kind }
}

/** Split long-form body text into readable paragraphs. */
export function bodyParagraphs(body) {
  if (!body) return []
  return String(body)
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean)
}

/** Build a book-style chapter from a compact definition. */
export function ch(def) {
  return {
    ...def,
    id: def.id,
    level: def.level,
    title: def.title,
    minutes: def.minutes ?? 20,
    durationLabel: def.durationLabel ?? null,
    phase: def.phase ?? null,
    kind: def.kind ?? 'chapter',
    // Sub-chapter under another chapter id (studio / localStorage edits)
    parentId: def.parentId ?? null,
    overview: def.overview,
    overviewText: def.overviewText ?? def.overview,
    why: def.why ?? null,
    when: def.when ?? null,
    practical: def.practical ?? null,
    tools: def.tools ?? [],
    learn: def.learn ?? [],
    steps: (def.steps ?? []).map((s, i) => normalizeStep(s, i)),
    checklist: def.checklist ?? [],
    practice: def.practice ?? null,
    links: def.links ?? [],
    citations: def.citations ?? [],
    resources: def.resources ?? [],
    note: def.note ?? null,
    // Additive: part intro blurb shown above the TOC entry / chapter masthead
    partIntro: def.partIntro ?? null,
  }
}


/** Normalize one lesson step to the shared schema (string or object). */
export function normalizeStep(s, i) {
  if (typeof s === 'string') {
    return {
      title: `Step ${i + 1}`,
      body: s,
      learnMore: null,
      image: null,
      resources: [],
      quiz: null,
      tryIt: null,
      doThis: null,
      tip: null,
      code: null,
      codeTitle: null,
      items: null,
      callout: null,
      aside: null,
    }
  }
  return {
    title: s.title ?? `Step ${i + 1}`,
    body: s.body ?? '',
    learnMore: s.learnMore ?? null,
    image: s.image
      ? {
          src: s.image.src ?? s.image,
          alt: s.image.alt ?? s.title ?? `Step ${i + 1}`,
          stickies: Array.isArray(s.image.stickies) ? s.image.stickies : null,
        }
      : null,
    resources: (s.resources ?? []).map((r) =>
      typeof r === 'string'
        ? { label: 'Link', url: r, kind: 'Link' }
        : { label: r.label ?? r.name ?? 'Link', url: r.url, kind: r.kind ?? r.type ?? 'Docs' },
    ),
    quiz: s.quiz
      ? {
          question: s.quiz.question,
          options: s.quiz.options ?? [],
          answer: s.quiz.answer ?? 0,
          explain: s.quiz.explain ?? null,
        }
      : null,
    tryIt: s.tryIt
      ? {
          prompt: s.tryIt.prompt ?? 'Try it',
          code: s.tryIt.code ?? '',
          result: s.tryIt.result ?? '',
        }
      : null,
    doThis: s.doThis ?? null,
    tip: s.tip ?? null,
    code: s.code ?? null,
    codeTitle: s.codeTitle ?? null,
    items: s.items ?? null,
    // Additive apparatus for manual reading
    callout: s.callout
      ? {
          label: s.callout.label ?? 'Note',
          body: s.callout.body ?? (typeof s.callout === 'string' ? s.callout : ''),
          tone: s.callout.tone ?? 'note', // note | tip | warn | scope
        }
      : typeof s.callout === 'string'
        ? { label: 'Note', body: s.callout, tone: 'note' }
        : null,
    aside: s.aside ?? null, // margin note string
  }
}

export function buildRoadmap(chapters) {
  return chapters.map((c, i) => ({
    id: c.id,
    n: c.displayNum ?? i + 1,
    title: c.title,
    level: c.level,
    minutes: c.minutes,
    phase: c.phase,
    kind: c.kind,
    parentId: c.parentId ?? null,
    durationLabel: c.durationLabel,
  }))
}

export function r(type, name, url, lang = 'EN', free = true) {
  return { type, name, url, lang, free }
}

/** Leading "1." / "1.2." / "§01" style prefixes on titles (PDF / source numbering). */
const LEADING_NUM = /^(?:§\s*)?\d+(?:\.\d+)*[.)]\s+/u

export function titleHasLeadingNumber(title) {
  return LEADING_NUM.test(String(title || ''))
}

/** Strip a leading section/chapter number so UI can attach its own cleanly. */
export function stripLeadingNumber(title) {
  return String(title || '')
    .replace(LEADING_NUM, '')
    .trim()
}

/**
 * Chapter heading: if the title already has "1. …", keep it (no double prefix).
 * Otherwise use sequential `n. title`.
 */
export function chapterHeading(n, title) {
  const t = String(title || '').trim()
  if (titleHasLeadingNumber(t)) return t
  return `${n}. ${t}`
}

/** Prefer the leading integer in the title; else sequential chapter index. */
export function chapterNumber(n, title) {
  const m = String(title || '').match(/^(?:§\s*)?(\d+)(?:\.\d+)*[.)]\s+/u)
  if (m) return Number(m[1])
  return n
}

/**
 * Step label inside a chapter: hierarchical `5.1`, `5.2`, …
 * Returns { num, title } with any leading number stripped from the step title.
 */
export function stepLabel(chapterNum, stepIndex, title) {
  return {
    num: `${chapterNum}.${stepIndex + 1}`,
    title: stripLeadingNumber(title) || String(title || '').trim(),
  }
}

/** ponytail: self-check — no double chapter numbers; hierarchical steps */
export function assertManualNumberingOk() {
  if (chapterHeading(1, '1. Introduction') !== '1. Introduction') {
    throw new Error('should not double-prefix numbered titles')
  }
  if (chapterHeading(3, 'Setup') !== '3. Setup') throw new Error('plain titles need prefix')
  if (chapterNumber(6, '5. Locators') !== 5) throw new Error('parse title number')
  if (stepLabel(5, 0, 'History').num !== '5.1') throw new Error('expected 5.1')
  if (stepLabel(1, 1, '2. Nested').title !== 'Nested') throw new Error('strip step title')
  return true
}


