export type Service = {
  id: string
  name: string
  price: number
  durationMin: number
  description: string
}

export type BookingStatus = 'pending' | 'approved' | 'rejected'

export type Booking = {
  id: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  name: string
  phone: string
  notes: string
  status: BookingStatus
  createdAt: string
}
