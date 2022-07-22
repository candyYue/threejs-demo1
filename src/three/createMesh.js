import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import scene from '@/three/scene'
// import creatCity from './mesh/City'
import creatCity from './mesh/City2'
let city
export default function createMesh(){
  city = new creatCity(scene);
  return city;
}

export function updateMesh(t) {
  // 更新城市
  city.update(t);
}