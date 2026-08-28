/**
 * זמינות זמנית בפרונט. בהמשך יוחלף ב-API
 * שמחזיר חלונות פנויים לפי אישור/דחייה של אופל.
 */
export const AVAILABILITY = {
  weekdays: [0, 1, 2, 3, 4] as const,
  startHour: 17,
  endHour: 21,
  slotMinutes: 30,
}

export const WEEKDAY_LABELS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'] as const
