import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/json',
    name: 'Json',
    component: () => import('../views/json.vue')
  },
  {
    path: '/usm',
    name: 'Usm',
    component: () => import('../views/Usm.vue')
  },
  {
    path: '/krans',
    name: 'Krans',
    component: () => import('../views/Krans.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue')
  },
  {
    path: '/mapol',
    name: 'MapOl',
    component: () => import('../views/MapOl.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/archive',
    name: 'Archive',
    component: () => import('../views/Archive.vue')
  },
  { path: "*", 
    component: () => import('../views/NotFound.vue')
  },
]
const router = new VueRouter({
  routes
})

export default router
