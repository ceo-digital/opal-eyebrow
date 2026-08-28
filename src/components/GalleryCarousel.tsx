import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

export const GALLERY = [
  '/gallery/01.jpg',
  '/gallery/02.jpg',
  '/gallery/05.jpg',
  '/gallery/06.jpg',
  '/gallery/07.jpg',
]

export function GalleryCarousel() {
  const [index, setIndex] = useState(0)
  const reduce = prefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % GALLERY.length)
    }, 3800)
    return () => window.clearInterval(timer)
  }, [reduce])

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-3xl bg-bone">
      <div className="relative aspect-[4/3]">
        {GALLERY.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
        {GALLERY.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`תמונה ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-5 bg-creme' : 'w-1.5 bg-creme/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
