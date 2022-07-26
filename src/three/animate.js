import * as THREE from "three";
// import camera from "./camera";
import CameraModule from "@/three/camera";
import {renderer, css3drender} from "./renderer";
// import controls from "./controls";
import controlModule from "./controls";
import scene from "./scene";

// import danceGirl from "@/three/mesh/DanceGirl";

const clock = new THREE.Clock();
function animate(updateMesh, city) {
  // 不能在同一帧里使用
  // const time = clock.getElapsedTime();
  // 获取间隔时间
  const delta = clock.getDelta();
  
  // console.log(danceGirl.mixer)
  // if (danceGirl.mixer) {
  //   danceGirl.mixer.update(delta);
  // }

  controlModule.controls.update(delta);
  if(updateMesh){
    updateMesh(delta);
  }
  
  requestAnimationFrame(()=>{
    animate(updateMesh, city)
  });
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, CameraModule.activeCamera);
  css3drender.render(scene, CameraModule.activeCamera);
  // renderer.render(scene, camera);
}

export default animate;