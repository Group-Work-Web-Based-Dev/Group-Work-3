const cacheName = 'v2'

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                return cache.addAll(
                    [
                        '/index.html',
                        '/images/artimg.png',
                        '/images/comimg.png',
                        '/images/draimg.png',
                        '/images/engimg.png',
                        '/images/geoimg.png',
                        '/images/hisimg.png',
                        '/images/mathimg.png',
                        '/images/musimg.png',
                        '/images/sciimg.png',
                        '/images/spoimg.png',
                        '/icons/icon192.png',
                        '/icons/icon512.png',
                        '/css/global.css',
                        'https://cdn.jsdelivr.net/npm/vue@2.5.1/dist/vue.min.js',
                        '/lesson.webmanifest',
                    ]
                ).catch(err => {
                    console.error(`Error when installing service worker [${err}]`)
                })
            })
    )
})

self.addEventListener('activate', function (event) {
    console.log('Claiming control');
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(
            cacheRes =>
                cacheRes ||
                fetch(event.request).then(fetchRes =>
                    caches.open(cacheName).then(async cache => {
                        cache.put(event.request.url, fetchRes.clone()).then(res => {
                            console.log(`Successfully saved [${res}]`)
                        }).catch(() => cache.match(event.request.url))
                        return fetchRes;
                    })
                )
        ).catch(err => console.error(`Error fetch ${err}`)))
})
