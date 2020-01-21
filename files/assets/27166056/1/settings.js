var Settings = pc.createScript('settings');

// initialize code called once per entity
Settings.prototype.initialize = function() {
if (this.app.touch) {
    // element componentがタッチされたらattributes: messageアラートとして表示する
    this.entity.element.on(
      pc.EVENT_TOUCHSTART,
      () => {
                    this.show();

      },
      this
    );
  } else {
    // element componentがクリックされたらattributes: messageアラートとして表示する
    //
    this.entity.element.on(
      "click",
      () => {
          this.show();
      },
      this
    );
  }
    
};

Settings.prototype.show = function(){
    alert("Hello Wolrd")
}

// update code called every frame
Settings.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Settings.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/