$(function() {

    // 获取用户的基本信息
    getUserInfo()

    // 为退出绑定点击事件
    $('#btnLogOut').on('click', function() {
        // 提示用户确认是否退出
        var layer = layui.layer
        layer.confirm('确认退出登录?', {
            icon: 3,
            title: '提示'
        }, function(index) {
            //do something
            // 退出登录，需要做两件事：第一，清除本地存储
            localStorage.removeItem('token')
                // 第二，退回登录界面
            location.href = '/login.html'

            layer.close(index);
        });



    })



})



// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户头像函数
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用complete函数
        // complete: function(res) {
        //     // console.log(res);
        //     // 在complete回调函数中 ，可以使用res.responseJSON
        //     // 拿到服务器想赢回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 强制退出，需要做两件事：第一，清除本地存储
        //         localStorage.removeItem('token')
        //             // 第二，退回登录界面
        //         location.href = '/login.html'
        //     }

        // }
    })
}

// 渲染用户头像函数
function renderAvatar(user) {
    // 获取用户的昵称或姓名
    var name = user.nickname || user.username
        // 渲染用户昵称或姓名
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染头像图片
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').prop('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show();
    }
}