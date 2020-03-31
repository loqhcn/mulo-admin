import ListDefault from './list/Default.vue'
import FormDefault from './form/Default.vue'
import FormRow from './form/Row.vue'


// 注册组件
function regComponent(Vue, component) {
    console.log('mulo-' + component.name);
    Vue.component('mulo-' + component.name, component)
}

//安装方法
const install = function (Vue) {
    regComponent(Vue, ListDefault);
    regComponent(Vue, FormDefault);
    regComponent(Vue, FormRow);
}

/* 浏览器上引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '1.12.0',
    install,
};
