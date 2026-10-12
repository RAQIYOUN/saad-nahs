/* سرویس‌ورکر ساده برای ساعات کواکب: نسخه‌ی آخرِ صفحه را برای باز شدن بدون اینترنت نگه می‌دارد */
const C = 'kavakeb-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r).then(res => {
      const copy = res.clone();
      caches.open(C).then(c => c.put(r, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(r).then(res => res || caches.match('./')))
  );
});
