import { useEffect, useState, type ReactNode } from 'react'
import { CONTACT } from '../data/contact'
import { applyA11y, defaultA11y, loadA11y, saveA11y, type A11yPrefs } from '../lib/a11y'
import { CloseIcon } from './Icons'

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<A11yPrefs>(defaultA11y)

  useEffect(() => {
    const stored = loadA11y()
    setPrefs(stored)
    applyA11y(stored)
  }, [])

  function update(next: A11yPrefs) {
    setPrefs(next)
    saveA11y(next)
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] z-40 flex flex-col items-end">
      {open ? (
        <div
          id="a11y-panel"
          className="mb-2 w-[min(18.5rem,calc(100vw-1.25rem))] max-h-[min(32rem,70svh)] overflow-y-auto rounded-2xl border border-oak/20 bg-creme p-3 shadow-xl"
          role="dialog"
          aria-labelledby="a11y-title"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <img src="/icons/accessibility.svg" alt="" className="size-7" />
              <h2 id="a11y-title" className="font-hebrew text-base text-clay">
                תפריט נגישות
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="min-h-9 min-w-9 rounded-full border border-oak/20 p-1 text-clay"
              aria-label="סגירת תפריט נגישות"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <Tool
              label="הקטנת טקסט"
              onClick={() =>
                update({
                  ...prefs,
                  textScale: prefs.textScale === 0 ? 0 : ((prefs.textScale - 1) as 0 | 1 | 2),
                })
              }
            >
              א−
            </Tool>
            <Tool
              label="הגדלת טקסט"
              active={prefs.textScale > 0}
              onClick={() =>
                update({
                  ...prefs,
                  textScale: prefs.textScale === 2 ? 2 : ((prefs.textScale + 1) as 0 | 1 | 2),
                })
              }
            >
              א+
            </Tool>
            <Tool
              label="ניגודיות גבוהה"
              active={prefs.contrast && !prefs.yellowBlack}
              onClick={() =>
                update({ ...prefs, contrast: !prefs.contrast, yellowBlack: false })
              }
            >
              ◐
            </Tool>
            <Tool
              label="צהוב על שחור"
              active={prefs.yellowBlack}
              onClick={() =>
                update({ ...prefs, yellowBlack: !prefs.yellowBlack, contrast: false })
              }
            >
              ●
            </Tool>
            <Tool
              label="הדגשת קישורים"
              active={prefs.highlightLinks}
              onClick={() => update({ ...prefs, highlightLinks: !prefs.highlightLinks })}
            >
              ═
            </Tool>
            <Tool
              label="הדגשת כותרות"
              active={prefs.highlightHeadings}
              onClick={() => update({ ...prefs, highlightHeadings: !prefs.highlightHeadings })}
            >
              כ
            </Tool>
            <Tool
              label="גופן קריא"
              active={prefs.readableFont}
              onClick={() => update({ ...prefs, readableFont: !prefs.readableFont })}
            >
              Aa
            </Tool>
            <Tool
              label="סמן גדול"
              active={prefs.bigCursor}
              onClick={() => update({ ...prefs, bigCursor: !prefs.bigCursor })}
            >
              ↖
            </Tool>
            <Tool
              label="מרווח טקסט"
              active={prefs.spacing}
              onClick={() => update({ ...prefs, spacing: !prefs.spacing })}
            >
              ≡
            </Tool>
            <Tool
              label="הפסקת אנימציה"
              active={prefs.reduceMotion}
              onClick={() => update({ ...prefs, reduceMotion: !prefs.reduceMotion })}
            >
              ■
            </Tool>
          </div>

          <a
            href="/accessibility"
            className="mt-2 flex min-h-10 items-center justify-center rounded-xl border border-[#004AAD]/30 bg-[#004AAD]/8 font-hebrew text-xs text-clay"
          >
            הצהרת נגישות
          </a>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="mt-1.5 flex min-h-9 items-center justify-center font-hebrew text-xs text-oak underline decoration-[#C9A227]/70 underline-offset-2"
          >
            רכזת נגישות: {CONTACT.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => update(defaultA11y)}
            className="mt-1 w-full min-h-9 font-hebrew text-xs text-oak"
          >
            איפוס הגדרות
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="flex size-11 items-center justify-center rounded-full bg-[#004AAD] shadow-md"
        aria-label={open ? 'סגירת תפריט נגישות' : 'פתיחת תפריט נגישות'}
        title="נגישות"
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <img src="/icons/accessibility.svg" alt="" className="size-11" />
      </button>
    </div>
  )
}

function Tool({
  label,
  active = false,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={label}
      onClick={onClick}
      className={`flex min-h-[4.25rem] flex-col items-center justify-center gap-1 rounded-xl border px-1 font-hebrew ${
        active ? 'border-clay bg-clay text-creme' : 'border-oak/20 bg-bone/40 text-clay'
      }`}
    >
      <span className="text-lg leading-none">{children}</span>
      <span className="text-[0.65rem] leading-4">{label}</span>
    </button>
  )
}
