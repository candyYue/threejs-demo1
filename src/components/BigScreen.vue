<template>
    <div class="big-screen">
        <p class="big-screen-header">{{props.title}}</p>
        <div class="big-screen-content big-screen-content-left">
          <!-- <div class="big-screen-item" v-for="(item,key,index) in datainfo" :key="index">
            {{item.name}}
            <br><img src="../assets/bar.svg" alt="">
            {{toFixInt(item.number)}}
            {{item.unit}}
          </div> -->
        </div>

        <ul class="big-screen-content big-screen-content-right">
          <li class="big-screen-item" v-for="(item,index) in props.eventList" :key="index"
          @click="changeEvent(item,index)">
          {{item.name}}
          </li>

          切换摄像机
          <button @click="toggleCamera('default')">默认</button>
          <button @click="toggleCamera('carcamera_Orientation')">小汽车后视角</button>
          <button @click="toggleCamera('rightcamera_Orientation')">小汽车侧视角</button>
          <br>
          <br>
          切换观览模式
          <button @click="toggleControl('OrbitControls')">轨道观览</button>
          <button @click="toggleControl('FlyControls')">飞行观览</button>
          <button @click="toggleControl('FirstPersonControls')">第一人称观览</button>


          <button @click="focusGirl">focusGirl</button>
        </ul>
    </div>
</template>
  
<script setup>
import {onMounted, reactive, ref} from 'vue';
import {getCityInfo, getEventList} from '@/request/api';
import gsap from 'gsap'
import eventBus from '@/utils/eventBus'

 const props = defineProps(['title','eventList'])

 const datainfo = reactive({
  event: { number:0 },
  iot: { number:0 },
  power: { number:0 },
  test: { number:0 },
 })
 onMounted(()=>{
  // getInfo()
 })
 const toFixInt = (num)=>{
  return num.toFixed(0)
 }
 const getInfo = async ()=>{
  let res = await getCityInfo()
  for (const key in res.data.data) {
    datainfo[key].name = res.data.data[key].name
    datainfo[key].unit = res.data.data[key].unit
    gsap.to(datainfo[key],{
      number: res.data.data[key].number,
      duration:1,
    })
  }
 }

 const changeEvent = (item,index)=>{
    eventBus.emit('changeEvent', {item,index})
 }

 const toggleCamera = (name)=>{
  eventBus.emit('toggleCamera', name)
 }

 const toggleControl = (name)=>{
  eventBus.emit('toggleControl', name)
 }

 const focusGirl = (name)=>{
  eventBus.emit('focusDance')
 }


eventBus.on('spriteClick',data=>{
  console.log(data)
})

</script>
  
<style lang="less">
  .big-screen{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 100;
    
    left: 0;
    top: 0;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    &-header{
      text-align: center;
      color: #ffffff;
    }
    .big-screen-content-left .big-screen-item{
      width: 300px;
      height: 150px;
      border: 1px solid #ffff00;
      border-radius: 5px;
      margin-bottom: 20px;
      color: #ffffff;
      img{
        width: 40px;
        vertical-align: middle;
      }
    }
    .big-screen-content-right{
      pointer-events: auto;
      position: absolute;
      right: 0;
      .big-screen-item{
        margin: 20px;
        color: #ffffff;
        img{
          width: 40px;
          vertical-align: middle;
        }
      }
    }
  }
</style>