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
    // 列表页测试1
    { path: '/test-table-1', component: () => import('./views/table/TestTable1.vue') },
    { path: '/test-form-1', component: () => import('./views/form/TestForm1.vue') },
    { path: '/test-select-row', component: () => import('./views/table/TestSelectRow.vue') },



    {
      path: '',
      name: 'home',
      component: () => import('./views/Index.vue'),
      children: [
        { path: '/index', component: () => import('./views/dashboard/Dashboard.vue') },
        { path: '/index/table', component: () => import('./views/table/Table.vue') },
        { path: '/index/test-table-1', component: () => import('./views/table/TestTable1.vue') },
        { path: '/index/test-select-row', component: () => import('./views/table/TestSelectRow.vue') },


      ]
    },
    

  ]
})

export default router
