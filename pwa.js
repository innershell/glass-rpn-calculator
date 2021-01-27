/* This file NEEDS to be in the root directory to give the service worker access to all of the app files.
Service Workers only have permission to the same directory and sub-directories. */
var cacheName = 'glass-rpn-calculator-pwa';
var filesToCache = [
  './',
  './index.html',
  './resources/css/main.css',
  './resources/fonts/lcd_display_grid.ttf',
  './resources/js/events.js',
  './resources/js/main.js',
  './resources/js/math.js',
  './resources/js/memory.js',
  './resources/js/stack.js',
  './resources/js/ui.js',
  './resources/js/utility.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});