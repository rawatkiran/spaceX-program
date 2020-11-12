
const staticCacheName="site-static";
const dynamicCache= "site-dynamic";
const assets=[
  '/',
  '/index.html',
  '/src/App.js',
  '/src/index.js'
];

this.addEventListener( 'install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache=>{
    cache.addAll(assets)
  }))
  )
} );

//activate service worker
this.addEventListener( 'activate', function (event) {
  event.waitUntil(
    caches.keys().then((keys=>{
      return Promise.all(keys
      .filter(key=>key !== staticCacheName)
      .map(key=> caches.delete(key))
      )
    }))
  )
} );

this.addEventListener( 'fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then((cacheRes =>{
      return cacheRes || fetch(event.request).then((fetchRes=>{
        return caches.open(dynamicCache).then(cache=>{
          cache.put(event.request.url,fetchRes.clone());
          return fetchRes;
        })
      }));
    }))
  )
  })