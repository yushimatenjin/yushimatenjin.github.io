var ScoreZone = pc.createScript('scoreZone');

// initialize code called once per entity
ScoreZone.prototype.initialize = function() {
    this.entity.collision.on("triggerenter", (entity) => {
        this.app.fire("main:balance:add")
    }, this)
};
