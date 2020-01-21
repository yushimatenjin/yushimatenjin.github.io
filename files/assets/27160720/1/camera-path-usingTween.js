var CameraPathUsingTween = pc.createScript('cameraPathUsingTween');

//カメラにアタッチされているスクリプト
CameraPathUsingTween.prototype.initialize = function() {
  //カメラエンティティそのものにアタッチ
  this.entity.moving = function(pathpoint,duration,easing){
      //座標をラープ
      this.tween(this.getLocalPosition()).to(pathpoint.localPosition, duration,easing)
      .loop(false)
      .yoyo(false)
      .on('update', function () {
          isTweenUpdate = true;　//ラーピング開始
      })
      .on('complete',function(){
          isTweenUpdate = false; //ラーピング終了
      })
      .start();

      //角度をラープ
      this.tween(this.getLocalEulerAngles()).rotate(pathpoint.eularangle, duration,easing)
      .loop(false)
      .yoyo(false)
      .start();
  };
}