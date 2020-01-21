pc.extend(pc,function(){var t=function(t){this._app=t,this._tweens=[],this._add=[]};t.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);this._add.length&&(this._tweens=this._tweens.concat(this._add),this._add.length=0)}};var i=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.Linear,this._sv={},this._ev={}},e=function(t){var i;return t instanceof pc.Vec2?i={x:t.x,y:t.y}:t instanceof pc.Vec3?i={x:t.x,y:t.y,z:t.z}:t instanceof pc.Vec4?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Quat?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Color?(i={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(i.a=t.a)):i=t,i};i.prototype={to:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this},from:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._from=!0,this},rotate:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._slerp=!0,this},start:function(){var t,i,e,n;if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this._properties[t],this._ev[t]=this.target[t]);this._slerp&&(this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._fromQuat.setFromEulerAngles(i,e,n))}else{for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this.target[t],this._ev[t]=this._properties[t]);this._slerp&&(this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._toQuat.setFromEulerAngles(i,e,n))}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time=this.time-this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,n,s=this.time/this.duration,r=this.easing(s);for(var h in this._properties)this._properties.hasOwnProperty(h)&&(e=this._sv[h],n=this._ev[h],this.target[h]=e+(n-e)*r);if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtifyLocal(),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this.entity&&this.entity.off("destroy",this.stop,this),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties){var e=this._sv[i];this._sv[i]=this._ev[i],this._ev[i]=e}this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var n=function(t){return 1-s(1-t)},s=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};return{TweenManager:t,Tween:i,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*(2.70158*t-1.70158)},BackOut:function(t){return--t*t*(2.70158*t+1.70158)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:n,BounceOut:s,BounceInOut:function(t){return t<.5?.5*n(2*t):.5*s(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*.5+1)}}}()),function(){pc.Application.prototype.addTweenManager=function(){this._tweenManager=new pc.TweenManager(this),this.on("update",function(t){this._tweenManager.update(t)})},pc.Application.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.once("destroy",e.stop,e),i&&i.element&&(e.element=i.element),e};var t=pc.Application.getApplication();t&&t.addTweenManager()}();// manager.js
/*jshint esversion: 6, asi: true, laxbreak: true*/
const Manager = pc.createScript("manager");

// Coins
Manager.attributes.add("Coins", { type: "entity", array: true });

// Main
Manager.attributes.add("Balance", { type: "entity" })
let balance = 30;
let limit = 5;

// Utils
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Slots
Manager.attributes.add("probabilityOf", { type: "number", default: 50 });
let stockLimit = 3;
let stock = 3;
let isRotating = false;

Manager.prototype.initialize = function () {
  this.coinManager();
  this.mainManager();
  this.slotManager();
  this.app.fire("main:limit:sync")
  this.app.fire("main:balance:sync")
  this.app.fire("main:stock:sync")
  setInterval(() => {
    if (balance < 5) {
      this.app.fire("main:balance:add");
    }
    this.app.fire("main:limit:add")
  }, 1000)
  
  setInterval(() => {
      if(stock > 0 && !isRotating){

          this.app.fire("main:stock:take");
      }
  }, 1000)
};
Manager.prototype.slotManager = function () {
        const lottery = () => {
        if (Math.random() * 100 < this.probabilityOf) {
          return true;
        }
        return false;
      }
  // Stock
  this.app.on("main:stock:sync", () => {
    const stocks = this.app.root.findByTag("stock");
    for (const [index, val] of stocks.entries()) {
      if (stock > index) {
        val.script.barscrollingTexture.speed.y = 3
      } else {
        val.script.barscrollingTexture.speed.y = 0.3
      }
    }
  })
  this.app.on("main:stock:add", () => {
    if (stock >= stockLimit) return;
    stock = stock + 1
    this.app.fire("main:stock:sync")
  })
  this.app.on("main:stock:take", () => {
    if (stock < 0) return;
    stock = stock - 1;
    this.app.fire("game:slot:start");
    this.app.fire("main:stock:sync")
  })
  
  // Slots
  this.app.on("game:slot:start", async () => {
      //  [x] 回転の処理を加える
      isRotating = true
      await delay(3000)
      this.app.fire("game:slot:stop")

      
  })
  
  this.app.on("game:slot:win", async (type = 3) => {
      // winのときの処理
        // this.app.fire("game:slot:stop")
        const array = new Array(9);
        for(let val of array){
            await delay(20);
            const position = new pc.Vec3(Math.random() * ( 2 - (-2) ) + (-2), 5, 1)
            this.app.fire("game:coin:create", position, type)
        }
  })
  this.app.on("game:slot:rotate:all", () => {
      
  })
    
  this.app.on("game:slot:stop", async () => {
      const stopOffsets = [0, 0.25, 0.5, 0.75, 1];
      
      const isWin = lottery()
      const offset = stopOffsets[Math.floor(Math.random() * stopOffsets.length)];
     const reels = this.app.root.findByTag("reel");
        isRotating = false;
        if(isWin){
            this.app.fire("game:slot:win")
            for(let reel of reels){
                reel.script.reelscrollingTexture.stop(offset)
            }
        }else{
            for(let reel of reels){
                const random = stopOffsets[Math.floor(Math.random() * stopOffsets.length)];
                console.log(random, "random")
                console.log(reel)
                reel.script.reelscrollingTexture.stop(random)
            }
        }
      await delay(2000)
  })
  

}
Manager.prototype.mainManager = function () {
  this.app.on("main:balance:sync", () => {
    this.Balance.element.text = String(balance)
  })
  this.app.on("main:balance:add", () => {
    balance = balance + 1;
    this.app.fire("main:balance:sync")

  })
  this.app.on("main:balance:take", () => {
    balance = balance - 1;
    this.app.fire("main:balance:sync")
    this.app.fire("main:limit:take")

  })
  this.app.on("main:limit:sync", () => {
    const limits = this.app.root.findByTag("limit");
    for (const [index, val] of limits.entries()) {
      if (limit > index) {
        val.element.opacity = 1;
      } else {
        val.element.opacity = 0.56;
      }

    }
  })
  this.app.on("main:limit:add", () => {
    if (limit >= 5) return;
    limit = limit + 1;
    this.app.fire("main:limit:sync")

  })
  this.app.on("main:limit:take", () => {
    if (limit < 0) return;
    limit = limit - 1;
    this.app.fire("main:limit:sync")


  })

}

Manager.prototype.coinManager = function () {
  this.app.on(
    "game:coin:create",
    (position, type = 0) => {
      if (type === 0) {
        if (balance > 0 && limit > 0) {
          const coin = this.Coins[type].clone();
          coin.setPosition(position);
          coin.enabled = true;
          this.app.fire("main:balance:take")
        }
      }
     if(type === 3){
          const coin = this.Coins[type].clone();
          coin.setPosition(position);
          coin.enabled = true;  
     }

    },
    this
  );

  this.app.on(
    "game:coin:delete",
    entity => {
      entity.destroy();
    },
    this
  );
};


// ui.js
/*jshint esversion: 6, asi: true, laxbreak: true*/
const Ui = pc.createScript("ui");

Ui.attributes.add("css", {
  type: "asset",
  assetType: "css",
  title: "CSS Asset",
  array: true
});
Ui.attributes.add("html", {
  type: "asset",
  assetType: "html",
  title: "HTML Asset"
});

Ui.prototype.initialize = function() {
  const body = document.getElementsByTagName("body")[0];
  const head = document.getElementsByTagName("head")[0];
  const style = `<style>${this.css.map(({resource}) => resource).join("\r\n")}</style>`;
  body.insertAdjacentHTML("afterbegin", this.html.resource);
  head.insertAdjacentHTML("afterbegin", style);
};

// popup.js
var Popup = pc.createScript("popup");
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


var CameraPathUsingTween=pc.createScript("cameraPathUsingTween");CameraPathUsingTween.prototype.initialize=function(){this.entity.moving=function(t,e,n){this.tween(this.getLocalPosition()).to(t.localPosition,e,n).loop(!1).yoyo(!1).on("update",function(){isTweenUpdate=!0}).on("complete",function(){isTweenUpdate=!1}).start(),this.tween(this.getLocalEulerAngles()).rotate(t.eularangle,e,n).loop(!1).yoyo(!1).start()}};// cameraControl.js
var CameraControl = pc.createScript('cameraControl');

CameraControl.prototype.initialize = function(){
  let self = this;
  //カメラの位置を指定する関数
  pcpo.setCameraSequence = function(sequence,duration = 5.0,easing = pc.QuinticOut){
      if (sequence >= pcpo.pathRoot.length || sequence < 0) {
          throw new Error("cameraSequenceは0以上pathRoot.length未満の整数値で指定");
      } else {
          self.entity.moving(pcpo.pathRoot[sequence],duration,easing);
      }
  };
};

var MouseInput=pc.createScript("mouseInput");MouseInput.attributes.add("orbitSensitivity",{type:"number",default:.3,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),MouseInput.attributes.add("distanceSensitivity",{type:"number",default:.15,title:"Distance Sensitivity",description:"How fast the camera moves in and out. Higher is faster"}),MouseInput.prototype.initialize=function(){if(this.orbitCamera=this.entity.script.orbitCamera,this.orbitCamera){var t=this,o=function(o){t.onMouseOut(o)};this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEWHEEL,this.onMouseWheel,this),window.addEventListener("mouseout",o,!1),this.on("destroy",function(){this.app.mouse.off(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.off(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.off(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.off(pc.EVENT_MOUSEWHEEL,this.onMouseWheel,this),window.removeEventListener("mouseout",o,!1)})}this.app.mouse.disableContextMenu(),this.lookButtonDown=!1,this.panButtonDown=!1,this.lastPoint=new pc.Vec2},MouseInput.fromWorldPoint=new pc.Vec3,MouseInput.toWorldPoint=new pc.Vec3,MouseInput.worldDiff=new pc.Vec3,MouseInput.prototype.pan=function(t){var o=MouseInput.fromWorldPoint,e=MouseInput.toWorldPoint,i=MouseInput.worldDiff,s=this.entity.camera,n=this.orbitCamera.distance;s.screenToWorld(t.x,t.y,n,o),s.screenToWorld(this.lastPoint.x,this.lastPoint.y,n,e),i.sub2(e,o),this.orbitCamera.pivotPoint.add(i)},MouseInput.prototype.onMouseDown=function(t){switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!0;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:this.panButtonDown=!0}},MouseInput.prototype.onMouseUp=function(t){switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!1;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:this.panButtonDown=!1}},MouseInput.prototype.onMouseMove=function(t){pc.app.mouse;this.lookButtonDown?(this.orbitCamera.pitch-=t.dy*this.orbitSensitivity,this.orbitCamera.yaw-=t.dx*this.orbitSensitivity):this.panButtonDown&&this.pan(t),this.lastPoint.set(t.x,t.y)},MouseInput.prototype.onMouseWheel=function(t){this.orbitCamera.distance-=t.wheel*this.distanceSensitivity*(.1*this.orbitCamera.distance),t.event.preventDefault()},MouseInput.prototype.onMouseOut=function(t){this.lookButtonDown=!1,this.panButtonDown=!1};var KeyboardInput=pc.createScript("keyboardInput");KeyboardInput.prototype.initialize=function(){this.orbitCamera=this.entity.script.orbitCamera},KeyboardInput.prototype.postInitialize=function(){this.orbitCamera&&(this.startDistance=this.orbitCamera.distance,this.startYaw=this.orbitCamera.yaw,this.startPitch=this.orbitCamera.pitch,this.startPivotPosition=this.orbitCamera.pivotPoint.clone())},KeyboardInput.prototype.update=function(t){this.orbitCamera&&this.app.keyboard.wasPressed(pc.KEY_SPACE)&&(this.orbitCamera.reset(this.startYaw,this.startPitch,this.startDistance),this.orbitCamera.pivotPoint=this.startPivotPosition)};var OrbitCamera=pc.createScript("orbitCamera");OrbitCamera.attributes.add("distanceMax",{type:"number",default:0,title:"Distance Max",description:"Setting this at 0 will give an infinite distance limit"}),OrbitCamera.attributes.add("distanceMin",{type:"number",default:0,title:"Distance Min"}),OrbitCamera.attributes.add("pitchAngleMax",{type:"number",default:90,title:"Pitch Angle Max (degrees)"}),OrbitCamera.attributes.add("pitchAngleMin",{type:"number",default:-90,title:"Pitch Angle Min (degrees)"}),OrbitCamera.attributes.add("inertiaFactor",{type:"number",default:0,title:"Inertia Factor",description:"Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive."}),OrbitCamera.attributes.add("focusEntity",{type:"entity",title:"Focus Entity",description:"Entity for the camera to focus on. If blank, then the camera will use the whole scene"}),OrbitCamera.attributes.add("frameOnStart",{type:"boolean",default:!0,title:"Frame on Start",description:'Frames the entity or scene at the start of the application."'}),Object.defineProperty(OrbitCamera.prototype,"distance",{get:function(){return this._targetDistance},set:function(t){this._targetDistance=this._clampDistance(t)}}),Object.defineProperty(OrbitCamera.prototype,"pitch",{get:function(){return this._targetPitch},set:function(t){this._targetPitch=this._clampPitchAngle(t)}}),Object.defineProperty(OrbitCamera.prototype,"yaw",{get:function(){return this._targetYaw},set:function(t){this._targetYaw=t;var i=(this._targetYaw-this._yaw)%360;this._targetYaw=i>180?this._yaw-(360-i):i<-180?this._yaw+(360+i):this._yaw+i}}),Object.defineProperty(OrbitCamera.prototype,"pivotPoint",{get:function(){return this._pivotPoint},set:function(t){this._pivotPoint.copy(t)}}),OrbitCamera.prototype.focus=function(t){this._buildAabb(t,0);var i=this._modelsAabb.halfExtents,e=Math.max(i.x,Math.max(i.y,i.z));e/=Math.tan(.5*this.entity.camera.fov*pc.math.DEG_TO_RAD),e*=2,this.distance=e,this._removeInertia(),this._pivotPoint.copy(this._modelsAabb.center)},OrbitCamera.distanceBetween=new pc.Vec3,OrbitCamera.prototype.resetAndLookAtPoint=function(t,i){this.pivotPoint.copy(i),this.entity.setPosition(t),this.entity.lookAt(i);var e=OrbitCamera.distanceBetween;e.sub2(i,t),this.distance=e.length(),this.pivotPoint.copy(i);var a=this.entity.getRotation();this.yaw=this._calcYaw(a),this.pitch=this._calcPitch(a,this.yaw),this._removeInertia(),this._updatePosition()},OrbitCamera.prototype.resetAndLookAtEntity=function(t,i){this._buildAabb(i,0),this.resetAndLookAtPoint(t,this._modelsAabb.center)},OrbitCamera.prototype.reset=function(t,i,e){this.pitch=i,this.yaw=t,this.distance=e,this._removeInertia()},OrbitCamera.prototype.initialize=function(){var t=this,i=function(){t._checkAspectRatio()};window.addEventListener("resize",i,!1),this._checkAspectRatio(),this._modelsAabb=new pc.BoundingBox,this._buildAabb(this.focusEntity||this.app.root,0),this.entity.lookAt(this._modelsAabb.center),this._pivotPoint=new pc.Vec3,this._pivotPoint.copy(this._modelsAabb.center);var e=this.entity.getRotation();if(this._yaw=this._calcYaw(e),this._pitch=this._clampPitchAngle(this._calcPitch(e,this._yaw)),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0),this._distance=0,this._targetYaw=this._yaw,this._targetPitch=this._pitch,this.frameOnStart)this.focus(this.focusEntity||this.app.root);else{var a=new pc.Vec3;a.sub2(this.entity.getPosition(),this._pivotPoint),this._distance=this._clampDistance(a.length())}this._targetDistance=this._distance,this.on("attr:distanceMin",function(t,i){this._targetDistance=this._clampDistance(this._distance)}),this.on("attr:distanceMax",function(t,i){this._targetDistance=this._clampDistance(this._distance)}),this.on("attr:pitchAngleMin",function(t,i){this._targetPitch=this._clampPitchAngle(this._pitch)}),this.on("attr:pitchAngleMax",function(t,i){this._targetPitch=this._clampPitchAngle(this._pitch)}),this.on("attr:focusEntity",function(t,i){this.frameOnStart?this.focus(t||this.app.root):this.resetAndLookAtEntity(this.entity.getPosition(),t||this.app.root)}),this.on("attr:frameOnStart",function(t,i){t&&this.focus(this.focusEntity||this.app.root)}),this.on("destroy",function(){window.removeEventListener("resize",i,!1)})},OrbitCamera.prototype.update=function(t){var i=0===this.inertiaFactor?1:Math.min(t/this.inertiaFactor,1);this._distance=pc.math.lerp(this._distance,this._targetDistance,i),this._yaw=pc.math.lerp(this._yaw,this._targetYaw,i),this._pitch=pc.math.lerp(this._pitch,this._targetPitch,i),this._updatePosition()},OrbitCamera.prototype._updatePosition=function(){this.entity.setLocalPosition(0,0,0),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0);var t=this.entity.getPosition();t.copy(this.entity.forward),t.scale(-this._distance),t.add(this.pivotPoint),this.entity.setPosition(t)},OrbitCamera.prototype._removeInertia=function(){this._yaw=this._targetYaw,this._pitch=this._targetPitch,this._distance=this._targetDistance},OrbitCamera.prototype._checkAspectRatio=function(){var t=this.app.graphicsDevice.height,i=this.app.graphicsDevice.width;this.entity.camera.horizontalFov=t>i},OrbitCamera.prototype._buildAabb=function(t,i){var e=0;if(t.model){var a=t.model.meshInstances;for(e=0;e<a.length;e++)0===i?this._modelsAabb.copy(a[e].aabb):this._modelsAabb.add(a[e].aabb),i+=1}for(e=0;e<t.children.length;++e)i+=this._buildAabb(t.children[e],i);return i},OrbitCamera.prototype._calcYaw=function(t){var i=new pc.Vec3;return t.transformVector(pc.Vec3.FORWARD,i),Math.atan2(-i.x,-i.z)*pc.math.RAD_TO_DEG},OrbitCamera.prototype._clampDistance=function(t){return this.distanceMax>0?pc.math.clamp(t,this.distanceMin,this.distanceMax):Math.max(t,this.distanceMin)},OrbitCamera.prototype._clampPitchAngle=function(t){return pc.math.clamp(t,-this.pitchAngleMax,-this.pitchAngleMin)},OrbitCamera.quatWithoutYaw=new pc.Quat,OrbitCamera.yawOffset=new pc.Quat,OrbitCamera.prototype._calcPitch=function(t,i){var e=OrbitCamera.quatWithoutYaw,a=OrbitCamera.yawOffset;a.setFromEulerAngles(0,-i,0),e.mul2(a,t);var s=new pc.Vec3;return e.transformVector(pc.Vec3.FORWARD,s),Math.atan2(s.y,-s.z)*pc.math.RAD_TO_DEG};var TouchInput=pc.createScript("touchInput");TouchInput.attributes.add("orbitSensitivity",{type:"number",default:.4,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),TouchInput.attributes.add("distanceSensitivity",{type:"number",default:.2,title:"Distance Sensitivity",description:"How fast the camera moves in and out. Higher is faster"}),TouchInput.prototype.initialize=function(){this.orbitCamera=this.entity.script.orbitCamera,this.lastTouchPoint=new pc.Vec2,this.lastPinchMidPoint=new pc.Vec2,this.lastPinchDistance=0,this.orbitCamera&&this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHCANCEL,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),this.on("destroy",function(){this.app.touch.off(pc.EVENT_TOUCHSTART,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHEND,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHCANCEL,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHMOVE,this.onTouchMove,this)}))},TouchInput.prototype.getPinchDistance=function(t,i){var o=t.x-i.x,n=t.y-i.y;return Math.sqrt(o*o+n*n)},TouchInput.prototype.calcMidPoint=function(t,i,o){o.set(i.x-t.x,i.y-t.y),o.scale(.5),o.x+=t.x,o.y+=t.y},TouchInput.prototype.onTouchStartEndCancel=function(t){var i=t.touches;1==i.length?this.lastTouchPoint.set(i[0].x,i[0].y):2==i.length&&(this.lastPinchDistance=this.getPinchDistance(i[0],i[1]),this.calcMidPoint(i[0],i[1],this.lastPinchMidPoint))},TouchInput.fromWorldPoint=new pc.Vec3,TouchInput.toWorldPoint=new pc.Vec3,TouchInput.worldDiff=new pc.Vec3,TouchInput.prototype.pan=function(t){var i=TouchInput.fromWorldPoint,o=TouchInput.toWorldPoint,n=TouchInput.worldDiff,h=this.entity.camera,c=this.orbitCamera.distance;h.screenToWorld(t.x,t.y,c,i),h.screenToWorld(this.lastPinchMidPoint.x,this.lastPinchMidPoint.y,c,o),n.sub2(o,i),this.orbitCamera.pivotPoint.add(n)},TouchInput.pinchMidPoint=new pc.Vec2,TouchInput.prototype.onTouchMove=function(t){var i=TouchInput.pinchMidPoint,o=t.touches;if(1==o.length){var n=o[0];this.orbitCamera.pitch-=(n.y-this.lastTouchPoint.y)*this.orbitSensitivity,this.orbitCamera.yaw-=(n.x-this.lastTouchPoint.x)*this.orbitSensitivity,this.lastTouchPoint.set(n.x,n.y)}else if(2==o.length){var h=this.getPinchDistance(o[0],o[1]),c=h-this.lastPinchDistance;this.lastPinchDistance=h,this.orbitCamera.distance-=c*this.distanceSensitivity*.1*(.1*this.orbitCamera.distance),this.calcMidPoint(o[0],o[1],i),this.pan(i),this.lastPinchMidPoint.copy(i)}};// settings.js
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

// game.js
/*jshint esversion: 6, asi: true, laxbreak: true*/

let Game = pc.createScript("game");
// Camera
Game.attributes.add("camera", { type: "entity" });
Game.attributes.add("targetCamera", { type: "entity" });
Game.attributes.add("duration", { type: "number", default: 3.0 });

const pos = { x: 0, y: 4.405, z: 10.75 };
const rot = { x: -4.31, y: 0, z: 0 };
// initialize code called once per entity
Game.prototype.initialize = function() {
  this.gameManager();
};
Game.prototype.lerpMainCamera = function() {
  this.camera
    .tween(this.camera.getLocalPosition())
    .to({ x: pos.x, y: pos.y, z: pos.z - 2 }, this.duration, pc.SineInOut)
    .loop(false)
    .yoyo(false)
    .on("complete", () => {
      this.app.fire("game:start:before");
    })
    .start();
};
Game.prototype.gameStartBefore = function() {
  const Modal = this.app.root.findByName("Modal");
  Modal.enabled = false;
  this.camera
    .tween(this.camera.getLocalEulerAngles())
    .rotate(rot, 4, pc.ElasticIn)
    .loop(false)
    .yoyo(false)
    .on("complete", () => {
      this.app.fire("game:start");
    })
    .start();
};

Game.prototype.gameStart = function() {
  this.camera
    .tween(this.camera.getLocalPosition())
    .to({ x: pos.x, y: pos.y, z: pos.z + 2 }, 1, pc.Linear)
    .loop(false)
    .yoyo(false)
    .start();

  const UI = this.app.root.findByName("UI");
  UI.enabled = true;
  const particles = this.app.root.findByTag("particle");
  for (let particle of particles) {
       if (particle.particlesystem.isPlaying()) {
        particle.particlesystem.stop();
    }
  }
};

Game.prototype.gameManager = function() {
  this.app.on("game:init", () => {});

  this.app.on(
    "game:play",
    () => {
      this.lerpMainCamera(this.targetCamera, this.duration);
    },
    this
  );
  this.app.on(
    "game:start:before",
    () => {
      this.gameStartBefore();
    },
    this
  );
  this.app.on(
    "game:start",
    () => {
      this.gameStart();
    },
    this
  );
};


var BarScrollingTexture=pc.createScript("barscrollingTexture");BarScrollingTexture.attributes.add("materialAsset",{type:"asset"}),BarScrollingTexture.attributes.add("speed",{type:"vec2"}),BarScrollingTexture.tmp=new pc.Vec2,BarScrollingTexture.prototype.initialize=function(){this.materialAsset&&(this.material=this.materialAsset.resource)},BarScrollingTexture.prototype.update=function(e){var t=BarScrollingTexture.tmp;t.set(this.speed.x,this.speed.y),t.scale(e),this.material.opacityMapOffset=this.material.opacityMapOffset.add(t),this.material.update()};// score-zone.js
var ScoreZone = pc.createScript('scoreZone');

// initialize code called once per entity
ScoreZone.prototype.initialize = function() {
    this.entity.collision.on("triggerenter", (entity) => {
        this.app.fire("main:balance:add")
    }, this)
};


// destroy-zone.js
var DestroyZone = pc.createScript('destroyZone');

DestroyZone.prototype.initialize = function() {

   this.entity.collision.on("triggerenter", (entity) => {
        this.app.fire("game:coin:delete", entity, this)
   })

};


var Balance=pc.createScript("balance");Balance.prototype.initialize=function(){},Balance.prototype.update=function(a){};!function(e){var t={};function __webpack_require__(r){if(t[r])return t[r].exports;var _=t[r]={i:r,l:!1,exports:{}};return e[r].call(_.exports,_,_.exports,__webpack_require__),_.l=!0,_.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,r){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(__webpack_require__.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var _ in e)__webpack_require__.d(r,_,function(t){return e[t]}.bind(null,_));return r},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/perticles.ts")}({"./src/entities/perticles.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n\nconst attributes = {\n    perticles: {\n        type: "entity",\n        array: true\n    }\n};\nclass Perticles extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\n    initialize() { }\n    start() {\n        for (let particle of this.perticles) {\n            if (!particle.particlesystem.isPlaying()) {\n                particle.particlesystem.play();\n            }\n        }\n    }\n    stop() {\n        for (let particle of this.perticles) {\n            if (particle.particlesystem.isPlaying()) {\n                particle.particlesystem.stop();\n            }\n        }\n    }\n}\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(Perticles, attributes);\n\n\n//# sourceURL=webpack:///./src/entities/perticles.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\n    const name = App.name.toLowerCase();\n    const app = pc.createScript(name);\n    if (attributeses !== undefined) {\n        for (let [name, attributes] of Object.entries(attributeses)) {\n            console.log(name, attributes);\n            app.attributes.add(name, attributes);\n        }\n    }\n    Object.setPrototypeOf(app.prototype, App.prototype);\n    return app;\n};\nclass ScriptTypeBase {\n    attach() { }\n    on() { }\n    off() { }\n    fire() { }\n    once() { }\n    set() { }\n}\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')}});var CoinAppear=pc.createScript("coinAppear");CoinAppear.prototype.initialize=function(){var i=this.entity.forward.clone().scale(1e3);this.entity.rigidbody.applyForce(i)},CoinAppear.prototype.update=function(i){};// goal-zone.js
var GoalZone = pc.createScript('goalZone');

// initialize code called once per entity
GoalZone.prototype.initialize = function() {
   this.entity.collision.on("triggerenter", (entity) => {
        this.app.fire("main:stock:add", entity, this)
   })
};


// reel-scrolling-texture.js
/*jshint esversion: 6, asi: true, laxbreak: true*/
var ReelScrollingTexture = pc.createScript('reelscrollingTexture');
ReelScrollingTexture.attributes.add("offset", {type: "number", default: 0.5, min:0, max: 1, step:0.05})

ReelScrollingTexture.attributes.add('materialAsset', {
    type: 'asset'
});

ReelScrollingTexture.attributes.add('speed', {
    type: 'vec2'
});

ReelScrollingTexture.tmp = new pc.Vec2();

// initialize code called once per entity
ReelScrollingTexture.prototype.initialize = function() {
    // get the material that we will animate
    if (this.materialAsset) {
        this.material = this.materialAsset.resource;
    } 
};

// update code called every frame
ReelScrollingTexture.prototype.stop = function(offset){
     let tmp = ReelScrollingTexture.tmp;
    tmp.set(0, offset);
    tmp.scale(0.9);

    this.material.emissiveMapOffset = this.material.emissiveMapOffset.set(0, offset)
    this.material.opacityMapOffset = this.material.opacityMapOffset.set(0, offset)
    this.material.update(); 
}

ReelScrollingTexture.prototype.update = function(dt) {
    if(isRotating){
    let tmp = ReelScrollingTexture.tmp;

    // Calculate how much to offset the texture
    // Speed * dt
    tmp.set(this.speed.x, this.speed.y);
    tmp.scale(dt);

    // Update the diffuse and normal map offset values
    this.material.emissiveMapOffset = this.material.emissiveMapOffset.add(tmp);
    this.material.opacityMapOffset = this.material.opacityMapOffset.add(tmp); /// 追加する
    this.material.update();
    }
};


!function(e){var r={};function __webpack_require__(_){if(r[_])return r[_].exports;var t=r[_]={i:_,l:!1,exports:{}};return e[_].call(t.exports,t,t.exports,__webpack_require__),t.l=!0,t.exports}__webpack_require__.m=e,__webpack_require__.c=r,__webpack_require__.d=function(e,r,_){__webpack_require__.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:_})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,r){if(1&r&&(e=__webpack_require__(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var _=Object.create(null);if(__webpack_require__.r(_),Object.defineProperty(_,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)__webpack_require__.d(_,t,function(r){return e[r]}.bind(null,t));return _},__webpack_require__.n=function(e){var r=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(r,"a",r),r},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/force.ts")}({"./src/entities/force.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n\r\nconst attibuteses = {\r\n    vec3: {\r\n        type: "vec3",\r\n        default: [0, 0, 0]\r\n    }\r\n};\r\nclass Force extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\r\n    initialize() {\r\n        const { x, y, z } = this.vec3;\r\n        this.entity.rigidbody.applyForce(x, y, z);\r\n    }\r\n    update() {\r\n    }\r\n}\r\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(Force, attibuteses);\r\n\n\n//# sourceURL=webpack:///./src/entities/force.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\r\n    const name = App.name.toLowerCase();\r\n    const app = pc.createScript(name);\r\n    if (attributeses !== undefined) {\r\n        for (let [name, attributes] of Object.entries(attributeses)) {\r\n            console.log(name, attributes);\r\n            app.attributes.add(name, attributes);\r\n        }\r\n    }\r\n    Object.setPrototypeOf(app.prototype, App.prototype);\r\n    return app;\r\n};\r\nclass ScriptTypeBase {\r\n    attach() { }\r\n    on() { }\r\n    off() { }\r\n    fire() { }\r\n    once() { }\r\n    set() { }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')}});!function(e){var r={};function __webpack_require__(t){if(r[t])return r[t].exports;var _=r[t]={i:t,l:!1,exports:{}};return e[t].call(_.exports,_,_.exports,__webpack_require__),_.l=!0,_.exports}__webpack_require__.m=e,__webpack_require__.c=r,__webpack_require__.d=function(e,r,t){__webpack_require__.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,r){if(1&r&&(e=__webpack_require__(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(__webpack_require__.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var _ in e)__webpack_require__.d(t,_,function(r){return e[r]}.bind(null,_));return t},__webpack_require__.n=function(e){var r=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(r,"a",r),r},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/scrolling-texture.ts")}({"./src/entities/scrolling-texture.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n\r\nconst attibuteses = {\r\n    materialAsset: {\r\n        type: "asset"\r\n    },\r\n    speed: {\r\n        type: "vec2"\r\n    }\r\n};\r\nclass ScrollingTexture extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\r\n    constructor() {\r\n        super();\r\n    }\r\n    initialize() {\r\n        if (this.materialAsset) {\r\n            this.material = this.materialAsset.resource;\r\n        }\r\n    }\r\n    tmp() {\r\n        return new pc.Vec2();\r\n    }\r\n    start() {\r\n        this.isMoving = true;\r\n    }\r\n    stop(win, offset) {\r\n        this.isMoving = false;\r\n        if (win) {\r\n            const tmp = this.tmp();\r\n            tmp.set(0, offset);\r\n            tmp.scale(9);\r\n            this.material.diffuseMapOffset = this.material.diffuseMapOffset.set(0, offset);\r\n            this.material.emissiveMapOffset = this.material.emissiveMapOffset.set(0, offset);\r\n            this.material.normalMapOffset.set(0, offset);\r\n            this.material.update();\r\n        }\r\n    }\r\n    update(dt) {\r\n        if (this.isMoving) {\r\n            const tmp = this.tmp();\r\n            tmp.set(this.speed.x, this.speed.y);\r\n            tmp.scale(dt);\r\n            this.material.diffuseMapOffset = this.material.diffuseMapOffset.add(tmp);\r\n            this.material.emissiveMapOffset = this.material.emissiveMapOffset.add(tmp);\r\n            this.material.normalMapOffset.add(tmp);\r\n            this.material.update();\r\n        }\r\n    }\r\n}\r\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(ScrollingTexture, attibuteses);\r\n\n\n//# sourceURL=webpack:///./src/entities/scrolling-texture.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\r\n    const name = App.name.toLowerCase();\r\n    const app = pc.createScript(name);\r\n    if (attributeses !== undefined) {\r\n        for (let [name, attributes] of Object.entries(attributeses)) {\r\n            console.log(name, attributes);\r\n            app.attributes.add(name, attributes);\r\n        }\r\n    }\r\n    Object.setPrototypeOf(app.prototype, App.prototype);\r\n    return app;\r\n};\r\nclass ScriptTypeBase {\r\n    attach() { }\r\n    on() { }\r\n    off() { }\r\n    fire() { }\r\n    once() { }\r\n    set() { }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')}});!function(e){var r={};function __webpack_require__(t){if(r[t])return r[t].exports;var _=r[t]={i:t,l:!1,exports:{}};return e[t].call(_.exports,_,_.exports,__webpack_require__),_.l=!0,_.exports}__webpack_require__.m=e,__webpack_require__.c=r,__webpack_require__.d=function(e,r,t){__webpack_require__.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,r){if(1&r&&(e=__webpack_require__(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(__webpack_require__.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var _ in e)__webpack_require__.d(t,_,function(r){return e[r]}.bind(null,_));return t},__webpack_require__.n=function(e){var r=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(r,"a",r),r},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/rotate.ts")}({"./src/entities/rotate.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n\r\nconst attibuteses = {\r\n    speed: {\r\n        type: "number"\r\n    }\r\n};\r\nclass Rotate extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\r\n    update() {\r\n    }\r\n}\r\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(Rotate, attibuteses);\r\n\n\n//# sourceURL=webpack:///./src/entities/rotate.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\r\n    const name = App.name.toLowerCase();\r\n    const app = pc.createScript(name);\r\n    if (attributeses !== undefined) {\r\n        for (let [name, attributes] of Object.entries(attributeses)) {\r\n            console.log(name, attributes);\r\n            app.attributes.add(name, attributes);\r\n        }\r\n    }\r\n    Object.setPrototypeOf(app.prototype, App.prototype);\r\n    return app;\r\n};\r\nclass ScriptTypeBase {\r\n    attach() { }\r\n    on() { }\r\n    off() { }\r\n    fire() { }\r\n    once() { }\r\n    set() { }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')}});!function(e){var t={};function __webpack_require__(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,r){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(__webpack_require__.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)__webpack_require__.d(r,n,function(t){return e[t]}.bind(null,n));return r},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/scrolling-texture-winning.ts")}({"./src/entities/scrolling-texture-winning.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n\r\nconst attibuteses = {\r\n    materialAsset: {\r\n        type: "asset"\r\n    },\r\n    speed: {\r\n        type: "vec2"\r\n    }\r\n};\r\nclass ScrollingTextureWinning extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\r\n    constructor() {\r\n        super();\r\n    }\r\n    initialize() {\r\n        if (this.materialAsset) {\r\n            this.material = this.materialAsset.resource;\r\n        }\r\n    }\r\n    tmp() {\r\n        return new pc.Vec2();\r\n    }\r\n    start() {\r\n        this.isMoving = true;\r\n    }\r\n    stop(offset = 0) {\r\n        this.isMoving = false;\r\n        this.offset = offset;\r\n        const tmp = this.tmp();\r\n        tmp.set(this.offset, this.offset);\r\n        tmp.scale(this.offset);\r\n        this.material.diffuseMapOffset = this.material.diffuseMapOffset.set(this.offset, this.offset);\r\n        this.material.emissiveMapOffset = this.material.emissiveMapOffset.set(this.offset, this.offset);\r\n        this.material.normalMapOffset.set(this.offset, this.offset);\r\n        this.material.update();\r\n    }\r\n    update(dt) {\r\n        if (this.isMoving) {\r\n            const tmp = this.tmp();\r\n            tmp.set(this.speed.x, this.speed.y);\r\n            tmp.scale(dt);\r\n            this.material.diffuseMapOffset = this.material.diffuseMapOffset.add(tmp);\r\n            this.material.emissiveMapOffset = this.material.emissiveMapOffset.add(tmp);\r\n            this.material.normalMapOffset.add(tmp);\r\n            this.material.update();\r\n        }\r\n    }\r\n}\r\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(ScrollingTextureWinning, attibuteses);\r\n\n\n//# sourceURL=webpack:///./src/entities/scrolling-texture-winning.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\r\n    const name = App.name.toLowerCase();\r\n    const app = pc.createScript(name);\r\n    if (attributeses !== undefined) {\r\n        for (let [name, attributes] of Object.entries(attributeses)) {\r\n            console.log(name, attributes);\r\n            app.attributes.add(name, attributes);\r\n        }\r\n    }\r\n    Object.setPrototypeOf(app.prototype, App.prototype);\r\n    return app;\r\n};\r\nclass ScriptTypeBase {\r\n    attach() { }\r\n    on() { }\r\n    off() { }\r\n    fire() { }\r\n    once() { }\r\n    set() { }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')}});!function(e){var t={};function __webpack_require__(_){if(t[_])return t[_].exports;var r=t[_]={i:_,l:!1,exports:{}};return e[_].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,_){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:_})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var _=Object.create(null);if(__webpack_require__.r(_),Object.defineProperty(_,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)__webpack_require__.d(_,r,function(t){return e[t]}.bind(null,r));return _},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/translate.ts")}({"./src/entities/translate.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n/* harmony import */ var _utils_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/delay */ "./src/utils/delay.ts");\n// @ts-ignore\n\n\nconst attributes = {\n    speed: {\n        type: "number"\n    },\n    min: {\n        type: "number"\n    },\n    max: {\n        type: "number"\n    },\n    loop: {\n        type: "boolean"\n    },\n    r: {\n        type: "number",\n        default: 30\n    },\n    vec3: {\n        type: "vec3",\n        default: [0, 0, 0]\n    }\n};\nclass Translate extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\n    initialize() {\n        this.translate(this.entity, this.speed, this.min, this.max, this.loop, this.r);\n    }\n    async translate(entity, speed, min, max, loop = false, r = 30) {\n        const { x, y, z } = this.vec3;\n        for (let i = min; i < max; i++) {\n            entity.translate(x / r, y / r, z / r);\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(speed);\n        }\n        for (let i = max; i > min; i--) {\n            entity.translate(-x / r, -y / r, -z / r);\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(speed);\n        }\n        if (loop)\n            return this.translate(entity, speed, min, max, loop, r);\n    }\n}\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(Translate, attributes);\n\n\n//# sourceURL=webpack:///./src/entities/translate.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\n    const name = App.name.toLowerCase();\n    const app = pc.createScript(name);\n    if (attributeses !== undefined) {\n        for (let [name, attributes] of Object.entries(attributeses)) {\n            console.log(name, attributes);\n            app.attributes.add(name, attributes);\n        }\n    }\n    Object.setPrototypeOf(app.prototype, App.prototype);\n    return app;\n};\nclass ScriptTypeBase {\n    attach() { }\n    on() { }\n    off() { }\n    fire() { }\n    once() { }\n    set() { }\n}\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')},"./src/utils/delay.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\nconst delay = (ms) => {\n    return new Promise(resolve => setTimeout(resolve, ms));\n};\n/* harmony default export */ __webpack_exports__["default"] = (delay);\n\n\n//# sourceURL=webpack:///./src/utils/delay.ts?')}});!function(e){var r={};function __webpack_require__(_){if(r[_])return r[_].exports;var t=r[_]={i:_,l:!1,exports:{}};return e[_].call(t.exports,t,t.exports,__webpack_require__),t.l=!0,t.exports}__webpack_require__.m=e,__webpack_require__.c=r,__webpack_require__.d=function(e,r,_){__webpack_require__.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:_})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,r){if(1&r&&(e=__webpack_require__(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var _=Object.create(null);if(__webpack_require__.r(_),Object.defineProperty(_,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)__webpack_require__.d(_,t,function(r){return e[r]}.bind(null,t));return _},__webpack_require__.n=function(e){var r=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(r,"a",r),r},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/bound.ts")}({"./src/entities/bound.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n/* harmony import */ var _utils_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/delay */ "./src/utils/delay.ts");\n// @ts-ignore\r\n\r\n\r\nconst attributes = {\r\n    speed: {\r\n        type: "number"\r\n    },\r\n    min: {\r\n        type: "number"\r\n    },\r\n    max: {\r\n        type: "number"\r\n    },\r\n    loop: {\r\n        type: "boolean"\r\n    },\r\n    r: {\r\n        type: "number",\r\n        default: 30\r\n    }\r\n};\r\nclass Bound extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\r\n    initialize() {\r\n        this.bound(this.entity, this.speed, this.min, this.max, this.loop, this.r);\r\n    }\r\n    async bound(entity, speed, min, max, loop = false, r = 30) {\r\n        for (let i = min; i < max; i++) {\r\n            entity.setLocalScale(i / r, i / r, i / r);\r\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(speed);\r\n        }\r\n        for (let i = max; i > min; i--) {\r\n            entity.setLocalScale(i / r, i / r, i / r);\r\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(speed);\r\n        }\r\n        if (loop)\r\n            return this.bound(entity, speed, min, max, loop, r);\r\n    }\r\n}\r\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(Bound, attributes);\r\n\n\n//# sourceURL=webpack:///./src/entities/bound.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\r\n    const name = App.name.toLowerCase();\r\n    const app = pc.createScript(name);\r\n    if (attributeses !== undefined) {\r\n        for (let [name, attributes] of Object.entries(attributeses)) {\r\n            console.log(name, attributes);\r\n            app.attributes.add(name, attributes);\r\n        }\r\n    }\r\n    Object.setPrototypeOf(app.prototype, App.prototype);\r\n    return app;\r\n};\r\nclass ScriptTypeBase {\r\n    attach() { }\r\n    on() { }\r\n    off() { }\r\n    fire() { }\r\n    once() { }\r\n    set() { }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')},"./src/utils/delay.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\nconst delay = (ms) => {\r\n    return new Promise(resolve => setTimeout(resolve, ms));\r\n};\r\n/* harmony default export */ __webpack_exports__["default"] = (delay);\r\n\n\n//# sourceURL=webpack:///./src/utils/delay.ts?')}});!function(e){var r={};function __webpack_require__(_){if(r[_])return r[_].exports;var t=r[_]={i:_,l:!1,exports:{}};return e[_].call(t.exports,t,t.exports,__webpack_require__),t.l=!0,t.exports}__webpack_require__.m=e,__webpack_require__.c=r,__webpack_require__.d=function(e,r,_){__webpack_require__.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:_})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,r){if(1&r&&(e=__webpack_require__(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var _=Object.create(null);if(__webpack_require__.r(_),Object.defineProperty(_,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)__webpack_require__.d(_,t,function(r){return e[r]}.bind(null,t));return _},__webpack_require__.n=function(e){var r=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(r,"a",r),r},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/pusher.ts")}({"./src/entities/pusher.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n/* harmony import */ var _utils_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/delay */ "./src/utils/delay.ts");\n\r\n\r\nconst attributes = {\r\n    speed: {\r\n        type: "number"\r\n    },\r\n    min: {\r\n        type: "number"\r\n    },\r\n    max: {\r\n        type: "number"\r\n    },\r\n    loop: {\r\n        type: "boolean"\r\n    }\r\n};\r\nclass Pusher extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\r\n    initialize() {\r\n        this.move(this.entity, this.speed, this.min, this.max, true);\r\n    }\r\n    update() { }\r\n    async move(entity, speed, min, max, loop) {\r\n        for (let i = min; i < max; i++) {\r\n            entity.translate(0, 0, i / 200);\r\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(speed);\r\n        }\r\n        for (let i = max; i > min; i--) {\r\n            entity.translate(0, 0, i / 200);\r\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(speed);\r\n        }\r\n        if (loop)\r\n            return this.move(entity, speed, min, max, loop);\r\n    }\r\n}\r\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(Pusher, attributes);\r\n\n\n//# sourceURL=webpack:///./src/entities/pusher.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\r\n    const name = App.name.toLowerCase();\r\n    const app = pc.createScript(name);\r\n    if (attributeses !== undefined) {\r\n        for (let [name, attributes] of Object.entries(attributeses)) {\r\n            console.log(name, attributes);\r\n            app.attributes.add(name, attributes);\r\n        }\r\n    }\r\n    Object.setPrototypeOf(app.prototype, App.prototype);\r\n    return app;\r\n};\r\nclass ScriptTypeBase {\r\n    attach() { }\r\n    on() { }\r\n    off() { }\r\n    fire() { }\r\n    once() { }\r\n    set() { }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')},"./src/utils/delay.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\nconst delay = (ms) => {\r\n    return new Promise(resolve => setTimeout(resolve, ms));\r\n};\r\n/* harmony default export */ __webpack_exports__["default"] = (delay);\r\n\n\n//# sourceURL=webpack:///./src/utils/delay.ts?')}});!function(e){var t={};function __webpack_require__(r){if(t[r])return t[r].exports;var _=t[r]={i:r,l:!1,exports:{}};return e[r].call(_.exports,_,_.exports,__webpack_require__),_.l=!0,_.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,r){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(__webpack_require__.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var _ in e)__webpack_require__.d(r,_,function(t){return e[t]}.bind(null,_));return r},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/picker-raycast.ts")}({"./src/entities/picker-raycast.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n// @ts-ignore\n\nclass PickerRayCast extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\n    initialize() {\n        if (this.app.touch) {\n            this.app.touch.on(pc.EVENT_TOUCHSTART, this.onSelect, this);\n        }\n        else {\n            this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onSelect, this);\n        }\n    }\n    onSelect(e) {\n        let from, to;\n        if (this.app.touch) {\n            from = this.entity.camera.screenToWorld(e.touches[0].x, e.touches[0].y, this.entity.camera.nearClip);\n            to = this.entity.camera.screenToWorld(e.touches[0].x, e.touches[0].y, this.entity.camera.farClip);\n        }\n        else {\n            from = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.nearClip);\n            to = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.farClip);\n        }\n        const result = this.app.systems.rigidbody.raycastFirst(from, to);\n        if (result) {\n            const pickedEntity = result.entity;\n            if (pickedEntity.name === "TouchableZone") {\n                this.app.fire("game:coin:create", result.point);\n                // pickedEntity.script.createCoin.create(result.point);\n            }\n        }\n    }\n}\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(PickerRayCast);\n\n\n//# sourceURL=webpack:///./src/entities/picker-raycast.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\n    const name = App.name.toLowerCase();\n    const app = pc.createScript(name);\n    if (attributeses !== undefined) {\n        for (let [name, attributes] of Object.entries(attributeses)) {\n            console.log(name, attributes);\n            app.attributes.add(name, attributes);\n        }\n    }\n    Object.setPrototypeOf(app.prototype, App.prototype);\n    return app;\n};\nclass ScriptTypeBase {\n    attach() { }\n    on() { }\n    off() { }\n    fire() { }\n    once() { }\n    set() { }\n}\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')}});!function(e){var t={};function __webpack_require__(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(__webpack_require__.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)__webpack_require__.d(n,r,function(t){return e[t]}.bind(null,r));return n},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/slot.ts")}({"./src/entities/slot.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n/* harmony import */ var _utils_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/delay */ "./src/utils/delay.ts");\n\n\nconst attibuteses = {\n    pattern_1: {\n        type: "entity"\n    },\n    pattern_2: {\n        type: "entity"\n    },\n    pattern_3: {\n        type: "entity"\n    },\n    trigger: {\n        type: "entity"\n    },\n    probabilityOf: {\n        type: "number"\n    },\n    perticles: {\n        type: "entity",\n        array: true\n    },\n    winningScript: {\n        type: "entity"\n    }\n};\nclass Slot extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\n    initialize() {\n        this.isMoving = false;\n        if (this.app.touch) {\n            // this.app.touch.on(pc.EVENT_TOUCHSTART, this.play, this);\n        }\n        else {\n            // this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.play, this);\n        }\n        // this.trigger.collision.on("triggerenter", this.play, this);\n        setInterval(() => {\n            this.play();\n        }, 2000);\n    }\n    lottery() {\n        if (Math.random() * 100 < this.probabilityOf) {\n            console.log("Winning!");\n            return true;\n        }\n        return false;\n    }\n    async play() {\n        if (this.isMoving) {\n            return;\n        }\n        await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(200);\n        if (this.lottery()) {\n            this.start(true, 2);\n            this.isMoving = true;\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(2800);\n            const randomNumber = Math.round(Math.random() * 10) / 10;\n            this.stop(true, randomNumber - (randomNumber % 0.125));\n            for (let perticle of this.perticles) {\n                perticle.script.perticles.start();\n            }\n            const throwing = await this.winningScript.script.throwcoin.coinThrow();\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(5000);\n            this.isMoving = false;\n        }\n        else {\n            this.start();\n            this.isMoving = true;\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(1800);\n            this.stop();\n            for (let perticle of this.perticles) {\n                perticle.script.perticles.stop();\n            }\n            this.isMoving = false;\n        }\n    }\n    onClick() {\n        if (!this.isMoving) {\n            this.start();\n        }\n        else {\n            this.stop();\n        }\n        this.isMoving = !this.isMoving;\n    }\n    stop(win, offset) {\n        this.pattern_1.script.scrollingtexture.stop(win, offset);\n        this.pattern_2.script.scrollingtexture.stop(win, offset);\n        this.pattern_3.script.scrollingtexture.stop(win, offset);\n    }\n    start(win, offset) {\n        this.pattern_1.script.scrollingtexture.start(win, offset);\n        this.pattern_2.script.scrollingtexture.start(win, offset);\n        this.pattern_3.script.scrollingtexture.start(win, offset);\n    }\n    update() { }\n}\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(Slot, attibuteses);\n\n\n//# sourceURL=webpack:///./src/entities/slot.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\n    const name = App.name.toLowerCase();\n    const app = pc.createScript(name);\n    if (attributeses !== undefined) {\n        for (let [name, attributes] of Object.entries(attributeses)) {\n            console.log(name, attributes);\n            app.attributes.add(name, attributes);\n        }\n    }\n    Object.setPrototypeOf(app.prototype, App.prototype);\n    return app;\n};\nclass ScriptTypeBase {\n    attach() { }\n    on() { }\n    off() { }\n    fire() { }\n    once() { }\n    set() { }\n}\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')},"./src/utils/delay.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\nconst delay = (ms) => {\n    return new Promise(resolve => setTimeout(resolve, ms));\n};\n/* harmony default export */ __webpack_exports__["default"] = (delay);\n\n\n//# sourceURL=webpack:///./src/utils/delay.ts?')}});!function(e){var _={};function __webpack_require__(t){if(_[t])return _[t].exports;var r=_[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}__webpack_require__.m=e,__webpack_require__.c=_,__webpack_require__.d=function(e,_,t){__webpack_require__.o(e,_)||Object.defineProperty(e,_,{enumerable:!0,get:t})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,_){if(1&_&&(e=__webpack_require__(e)),8&_)return e;if(4&_&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(__webpack_require__.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&_&&"string"!=typeof e)for(var r in e)__webpack_require__.d(t,r,function(_){return e[_]}.bind(null,r));return t},__webpack_require__.n=function(e){var _=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(_,"a",_),_},__webpack_require__.o=function(e,_){return Object.prototype.hasOwnProperty.call(e,_)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/throw-coin.ts")}({"./src/entities/throw-coin.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n/* harmony import */ var _utils_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/delay */ "./src/utils/delay.ts");\n\n\nconst attibuteses = {\n    coin: {\n        type: "entity"\n    },\n    charactor: {\n        type: "entity"\n    }\n};\nclass ThrowCoin extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\n    async coinThrow() {\n        const { x, y, z } = this.entity.getPosition();\n        if (this.charactor.animation.currAnim === "chara_throw.json") {\n            return;\n        }\n        this.charactor.animation.play("chara_throw.json");\n        for (let i of [...Array(30)]) {\n            const coin = this.coin.clone();\n            coin.setPosition(x, y + 2, z);\n            coin.enabled = true;\n            await Object(_utils_delay__WEBPACK_IMPORTED_MODULE_1__["default"])(200);\n        }\n        this.charactor.animation.play("chara_idle_throw.json");\n    }\n}\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(ThrowCoin, attibuteses);\n\n\n//# sourceURL=webpack:///./src/entities/throw-coin.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\n    const name = App.name.toLowerCase();\n    const app = pc.createScript(name);\n    if (attributeses !== undefined) {\n        for (let [name, attributes] of Object.entries(attributeses)) {\n            console.log(name, attributes);\n            app.attributes.add(name, attributes);\n        }\n    }\n    Object.setPrototypeOf(app.prototype, App.prototype);\n    return app;\n};\nclass ScriptTypeBase {\n    attach() { }\n    on() { }\n    off() { }\n    fire() { }\n    once() { }\n    set() { }\n}\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')},"./src/utils/delay.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\nconst delay = (ms) => {\n    return new Promise(resolve => setTimeout(resolve, ms));\n};\n/* harmony default export */ __webpack_exports__["default"] = (delay);\n\n\n//# sourceURL=webpack:///./src/utils/delay.ts?')}});!function(e){var r={};function __webpack_require__(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}__webpack_require__.m=e,__webpack_require__.c=r,__webpack_require__.d=function(e,r,t){__webpack_require__.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,r){if(1&r&&(e=__webpack_require__(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(__webpack_require__.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)__webpack_require__.d(t,n,function(r){return e[r]}.bind(null,n));return t},__webpack_require__.n=function(e){var r=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(r,"a",r),r},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="./src/entities/start-text.ts")}({"./src/entities/start-text.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_createScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/createScript */ "./src/utils/createScript.ts");\n/* harmony import */ var _utils_change_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/change-scene */ "./src/utils/change-scene.ts");\n// @ts-ignore\r\n\r\n\r\nclass StartText extends _utils_createScript__WEBPACK_IMPORTED_MODULE_0__["ScriptTypeBase"] {\r\n    constructor() {\r\n        super();\r\n        this.isMoving = false;\r\n    }\r\n    initialize() {\r\n        if (this.app.touch) {\r\n            this.app.touch.on(pc.EVENT_TOUCHSTART, this.start, this);\r\n        }\r\n        else {\r\n            this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.start, this);\r\n        }\r\n        this.ball = this.app.root.findByTag("ball")[0];\r\n        this.ball.collision.on("collisionstart", this.onCollisionStart, this);\r\n        this.ball.collision.on("triggerenter", this.onCollisionStart, this);\r\n    }\r\n    onCollisionStart(result) {\r\n        if (result.other.rigidbody) {\r\n            const { entity } = result.other.rigidbody;\r\n            if (entity.tags.list().includes("pin")) {\r\n                this.entity.sound.play("hit");\r\n                this.isMoving = false;\r\n                this.ball.setPosition(0, 1.12, 2.912);\r\n            }\r\n            else {\r\n                Object(_utils_change_scene__WEBPACK_IMPORTED_MODULE_1__["default"])("775959", this.app, this.entity);\r\n                this.ball.setPosition(0, 1.12, 2.912);\r\n            }\r\n        }\r\n    }\r\n    update() {\r\n        if (this.isMoving) {\r\n            this.ball = this.app.root.findByTag("ball")[0];\r\n            this.ball.translate(0, 0, -0.3);\r\n            this.ball.rotate(Math.random() * 360, Math.random() * 360, Math.random() * 360);\r\n        }\r\n    }\r\n    start() {\r\n        this.isMoving = true;\r\n        this.ball = this.app.root.findByTag("ball")[0];\r\n    }\r\n}\r\nObject(_utils_createScript__WEBPACK_IMPORTED_MODULE_0__["createScript"])(StartText);\r\n\n\n//# sourceURL=webpack:///./src/entities/start-text.ts?')},"./src/utils/change-scene.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__["default"] = ((sceneId, app, entity) => {\r\n    const loadScene = (id, callback) => {\r\n        const url = id + ".json";\r\n        app.loadSceneHierarchy(url, (err, parent) => {\r\n            if (!err) {\r\n                callback(parent);\r\n            }\r\n            else {\r\n                console.error(err);\r\n            }\r\n        });\r\n    };\r\n    loadScene(sceneId, () => entity.root.children[0].destroy());\r\n});\r\n\n\n//# sourceURL=webpack:///./src/utils/change-scene.ts?')},"./src/utils/createScript.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScript", function() { return createScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptTypeBase", function() { return ScriptTypeBase; });\nconst createScript = (App, attributeses) => {\r\n    const name = App.name.toLowerCase();\r\n    const app = pc.createScript(name);\r\n    if (attributeses !== undefined) {\r\n        for (let [name, attributes] of Object.entries(attributeses)) {\r\n            console.log(name, attributes);\r\n            app.attributes.add(name, attributes);\r\n        }\r\n    }\r\n    Object.setPrototypeOf(app.prototype, App.prototype);\r\n    return app;\r\n};\r\nclass ScriptTypeBase {\r\n    attach() { }\r\n    on() { }\r\n    off() { }\r\n    fire() { }\r\n    once() { }\r\n    set() { }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/createScript.ts?')}});