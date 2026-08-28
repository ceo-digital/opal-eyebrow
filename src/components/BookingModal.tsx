import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { WEEKDAY_LABELS } from '../data/availability'
import { bookingWhatsappHref } from '../data/contact'
import { allowsPersonalData, openConsentPreferences } from '../lib/consent'
import { isSlotTaken, createBookingId, saveBooking } from '../lib/bookings'
import { loadPublishedHours } from '../lib/hours'
import {
  getMonthCells,
  isPastDay,
  isSlotInPast,
  isSameDay,
  longDate,
  monthTitle,
  toDateKey,
} from '../lib/calendar'
import type { Service } from '../types'
import { ChevronIcon, CloseIcon } from './Icons'

type BookingModalProps = {
  service: Service
  onClose: () => void
}

export function BookingModal({ service, onClose }: BookingModalProps) {
  const overlay = useRef<HTMLDivElement>(null)
  const today = useMemo(() => new Date(), [])
  const [hoursByDate, setHoursByDate] = useState<Record<string, string[]>>({})
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [tick, setTick] = useState(0)

  const cells = useMemo(
    () => getMonthCells(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  )
  const slots = hoursByDate[toDateKey(selectedDate)] ?? []

  useEffect(() => {
    void loadPublishedHours().then((hours) => {
      setHoursByDate(hours)
      const firstOpen = Object.keys(hours)
        .sort()
        .map((key) => new Date(`${key}T12:00:00`))
        .find((day) => !isPastDay(day) && (hours[toDateKey(day)]?.length ?? 0) > 0)
      if (firstOpen) {
        setSelectedDate(firstOpen)
        setCursor(new Date(firstOpen.getFullYear(), firstOpen.getMonth(), 1))
      }
    })
  }, [])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useGSAP(
    () => {
      gsap.from('.booking-panel', {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.55,
        ease: 'power4.out',
      })
    },
    { scope: overlay },
  )

  function selectDay(day: Date) {
    if (isPastDay(day) || !(hoursByDate[toDateKey(day)]?.length)) return
    setSelectedDate(day)
    setSelectedTime(null)
    setError('')
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedTime) {
      setError('יש לבחור שעה פנויה')
      return
    }
    if (!name.trim() || !phone.trim()) {
      setError('יש למלא שם מלא וטלפון')
      return
    }
    if (!allowsPersonalData()) {
      setError('כדי לשלוח תור יש לאשר את הצהרת הפרטיות')
      openConsentPreferences()
      return
    }

    const fullName = name.trim()
    const phoneNumber = phone.trim()
    saveBooking({
      id: createBookingId(),
      serviceId: service.id,
      serviceName: service.name,
      date: toDateKey(selectedDate),
      time: selectedTime,
      name: fullName,
      phone: phoneNumber,
      notes: '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    })
    window.open(
      bookingWhatsappHref({
        name: fullName,
        phone: phoneNumber,
        serviceName: service.name,
        dateLabel: longDate(selectedDate),
        time: selectedTime,
        price: service.price,
      }),
      '_blank',
      'noopener,noreferrer',
    )
    setSubmitted(true)
  }

  return (
    <div
      ref={overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-clay/35 p-0 backdrop-blur-sm md:items-center md:p-6"
      onClick={(event) => {
        if (event.target === overlay.current) onClose()
      }}
    >
      <div className="booking-panel flex max-h-[100dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-creme shadow-2xl md:max-h-[94svh] md:rounded-3xl">
        <header className="flex items-start justify-between gap-3 border-b border-oak/15 px-4 py-4 sm:px-5 sm:py-5 md:px-8">
          <div>
            <p className="text-[0.7rem] tracking-[0.28em] text-oak">קביעת תור</p>
            <h2 id="booking-title" className="mt-1 font-hebrew text-2xl text-clay md:text-3xl">
              {service.name}
            </h2>
            <p className="mt-1 font-display text-xl text-clay/80">{service.price} ₪</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 rounded-full border border-oak/20 p-2 text-clay"
            aria-label="סגירה"
          >
            <CloseIcon />
          </button>
        </header>

        {submitted ? (
          <div className="px-6 py-16 text-center md:px-10">
            <p className="text-[0.7rem] tracking-[0.3em] text-oak">נשלח לאופל</p>
            <h3 className="mt-4 font-hebrew text-3xl text-clay">הבקשה בדרך לוואטסאפ</h3>
            <p className="mx-auto mt-4 max-w-md font-hebrew leading-8 text-clay/75">
              אופל מקבלת את השם, הטלפון, התאריך והשעה. כשהיא מאשרת בהודעה חזרה —
              האישור מגיע אלייך לוואטסאפ. אפשר גם לשלוח תזכורת ידנית יום לפני התור.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="luxury-btn mt-8 rounded-full bg-clay px-7 py-2.5 text-sm text-creme"
            >
              חזרה לאתר
            </button>
          </div>
        ) : (
          <div className="grid min-h-0 overflow-y-auto md:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-oak/15 px-5 py-6 md:border-b-0 md:border-l md:px-8">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="rounded-full border border-oak/20 p-2 text-clay"
                  aria-label="חודש קודם"
                  onClick={() =>
                    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
                  }
                >
                  <ChevronIcon className="size-4 rotate-180" />
                </button>
                <p className="font-hebrew text-xl text-clay">{monthTitle(cursor)}</p>
                <button
                  type="button"
                  className="rounded-full border border-oak/20 p-2 text-clay"
                  aria-label="חודש הבא"
                  onClick={() =>
                    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
                  }
                >
                  <ChevronIcon className="size-4" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-1 text-center text-xs text-oak">
                {WEEKDAY_LABELS.map((label) => (
                  <span key={label} className="py-1">
                    {label}
                  </span>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-1">
                {cells.map((day, index) => {
                  if (!day) return <span key={`empty-${index}`} />
                  const available =
                    !isPastDay(day) && (hoursByDate[toDateKey(day)]?.length ?? 0) > 0
                  const selected = isSameDay(day, selectedDate)
                  const today = isSameDay(day, new Date())

                  return (
                    <button
                      key={toDateKey(day)}
                      type="button"
                      disabled={!available}
                      aria-pressed={selected}
                      aria-label={`${longDate(day)}${available ? '' : ' — אין שעות'}`}
                      onClick={() => selectDay(day)}
                      className={`aspect-square min-h-10 min-w-10 rounded-full text-sm transition-colors ${
                        selected
                          ? 'bg-clay text-creme'
                          : available
                            ? 'text-clay hover:bg-bone'
                            : 'text-oak/30'
                      } ${today && !selected ? 'ring-1 ring-oak/40' : ''}`}
                    >
                      {day.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>

            <form className="flex flex-col gap-4 px-5 py-6 md:px-8" onSubmit={submit}>
              <div>
                <p className="text-[0.7rem] tracking-[0.22em] text-oak">שעות פנויות</p>
                <p className="mt-1 font-hebrew text-lg text-clay">{longDate(selectedDate)}</p>
                {slots.length === 0 ? (
                  <p className="mt-4 font-hebrew text-sm leading-6 text-oak">
                    אופל עדיין לא פתחה שעות ליום הזה. בחרי יום עם שעות, או נסי שוב מאוחר יותר.
                  </p>
                ) : (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {slots.map((slot) => {
                      const taken =
                        isSlotInPast(selectedDate, slot) ||
                        isSlotTaken(toDateKey(selectedDate), slot)
                      const active = selectedTime === slot
                      return (
                        <button
                          key={`${slot}-${tick}`}
                          type="button"
                          disabled={taken}
                          aria-pressed={active}
                          aria-label={`שעה ${slot}${taken ? ' — תפוסה' : ''}`}
                          onClick={() => {
                            setSelectedTime(slot)
                            setTick((value) => value + 1)
                            setError('')
                          }}
                          className={`min-h-11 rounded-full border px-2 py-2 text-sm ${
                            active
                              ? 'border-clay bg-clay text-creme'
                              : taken
                                ? 'border-oak/10 text-oak/30'
                                : 'border-oak/25 text-clay hover:border-oak'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <label className="flex flex-col gap-1.5 text-sm text-clay">
                שם מלא
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-full border border-oak/25 bg-transparent px-4 py-2.5 focus-visible:border-clay"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm text-clay">
                טלפון
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="rounded-full border border-oak/25 bg-transparent px-4 py-2.5 focus-visible:border-clay"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </label>

              {error ? (
                <p className="text-sm text-clay" role="alert">
                  {error}
                </p>
              ) : null}

              <p className="text-xs leading-6 text-oak">
                השם והטלפון נמסרים מרצון לצורך קביעת התור בלבד, ונשלחים לוואטסאפ של אופל.
                ללא מסירה לא ניתן לקבוע תור באתר.{' '}
                <a
                  href="/privacy"
                  className="text-clay underline decoration-[#C9A227]/70 underline-offset-4"
                >
                  הצהרת פרטיות
                </a>
                {' · '}
                <a
                  href="/accessibility"
                  className="text-clay underline decoration-[#C9A227]/70 underline-offset-4"
                >
                  הצהרת נגישות
                </a>
                {' · '}
                <button
                  type="button"
                  onClick={openConsentPreferences}
                  className="text-clay underline decoration-[#C9A227]/70 underline-offset-4"
                >
                  העדפות
                </button>
              </p>

              <button
                type="submit"
                className="luxury-btn mt-1 min-h-12 rounded-full bg-clay py-3 text-sm tracking-[0.16em] text-creme"
              >
                שליחה לאופל לאישור
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
