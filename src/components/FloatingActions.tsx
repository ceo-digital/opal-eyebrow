import { CONTACT, whatsappHref } from '../data/contact'

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 left-4 z-30 flex flex-col gap-2">
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
