import fromCreate from './component/FormCreate'

//安装方法
const install = function (Vue) {

    Vue.component(fromCreate.name, fromCreate)
}

/* 浏览器上引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '1.12.0',
    install,
};
