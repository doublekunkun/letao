//防止全局变量污染  等待dom渲染完成 再执行
$(function(){

//  1.进行表单效验
//      用户名不能为空,密码不能为空
  $("#form").bootstrapValidator({
  //  配置图标
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },


    //  对字段进行效验
    fields: {
      username: {
        //效验的规则
        validators: {
          //非空效验
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名的长度必须是2-6位"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },

      password: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度为6-12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });



  //  2.进行登录请求
  //  通过ajax进行登录请求
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type: "post",
      url:  "/employee/employeeLogin",
      dataType: "json",
      data: $('#form').serialize(),
      success:  function(info){
          console.log(info);
        if(info.success){
          location.href = "index.html"
        }
        if(info.error === 1000){
          $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback")
        }
        if(info.error === 1001){
          $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback")
        }
      }

    })
  })

//  3.重置功能实现
  $('[type="reset"]').click(function(){
    $('#form').data("bootstrapValidator").resetForm(true);
  })


});