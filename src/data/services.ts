import type { Service } from '../types'

/**
 * כדי להוסיף שירות חדש למחירון — מוסיפים אובייקט למערך.
 * האייקון ממופה לפי id ב-ServiceIcons.
 */
export const SERVICES: Service[] = [
  {
    id: 'brow-design',
    name: 'עיצוב גבות',
    price: 50,
    durationMin: 30,
    description: 'עיצוב מדויק שמדגיש את קו העצם ואת מבט העיניים.',
  },
  {
    id: 'brow-mustache',
    name: 'עיצוב גבות + שפם',
    price: 60,
    durationMin: 40,
    description: 'עיצוב גבות מלא יחד עם ניקוי עדין של קו השפם.',
  },
  {
    id: 'brow-lift',
    name: 'הרמת גבות',
    price: 150,
    durationMin: 60,
    description: 'למינציה שמרימה, ממלאה ושומרת על קשת רכה לאורך זמן.',
  },
  {
    id: 'lash-lift',
    name: 'הרמת ריסים',
    price: 200,
    durationMin: 60,
    description: 'פתיחת מבט טבעית — ריסים מורמים, מעוגלים ומטופחים.',
  },
]
