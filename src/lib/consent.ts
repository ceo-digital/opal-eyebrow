export type ConsentChoice = 'accepted' | 'declined' | 'custom'

export type Consent = {
  decidedAt: string
  choice: ConsentChoice
  localBookings: boolean
}

const KEY = 'opal-consent'
export const OPEN_CONSENT_EVENT = 'opal-open-consent'

export function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Consent
    if (!parsed?.choice || !parsed.decidedAt) return null
    return parsed
  } catch {
    return null
  }
}

export function hasDecided() {
  return loadConsent() !== null
}

export function allowsPersonalData() {
  const consent = loadConsent()
  return consent?.choice === 'accepted' || consent?.choice === 'custom'
}

export function allowsLocalBookings() {
  return loadConsent()?.localBookings === true
}

export function saveConsent(next: Omit<Consent, 'decidedAt'> & { decidedAt?: string }) {
  const consent: Consent = {
    choice: next.choice,
    localBookings: next.localBookings,
    decidedAt: next.decidedAt ?? new Date().toISOString(),
  }
  localStorage.setItem(KEY, JSON.stringify(consent))
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT, { detail: { saved: true } }))
  return consent
}

export function openConsentPreferences() {
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT, { detail: { open: true } }))
}
