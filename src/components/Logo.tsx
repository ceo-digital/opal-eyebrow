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
          ? `h-24 w-auto sm:h-32 md:h-44 ${className}`
          : `h-40 w-auto md:h-56 ${className}`
      }
    />
  )
}
