import * as THREE from 'three';
import gsap from 'gsap';
import vertex from "@/shader/lightwall/vertex.glsl";
import fragment from "@/shader/lightwall/fragment.glsl";

export default class LightWall{
  constructor(position){
    
    this.geometry = new THREE.CylinderGeometry( 1, 1, 2,32 ,1,true);
    this.geometry.computeBoundingBox()
    const {max, min} = this.geometry.boundingBox
    const uHeight = max.y - min.y
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent:true,
      side: THREE.DoubleSide,
      uniforms:{
        uHeight:{ value: uHeight}
      }
    })
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.position.set(position.x, 1, position.z);
    gsap.to(this.mesh.scale,{
      x:2,
      z:2,
      duration:1,
      ease: 'none',
      repeat: -1,
      yoyo:true
    })
  }
  remove(){
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}