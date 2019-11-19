import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/index',
      name: 'home',
      component: () => import('./views/Index.vue'),
      children: [
        { path: '', component: () => import('./views/dashboard/Dashboard.vue') }
      ]
    },
  ]
})

export default router
