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
