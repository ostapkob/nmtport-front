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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/json',
    name: 'Json',
    component: () => import('../views/json.vue')
  },
  {
    path: '/krans',
    name: 'Krans',
    component: () => import('../views/krans.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/map.vue')
  },
  {
    path: '/map2',
    name: 'Map2',
    component: () => import('../views/map2.vue')
  },
  {
    path: '/map3',
    name: 'Map3',
    component: () => import('../views/map3.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
