import * as THREE from 'three';
import camera from '@/three/camera';

import gsap from 'gsap';

export default class AlarmSprite{
  constructor(type='fire',position={x:-4.2,z:8}){
    this.name='图标'
    const typeObj = {
      火警:'texture/fire.svg',
      治安:'texture/jingcha.svg',
      电力:'texture/dianli.svg',
    }
    const map = new THREE.TextureLoader().load(  `${typeObj[type]}` );
    this.material = new THREE.SpriteMaterial( { 
      map: map,
      transparent:true,
      // depth:false, //深度测试
      // blending:THREE.AdditiveBlending, //混合模式
    } );
    this.sprite = new THREE.Sprite( this.material );
    this.sprite.position.set(position.x,3.5,position.z)
    this.fns = []
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    window.addEventListener('click',(event)=>{
      this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      this.raycaster.setFromCamera( this.pointer, camera );
      const intersects = this.raycaster.intersectObject( this.sprite );
      if(intersects&&intersects.length){
        event.sprite = this.sprite
        this.fns.forEach(fn=>{
          fn(event)
        })
      }
    })
  }
  onClick(fn){
    this.fns.push(fn)
  }

  remove(){
    this.sprite.remove()
    this.sprite.removeFromParent()
    this.sprite.geometry.dispose()
    this.sprite.material.dispose()
  }
}