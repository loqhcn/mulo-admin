var path = require('path');
var fs = require('fs');

// karma.conf.js

//config
let config = {
    alias: {
        src: path.resolve(__dirname, './src'),
    }
}

// webpack.config
var webpackConfig = {
    // ...
    externals: [],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: Object.assign(config.alias, {
            'vue$': 'vue/dist/vue.common.js'
        }),
        modules: ['node_modules']
    },
}

module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],

        files: ['tests/unit/*.spec.js'],

        // web server port
        port: 9876,
        // enable / disable watching file and executing tests whenever any file changes
        // 监听测试文件改变后立即执行测试
        autoWatch: true,

        // enable / disable colors in the output (reporters and logs)
        colors: true,
        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        reporters: ['spec'],

        browsers: ['Chrome']
    })
}