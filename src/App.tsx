import { useState } from 'react'
import { AccessibilityPage } from './components/AccessibilityPage'
import { BookingModal } from './components/BookingModal'
import { FloatingActions } from './components/FloatingActions'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { OpalHours } from './components/OpalHours'
import { PrivacyPage } from './components/PrivacyPage'
import { SiteChrome } from './components/SiteChrome'
import type { Service } from './types'

export default function App() {
  const [selected, setSelected] = useState<Service | null>(null)
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  if (path === '/opal') return <OpalHours />
  if (path === '/privacy') return <PrivacyPage />
  if (path === '/accessibility') return <AccessibilityPage />

  return (
    <SiteChrome>
      <div className="bg-creme text-ink">
        <a href="#main-content" className="skip-link">
          דלג לתוכן
        </a>
        <Header />
        <main id="main-content">
          <div id="booking">
            <Hero onSelect={setSelected} />
          </div>
          <Gallery />
          <HowItWorks />
        </main>
        <Footer />
        <FloatingActions />
        {selected ? (
          <BookingModal service={selected} onClose={() => setSelected(null)} />
        ) : null}
      </div>
    </SiteChrome>
  )
}
