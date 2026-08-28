import { useEffect, useState } from 'react'
import { useReducedMotion } from '../lib/motion'

export const GALLERY = [
  '/gallery/01.jpg',
  '/gallery/02.jpg',
  '/gallery/05.jpg',
  '/gallery/06.jpg',
  '/gallery/07.jpg',
]

export function GalleryCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || paused) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % GALLERY.length)
    }, 3800)
    return () => window.clearInterval(timer)
  }, [reduce, paused])

  return (
    <div
      className="relative mx-auto w-full overflow-hidden rounded-3xl bg-bone"
      aria-roledescription="קרוסלה"
      aria-label="גלריית עבודות"
    >
      <div className="relative aspect-[4/3]">
        {GALLERY.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={i !== index}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
        {GALLERY.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`תמונה ${i + 1} מתוך ${GALLERY.length}`}
            aria-current={i === index ? true : undefined}
            onClick={() => setIndex(i)}
            className={`min-h-6 min-w-6 rounded-full transition-all ${
              i === index ? 'w-5 bg-creme' : 'w-1.5 bg-creme/50'
            } h-1.5`}
          />
        ))}
        {reduce ? null : (
          <button
            type="button"
            className="ms-1 min-h-8 rounded-full bg-clay/80 px-2.5 py-1 font-hebrew text-[0.7rem] text-creme"
            aria-label={paused ? 'המשך הצגת תמונות' : 'השהיית הצגת תמונות'}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? 'המשך' : 'השהיה'}
          </button>
        )}
      </div>
    </div>
  )
}
