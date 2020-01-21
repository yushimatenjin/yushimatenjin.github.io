/*jshint esversion: 6, asi: true, laxbreak: true*/
var CoinAppear = pc.createScript('coinAppear');

// initialize code called once per entity
CoinAppear.prototype.initialize = function() {
    var force = this.entity.forward.clone().scale(1000);

    // Apply the force
    this.entity.rigidbody.applyForce(force);
};

// update code called every frame
CoinAppear.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// CoinAppear.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/