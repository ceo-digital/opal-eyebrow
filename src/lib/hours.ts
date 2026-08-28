export type HoursMap = Record<string, string[]>

export async function loadPublishedHours(): Promise<HoursMap> {
  try {
    const response = await fetch('/api/hours')
    if (!response.ok) return {}
    const data = (await response.json()) as HoursMap
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

export async function savePublishedHours(
  date: string,
  slots: string[],
  pin: string,
) {
  const response = await fetch('/api/hours', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pin}`,
    },
    body: JSON.stringify({ date, slots }),
  })
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string }
    throw new Error(body.error ?? 'לא ניתן לשמור')
  }
}

export function allSlotChoices() {
  const slots: string[] = []
  for (let minutes = 9 * 60; minutes <= 21 * 60; minutes += 30) {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60
    slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
  }
  return slots
}
