<template>
  <div class="scene" ref="sceneDiv">

  </div>
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

import createMesh from '@/three/createMesh'

import AlarmSprite from '@/three/mesh/AlarmSprite'
import LightWall from '@/three/mesh/LightWall'
import LightRadar from '@/three/mesh/LightRadar'

import "@/three/init";

import eventBus from '@/utils/eventBus'
import controls from '@/three/controls';

const props = defineProps(['eventList'])

let eventListArray = []

let mapPosition = {
  火警: (position)=>{
    const cityWall = new LightWall(position)
    scene.add(cityWall.mesh)
    eventListArray.push(cityWall);
  },
  电力: (position)=>{
    const lightradar = new LightRadar(position)
    scene.add(lightradar.mesh)
    eventListArray.push(lightradar);
  },
}

eventBus.on('changeEvent',data=>{
  const index = data.index
  const spriteList=[]
  eventListArray.forEach(mesh=>{
    if(mesh.name==='图标'){
      spriteList.push(mesh)
    }
    // camera.lookAt(new THREE.Vector3(mesh.position))
  })
  const position = {
    x: spriteList[index].sprite.position.x,
    y: 0,
    z: spriteList[index].sprite.position.y,
  }
  
  controls.target.set(position.x,position.y,position.z)
  
})
watch(
  ()=>props.eventList,
  val=>{
    eventListArray.forEach(item=>{
      item.remove()
    })
    eventListArray = []
    props.eventList.forEach((element,i) => {
      const position = {
        x: element.position.x/5 - 10,
        z:element.position.y/5 - 10,
      }
      const alarmsprite = new AlarmSprite(element.name, position)
      
      alarmsprite.onClick((event)=>{
          eventBus.emit('spriteClick',{event: element, index:i})
      //   event.sprite.scale.set(2,2,2)
      })
      eventListArray.push(alarmsprite)
      scene.add(alarmsprite.sprite)
      if(mapPosition[element.name]){
        mapPosition[element.name](position)
      }
    });
  }
)
let sceneDiv = ref(null)
// 添加相机
// scene.add(camera);
scene.add(CameraModule.activeCamera);
// 添加辅助坐标轴
scene.add(axesHelper);

createMesh()

onMounted(()=>{
  animate()
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