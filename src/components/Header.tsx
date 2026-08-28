import { useState, type MouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { GoldIcons } from './GoldIcons'
import { Logo } from './Logo'

gsap.registerPlugin(ScrollToPlugin)

const links = [{ href: '#services', label: 'שירותים' }]

export function Header() {
  const [open, setOpen] = useState(false)

  function goTo(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    setOpen(false)
    gsap.to(window, {
      duration: 0.85,
      scrollTo: { y: href, offsetY: 12 },
      ease: 'power2.inOut',
    })
  }

  return (
    <header className="bg-creme">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-2 md:px-6">
        <a href="#top" aria-label="Opal Eyebrow" onClick={(event) => goTo(event, '#top')}>
          <Logo compact />
        </a>
        <div className="mt-1 flex w-full items-center justify-between">
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => goTo(event, link.href)}
                className="font-hebrew text-lg text-oak transition-colors hover:text-clay"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#services"
              onClick={(event) => goTo(event, '#services')}
              className="rounded-full bg-clay px-5 py-2 font-hebrew text-base text-creme"
            >
              קביעת תור
            </a>
          </nav>
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="תפריט"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="block h-0.5 w-6 bg-clay" />
            <span className="block h-0.5 w-6 bg-clay" />
            <span className="block h-0.5 w-4 bg-clay" />
          </button>
          <GoldIcons />
        </div>
      </div>
      {open ? (
        <div className="border-t border-bone px-5 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-1 font-hebrew text-xl text-clay"
                onClick={(event) => goTo(event, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#services"
              className="py-1 font-hebrew text-xl text-clay"
              onClick={(event) => goTo(event, '#services')}
            >
              קביעת תור
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
