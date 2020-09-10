var productionDir = process.env.VUE_APP_PRODUCTION_DIR || '/'
var baseUrl = process.env.VUE_APP_BASEURL || '/'
var proxyUrl = process.env.VUE_APP_PROXYURL || false


// vue.config.js
module.exports = {
    // lintOnSave: process.env.NODE_ENV !== 'production'
    lintOnSave: false,
    publicPath: './',
    //部署在zoolife目录下
    devServer: {
        proxy: (!proxyUrl) ? {} : {
            //静态文件目录代理
            [productionDir + 'static/']: {
                target: '/static/'
            },
            //代理api地址
            [baseUrl]: {
                target: proxyUrl,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    // '^/zoolifeapi': ''
                    ['^' + baseUrl]: '/'
                }
            },
        },
        overlay: {
            warnings: true,
            errors: false
        }
    },
    // //需要编译转换的插件
    // transpileDependencies: [
    //     "mulo-tools",
    //     "mulo-validate",
    //     "qs",
    //     "zoo-common"
    // ]

    // # 全局载入sass
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: ['./src/assets/css/global.scss']
                })
                .end()
        })
    }
}