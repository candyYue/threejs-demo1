import * as THREE from 'three';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import scene from '@/three/scene'
import gsap from 'gsap'

import modifyCityMaterial from '../modify/modifyCityMaterial'

import FlyLine from './FlyLine'
import FlyLineShader from './FlyLineShader'

import CityLine from './CityLine'
import LightWall from './LightWall'
import LightRadar from './LightRadar'
import AlarmSprite from './AlarmSprite'

export default function creatCity(){
  const gltfLoader = new GLTFLoader()
  gltfLoader.load('./model/city.glb' , gltf =>{
    gltf.scene.traverse(item=>{
      if(item.type==='Mesh'){
        const cityMaterial = new THREE.MeshBasicMaterial({
          color:new THREE.Color(0x191970)
        })
        item.material = cityMaterial
        modifyCityMaterial(item)
        if(item.name==='Layerbuildings'){
          const cityLine = new CityLine(item.geometry)
          const size = item.scale.x * 1.001
          cityLine.mesh.scale.set(size,size,size)
          cityLine.mesh.position.set(item.position.x,item.position.y,item.position.z)
          scene.add(cityLine.mesh)
        }
      }
    })
    scene.add(gltf.scene)

    //添加飞线
    const flyline = new FlyLine()
    scene.add(flyline.mesh)

    //添加着色器飞线
    const flylineshader = new FlyLineShader()
    scene.add(flylineshader.mesh)

    
    //添加光墙
    // const cityWall = new LightWall()
    // scene.add(cityWall.mesh)

    
    //添加雷达扫描
    // const lightradar = new LightRadar()
    // scene.add(lightradar.mesh)

    //添加精灵图
    // const alarmsprite = new AlarmSprite()
    // alarmsprite.onClick((event)=>{
    //   event.sprite.scale.set(2,2,2)
    // })
    // scene.add(alarmsprite.sprite)
  })
}