// scrolling-texture.js
var BarScrollingTexture = pc.createScript('barscrollingTexture');

BarScrollingTexture.attributes.add('materialAsset', {
    type: 'asset'
});

BarScrollingTexture.attributes.add('speed', {
    type: 'vec2'
});

BarScrollingTexture.tmp = new pc.Vec2();

// initialize code called once per entity
BarScrollingTexture.prototype.initialize = function() {
    // get the material that we will animate
    if (this.materialAsset) {
        this.material = this.materialAsset.resource;
    } 
};

// update code called every frame
BarScrollingTexture.prototype.update = function(dt) {
    var tmp = BarScrollingTexture.tmp;

    // Calculate how much to offset the texture
    // Speed * dt
    tmp.set(this.speed.x, this.speed.y);
    tmp.scale(dt);

    // Update the diffuse and normal map offset values
    // this.material.diffuseMapOffset = this.material.diffuseMapOffset.add(tmp);
    // this.material.normalMapOffset.add(tmp);
    this.material.opacityMapOffset = this.material.opacityMapOffset.add(tmp) /// 追加する
    this.material.update();
};
