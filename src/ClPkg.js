//加载组件包


//加载页面所需要的组件包

let routers = require.context('./component-package/', true, /[A-z0-9-_]+\.vue/)

let clPkgs = {

}

routers.keys().forEach(key => {

    let appMathch = key.match(/\.\/(.+)\/([A-z0-9-_]+)\.vue/);
    //
    if (!appMathch) {
        console.log(key + '文件存在不符合规范');
        return;
    }
    console.log(appMathch);
    let appName = appMathch[1];
    appName = appName.charAt(0).toUpperCase() + appName.slice(1)

    let componentName = appMathch[2];

    if (!clPkgs[appName]) {
        // 初始化模块
        clPkgs[appName] = {
            name: appName,
            config: {
                title: '默认模块',
            },
            components: {

            }
        }
    }

    let component = routers(key).default;

    clPkgs[appName].components[
        `${appName}${componentName}`
    ] = component;

});

console.log(clPkgs);

for (let x in clPkgs) {
    //安装
    clPkgs[x].install = (Vue) => {

        for (let cname in clPkgs[x].components) {
            Vue.component(cname, clPkgs[x].components[cname]);
        }

    }
}

export default {
    //注册所有组件包
    install(Vue) {
        for (let x in clPkgs) {
            //安装
            Vue.use(clPkgs[x]);
        }
    }
}

export {
    clPkgs
}