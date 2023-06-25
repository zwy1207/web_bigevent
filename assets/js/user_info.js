$(function () {
    let form = layui.form
    let layer = layui.layer

    form.varify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })

    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.mag('获取用户信息失败！')
                }
                console.log(res)
                // 调用 form.val()快速为表单域赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置按钮
    $('#formUserInfo').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.data !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        });
    })
})