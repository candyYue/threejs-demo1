import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";
import scene from "@/three/scene";
// import camera from "@/three/camera";
import CameraModule from "@/three/camera";
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default class City{
  constructor(){
    const gltfLoader = new GLTFLoader()
    const dracoloader = new DRACOLoader() //模型解压缩
    dracoloader.setDecoderPath("/draco/");
    dracoloader.setDecoderConfig({type:'js'})
    dracoloader.preload()
    gltfLoader.setDRACOLoader(dracoloader)
    gltfLoader.load('model/floor2.glb',gltf=>{
      scene.add(gltf.scene)
      console.log(gltf)
      gltf.scene.traverse(child =>{
        if(child.isMesh){
          child.material.emissiveIntensity = 5 //自发光
        }
        if(child.type==='Object3D'&&child.children.length===0){
          this.creatTag(child)
        }
      })
    })
  }

  creatTag(object3d){
    const ele = document.createElement('div')
    ele.className = 'ele-tag'
    ele.innerHTML = `
        <div class="ele-content">
        <h3>${object3d.name}</h3>
        <p>温度：26℃</p>
        <p>湿度：50%</p>
      </div>
    `
    const objectCSS3D = new CSS3DObject(ele)
    objectCSS3D.position.copy(object3d.position)
    // objectCSS3D.scale.set(0.2, 0.2, 0.2);
    return objectCSS3D;
  }
}
