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
//mulo-admin
import muloAdmin from '../package/index.js'
Vue.use(muloAdmin);

import formCrate from '../package/src/form-create/index'
Vue.use(formCrate);

import CheckBoxGroup1 from '../package/components/checkbox-group/CheckBoxGroup.vue'
Vue.component('mulo-checkbox-group', CheckBoxGroup1)

console.log(muloAdmin)

//eleme

import eleme from 'element-ui'
Vue.use(eleme)

//网络
// import http from './core/http'
// Vue.prototype.$http = http;
// window.$http = http;

import SocketIO from "socket.io-client"
const socket = SocketIO('http://127.0.0.1:3000', {
  path: "/ws",
  autoConnect: true
})

//通过可视化编辑的页面
Vue.prototype.$views = {}
//链接
Vue.prototype.$socket = socket;



new Vue({
  store,
  router,
  mounted() {
    socket.on('view', (res) => {
      console.log('view', res)
      let {
        viewId, data
      } = res
      this.$views[viewId] = data;

    })
  },
  render: h => h(App)
}).$mount('#app')
