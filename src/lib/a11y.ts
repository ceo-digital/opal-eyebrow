export type A11yPrefs = {
  textScale: 0 | 1 | 2
  contrast: boolean
  yellowBlack: boolean
  highlightLinks: boolean
  highlightHeadings: boolean
  readableFont: boolean
  bigCursor: boolean
  spacing: boolean
  reduceMotion: boolean
}

const KEY = 'opal-a11y'
export const A11Y_EVENT = 'opal-a11y'

export const defaultA11y: A11yPrefs = {
  textScale: 0,
  contrast: false,
  yellowBlack: false,
  highlightLinks: false,
  highlightHeadings: false,
  readableFont: false,
  bigCursor: false,
  spacing: false,
  reduceMotion: false,
}

export function loadA11y(): A11yPrefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaultA11y }
    const parsed = JSON.parse(raw) as Partial<A11yPrefs> & { largeText?: boolean }
    const textScale = parsed.textScale ?? (parsed.largeText ? 1 : 0)
    return { ...defaultA11y, ...parsed, textScale }
  } catch {
    return { ...defaultA11y }
  }
}

export function applyA11y(prefs: A11yPrefs) {
  const root = document.documentElement
  root.classList.toggle('a11y-large', prefs.textScale === 1)
  root.classList.toggle('a11y-xlarge', prefs.textScale === 2)
  root.classList.toggle('a11y-contrast', prefs.contrast && !prefs.yellowBlack)
  root.classList.toggle('a11y-yellow', prefs.yellowBlack)
  root.classList.toggle('a11y-links', prefs.highlightLinks)
  root.classList.toggle('a11y-headings', prefs.highlightHeadings)
  root.classList.toggle('a11y-readable', prefs.readableFont)
  root.classList.toggle('a11y-cursor', prefs.bigCursor)
  root.classList.toggle('a11y-spacing', prefs.spacing)
  root.classList.toggle('a11y-reduce-motion', prefs.reduceMotion)
}

export function saveA11y(prefs: A11yPrefs) {
  localStorage.setItem(KEY, JSON.stringify(prefs))
  applyA11y(prefs)
  window.dispatchEvent(new CustomEvent(A11Y_EVENT))
  return prefs
}
