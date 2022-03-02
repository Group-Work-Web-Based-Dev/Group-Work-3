const cacheName = 'v1'

function installApp() {
    return self.addEventListener('install', (event) => {
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
                            '/css/global.css',
                            'https://cdn.jsdelivr.net/npm/vue@2.5.1/dist/vue.min.js',
                            '/js/components/cart.js',
                            '/js/components/checkout.js',
                            '/js/components/lessons.js',
                            '/js/index.js',
                            '/js/data.js',
                        ]
                    ).catch(err => {
                        console.error(`Error when installing service worker [${err}]`)
                    })
                })
        )
    })
}

installApp();
