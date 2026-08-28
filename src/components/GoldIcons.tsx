import { CONTACT, whatsappHref } from '../data/contact'

const icons = [
  { href: CONTACT.instagram, src: '/icons/instagram.svg', label: 'אינסטגרם', external: true },
  { href: CONTACT.facebook, src: '/icons/facebook.svg', label: 'פייסבוק', external: true },
  { href: whatsappHref(), src: '/icons/whatsapp.svg', label: 'וואטסאפ', external: true },
  { href: `tel:${CONTACT.phoneTel}`, src: '/icons/phone.svg', label: 'שיחה', external: false },
]

export function GoldIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {icons.map((icon) => (
        <a
          key={icon.label}
          href={icon.href}
          aria-label={icon.label}
          target={icon.external ? '_blank' : undefined}
          rel={icon.external ? 'noreferrer' : undefined}
          className="flex size-9 items-center justify-center rounded-full border border-[#C9A227]/40 bg-creme transition-transform hover:scale-105 md:size-10"
        >
          <img src={icon.src} alt="" className="size-5 md:size-6" />
        </a>
      ))}
    </div>
  )
}
