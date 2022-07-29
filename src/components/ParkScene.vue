<template>
  <div class="scene" ref="sceneDiv"></div>
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

import { createMesh2,updateMesh } from "@/three/createMesh";


// import danceGirl from "@/three/mesh/DanceGirl";


import "@/three/init";

let sceneDiv = ref(null)
// 添加相机
// scene.add(camera);
scene.add(CameraModule.activeCamera);


// 添加辅助坐标轴
scene.add(axesHelper);

let city = createMesh2();

onMounted(()=>{
   animate(updateMesh, city);

  sceneDiv.value.appendChild(renderer.domElement)
})
</script>

<style>
.scene{
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>