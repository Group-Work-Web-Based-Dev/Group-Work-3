// register service worker
if ('serviceWorker' in navigator) {
    let state;
    navigator.serviceWorker.register('service-worker.js', )
        .then(res => {
            switch (res) {
                case res.installing:
                    state = 'Service worker installing...'
                    break
                case res.waiting:
                    state = 'Service Worker waiting...'
                    break
                case res.active:
                    state = 'Service Worker [active] 🚀'
                    break
                default:
                    state = 'Service worker idle...'
            }

            console.log(state);
        }).catch(err => {
        console.log(`New - [Error] loading service worker... ${err}`)
    })
} else {
    console.error(`Service worker not available in navigator`)
}