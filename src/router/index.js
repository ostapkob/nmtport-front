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
    path: '/krans',
    name: 'Krans',
    component: () => import('../views/Krans.vue')
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
  {
    path: '/loginRegistr',
    name: 'LoginRegistr',
    component: () => import('../views/LoginRegistr.vue')
  },
  { path: "*",
    component: () => import('../views/NotFound.vue')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


router.beforeEach((to, from, next) => {
  const publicPages = ['/LoginRegistr' ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/LoginRegistr');
  } else {
    next();
  }
});

