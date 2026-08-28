import { useState } from 'react'
import { BookingModal } from './components/BookingModal'
import { FloatingActions } from './components/FloatingActions'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import type { Service } from './types'

export default function App() {
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <div className="bg-creme text-ink">
      <Header />
      <main>
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
  )
}
