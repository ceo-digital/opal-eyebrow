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
    <section ref={root} id="services" className="w-full min-w-0" dir="rtl">
      <h2 className="text-center font-hebrew text-2xl font-semibold leading-tight text-clay sm:text-3xl md:text-4xl">
        לחצי על השירות המועדף וקבעי תור
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service)}
            aria-label={`${service.name}, ${service.price} שקלים — קביעת תור`}
            className="price-card group min-w-0 text-right"
          >
            <span className="flex min-h-0 flex-col justify-between rounded-sm border border-[#C9A227]/45 bg-creme px-3 py-3 text-right shadow-[0_10px_24px_rgb(92_70_54/0.07)] transition-colors group-hover:bg-bone/40 sm:min-h-[7.5rem] sm:px-4 sm:py-4">
              <span className="block font-hebrew text-lg font-semibold leading-7 text-clay sm:text-xl md:text-2xl">
                {service.name}
              </span>
              <span className="mt-2 flex items-end justify-between gap-2">
                <span className="min-w-0 flex-1 text-right text-sm leading-5 text-oak">
                  {service.description}
                </span>
                <span className="shrink-0 font-display text-2xl font-semibold text-clay sm:text-3xl md:text-4xl">
                  {service.price}
                  <span className="mr-1 font-hebrew text-base font-medium sm:text-lg">₪</span>
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
