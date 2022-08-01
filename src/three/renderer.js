import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
const renderer = new THREE.WebGLRenderer({
  antialias:true, //抗锯齿
  alpha: true,
  logarithmicDepthBuffer: true  // 设置对数深度缓冲区
})
renderer.physicallyCorrectLights = true // 设置物理灯光模拟效果
// renderer.setClearColor('#000000', 1.0) //设置背景色
// renderer.outputEncoding = THREE.sRGBEncoding //定义渲染器的输出编码
renderer.toneMapping = THREE.ACESFilmicToneMapping //电影级别效果
renderer.toneMappingExposure = 1.5 //曝光程度
renderer.setSize(window.innerWidth, window.innerHeight)


//创建css3drender
const css3drender = new CSS3DRenderer()
css3drender.setSize(window.innerWidth, window.innerHeight)
document.querySelector('#css3drender').appendChild(css3drender.domElement)
export {
  renderer,
  css3drender
}