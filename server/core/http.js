const axios = require('axios')
const appConfig = require('../config/app')

const instance = axios.create({
    baseURL: appConfig.baseURL,
    timeout: 10000,
    headers: {},
});



//访问拦截器  添加用户认证领令牌
instance.interceptors.request.use(function (config) {

    //数据修改为fromdata模式提交



    //请求附带用户认证令牌
   
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response.data);
    //TODO 判断登录状态
    if (response.data && response.data.code) {

    }
    return response.data;

}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

module.exports = instance;