$(function(){
    // 入口函数的好处
    // 1:防止全局污染
    // 2:等待dom开启

    var page = 1
    var pageSize = 5
    var id 
    var isDelete

    render()

    function render(){
               // 发送ajax请求
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data:{
            page:page,
            pageSize: pageSize
        },
        success:function(info){
            console.log(info)
            var html = template('user_tpl', info)
            $('tbody').html(html)
    
            // 分页的功能必须在ajax的数据请求回来之后,才能确定具体有多少页
            // 1:引入了分页的js文件
            // 2:准备了一个ul.给一个id
            // 3:初始化分页
            $('#paginator').bootstrapPaginator({
               
                bootstrapMajorVersion: 3,//bootstrap的版本要求。
                alignment:"right",
                // numberOfPages:5,//一页列出多少数据。
                currentPage: page,//当前的请求页面。
                totalPages: Math.ceil(info.total / info.size),//一共多少页。
                // size:"normal",//应该是页眉的大小。
                onPageClicked: function (event, originalEvent, type,newpage) {//如下的代码是将页眉显示的中文显示我们自定义的中文。
                    // switch (type) {
                    // case "first": return "首页";
                    // case "prev": return "上一页";
                    // case "next": return "下一页";
                    // case "last": return "末页";
                    // case "page": return page;
                    // }
                    page = newpage
                    console.log('haihai')

                    render()
                    

                
                }
            });

   
        }




    })


    }


    // 按钮点击事件(启用和禁用)

    // 1:给启用和禁用注册点击事件
    // 2:弹出模态框
    // 3:给确定注册点击事件
    // 4:发送ajax请求,启动获取禁用

    // 因为我们的数据是ajax请求.发送回来.所以要设置事件委托
    $('tbody').on('click','.btn',function(){
       $('#userModal').modal('show')
        // 获取用户的id
        id = $(this).parent().data('id')
        console.log(id)

        // 以及是启用还是禁用的
        isDelete = $(this).text() === '启用' ? 0 : 1
        console.log(isDelete)
        // isDelete = $(this).hasClass('btn-success')? 1 : 0

    })

    $('.userconfirm').on('click',function(){
        // console.log('我要启用 ')

        // 发送ajax请求
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(info){
                console.log(info);
                if(info.success){
                    // 关闭模态框
                    $('#userModal').modal('hide')
                    // 重新渲染
                    render()
                }

            }
        })
    })












  
})