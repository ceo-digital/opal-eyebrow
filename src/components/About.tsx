import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.about-el', {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 82%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className="border-y border-bone bg-bone/40 px-5 py-14">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="about-el font-hebrew text-4xl font-semibold text-clay md:text-6xl">
          אודות אופל
        </h2>
        <p className="about-el mx-auto mt-6 max-w-xl font-hebrew text-xl leading-10 text-clay md:text-2xl md:leading-[2.6rem]">
          כל קשת נבנית כמו תכשיט: מדידה, סימטריה ומרקם טבעי. יוצאות יפות יותר —
          בלי שהעולם יבין בדיוק למה.
        </p>
      </div>
    </section>
  )
}
