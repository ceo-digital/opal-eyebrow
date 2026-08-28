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
    <section ref={root} id="top" className="bg-creme px-5 pb-6 pt-4">
      <div
        dir="ltr"
        className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-2 md:gap-10"
      >
        <div className="flex w-full flex-col">
          <PriceMenu onSelect={onSelect} />
          <div className="mt-4 flex flex-1 items-center justify-center">
            <img
              src="/brow-tools.png"
              alt=""
              className="max-h-52 w-full object-contain mix-blend-multiply md:max-h-72"
            />
          </div>
        </div>
        <div className="hero-portrait w-full overflow-hidden rounded-3xl bg-bone">
          <img
            src="/opal-portrait.jpg"
            alt="אופל"
            className="size-full min-h-[320px] object-cover object-[center_18%] md:min-h-full"
          />
        </div>
      </div>
    </section>
  )
}
