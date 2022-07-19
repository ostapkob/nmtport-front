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
    path: '/usm',
    name: 'Usm',
    //beforeEnter: true,
    component: () => import('../views/Usm.vue')
  },
  {
    path: '/usm/:date/:shift',
    name: 'UsmDate',
    component: () => import('../views/UsmDate.vue')
  },
  {
    path: '/rfid/:type/:id',
    name: 'Rfid',
    component: () => import('../views/RfidWork.vue')
  },
  {
    path: '/krans',
    name: 'Krans',
    component: () => import('../views/Krans.vue')
  },
  {
    path: '/krans/:date/:shift',
    name: 'krans_date',
    component: () => import('../views/KransDate.vue')
  },
  {
    path: '/sennebogen',
    name: 'Sennebogen',
    component: () => import('../views/Sennebogen.vue')
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
    path: '/video',
    name: 'Video',
    component: () => import('../views/Video.vue')
  },
  {
    path: '/loginRegistr',
    name: 'LoginRegistr',
    component: () => import('../views/LoginRegistr.vue')
  },
  {
    path: "*",
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/bi',
    name: 'PowerBI',
    component: () => import('../views/PowerBI.vue')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


router.beforeEach((to, from, next) => {
  const publicPages = ['/LoginRegistr'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/LoginRegistr');
  } else {
    next();
  }
});

