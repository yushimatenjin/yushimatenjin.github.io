
    var CACHE_NAME = 'COIN-FEVER-v1.3';
    var urlsToCache = [
    	"./.nojekyll",
	"./834883.json",
	"./__game-scripts.js",
	"./__loading__.js",
	"./__modules__.js",
	"./__start__.js",
	"./ammo.dcab07b.js",
	"./config.json",
	"./favicon.ico",
	"./files/assets/25233948/1/CP Font.png",
	"./files/assets/25233951/1/tree4.png",
	"./files/assets/25233956/1/main_a.png",
	"./files/assets/25233957/1/coin.png",
	"./files/assets/25233959/1/main_b.png",
	"./files/assets/25233960/1/feild.png",
	"./files/assets/25233961/1/all.png",
	"./files/assets/25233965/1/coin_small2.json",
	"./files/assets/25233966/1/chara_throw.json",
	"./files/assets/25233968/1/chara_idle_throw.json",
	"./files/assets/25233970/1/coin_big1.json",
	"./files/assets/25233972/1/particl_01.png",
	"./files/assets/25233975/1/item_elephant.json",
	"./files/assets/25233976/1/chara01_normal.png",
	"./files/assets/25233980/1/main2.json",
	"./files/assets/25233983/1/elephant.png",
	"./files/assets/25234006/1/move_panel.json",
	"./files/assets/25234034/1/chara_idle_throw.json",
	"./files/assets/25234035/1/main2.json",
	"./files/assets/25234036/1/coin_alpha.png",
	"./files/assets/25234038/1/coin_big2.json",
	"./files/assets/25234042/1/coin_small1.json",
	"./files/assets/25234046/1/pusher.png",
	"./files/assets/25265756/1/frame.png",
	"./files/assets/25266310/1/frame_yellow.png",
	"./files/assets/25266420/1/icons.png",
	"./files/assets/25266421/1/icons.png",
	"./files/assets/25266425/1/coin_sprite.png",
	"./files/assets/25266427/1/レイヤー 1.png",
	"./files/assets/25329912/1/bound.js",
	"./files/assets/25329914/1/picker-raycast.js",
	"./files/assets/25329915/1/scrolling-texture-winning.ts.js",
	"./files/assets/25329916/1/slot.js",
	"./files/assets/25329917/1/rotate.js",
	"./files/assets/25329918/1/pusher.js",
	"./files/assets/25329919/1/throw-coin.js",
	"./files/assets/25329920/1/start-text.js",
	"./files/assets/25329921/1/scrolling-texture.js",
	"./files/assets/25329922/1/force.js",
	"./files/assets/25329923/1/translate.js",
	"./files/assets/25616198/1/firebase-ui.css",
	"./files/assets/25616199/1/index.html",
	"./files/assets/25616200/1/ui.js",
	"./files/assets/25616210/1/main.css",
	"./files/assets/25616296/1/firebasescript.js",
	"./files/assets/27110706/1/popup.js",
	"./files/assets/27112610/1/play-button.png",
	"./files/assets/27112848/1/cooltext346742578614948.png",
	"./files/assets/27112849/1/cooltext346742586341706.png",
	"./files/assets/27112850/1/cooltext346742083147489.png",
	"./files/assets/27112851/1/cooltext346742078415398.png",
	"./files/assets/27112852/1/cooltext346742051159404.png",
	"./files/assets/27112853/1/cooltext346742073806722.png",
	"./files/assets/27112854/1/cooltext346742106909397.png",
	"./files/assets/27112855/1/cooltext346742118077023.png",
	"./files/assets/27112856/1/Cool-Text-346741997547797.png",
	"./files/assets/27112857/1/cooltext346741933268171.png",
	"./files/assets/27112858/1/cooltext346741917536243.png",
	"./files/assets/27112859/1/cooltext346742020534709.png",
	"./files/assets/27160693/1/coinfever-logo.png",
	"./files/assets/27160720/1/camera-path-usingTween.js",
	"./files/assets/27161978/1/tween.js",
	"./files/assets/27162054/1/mouse-input.js",
	"./files/assets/27162055/1/keyboard-input.js",
	"./files/assets/27162056/1/orbit-camera.js",
	"./files/assets/27162057/1/touch-input.js",
	"./files/assets/27166052/1/crossmark512.png",
	"./files/assets/27166056/1/settings.js",
	"./files/assets/27166191/1/450.png",
	"./files/assets/27183616/1/slot.png",
	"./files/assets/27184265/1/manager.js",
	"./files/assets/27184512/1/game.js",
	"./files/assets/27184791/1/load_light_op.png",
	"./files/assets/27184792/1/load_light.png",
	"./files/assets/27184794/1/bar-scrolling-texture.js",
	"./files/assets/27185832/1/score-zone.js",
	"./files/assets/27186910/1/destroy-zone.js",
	"./files/assets/27188061/1/balance.js",
	"./files/assets/27196064/1/hit.png",
	"./files/assets/27196065/1/light.png",
	"./files/assets/27196978/1/perticles.js",
	"./files/assets/27201883/1/coin-appear.js",
	"./files/assets/27201932/1/goal-zone.js",
	"./files/assets/27202134/1/reel-scrolling-texture.js",
	"./files/assets/27226561/1/texture-1.png",
	"./files/assets/27248556/1/notification_enabled.png",
	"./files/assets/27248565/1/notification_disalbed.png",
	"./files/assets/27248585/1/notification_disalbed.png",
	"./files/assets/27248586/1/allow-notifications.js",
	"./index.html",
	"./logo.png",
	"./manifest.json",
	"./playcanvas-stable.min.js",
	"./serviceWorker.js",
	"./styles.css"
    ];
    
    self.addEventListener("install", function(event) {
      event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
          return cache.addAll(urlsToCache);
        })
      );
    });
    
    self.addEventListener("fetch", function(event) {
      event.respondWith(
        caches.match(event.request, {
          ignoreSearch: true
        }).then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
      );
    });

    self.addEventListener('activate', function(evt) {
      evt.waitUntil(
        caches.keys().then(function(keys) {
              var promises = [];
              keys.forEach(function(cacheName) {
                if (cacheName != CACHE_NAME)
                  promises.push(caches.delete(cacheName));
              });
              return Promise.all(promises);
            }));
    });
    