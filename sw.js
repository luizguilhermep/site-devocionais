const CACHE_NAME = 'diario-de-fe-v1'
const urlsToCache = [
  '/site-devocionais/',
  '/site-devocionais/index.html',
  '/site-devocionais/manifest.json'
]

// Instalar o service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto')
        return cache.addAll(urlsToCache)
      })
      .catch((err) => {
        console.error('Erro ao cachear:', err)
      })
  )
  self.skipWaiting()
})

// Ativar o service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Estratégia: Network First, Fall back to Cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cachear resposta bem-sucedida
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache)
          })

        return response
      })
      .catch(() => {
        // Se falhar, tentar cache
        return caches.match(event.request)
          .then((response) => {
            return response || new Response('Offline - página não encontrada', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            })
          })
      })
  )
})

// Push notifications (opcional para futuro)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Novo devocional disponível!',
    icon: '/site-devocionais/icons/icon-192.png',
    badge: '/site-devocionais/icons/icon-192.png',
    tag: 'devocional',
    requireInteraction: false
  }

  event.waitUntil(
    self.registration.showNotification('Diário de Fé', options)
  )
})
