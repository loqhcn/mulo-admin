import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router.js'

Vue.config.productionTip = false

// mulo-ui
// import './../../mulo-ui/packpage/theme_default/src/index.scss'
// import './../../mulo-ui/packpage/theme_default/src/vuepc.scss'
// import MuloUiPc from './../../mulo-ui/packpage/vuepc/index.js'
// console.log(MuloUiPc);
// Vue.use(MuloUiPc);
// //图标
// import './assets/iconfont-mulo-ui/iconfont.css'

import './../mulo-ui/default/index.scss'
import './views/component-layout/css/index.scss';
//mulo-admin
import muloAdmin from '../package/index.js'
Vue.use(muloAdmin);

import formCrate from '../package/src/form-create/index'
Vue.use(formCrate);

import CheckBoxGroup1 from '../package/components/checkbox-group/CheckBoxGroup.vue'
Vue.component('mulo-checkbox-group', CheckBoxGroup1)
//基于elementui的tree修改的
import Tree from './components/tree/index.js'
Vue.component('mulo-cl-tree', Tree)

console.log(muloAdmin)

//eleme

import eleme from 'element-ui'
Vue.use(eleme)

//网络
import http from './core/http'
Vue.prototype.$http = http;
window.$http = http;

// # 路由封装函数
class AppRoute {
  go(path, params) {
    params = params || {};
    router.push({ path: path, query: params }).catch(e => {
      console.log(e.message)
    })
  }

  replace(path, params) {
    params = params || {};
    router.replace({ path: path, query: params });
  }

  back() {
    if (window.history.length <= 1) {
      router.push({ path: '/member' })
      return false
    } else {
      router.back()
    }
  }
}
window.appRoute = Vue.prototype.appRoute = new AppRoute();




// # 可视化编辑页面
import SocketIO from "socket.io-client"
const socket = SocketIO('http://127.0.0.1:3000', {
  path: "/ws",
  autoConnect: true
})

import ClClient from './views/component-layout/core/ClChient.js'

//通过可视化编辑的页面
Vue.prototype.$views = {}
Vue.prototype.$cl = new ClClient();

import Control from './views/component-layout/core/Control'
Vue.prototype.$control = new Control();

//链接
Vue.prototype.$socket = socket;

//自动加载组件包
import clPkg from './ClPkg.js'
Vue.use(clPkg);
Vue.prototype.$clPackages = clPkg.packages;

window.vm = new Vue({
  store,
  router,
  mounted() {
    /**
     * 页面更新
     * @param {viewId} viewid
     * @param {ClView} data
     * 
     */
    socket.on('view', (res) => {
      console.log('view', res)
      let {
        viewId, data
      } = res
      this.$views[viewId] = data;
      this.$cl.triggerUpdated(viewId, data);
    })

    //页面初始化 加载历史编辑数据
    socket.on('view-init', (res) => {
      console.log('view-init')
      let views = res.views;
      for (let x in views) {
        this.$views[x] = views[x]
        this.$cl.triggerUpdated(x, views[x]);
      }
    })

    socket.emit('view-init', { a: 1 })

  },
  render: h => h(App)
}).$mount('#app')
