type LogoProps = {
  className?: string
  compact?: boolean
}

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <img
      src="/opal-logo.png"
      alt="Opal Eyebrow"
      className={
        compact
          ? `h-16 w-auto max-w-[70vw] sm:h-24 md:h-36 ${className}`
          : `h-28 w-auto max-w-[80vw] md:h-44 ${className}`
      }
    />
  )
}
