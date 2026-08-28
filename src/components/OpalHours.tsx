import { useEffect, useMemo, useState } from 'react'
import { Logo } from './Logo'
import { toDateKey } from '../lib/calendar'
import { allSlotChoices, loadPublishedHours, savePublishedHours } from '../lib/hours'

const PIN_KEY = 'opal-hours-pin'

export function OpalHours() {
  const [pin, setPin] = useState(() => sessionStorage.getItem(PIN_KEY) ?? '')
  const [date, setDate] = useState(() => toDateKey(new Date()))
  const [selected, setSelected] = useState<string[]>([])
  const [published, setPublished] = useState<Record<string, string[]>>({})
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const choices = useMemo(() => allSlotChoices(), [])

  async function refresh() {
    const hours = await loadPublishedHours()
    setPublished(hours)
    setSelected(hours[date] ?? [])
  }

  useEffect(() => {
    void refresh()
  }, [])

  useEffect(() => {
    setSelected(published[date] ?? [])
  }, [date, published])

  function toggle(slot: string) {
    setSelected((current) =>
      current.includes(slot) ? current.filter((item) => item !== slot) : [...current, slot].sort(),
    )
  }

  async function save() {
    if (!pin.trim()) {
      setStatus('יש להזין קוד')
      return
    }
    setSaving(true)
    setStatus('')
    try {
      await savePublishedHours(date, selected, pin.trim())
      sessionStorage.setItem(PIN_KEY, pin.trim())
      await refresh()
      setStatus(selected.length ? 'השעות נשמרו. הלקוחות יראו אותן ביומן.' : 'היום נסגר. אין שעות לבחירה.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'שגיאה בשמירה')
    } finally {
      setSaving(false)
    }
  }

  const upcoming = Object.entries(published)
    .filter(([key]) => key >= toDateKey(new Date()))
    .sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="min-h-svh bg-creme px-5 py-8 text-ink">
      <div className="mx-auto max-w-xl">
        <Logo compact />
        <h1 className="mt-6 font-hebrew text-3xl font-semibold text-clay">השעות שלי</h1>
        <p className="mt-2 font-hebrew text-base leading-7 text-oak">
          כל בוקר בוחרים יום, מסמנים שעות פנויות ושומרים. רק אחרי השמירה הלקוחות רואות
          בחירה ביומן. בלי תשלום — זה נשמר באתר.
        </p>

        <label className="mt-6 flex flex-col gap-1.5 font-hebrew text-sm text-clay">
          קוד כניסה
          <input
            type="password"
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            className="rounded-full border border-oak/25 bg-transparent px-4 py-2.5 outline-none focus:border-oak"
          />
        </label>

        <label className="mt-4 flex flex-col gap-1.5 font-hebrew text-sm text-clay">
          תאריך
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="rounded-full border border-oak/25 bg-transparent px-4 py-2.5 outline-none focus:border-oak"
          />
        </label>

        <p className="mt-5 font-hebrew text-sm text-oak">לחצי על השעות הפנויות באותו יום</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {choices.map((slot) => {
            const on = selected.includes(slot)
            return (
              <button
                key={slot}
                type="button"
                onClick={() => toggle(slot)}
                className={`rounded-full border py-2 text-sm ${
                  on ? 'border-clay bg-clay text-creme' : 'border-oak/25 text-clay'
                }`}
              >
                {slot}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="mt-6 w-full rounded-full bg-clay py-3 font-hebrew text-base text-creme disabled:opacity-60"
        >
          {saving ? 'שומרת…' : 'שמירת שעות ליום הזה'}
        </button>
        {status ? <p className="mt-3 font-hebrew text-sm text-clay">{status}</p> : null}

        <h2 className="mt-10 font-hebrew text-xl text-clay">ימים פתוחים</h2>
        {upcoming.length === 0 ? (
          <p className="mt-2 font-hebrew text-oak">עדיין אין ימים עם שעות.</p>
        ) : (
          <ul className="mt-3 space-y-2 font-hebrew text-sm text-clay">
            {upcoming.map(([key, slots]) => (
              <li key={key}>
                <button type="button" className="text-right" onClick={() => setDate(key)}>
                  {key} · {slots.join(' · ')}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
