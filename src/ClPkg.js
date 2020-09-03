
//加载页面所需要的组件包
let routers = require.context('./component-package/', true, /src\/[A-z0-9-_]+\.vue/)

let clPkgs = {}

routers.keys().forEach(key => {

    //解析组件(应用名 + 组件)
    let appMathch = key.match(/\.\/(.+)\/src\/([A-z0-9-_]+)\.vue/);
    //
    if (!appMathch) {
        console.log(key + '文件存在不符合规范');
        return;
    }
    console.log(appMathch);
    let appDirName = appMathch[1];
    let appName = appDirName.charAt(0).toUpperCase() + appDirName.slice(1)
    let componentName = appMathch[2];

    //加载编辑器(编辑组件的属性 同名的组件)
    let editor = null;
    try {
        editor = require(`./component-package/${appDirName}/editor/${componentName}.vue`).default;
    } catch (error) {

    }



    //根组件App.vue
    let appConfig = null;
    try {
        appConfig = require(`./component-package/${appDirName}/config.js`).default;
    } catch (err) {
        console.log('load config error', err);

    }
    if (!appConfig) {
        appConfig = {
            title: appName,
        }
    }

    // 初始化模块
    if (!clPkgs[appName]) {
        clPkgs[appName] = {
            name: appName,
            config: appConfig,
            components: {

            },
            editor: {

            },
        }
    }

    // 组件加载
    let component = routers(key).default;
    clPkgs[appName].components[
        `${appName}${componentName}`
    ] = component;

    if (editor) {
        clPkgs[appName].editor[
            `${appName}${componentName}`
        ] = editor
    }

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
        console.log('clPkgs', clPkgs);
        for (let x in clPkgs) {
            //安装
            Vue.use(clPkgs[x]);
        }
    },
    packages: clPkgs,
}
export {
    clPkgs
}