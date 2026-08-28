type TweezerProps = {
  className?: string
}

export function Tweezer({ className = '' }: TweezerProps) {
  return <img src="/tweezer.png" alt="" className={className} />
}
