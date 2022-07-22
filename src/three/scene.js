import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
const scene = new THREE.Scene()


//天空盒子
// const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('texture/')
// const cubeTexture = cubeTextureLoader.load([
//   '1.jpg',
//   '2.jpg',
//   '3.jpg',
//   '4.jpg',
//   '5.jpg',
//   '6.jpg',
// ])
// scene.background = cubeTexture
// scene.environment = cubeTexture


const rgbeloader = new RGBELoader()
rgbeloader.loadAsync('texture/023.hdr').then(texture=>{
  //设置纹理为圆柱形纹理
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.environment = texture
  scene.background = texture
})
export default scene