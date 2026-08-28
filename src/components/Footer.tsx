import { openConsentPreferences } from '../lib/consent'
import { GoldIcons } from './GoldIcons'
import { hubWhatsappHref } from '../data/contact'

export function Footer() {
  return (
    <footer className="border-t border-bone bg-creme px-3 py-4 pb-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.5rem))] sm:px-4">
      <div
        dir="rtl"
        className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-2 text-center font-hebrew text-sm text-oak sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1"
      >
        <p className="max-w-full px-2 leading-6">
          אתר זה נבנה ע״י חברת{' '}
          <a
            href="https://hub.co.il"
            target="_blank"
            rel="noreferrer"
            className="text-clay underline decoration-[#C9A227]/70 underline-offset-4 hover:text-ink"
          >
            האב מערכות
          </a>
        </p>
        <a
          href={hubWhatsappHref()}
          target="_blank"
          rel="noreferrer"
          className="text-clay underline decoration-[#C9A227]/70 underline-offset-4 hover:text-ink"
        >
          רוצה אתר כזה? שלח וואטסאפ
        </a>
        <nav aria-label="מסמכים משפטיים" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a
            href="/privacy"
            className="text-clay underline decoration-[#C9A227]/70 underline-offset-4 hover:text-ink"
          >
            הצהרת פרטיות
          </a>
          <a
            href="/accessibility"
            className="text-clay underline decoration-[#C9A227]/70 underline-offset-4 hover:text-ink"
          >
            הצהרת נגישות
          </a>
          <button
            type="button"
            onClick={openConsentPreferences}
            className="text-clay underline decoration-[#C9A227]/70 underline-offset-4 hover:text-ink"
          >
            העדפות פרטיות
          </button>
        </nav>
        <GoldIcons className="justify-center" />
      </div>
    </footer>
  )
}
