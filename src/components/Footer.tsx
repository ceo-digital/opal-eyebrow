import { GoldIcons } from './GoldIcons'
import { hubWhatsappHref } from '../data/contact'

export function Footer() {
  return (
    <footer className="border-t border-bone bg-creme px-4 py-3">
      <div
        dir="rtl"
        className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-1 font-hebrew text-sm text-oak"
      >
        <p>
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
        <span aria-hidden="true">·</span>
        <a
          href={hubWhatsappHref()}
          target="_blank"
          rel="noreferrer"
          className="text-clay underline decoration-[#C9A227]/70 underline-offset-4 hover:text-ink"
        >
          רוצה אתר כזה? שלח וואטסאפ
        </a>
        <GoldIcons className="justify-center" />
      </div>
    </footer>
  )
}
