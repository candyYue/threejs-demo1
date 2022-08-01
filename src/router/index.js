import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FlowerView from '../views/FlowerView.vue'
import FactoryView from '../views/FactoryView.vue'

const routes = [
  // {
  //   path: '*',
  //   redirect: () => {
  //     return {
  //       name: 'flower'
  //     }
  //   }
  // },
  {
    path: '/',
    name: 'firstpage',
    component: FactoryView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/flower',
    name: 'flower',
    component: FlowerView
  },
  {
    path: '/factory',
    name: 'factory',
    component: FactoryView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
