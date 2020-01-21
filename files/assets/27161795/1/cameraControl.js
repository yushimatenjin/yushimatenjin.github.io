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