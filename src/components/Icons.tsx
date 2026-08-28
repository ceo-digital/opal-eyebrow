type IconProps = {
  className?: string
}

export function WhatsAppIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.1L1 23l6.1-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.6.6.6-3.5-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3a2 2 0 0 0-.6 1.5 3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3.1 3 10.4 10.4 0 0 0 3.2 1.2c.4.1.8.1 1.1.1a2.4 2.4 0 0 0 1.6-.7 2 2 0 0 0 .4-1.4c0-.1 0-.2-.2-.3Z" />
    </svg>
  )
}

export function PhoneIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M7.2 3.8c.4-.8 1.5-1 2.2-.4l1.8 1.6c.6.5.7 1.4.2 2.1l-.8 1.1a1.4 1.4 0 0 0 .1 1.7c.8 1 1.8 2 2.8 2.8.5.4 1.2.4 1.7.1l1.1-.8c.7-.5 1.6-.4 2.1.2l1.6 1.8c.6.7.4 1.8-.4 2.2-1.3.7-3 .8-4.5.1-3.2-1.5-5.8-4.1-7.3-7.3-.7-1.5-.6-3.2.1-4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function InstagramIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14.2 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.6v2.8h2.6V21h2.99Z" />
    </svg>
  )
}

export function CloseIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M14.5 6.5 9 12l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BrowDesignIcon({ className = 'size-10' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path className="icon-draw" d="M8 40c10-16 26-22 40-16 5 2 9 6 12 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path className="icon-draw" d="M14 36c8-8 20-12 32-8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}

export function BrowMustacheIcon({ className = 'size-10' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path className="icon-draw" d="M8 28c10-14 26-18 40-12 5 2 9 5 12 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path className="icon-draw" d="M18 48c6-8 10-8 14-2 4-6 8-6 14 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function BrowLiftIcon({ className = 'size-10' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path className="icon-draw" d="M8 42c10-16 26-22 40-16 5 2 9 6 12 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path className="icon-draw" d="M22 28V16M22 16l-4 5M22 16l4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path className="icon-draw" d="M36 24V12M36 12l-4 5M36 12l4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function LashLiftIcon({ className = 'size-10' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path className="icon-draw" d="M10 38c8 10 36 10 44 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path className="icon-draw" d="M16 36c2-8 5-16 6-22M26 38c1-9 3-18 3-24M33 39c0-9 1-19 1-25M40 38c-1-9-2-18-2-24M48 36c-2-8-4-16-5-21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="32" cy="42" r="3" fill="currentColor" />
    </svg>
  )
}
