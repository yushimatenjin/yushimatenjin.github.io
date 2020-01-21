
    var CACHE_NAME = 'COIN-FEVER';
    var urlsToCache = [
    	"./834883.json",
	"./__game-scripts.js",
	"./__loading__.js",
	"./__modules__.js",
	"./__start__.js",
	"./ammo.dcab07b.js",
	"./config.json",
	"./files/assets/25233948/1/CP Font.png",
	"./files/assets/25233951/1/tree4.png",
	"./files/assets/25233956/1/main_a.png",
	"./files/assets/25233957/1/coin.png",
	"./files/assets/25233959/1/main_b.png",
	"./files/assets/25233960/1/feild.png",
	"./files/assets/25233961/1/all.png",
	"./files/assets/25233965/1/coin_small2.json",
	"./files/assets/25233966/1/chara_throw.json",
	"./files/assets/25233967/1/move_panel.json",
	"./files/assets/25233968/1/chara_idle_throw.json",
	"./files/assets/25233970/1/coin_big1.json",
	"./files/assets/25233971/1/slot_2.json",
	"./files/assets/25233972/1/particl_01.png",
	"./files/assets/25233974/1/move_panel.png",
	"./files/assets/25233975/1/item_elephant.json",
	"./files/assets/25233976/1/chara01_normal.png",
	"./files/assets/25233977/1/move_panel.png",
	"./files/assets/25233980/1/main2.json",
	"./files/assets/25233981/1/move_panel.json",
	"./files/assets/25233983/1/elephant.png",
	"./files/assets/25233999/1/feild_wall.json",
	"./files/assets/25234005/1/slot_1.json",
	"./files/assets/25234006/1/move_panel.json",
	"./files/assets/25234008/1/slot_3.json",
	"./files/assets/25234017/1/move_panel.json",
	"./files/assets/25234018/1/slot.png",
	"./files/assets/25234020/1/slot_img.png",
	"./files/assets/25234021/1/feild.png",
	"./files/assets/25234034/1/chara_idle_throw.json",
	"./files/assets/25234035/1/main2.json",
	"./files/assets/25234036/1/coin_alpha.png",
	"./files/assets/25234037/1/slot_img.png",
	"./files/assets/25234038/1/coin_big2.json",
	"./files/assets/25234042/1/coin_small1.json",
	"./files/assets/25234044/1/slot.png",
	"./files/assets/25234045/1/tree4.png",
	"./files/assets/25234046/1/pusher.png",
	"./files/assets/25234049/1/main.json",
	"./files/assets/25265756/1/frame.png",
	"./files/assets/25265776/1/rect.png",
	"./files/assets/25266246/1/rect.png",
	"./files/assets/25266310/1/frame_yellow.png",
	"./files/assets/25266420/1/icons.png",
	"./files/assets/25266421/1/icons.png",
	"./files/assets/25266425/1/coin_sprite.png",
	"./files/assets/25266426/1/レイヤー 1.png",
	"./files/assets/25266427/1/レイヤー 1.png",
	"./files/assets/25616198/1/firebase-ui.css",
	"./files/assets/25616199/1/index.html",
	"./files/assets/25616210/1/main.css",
	"./files/assets/25616296/1/firebasescript.js",
	"./files/assets/27112606/1/Modeal.png",
	"./files/assets/27112610/1/play-button.png",
	"./files/assets/27112611/1/keyvisual.png",
	"./files/assets/27112847/1/app.png",
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
	"./files/assets/27166052/1/crossmark512.png",
	"./files/assets/27166191/1/450.png",
	"./files/assets/27183616/1/slot.png",
	"./files/assets/27184791/1/load_light_op.png",
	"./files/assets/27184792/1/load_light.png",
	"./files/assets/27196064/1/hit.png",
	"./files/assets/27196065/1/light.png",
	"./index.html",
	"./logo.png",
	"./manifest.json",
	"./playcanvas-stable.min.js",
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
    