import { AVAILABILITY } from '../data/availability'

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isWorkingDay(date: Date) {
  return (AVAILABILITY.weekdays as readonly number[]).includes(date.getDay())
}

export function isPastDay(date: Date, now = new Date()) {
  return startOfDay(date).getTime() < startOfDay(now).getTime()
}

export function getTimeSlots() {
  const slots: string[] = []
  const start = AVAILABILITY.startHour * 60
  const end = AVAILABILITY.endHour * 60

  for (let minutes = start; minutes < end; minutes += AVAILABILITY.slotMinutes) {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60
    slots.push(
      `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    )
  }

  return slots
}

export function isSlotInPast(date: Date, time: string, now = new Date()) {
  const [hour, minute] = time.split(':').map(Number)
  const slot = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute)
  return slot.getTime() <= now.getTime()
}

export function firstAvailableOnOrAfter(from = new Date()) {
  const start = startOfDay(from)

  for (let offset = 0; offset < 60; offset += 1) {
    const candidate = new Date(start)
    candidate.setDate(start.getDate() + offset)
    if (isWorkingDay(candidate)) return candidate
  }

  return start
}

export function getMonthCells(year: number, month: number) {
  const first = new Date(year, month, 1)
  const pad = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: Array<Date | null> = []

  for (let i = 0; i < pad; i += 1) cells.push(null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day))
  }

  return cells
}

export function monthTitle(date: Date) {
  return new Intl.DateTimeFormat('he-IL', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function longDate(date: Date) {
  return new Intl.DateTimeFormat('he-IL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
}
