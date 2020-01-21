var GoalZone = pc.createScript('goalZone');

// initialize code called once per entity
GoalZone.prototype.initialize = function() {
   this.entity.collision.on("triggerenter", (entity) => {
        this.app.fire("main:stock:add", entity, this)
   })
};
