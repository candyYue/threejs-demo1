import axios from "axios";

export const getCityInfo = ()=>{
  return axios.get('http://127.0.0.1:4523/m1/1225048-0-default/api/smartcity/info')
}

export const getEventList = ()=>{
  return axios.get('http://127.0.0.1:4523/m1/1225048-0-default/api/smartcity/list')
}