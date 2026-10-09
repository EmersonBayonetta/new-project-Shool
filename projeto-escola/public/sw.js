const CACHE = 'trilha-v1'
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    const response = await fetch('/')
    const html = await response.text()
    const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"\s]+)"/g)].map(match => match[1])
    await cache.addAll(['/', '/manifest.webmanifest', '/favicon.svg', ...assets])
    await self.skipWaiting()
  })())
})
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys()
    await Promise.all(names.filter(name => name.startsWith('trilha-') && name !== CACHE).map(name => caches.delete(name)))
    await self.clients.claim()
  })())
})
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return
  event.respondWith((async () => {
    try {
      const response = await fetch(event.request)
      if (response.ok) { const cache = await caches.open(CACHE); await cache.put(event.request, response.clone()) }
      return response
    } catch {
      const cached = await caches.match(event.request)
      if (cached) return cached
      if (event.request.mode === 'navigate') return await caches.match('/') || Response.error()
      return Response.error()
    }
  })())
})
