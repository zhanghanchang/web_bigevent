/* 注意：
每次调用$.get()或$.post()或$.ajax()的时候，
会先调用ajaxPrefilter这个函数
在这个函数里，可以拿到我们给ajax提供的配置对象 */

$.ajaxPrefilter(function(options) {
    // console.log(option.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // console.log(res);
        // 在complete回调函数中 ，可以使用res.responseJSON
        // 拿到服务器想赢回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制退出，需要做两件事：第一，清除本地存储
            localStorage.removeItem('token')
                // 第二，退回登录界面
            location.href = '/login.html'
        }

    }
})