import { CONTACT, whatsappHref } from '../data/contact'

export function FloatingActions() {
  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] z-30 flex flex-col gap-2">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        aria-label="וואטסאפ"
        className="flex size-12 items-center justify-center rounded-full border border-[#C9A227]/50 bg-creme"
      >
        <img src="/icons/whatsapp.svg" alt="" className="size-6" />
      </a>
      <a
        href={`tel:${CONTACT.phoneTel}`}
        aria-label="שיחה"
        className="flex size-12 items-center justify-center rounded-full border border-[#C9A227]/50 bg-creme"
      >
        <img src="/icons/phone.svg" alt="" className="size-6" />
      </a>
    </div>
  )
}
