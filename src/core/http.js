/* eslint-disable */
import axios from 'axios'
import router from './../router'

import apiConfig from './../config/api'

const instance = axios.create({
    baseURL: apiConfig.baseUrl,
    timeout: 10000,
    headers: {},
});


//访问拦截器  添加用户认证领令牌
instance.interceptors.request.use(function (config) {

    if (!config.params)
        config.params = {};
    var token = localStorage.getItem(apiConfig.authTokenLocalName);
    if (token) {
        config.headers[apiConfig.authTokenName] = `${token || ''}`;
    } else {
        console.log('无token');
    }

    //请求附带用户认证令牌
    // var TOKEN = localStorage.getItem(apiConfig.authTokenLocalName);
    // if (TOKEN) {
    //   config.headers[apiConfig.authTokenName] = `${TOKEN}`;
    // }

    return config;
}, function (error) {
    // Do something with request error
    console.log({ err: error })

});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    //TODO 判断登录状态
    if (response.data && response.data.code != 200) {
        if (response.data.code == 777 || response.data.code == 778) {
            console.log('未登录')
            router.push({
                path: '/login'
            })
        }
    }
    return response.data;

}, function (error) {
    // console.log({ err: error })
    if (error.code == 'ECONNABORTED') {
        router.app.$toast("网络请求超时")
    } else if (error.message == 'Network Error') {
        router.app.$toast("网络错误~ 请检查网络环境~")
    }
    return Promise.reject(error);
});

export default instance;
