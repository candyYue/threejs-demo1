import * as THREE from 'three';
import gsap from 'gsap';
import vertex from "@/shader/flyLine/vertex.glsl";
import fragment from "@/shader/flyLine/fragment.glsl";
export default class FlyLineShader{
  constructor(){
    let linePoints = [
      new THREE.Vector3( 0, 2, 0 ),
      new THREE.Vector3( -5, 4, 0 ),
      new THREE.Vector3( -10, 2, 0 )
    ]
    //创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3( linePoints );
    const points = this.lineCurve.getPoints(1000)
    this.geometry  = new THREE.BufferGeometry().setFromPoints(points)
    //给每一个顶点设置属性
    const aSizeArray = new Float32Array(points.length)
    for (let i = 0; i < aSizeArray.length; i++) {
      aSizeArray[i] = i * 0.1 //0~100
    }
    this.geometry.setAttribute('aSize',new THREE.BufferAttribute(aSizeArray,1))
    this.material = new THREE.ShaderMaterial({
      uniforms:{
        uTime: {value: 0},
        uColor: {value: new THREE.Color(0xffff00)},
        uLength: {value: 100}
      },
      transparent:true,
      depthWrite:false,//深度叠加
      blending:THREE.AdditiveBlending,
      vertexShader:vertex,
      fragmentShader:fragment
    })

    this.mesh = new THREE.Points(this.geometry, this.material)

    //改变uTime 动画
    gsap.to(this.material.uniforms.uTime, {
      value: 100,
      duration: 2,
      repeat: -1,
      ease: 'none'
    })
  }
}