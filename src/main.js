import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router.js'

Vue.config.productionTip = false

// mulo-ui
import './../../mulo-ui/packpage/theme_default/src/index.scss'

import MuloUiPc from './../../mulo-ui/packpage/vuepc'
Vue.use(MuloUiPc);

//图标
import './assets/iconfont-mulo-ui/iconfont.css'


//网络
import http from './core/http'
Vue.prototype.$http = http;
window.$http = http;


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
