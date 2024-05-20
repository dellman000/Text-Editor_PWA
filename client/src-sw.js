const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// registerRoute(({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
// ({ event }) => pageCache.handle({ event }));

const assetCacheName = 'assets-cache';

// Register a route to cache scripts, styles, and images
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
  async ({ request }) => {
    // Open the cache for assets
    const cache = await caches.open(assetCacheName);
    
    // Check if the asset is already cached
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      // If cached, return the cached response
      return cachedResponse;
    }
    
    // If not cached, fetch the asset from the network
    const response = await fetch(request);
    
    // Cache the fetched asset for future use
    await cache.put(request, response.clone());
    
    // Return the fetched response
    return response;
  }
);
