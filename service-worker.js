var VERSION = 'v1';
console.log('test');
this.addEventListener('install', function(e){
    console.log('service worker installed');
    e.waitUntil(
        caches.open(VERSION).then(function(cache){
            return cache.addAll([
                '/sw-test/',
                '/sw-test/index.html',
                '/sw-test/gallery/bountyHunters.jpg'
            ]);
        })
    );
});
this.addEventListener('fetch', function(e){
    console.log('Start Fetch with URL: ', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(rsp){
            if(!rsp) {
                console.log('Cache Missed: ', e.request.url);
            }
            return rsp || fetch(e.request).then(function(response){
                cosnole.log('loaded from internet', e.request.url);
                return caches.open(VERSION).then(function(cache){
                    cache.put(e.request, response.clone());
                    console.log('got it from internet');
                    return response;
                });
            });
        })
    )
});
