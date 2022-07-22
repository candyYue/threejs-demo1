import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";
import scene from "@/three/scene";
// import camera from "@/three/camera";
import CameraModule from "@/three/camera";

export default class City{
  constructor(scene){
    const gltfLoader = new GLTFLoader()
    const dracoloader = new DRACOLoader() //模型解压缩
    dracoloader.setDecoderPath("/draco/");
    dracoloader.setDecoderConfig({type:'js'})
    dracoloader.preload()
    gltfLoader.setDRACOLoader(dracoloader)
    gltfLoader.load('model/city3.glb',gltf=>{
      scene.add(gltf.scene)
      console.log(gltf)
      gltf.scene.traverse(child =>{
        if(child.name==='redcar'){
          this.redcar = child
        }
        if(child.name==='goFactoryLine'){
          // child.visible = false
          const line = child
          const points = [] //点集合
          for (let i = line.geometry.attributes.position.count -1; i >=0; i--) {
            const point = new THREE.Vector3(
              line.geometry.attributes.position.array[i*3],
              line.geometry.attributes.position.array[i*3+1],
              line.geometry.attributes.position.array[i*3+2],
            )
            points.push(point)
          }
          // 创建曲线
          this.toFactoryCurve = new THREE.CatmullRomCurve3(points)
          this.toFactoryCurveProgress = 0;
          this.updateCarToFactory();
        }
      })

      gltf.cameras.forEach(camera=>{
        CameraModule.addCamera(camera.name, camera);
      })

      console.log(CameraModule)

    })
  }

  update(time) {
    if (this.mixer) {
      // console.log(time);
      this.mixer.update(time);
    }
  }
  updateCarToFactory(){
    if(this.action){
      this.action.stop()
      this.action.reset()
    }
    gsap.to(this,{
      toFactoryCurveProgress:0.999,
      duration:10,
      repeat:-1,
      onUpdate:()=>{
        //设置小汽车方向
        this.redcar.position.copy(
          this.toFactoryCurve.getPointAt(this.toFactoryCurveProgress)
        );

        if(this.toFactoryCurveProgress + 0.001 < 1){
          this.redcar.lookAt(
            this.toFactoryCurve.getPointAt(this.toFactoryCurveProgress + 0.001)
          );
        }
      }
    })
  }
}
