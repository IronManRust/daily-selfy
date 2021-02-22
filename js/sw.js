const cacheName = "sw-cache-1.1.2";

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName)
        .then((cache) => {
            return cache.add("index.html");
        }));
});

self.addEventListener("fetch", (event) => {
    console.log(`[Service Worker] '${event.request.url}' Requesting`);
    event.respondWith(caches.match(event.request)
        .then((responseCacheGet) => {
            console.log(`[Service Worker] '${event.request.url}' Checking Cache`);
            if (responseCacheGet) {
                console.log(`[Service Worker] '${event.request.url}' Cache Hit`);
                return responseCacheGet;
            } else {
                console.log(`[Service Worker] '${event.request.url}' Cache Miss`);
                return fetch(event.request)
                    .then((responseFetch) => {
                        console.log(`[Service Worker] '${event.request.url}' Fetching`);
                        return caches.open(cacheName)
                            .then((responseCachePut) => {
                                console.log(`[Service Worker] '${event.request.url}' Caching`);
                                responseCachePut.put(event.request, responseFetch.clone());
                                return responseFetch;
                            })
                            .catch(() => {
                                console.log(`[Service Worker] '${event.request.url}' Failed To Cache`);
                            });
                    })
                    .catch(() => {
                        console.log(`[Service Worker] '${event.request.url}' Failed To Fetch`);
                    });
            }
        })
        .catch(() => {
            console.log(`[Service Worker] '${event.request.url}' Failed To Check Cache`);
        }));
});
