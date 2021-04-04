$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // nickname: [
        //     /^[\S]{1,6}$/, '密码必须1到6位，且不能出现空格'
        // ]
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1到6位'
            }
        }
    })

    // 初始化用户的基本信息
    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('未能获取用户的基本信息')
                }
                // console.log(res.data);
                // console.log(res);
                // 调用form.val()为表单快速赋值
                form.val('formUserInfo', res.data)


            }
        })
    }



    // 为重置按钮绑定点击事件
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
            // 初始化用户的基本信息
        initUserInfo()

    })

    // 监听表单的修改提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
            // 发起ajax数据请求
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                // 调用父页面的方法，重新渲染用户的信息
                window.parent.getUserInfo()
            }
        })
    })


})