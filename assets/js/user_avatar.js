$(function () {
    // let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 1.为文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
        // console.log(e)
        let filelist = e.target.files
        if (filelist.length === 0) {
            return layui.layer.msg('请选择照片！')
        }
        // 2.获取用户选择的文件
        let file = e.target.files[0]
        // 3.转化路径
        let imgURL = URL.createObjectURL(file)
        // 4.重新初始化剪裁区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 点击确定上传头像
    $('#btnUpLoad').on('click', function () {
        // 1.拿到用户裁剪后的头像
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2.发送ajax请求 
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            dataType: "dataType",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('上传失败')
                }
                layui.layer.msg('上传成功')
                // 调用父页面的方法，重新渲染头像
                window.parent.getUserInfo()
            }

        })
    })
})
