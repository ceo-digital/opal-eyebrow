import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/motion'
import type { Service } from '../types'
import { PriceMenu } from './PriceMenu'

type HeroProps = {
  onSelect: (service: Service) => void
}

export function Hero({ onSelect }: HeroProps) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.hero-portrait', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="bg-creme px-3 pb-6 pt-3 sm:px-5 sm:pt-4">
      <div
        dir="ltr"
        className="mx-auto grid max-w-6xl items-stretch gap-4 md:grid-cols-2 md:gap-10"
      >
        <div className="order-2 flex w-full min-w-0 flex-col md:order-1">
          <PriceMenu onSelect={onSelect} />
          <div className="mt-4 flex flex-1 items-center justify-center">
            <img
              src="/brow-tools.png"
              alt=""
              className="max-h-40 w-full object-contain mix-blend-multiply sm:max-h-52 md:max-h-72"
            />
          </div>
        </div>
        <div className="hero-portrait order-1 w-full overflow-hidden rounded-2xl bg-bone sm:rounded-3xl md:order-2">
          <img
            src="/opal-portrait.jpg"
            alt="אופל"
            className="aspect-[4/5] size-full object-cover object-[center_18%] md:aspect-auto md:min-h-full"
          />
        </div>
      </div>
    </section>
  )
}
