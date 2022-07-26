import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
// import camera from '@/three/camera'
import CameraModule from "@/three/camera";
import renderer from '@/three/renderer'
import eventBus from '@/utils/eventBus'


// let controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
// // 设置控制器阻尼
// controls.enableDamping = true;
// // 设置自动旋转
// // controls.autoRotate = true;
// controls.maxPolarAngle = Math.PI / 2;
// controls.minPolarAngle = 0;

class ControlModule{
  constructor(){
    this.setFlyControls()//默认轨道控制器

    eventBus.on('toggleControl',name=>{
      this[`set${name}`]()
    })
  }
  setOrbitControls(){
    this.controls = new OrbitControls(CameraModule.activeCamera,renderer.domElement);//创建控件对象
    // 设置控制器阻尼
    this.controls.enableDamping = true;
    // 设置自动旋转
    // controls.autoRotate = true;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = 0;
  }
  setFlyControls(){
    this.controls = new FlyControls(CameraModule.activeCamera,renderer.domElement);//创建控件对象
    this.controls.autoForward = true;
    
    this.controls.movementSpeed = 100;
    this.controls.rollSpeed = Math.PI / 60;
  }
  setFirstPersonControls(){
    this.controls = new FirstPersonControls(CameraModule.activeCamera,renderer.domElement);//创建控件对象
    this.controls.movementSpeed = 100;
    this.controls.rollSpeed = Math.PI / 60;
  }
}

const controlModule = new ControlModule()
export default controlModule