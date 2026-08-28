import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { n: '01', title: 'בחירת שירות', text: 'כל כרטיס פותח את היומן.' },
  { n: '02', title: 'תאריך ושעה', text: 'בחרי יום ושעה שמתאימים לך.' },
  { n: '03', title: 'אישור מאופל', text: 'אופל מאשרת בוואטסאפ. האישור מגיע ללקוחה באותה שיחה.' },
]

export function HowItWorks() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.ritual-step', {
        y: 14,
        opacity: 0,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 84%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="border-t border-bone bg-bone/30 px-5 py-14">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-hebrew text-4xl font-semibold text-clay md:text-6xl">
          איך קובעים תור
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.n} className="ritual-step bg-creme px-5 py-7 text-center">
              <p className="font-display text-sm tracking-[0.28em] text-oak">{step.n}</p>
              <h3 className="mt-3 font-hebrew text-2xl font-semibold text-clay md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-2 font-hebrew text-base text-oak md:text-lg">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
