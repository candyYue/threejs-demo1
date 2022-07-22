<template>
  <div class="home">
    <!-- <Scene :eventList="eventList"></Scene> -->
    <ParkScene></ParkScene>
    <BigScreen :title="title" :eventList="eventList"></BigScreen>
  </div>
</template>

<script setup>
// import Scene from '@/components/Scene.vue'
import BigScreen from '@/components/BigScreen.vue'
import ParkScene from '@/components/ParkScene.vue'
import { onMounted, ref } from 'vue'
import {getEventList} from '@/request/api';

const title = ref('标题')
const eventList = ref([])

onMounted(()=>{
  // getList()
  // setInterval(()=>{
  //   getList()
  // },10000)
  
})


const getList = async ()=>{
  let res = await getEventList()
  eventList.value = res.data.list
}
</script>
