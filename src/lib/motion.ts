import { useEffect, useState } from 'react'
import { A11Y_EVENT } from './a11y'

export function prefersReducedMotion() {
  return (
    document.documentElement.classList.contains('a11y-reduce-motion') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useReducedMotion() {
  const [reduce, setReduce] = useState(prefersReducedMotion)

  useEffect(() => {
    const sync = () => setReduce(prefersReducedMotion())
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    media.addEventListener('change', sync)
    window.addEventListener(A11Y_EVENT, sync)
    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener(A11Y_EVENT, sync)
    }
  }, [])

  return reduce
}
