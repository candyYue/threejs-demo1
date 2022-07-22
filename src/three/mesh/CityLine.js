import * as THREE from 'three';
import gsap from 'gsap';


export default class CityLine{
  constructor(geometry){
    
    this.geometry = new THREE.EdgesGeometry( geometry);

    this.material = new THREE.LineBasicMaterial( { color: 0xffffff } )
    this.mesh = new THREE.LineSegments( this.geometry ,  this.material);
  }
}