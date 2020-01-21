var DestroyZone = pc.createScript('destroyZone');

DestroyZone.prototype.initialize = function() {

   this.entity.collision.on("triggerenter", (entity) => {
        this.app.fire("game:coin:delete", entity, this)
   })

};
