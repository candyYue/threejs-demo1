import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";
import scene from "@/three/scene";
// import camera from "@/three/camera";
import CameraModule from "@/three/camera";
import controlModule from "@/three/controls";
import eventBus from '@/utils/eventBus'


class DanceGirl{
  constructor(){
    const gltfLoader = new GLTFLoader()
    const dracoloader = new DRACOLoader() //模型解压缩
    dracoloader.setDecoderPath("/draco/");
    dracoloader.setDecoderConfig({type:'js'})
    dracoloader.preload()
    gltfLoader.setDRACOLoader(dracoloader)
    gltfLoader.load('model/jianshen1.glb',gltf=>{
      
      scene.add(gltf.scene)
      this.girlPosition = gltf.scene.position.clone()  
      console.log(this.girlPosition)
      gltf.scene.traverse(child =>{
        if(child.isMesh){
          child.material.depthWrite = true
          child.material.normalScale = new THREE.Vector2(1,1)
          child.material.side = THREE.FrontSide
          child.material.transparent = false
          child.material.vertexColors = false
        }
      })


      // 设置动画
      this.mixer = new THREE.AnimationMixer(gltf.scene);
      const action = this.mixer.clipAction(gltf.animations[0]);
      action.play()
      action.timeScale = 2
    })

    eventBus.on('focusDance',()=>{
      gsap.to(controlModule.controls.target,{
        x:this.girlPosition.x,
        y:this.girlPosition.y,
        z:this.girlPosition.z,
        duration:1,
        onComplete:()=>{
          console.log(this.girlPosition)
          gsap.to(CameraModule.activeCamera.position,{
            x:this.girlPosition.x - 1,
            y:this.girlPosition.y - 2,
            z:this.girlPosition.z + 3,
            duration:2,
          })
        }
      })
    })
  }
}
const danceGirl = new DanceGirl()
export default danceGirl
