import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";
import scene from "@/three/scene";
// import camera from "@/three/camera";
import CameraModule from "@/three/camera";
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import eventBus from '@/utils/eventBus'
import vertex from "@/shader/fighter/vertex.glsl";
import fragment from "@/shader/fighter/fragment.glsl";

export default class City{
  constructor(){
    const gltfLoader = new GLTFLoader()
    const dracoloader = new DRACOLoader() //模型解压缩
    dracoloader.setDecoderPath("/draco/");
    dracoloader.setDecoderConfig({type:'js'})
    dracoloader.preload()
    gltfLoader.setDRACOLoader(dracoloader)
    this.floor1 = null
    this.floor2 = null
    this.wall = null
    this.cssobjgroup = []

    gltfLoader.load('model/floor1.glb',glft=>{
      this.floor1 = glft.scene
      this.floor1.visible = false
      scene.add(this.floor1)
    })

    gltfLoader.load('model/floor2.glb',gltf=>{
      this.floor2 = gltf.scene
      gltf.scene.traverse(child =>{
        if(child.isMesh){
          child.material.emissiveIntensity = 5 //自发光
        }
        if(child.type==='Object3D'&&child.children.length===0){
          const cssobj = this.creatTag(child)
          cssobj.visible = false
          this.cssobjgroup.push(cssobj)
          this.floor2.add(cssobj)
        }
      })
      this.floor2.visible = false
      scene.add(this.floor2)
    })

    gltfLoader.load('model/wall.glb',glft=>{
      this.wall = glft.scene
      this.wall.visible = false
      scene.add(this.wall)
    })

    this.Fighter = null
    gltfLoader.load('model/Fighter1.glb',glft=>{
      this.Fighter = glft.scene
      this.Fighter.visible = false
      scene.add(this.Fighter)
    })

    this.initAction()
    
  }

  creatTag(object3d){
    const ele = document.createElement('div')
    ele.className = 'ele-tag'
    ele.innerHTML = `
        <div class="ele-content">
        <h3>${object3d.name}</h3>
        <p>温度：26℃</p>
        <p>湿度：50%</p>
      </div>
    `
    const objectCSS3D = new CSS3DObject(ele)
    objectCSS3D.position.copy(object3d.position)
    objectCSS3D.scale.set(0.2, 0.2, 0.2);
    // scene.add(objectCSS3D)
    return objectCSS3D;
  }

  initAction(){
    eventBus.on('showFloor1',()=>{
      this.floor1.visible = true
      this.floor2.visible = false
      this.wall.visible = false
      this.cssobjgroup.forEach(v => v.visible = false)
    })

    eventBus.on('showFloor2',()=>{
      this.floor1.visible = false
      this.floor2.visible = true
      this.wall.visible = false
      this.cssobjgroup.forEach(v => v.visible = true)
    })

    eventBus.on('wall',()=>{
      this.floor1.visible = false
      this.floor2.visible = false
      this.wall.visible = true
      this.cssobjgroup.forEach(v => v.visible = false)
    })

    eventBus.on('showAll',()=>{
      this.floor1.visible = true
      this.floor2.visible = true
      this.wall.visible = true
      this.cssobjgroup.forEach(v => v.visible = true)

      gsap.to(this.wall.position,{
        y:200,
        duration:1,
        delay:1
      })

      gsap.to(this.floor2.position,{
        y:100,
        duration:1,
        delay:2
      })
    })

    this.fighterPointsGroup = null
    eventBus.on('creatFightPoint',()=>{
      if(!this.fighterPointsGroup){
        //点粒子飞机
        this.fighterPointsGroup = this.transformPoints(this.Fighter);
        
        scene.add(this.fighterPointsGroup)
      }
    })

    eventBus.on('pointsBoom',()=>{
      this.pointsBoom()
    })

    eventBus.on('pointsBack',()=>{
      this.pointsBack()
    })
  }
  transformPoints(object3d){
    const group = new THREE.Group()
    this.createPoints(object3d, group)
    return group
  }
  createPoints(object3d, group){
    let texture = new THREE.TextureLoader().load('texture/1.png')
    if(object3d.children.length>0){
      //递归
      object3d.children.forEach(child=>{
      // object3d.traverse(child=>{
        if(child.isMesh){
          const color = new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
          );
          const points = child.geometry.attributes.position.array
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );
          const material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms:{
              uColor: {value: color},
              uTexture: {value: texture},
              uTime: {value: 0},
            },
            blending: THREE.AdditiveBlending, //叠加
            transparent: true,
            depthTest: false,//深度检测
          })
          // const material = new THREE.PointsMaterial( { 
          //   color: 0xffffff ,
          //   size: 0.1,
          //   map: texture,
          //   blending: THREE.AdditiveBlending, //叠加
          //   transparent: true,
          //   depthTest: false,//深度检测
          // } );
          const pointMesh = new THREE.Points( geometry, material );
          pointMesh.position.copy(child.position);
          pointMesh.position.y
          pointMesh.rotation.copy(child.rotation);
          pointMesh.scale.copy(child.scale);
          group.add(pointMesh)
          
          this.createPoints(child, pointMesh)
        }
      })
    }
  }

  pointsBoom(){
    this.fighterPointsGroup.traverse(child=>{
      if(child.isPoints){
        const count = child.geometry.attributes.position.count
        let pointArray = new Float32Array(count*3)
        for (let i = 0; i < count; i++) {
          pointArray[3*i+0] = (Math.random()*4 - 2)*10;
          pointArray[3*i+1] = (Math.random()*4 - 2)*10;
          pointArray[3*i+2] = (Math.random()*4 - 2)*10;
        }
        child.geometry.setAttribute('newPosition',new THREE.BufferAttribute(pointArray, 3))

        gsap.to(child.material.uniforms.uTime,{
          value:10,
          duration:10,
        })
      }
    })
  }

  pointsBack(){
    this.fighterPointsGroup.traverse(child=>{
      if(child.isPoints){
        gsap.to(child.material.uniforms.uTime,{
          value:0,
          duration:10,
        })
      }
    })
  }
}
