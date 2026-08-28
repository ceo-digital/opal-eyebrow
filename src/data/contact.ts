export const CONTACT = {
  phoneDisplay: '054-423-6787',
  phoneTel: '+972544236787',
  whatsapp: '972544236787',
  instagram:
    'https://www.instagram.com/opalnovahov?igsh=OW9xZXcxd3M4OHJk&utm_source=qr',
  facebook: 'https://www.facebook.com/share/1bkDdLqZDP/',
  hubWhatsapp: '972587008133',
}

export function whatsappHref(message?: string) {
  const text = encodeURIComponent(
    message ?? 'היי אופל, אשמח לקבוע תור ב-Opal Eyebrow',
  )
  return `https://wa.me/${CONTACT.whatsapp}?text=${text}`
}

export function bookingWhatsappHref(details: {
  name: string
  phone: string
  serviceName: string
  dateLabel: string
  time: string
  price: number
}) {
  const message = [
    'היי אופל, בקשת תור חדשה מ-Opal Eyebrow',
    `שם מלא: ${details.name}`,
    `טלפון: ${details.phone}`,
    `שירות: ${details.serviceName}`,
    `תאריך: ${details.dateLabel}`,
    `שעה: ${details.time}`,
    `מחיר: ${details.price} ₪`,
    '',
    'אשרי או דחי בהודעה חזרה בשיחה הזו.',
  ].join('\n')
  return whatsappHref(message)
}

export function hubWhatsappHref() {
  const text = encodeURIComponent('היי, ראיתי את האתר של Opal Eyebrow ורוצה אתר כזה')
  return `https://wa.me/${CONTACT.hubWhatsapp}?text=${text}`
}
