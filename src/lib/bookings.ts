import type { Booking } from '../types'

const STORAGE_KEY = 'opal-bookings'

export function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Booking[]
  } catch {
    return []
  }
}

export function saveBooking(booking: Booking) {
  const next = [...loadBookings(), booking]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function isSlotTaken(dateKey: string, time: string) {
  return loadBookings().some(
    (booking) =>
      booking.date === dateKey &&
      booking.time === time &&
      booking.status !== 'rejected',
  )
}

export function createBookingId() {
  return `opal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
