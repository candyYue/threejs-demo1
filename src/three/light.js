import * as THREE from 'three';
import scene from '@/three/scene'

const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(100, 100, 100)
dirLight.castShadow = true
scene.add(dirLight)

export{
  light,
  dirLight
}