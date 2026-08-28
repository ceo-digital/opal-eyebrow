type Env = {
  HOURS: KVNamespace
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  OPAL_PIN?: string
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

function authorized(request: Request, env: Env) {
  const pin = env.OPAL_PIN
  if (!pin) return false
  const header = request.headers.get('Authorization') ?? ''
  return header === `Bearer ${pin}`
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/hours' && request.method === 'GET') {
      const listed = await env.HOURS.list()
      const hours: Record<string, string[]> = {}
      await Promise.all(
        listed.keys.map(async (key) => {
          const value = await env.HOURS.get(key.name)
          if (!value) return
          try {
            hours[key.name] = JSON.parse(value) as string[]
          } catch {
            hours[key.name] = []
          }
        }),
      )
      return json(hours)
    }

    if (url.pathname === '/api/hours' && request.method === 'PUT') {
      if (!authorized(request, env)) return json({ error: 'קוד שגוי' }, 401)
      const body = (await request.json()) as { date?: string; slots?: string[] }
      const date = body.date?.trim()
      const slots = Array.isArray(body.slots)
        ? [...new Set(body.slots.filter((slot) => /^\d{2}:\d{2}$/.test(slot)))].sort()
        : []
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return json({ error: 'תאריך לא תקין' }, 400)
      }
      if (slots.length === 0) {
        await env.HOURS.delete(date)
      } else {
        await env.HOURS.put(date, JSON.stringify(slots))
      }
      return json({ ok: true, date, slots })
    }

    return env.ASSETS.fetch(request)
  },
}
