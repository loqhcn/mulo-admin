
export default {
    //认证令牌名称
    authTokenName: 'x-auth-token',
    authTokenLocalName: 'admin_auth_token',
    //接口地址
    baseUrl: process.env.VUE_APP_BASEURL || 'http://192.168.1.253/',
    //微信认证 回调地址
    wechatCallbackUrl: process.env.VUE_APP_WECHAT_CALLBACK || 'http://192.168.1.253:8080/wechat_auth',
}
