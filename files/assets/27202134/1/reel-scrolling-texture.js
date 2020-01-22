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
    tmp.scale(dt * 2);

    // Update the diffuse and normal map offset values
    this.material.emissiveMapOffset = this.material.emissiveMapOffset.add(tmp);
    this.material.opacityMapOffset = this.material.opacityMapOffset.add(tmp); /// 追加する
    this.material.update();
    }
};
