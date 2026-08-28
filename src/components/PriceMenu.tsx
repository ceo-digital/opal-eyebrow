import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SERVICES } from '../data/services'
import { prefersReducedMotion } from '../lib/motion'
import type { Service } from '../types'

type PriceMenuProps = {
  onSelect: (service: Service) => void
}

export function PriceMenu({ onSelect }: PriceMenuProps) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.price-card', {
        y: 18,
        opacity: 0,
        stagger: 0.09,
        duration: 0.6,
        ease: 'power2.out',
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="services" className="w-full" dir="rtl">
      <h2 className="text-center font-hebrew text-4xl font-semibold text-clay md:text-5xl">
        בחרי שירות
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service)}
            className="price-card group text-right"
          >
            <span className="flex min-h-[7.5rem] flex-col justify-between rounded-sm border border-[#C9A227]/45 bg-creme px-4 py-4 text-right shadow-[0_10px_24px_rgb(92_70_54/0.07)] transition-colors group-hover:bg-bone/40">
              <span className="block font-hebrew text-xl font-semibold leading-7 text-clay md:text-2xl">
                {service.name}
              </span>
              <span className="mt-2 flex items-end justify-between gap-2">
                <span className="line-clamp-2 max-w-[9.5rem] text-right text-sm leading-5 text-oak">
                  {service.description}
                </span>
                <span className="shrink-0 font-display text-3xl font-semibold text-clay md:text-4xl">
                  {service.price}
                  <span className="mr-1 font-hebrew text-lg font-medium">₪</span>
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
