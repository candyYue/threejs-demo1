<template>
  <div class="flower" ref="sceneDiv"></div>
</template>

<script setup>


import { onMounted, ref , defineProps, watch} from 'vue';
import * as THREE from 'three';
import scene from '@/three/scene'
// import camera from '@/three/camera'
import CameraModule from "@/three/camera";
import renderer from '@/three/renderer'
import axesHelper from '@/three/axesHelper'
import animate from '@/three/animate'
import { light , dirLight} from '@/three/light'
import "@/three/init";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from 'gsap'


let sceneDiv = ref(null)
// 添加相机
// scene.add(camera);
scene.add(CameraModule.activeCamera);


//add flower
const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
dracoLoader.setDecoderConfig({type:'js'})
dracoLoader.preload() //请求解码器库
gltfLoader.setDRACOLoader(dracoLoader)


let params = {
  value:0,
  value1:0
}
let flower,stem,flower1,stem1,flower2,stem2
gltfLoader.load('model/f4.glb',gltf=>{
  stem = gltf.scene.children[0].children[0]
  // stem.name = 'stem'
  flower = gltf.scene.children[0].children[1]
  // flower.name = 'flower'
  gltf.scene.rotation.x = Math.PI;
  scene.add(gltf.scene)


  gltfLoader.load('model/f2.glb',gltf=>{
    gltf.scene.traverse(item=>{
      if(item.material&&item.name==='Cylinder004'){
        stem1 = item
        //变换位置
        stem.geometry.morphAttributes.position = [
          stem1.geometry.attributes.position,
        ]
        stem.updateMorphTargets();
      }
      if(item.material&&item.name==='Cylinder004_1'){
        flower1 = item
        flower.geometry.morphAttributes.position = [
          flower1.geometry.attributes.position,
        ]
        flower.updateMorphTargets();
      }
    })


    gltfLoader.load('model/f1.glb',gltf=>{
      gltf.scene.traverse(item=>{
        if(item.material&&item.name==='Cylinder004'){
          stem2 = item
          //变换位置
          stem.geometry.morphAttributes.position.push(stem2.geometry.attributes.position)
          stem.updateMorphTargets();
        }
        if(item.material&&item.name==='Cylinder004_1'){
          flower2 = item
          flower.geometry.morphAttributes.position.push(flower2.geometry.attributes.position)
          flower.updateMorphTargets();
        }
      })
    })
    
    gsap.to(params,{
      value:1,
      duration:4,
      onUpdate:()=>{
        //morphTargetInfluences：应用了哪个变形 值在0-1
        stem.morphTargetInfluences[1] = params.value
        flower.morphTargetInfluences[1] = params.value
      },
      // onComplete:()=>{
      //   gsap.to(params,{
      //     value1:1,
      //     duration:4,
      //     onUpdate:()=>{
      //       // stem.morphTargetInfluences[1] = params.value1
      //       // flower.morphTargetInfluences[1] = params.value1
      //     }
      //   })
      // }
    })
  })



})


// 添加辅助坐标轴
scene.add(axesHelper);

onMounted(()=>{
  animate();
  sceneDiv.value.appendChild(renderer.domElement)
})
</script>

<style>
.flower{
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>