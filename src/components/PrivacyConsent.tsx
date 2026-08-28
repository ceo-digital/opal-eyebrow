import { useEffect, useState } from 'react'
import {
  OPEN_CONSENT_EVENT,
  allowsLocalBookings,
  hasDecided,
  saveConsent,
} from '../lib/consent'
import { CloseIcon } from './Icons'

export function PrivacyConsent() {
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<'main' | 'prefs'>('main')
  const [localBookings, setLocalBookings] = useState(true)
  const decided = hasDecided()
  const onLegalPage = /\/(privacy|accessibility)\/?$/.test(window.location.pathname)

  useEffect(() => {
    setReady(true)
    setLocalBookings(hasDecided() ? allowsLocalBookings() : true)
    if (!hasDecided()) {
      setView('main')
      setOpen(true)
    }

    const onEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail
      if (detail?.open) {
        setLocalBookings(hasDecided() ? allowsLocalBookings() : true)
        setView('prefs')
        setOpen(true)
      }
    }
    window.addEventListener(OPEN_CONSENT_EVENT, onEvent)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onEvent)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && hasDecided()) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!ready || !open) return null

  function accept() {
    saveConsent({ choice: 'accepted', localBookings: true })
    setOpen(false)
  }

  function decline() {
    saveConsent({ choice: 'declined', localBookings: false })
    setOpen(false)
  }

  function savePrefs() {
    saveConsent({
      choice: localBookings ? 'custom' : 'declined',
      localBookings,
    })
    setOpen(false)
  }

  const compact = onLegalPage && !decided && view === 'main'

  return (
    <div
      className={
        compact
          ? 'fixed inset-x-0 bottom-0 z-[80] flex justify-center p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]'
          : 'fixed inset-x-0 bottom-0 z-[80] flex justify-center bg-clay/20 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-[2px] md:inset-auto md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:bg-transparent md:p-0 md:backdrop-blur-none'
      }
      role="dialog"
      aria-modal={!compact}
      aria-labelledby="consent-title"
    >
      <div className="w-full max-w-[22rem] overflow-y-auto rounded-2xl border border-[#C9A227]/30 bg-creme px-3.5 py-3 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <h2 id="consent-title" className="font-hebrew text-base text-clay">
            {view === 'prefs' ? 'העדפות פרטיות' : 'הצהרת פרטיות'}
          </h2>
          {decided ? (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="min-h-8 min-w-8 rounded-full border border-oak/20 p-1 text-clay"
              aria-label="סגירה"
            >
              <CloseIcon className="size-3.5" />
            </button>
          ) : null}
        </div>

        {view === 'main' ? (
          <>
            <p className="mt-1.5 font-hebrew text-xs leading-5 text-ink">
              שם וטלפון נשלחים לוואטסאפ של אופל לצורך תור. אין מעקב פרסומי.{' '}
              <a
                href="/privacy"
                className="text-clay underline decoration-[#C9A227]/70 underline-offset-2"
              >
                הצהרה מלאה
              </a>
            </p>
            <div className="mt-2.5 flex gap-1.5">
              <button
                type="button"
                onClick={accept}
                className="min-h-9 flex-1 rounded-full bg-clay px-3 font-hebrew text-xs text-creme"
              >
                מאשרת
              </button>
              <button
                type="button"
                onClick={decline}
                className="min-h-9 flex-1 rounded-full border border-oak/30 px-3 font-hebrew text-xs text-clay"
              >
                לא מאשרת
              </button>
            </div>
            <button
              type="button"
              onClick={() => setView('prefs')}
              className="mt-1.5 w-full min-h-7 font-hebrew text-[0.7rem] text-oak underline decoration-[#C9A227]/70 underline-offset-2"
            >
              העדפות
            </button>
          </>
        ) : (
          <>
            <p className="mt-1.5 font-hebrew text-[0.7rem] leading-5 text-oak">
              בחרי מה לשמור במכשיר.
            </p>
            <ul className="mt-2 space-y-1.5">
              <li className="flex items-center justify-between gap-2 rounded-xl border border-oak/15 bg-bone/40 px-2.5 py-1.5">
                <p className="font-hebrew text-xs text-clay">חיוני לאתר</p>
                <span className="shrink-0 font-hebrew text-[0.65rem] text-oak">פעיל</span>
              </li>
              <li className="flex items-center justify-between gap-2 rounded-xl border border-oak/15 px-2.5 py-1.5">
                <p className="font-hebrew text-xs text-clay">שמירת תורים במכשיר</p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={localBookings}
                  onClick={() => setLocalBookings((value) => !value)}
                  className={`relative h-5 w-9 shrink-0 rounded-full ${
                    localBookings ? 'bg-clay' : 'bg-oak/30'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 size-4 rounded-full bg-creme ${
                      localBookings ? 'start-4' : 'start-0.5'
                    }`}
                  />
                </button>
              </li>
              <li className="flex items-center justify-between gap-2 rounded-xl border border-oak/15 px-2.5 py-1.5">
                <p className="font-hebrew text-xs text-clay">מעקב שיווקי</p>
                <span className="shrink-0 font-hebrew text-[0.65rem] text-oak">כבוי</span>
              </li>
            </ul>
            <div className="mt-2.5 flex gap-1.5">
              <button
                type="button"
                onClick={savePrefs}
                className="min-h-9 flex-1 rounded-full bg-clay px-3 font-hebrew text-xs text-creme"
              >
                שמירה
              </button>
              <button
                type="button"
                onClick={() => setView('main')}
                className="min-h-9 flex-1 rounded-full border border-oak/30 px-3 font-hebrew text-xs text-clay"
              >
                חזרה
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
