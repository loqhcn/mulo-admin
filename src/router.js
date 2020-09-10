import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import clApp from './views/component-layout/core/app'
Vue.use(VueRouter)

import DevIndex from './views/component-layout/dev/Index.vue'




/**
 * 配置可视化编辑组件
 * - viewId : relation a cl-view-edit view
 * - component : 组件名称
 * 
 */
let clComponents = {
  'index': {
    viewId: 1,
    component: DevIndex//() => import('./views/component-layout/dev/Index.vue')
  }
}
//处理组件
let components = clApp.parseComponent(clComponents);

const router = new VueRouter({
  mode: 'hash',
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
    { path: '/form-create/index', component: () => import('./views//form-create/Index.vue') },
    { path: '/form-create/edit-test', component: () => import('./views//form-create/EditTest.vue') },



    // 组件布局
    { path: '/component-layout/index', component: () => import('./views/component-layout/Index.vue') },
    { path: '/component-layout/project/detail', component: () => import('./views/component-layout/views/project/Detail.vue') },
    { path: '/component-layout/main', component: () => import('./views/component-layout/Main.vue') },
    { path: '/component-layout/test/compile', component: () => import('./views/component-layout/test/Compile.js') },
    { path: '/component-layout/dev/index', component: components.index },
    { path: '/component-layout/component-package/index', component: () => import('./views/component-layout/component-package/Index.vue') },


    // 其他测试页面

    { path: '/test/vnode', component: () => import('./views/test/vnode.js') },


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
