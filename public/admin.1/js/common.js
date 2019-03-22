// 公共的页面效果

// 1:登录.或加载新页面.页面top的地方.有进度条.

// 什么时候开始 什么时候结束
// 当ajax请求请求开始的时候,显示进度条
// 当ajax请求结束的时候,隐藏进度条
// jquery.ajax的全局事件
// jquery的ajax全局事件  会   在任意一个ajax请求请求执行的时候触发

// jquery的ajax 6个全局事件
// ajaxStart : 开始进度条
// ajaxsend:  发送中
// ajaxSuccess:  成功师触发
// ajaxError:   失败时触发
// ajaxComplete:   成功
// ajaxStop : 结束进度条

//  NProgress .start （） - 显示进度条

//  NProgress .set（0.4） - 设置百分比

//  NProgress .inc（） - 稍微增加

//  NProgress .done（） - 完成进度

// ajax开始的时候显示精度条
$(document).ajaxStart(function(){
    // console.log('ajax开始发送了')
    NProgress.start()
})

// ajax结束时候结束进度条
$(document).ajaxStop(function(){
    // console.log("ajax结束发送")
    // 因为是本地,速度就快.我们可以加个定时器.
    setInterval(function(){
        NProgress.done()
    },2000)
    
})



// 二级菜单的显示和隐藏

$('.success').prev().on('click',function(){
    // console.log('哈哈');
    $(this).next().stop().slideToggle()
})

// 菜单的显示和隐藏
$('.top .left').on('click',function(){
    $('.lt_aside,.lt_main,.top').toggleClass('now')
})



// 退出功能的展示
$('.top .right').on('click',function(){
    $('#logoutModal').modal('show')
})

// 给确认按钮注册事件, 注意:不要在事件中注册事件
$('.confirm').on('click',function(){
    // 发送ajax请求.告诉服务器需要退出
    // $.ajax({
    //     type:'get',
    //     url:'/employee/employeeLogout',
    //     success:function(info){
    //         if(info.success){
    //             location.href = 'login.html'
    //         }
    //     }
    // })

    


    // 参数1:直接就是url地址
    // 参数2:可选的data
    // 参数3:succes的回调
    $.get('/employee/employeeLogout',function(info){
        if(info.success){
            location.href = 'login.html'
        }

    })
})



