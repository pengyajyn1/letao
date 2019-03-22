// 表单校验的规则
// 1:用户名 必填 长度 3-9位
// 2:密码 必填   长度 6-13位


//使用表单校验插件
// bootstrapValidator 在表单提交的时候做校验
// 如果表单校验失败了,阻止表单的提交.提示信息
// 如果表单校验成功了,让表单继续提交
$("#form").bootstrapValidator({
    // //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible)'],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定需要校验的字段.对应表单中的name属性  
    fields: {
      //校验用户名的校验规则
      username: {
        // 校验的规则:
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 3,
            max: 9,
            message: '用户名长度必须在3到9之间'
          },
          callback:{
            message:'用户名错误'
          }
        }
      },
      // 密码验证的规则
      password: {
        // 校验的规则:
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback:{
            message:'密码错误'
          }
        }
      },
    }
  });


  // 给表单注册校验成功的事件
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    // console.log("哈哈")
    //使用ajax提交逻辑
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      success:function(info){
        // console.log(info)
        if(info.error === 1000){
          // alert('用户名错误'),

          // 调用updaStatus 把username 改成失败状态
          // 参数1:修改哪个字段
          // 参数2:修改的状态
          // 参数3:指定显示那个错误信息
          // 
          $("#form")
          .data('bootstrapValidator')
          .updateStatus('username','INVALID','callback')
          
        }
        if(info.error === 1001){
          // alert('密码或用户名错误')

          $("#form")
          .data('bootstrapValidator')
          .updateStatus('password','INVALID','callback')
        }
        if(info.success){
          // 登录成功
          location.href = 'index.html'
        }
      }

    })
});


// 表单重置
$(".reset").on('click', function(){
  // 调用表单的
  // console.log('哈哈')
  $("#form").data('bootstrapValidator').resetForm(true);
})



// 公共部分
