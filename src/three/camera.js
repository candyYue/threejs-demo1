import * as THREE from 'three';
import eventBus from '@/utils/eventBus'
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,10000)
camera.position.set(-1000,1000,1000)
camera.lookAt(0,0,0)
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix();

// export default camera

class cModule{
  constructor(){
    this.activeCamera = camera
    this.cameraCollect = {
      default:camera
    }

    eventBus.on('toggleCamera',(name)=>{
      this.setActiveCamera(name)
    })
  }
  addCamera(name,camera){
    this.cameraCollect[name] = camera
  }
  setActiveCamera(name){
    this.activeCamera = this.cameraCollect[name]
  }
}

const CameraModule = new cModule()
export default CameraModule