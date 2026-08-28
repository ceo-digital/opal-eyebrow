import { useEffect, type ReactNode } from 'react'
import { Logo } from './Logo'
import { SiteChrome } from './SiteChrome'

type LegalLayoutProps = {
  title: string
  updated: string
  children: ReactNode
}

export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} | Opal Eyebrow`
    return () => {
      document.title = previous
    }
  }, [title])

  const path = window.location.pathname

  return (
    <SiteChrome>
    <div className="min-h-svh bg-creme text-ink">
      <a href="#legal-main" className="skip-link">
        דלג לתוכן
      </a>
      <header className="border-b border-bone bg-creme px-4 py-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <a href="/" aria-label="חזרה לאתר Opal Eyebrow">
            <Logo compact />
          </a>
          <nav aria-label="מסמכים משפטיים" className="flex flex-wrap justify-center gap-4 font-hebrew text-sm">
            <a className="text-oak underline decoration-[#C9A227]/70 underline-offset-4 hover:text-clay" href="/">
              חזרה לאתר
            </a>
            <a
              className="text-oak underline decoration-[#C9A227]/70 underline-offset-4 hover:text-clay"
              href="/privacy"
              aria-current={path === '/privacy' ? 'page' : undefined}
            >
              הצהרת פרטיות
            </a>
            <a
              className="text-oak underline decoration-[#C9A227]/70 underline-offset-4 hover:text-clay"
              href="/accessibility"
              aria-current={path === '/accessibility' ? 'page' : undefined}
            >
              הצהרת נגישות
            </a>
          </nav>
        </div>
      </header>
      <main id="legal-main" className="mx-auto max-w-3xl px-4 py-10">
        <p className="font-display text-xs tracking-[0.22em] text-oak">OPAL EYEBROW</p>
        <h1 className="mt-2 font-hebrew text-3xl font-semibold text-clay sm:text-4xl">{title}</h1>
        <p className="mt-3 font-hebrew text-sm text-oak">עודכן לאחרונה: {updated} · סקירה הבאה: אוגוסט 2027</p>
        <div className="legal-prose mt-8 font-hebrew text-base leading-8 text-ink">{children}</div>
      </main>
    </div>
    </SiteChrome>
  )
}
