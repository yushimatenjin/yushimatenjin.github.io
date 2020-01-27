/*jshint esversion: 6, asi: true, laxbreak: true*/
const Popup = pc.createScript("popup");
// エディターから変更できるようにattribteusを追加する
Popup.attributes.add("number", { type: "number", default: 1.0 });
Popup.attributes.add("camera", { type: "entity" });
Popup.attributes.add("targetCamera", { type: "entity" });
Popup.attributes.add("duration", { type: "number", default: 3.0 });
// 起動時
Popup.prototype.initialize = function() {
//　タッチできる端末だったら

  if (this.app.touch) {
    // element componentがタッチされたらattributes: messageアラートとして表示する
    this.entity.element.on(
      pc.EVENT_TOUCHSTART,
      () => {
          this.app.fire("game:play")
      },
      this
    );
  } else {
  
    this.entity.element.on(
      "click",
      () => {
          this.app.fire("game:play")
      },
      this
    );
  }
    


};

Popup.prototype.move = function(targetCamera, duration, easing) {
  // const pos = targetCamera.getLocalPosition();3.471, z: 9.75
  // const rot = targetCamera.getLocalEulerAngles();
  // this.camera.setPosition(pos.x, pos.y ,pos.z);
//   const pos = {x: 0, y: 4.405, z: 9.75}
//   const rot = {x:-4.31, y: 0, z: 0}

//   this.camera
//     .tween(this.camera.getLocalPosition())
//     .to({x:pos.x, y:pos.y, z:pos.z - 2}, duration, pc.SineInOut)
//     .loop(false)
//     .yoyo(false)
//     .on("update", function() {
//       isTweenUpdate = true; //ラーピング開始
//     })
//     .on("complete", () => {
//       isTweenUpdate = false; //ラーピング終了
//            const Modal = this.app.root.findByName("Modal");
//           Modal.enabled = false;
      
//       this.camera.tween(this.camera.getLocalPosition()).to({x:pos.x, y:pos.y, z:pos.z + 2}, duration, pc.Linear)
//     .loop(false)
//     .yoyo(false).on("complete", () => {
//           const UI = this.app.root.findByName("UI");
//           UI.enabled = true;
          
//           const particles = this.app.root.findByTag("particle")
//           for (let particle of particles){
//             console.log(particle)
//               particle.enabled = false
//           }
//       })
//     .start();
      
      
      
//     })
//     .start();

//   this.camera
//     .tween(this.camera.getLocalEulerAngles())
//     .rotate(rot, 5, pc.ElasticIn)
//     .loop(false)
//     .yoyo(false)
//     .start();
};

// Popup.prototype.tween = function()
