$(function() {
    // 点击去‘去注册账号’界面
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击去‘去登录’界面
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 为表单自定义校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 确认注册输入的两次密码是否一致
        repwd: function(value) {
            var pwd = $('.reg-box input[name="password"]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    var layer = layui.layer
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form-reg input[name="username"]').val(),
                password: $('#form-reg input[name="password"]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
            }
        })
    })

    // 监听注册表单登录事件
    $('#form-login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // console.log(res.token);
                    // 将登录得到的res.token保存的localStorage
                localStorage.setItem('token', res.token)
                location.href = '/index.html'

            }
        })
    })



































})