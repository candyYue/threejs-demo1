import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import scene from '@/three/scene'
import creatCity1 from './mesh/City'
import creatCity2 from './mesh/City2'
let city
export function createMesh1(){
  city = new creatCity1(scene);
  return city;
}
export function createMesh2(){
  city = new creatCity2(scene);
  return city;
}

export function updateMesh(t) {
  // 更新城市
  city.update(t);
}