import ListDefault from './src/list/Default.vue'
import FormDefault from './src/form/Default.vue'
import FormRow from './src/form/Row.vue'
import SelectRows from './src/list/SelectRows.vue'
import ListSort from './src/list/Sort.vue'


//axios
import axios from './../util/http';


// 弹出层函数
import { MessageBox, Notification, Message, Loading } from 'element-ui';

// 注册组件
function regComponent(Vue, component) {
    console.log('mulo-' + component.name);
    Vue.component('mulo-' + component.name, component)
}

//安装方法
const install = function (Vue) {
    //内部组件http
    Vue.prototype.$http = axios;
    //组件注册 带前缀
    regComponent(Vue, ListDefault);
    regComponent(Vue, FormDefault);
    regComponent(Vue, FormRow);
    regComponent(Vue, SelectRows);
    regComponent(Vue, ListSort);
    
    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;

    //基础弹出层
    Vue.prototype.$toast = (msg) => {
        Message(msg);
    };

}

/* 浏览器上引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
    //全局的ajax
    window.$http = window.Vue.prototype.$http;

}

export default {
    version: '1.12.0',
    install,
};
