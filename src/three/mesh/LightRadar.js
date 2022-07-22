import * as THREE from 'three';
import gsap from 'gsap';
import vertex from "@/shader/lightradar/vertex.glsl";
import fragment from "@/shader/lightradar/fragment.glsl";

export default class LightRadar{
  constructor(position){
    
    this.geometry = new THREE.PlaneBufferGeometry( 1, 1 );
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent:true,
      side: THREE.DoubleSide,
      uniforms:{
        uTime:{value:0},
        uColor:{value:new THREE.Color(0xffff00)}
      }
    })
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.position.set(position.x,1,position.z)

    gsap.to(this.material.uniforms.uTime,{
      value:1,
      duration:1,
      ease: 'none',
      repeat: -1,
    })
  }
  remove(){
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}