$(function() {

    var form = layui.form

    // 表单验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        samePwd: function(value) {
            if (value === $('input[name="oldPwd"]').val()) {
                return '新密码与原密码不能一样！'
            }
        },

        rePwd: function(value) {
            if (value !== $('input[name="newPwd"]').val()) {
                return '新密码与确认新密码必须一样！'
            }
        },


    })

    // 为表单绑定提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改密码失败！')
                }
                layui.layer.msg('修改密码成功！')
                $('.layui-form')[0].reset()
            }

        })

    })























})