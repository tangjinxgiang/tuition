$(function(){
    //交费明细
    //初始化默认选中  已支付用到
   $('.pay_list>li').each(function(index, el) {
      var init = 0;
      $(this).find('input').prop('checked','checked');
        $(this).find('input:checked').each(function(index, el) {
          var old = $(this).parent('.weui-cell__hd').prev('.weui-cell__bd').find('span').text();//获取金额列表
          $(this).parent('.weui-cell__hd').prev('.weui-cell__bd').find('span').text(old+'.001');//给金额列表加.00
          var a = parseInt($(this).parent('.weui-cell__hd').prev('.weui-cell__bd').find('span').text());

          init += a;
          // console.log(init)
          $(this).parents('.pay_list_con').prev().prev('.all').children('i').text(init+'.00元1');
          $(this).parents('.pay_list_con').next('span').children('i').text(init+'.00元1');
      });
   });
  //点击支付金额
  $('.pay_list_btn a:last-child').click(function(event) {//点击支付
    if(parseInt($(this).parent().prev('.total').children('i').text()) > 0){
      $(this).attr('href','push.html'); //跳转连接
    } else{
      // $.alert('同学请交费，如困难请转入助学贷款!');
    }
  });
  //点击显示项目列表
 $('.pay_list_left>span.detail').click(function(event) {//点击显示隐藏明细
   //如果隐藏判断箭头显示方位
    if( $(this).next('.pay_list_con').css('display') == 'none' || $(this).next('.sall_list').css('display') == 'none'){
       $(this).find('img').stop().addClass('tr90');//箭头旋转
    } else{
       $(this).find('img').stop().removeClass('tr90');//箭头回位
    }
    $(this).next('.sall_list').stop().slideToggle(300); //显示或隐藏
    $(this).next('.pay_list_con').stop().slideToggle(300); //显示或隐藏 旧的版本


  });
  //==============================104行修改好小数问题.toFixed(2)小数计算保持精度，同时保留两位数
  //修改金额
  $('.pay_list>li').each(function(index, el) {//循环不同订单
     var init = 0;//存价格变量
       $(this).find('input').each(function(index, el) {//循环当前订单里面的input
         var old = $(this).val();//存一下之前的金额
         var a = parseFloat($(this).val()); //获取当前金额
         init += a; //计算所有价格
         $(this).parents('.sall_list').next('span').children('i').text(init.toFixed(2)); //价格赋值到缴费总金额
         $(this).keyup(function(event) { //input失去焦点事件
           var all = 0; //存储所有价格变量
           $(this).next('p').children('i').addClass('weui-icon-success').removeClass('border');//修改了金额把未选择默认改为选中

           var  num = parseFloat($(this).val());//存储选中的金额
           if(!num){ //如果修改为0
             num = 0; //结果为0
             $(this).val(old)//input val值为改为0
              }
              if(num <= old){ //输入的值小于默认的缴费金额
                all += num; //计算价格
               $(this).parents('.sall_list').next('span').children('i').text(all.toFixed(2)+'元');//计算价格赋值到缴费合计
             } else{ //如果大于默认缴费金额
              $(this).removeClass('weui-icon-success').addClass('border');//取消选中状态
              // $.alert(`修改金额不能大于默认缴费金额${old}`);//提示

             }
           console.log(num)
           $(this).parents('.sall_list').children('li').find('i.weui-icon-success').each(function(index, el) {//循环选中的金额




               $(this).parent('p').prev('input').val(`${old}`)//将修改的val值改为默认缴费金额
           });

         });
     });
   });

  //=============================点击按钮

  $('.pay_list li').each(function(index, el) {//循环不同订单
      $(this).children('.pay_list_left').children('.sall_list').find('li').each(function(index, el) {
        var click_boole = true; //设置点击的一个变量 true为选中 false不选中
          $(this).children('p').click(function(event) { //点击小圆点
            var click_num = 0; //存储金额变量
            if(click_boole == true){//如果选中 点击为不选中
              $(this).children('i').removeClass('weui-icon-success').addClass('border'); //去掉选中样式
              var len = $(this).parent('li').parent('ul').find('i.weui-icon-success').length;//每次点击记录选中的长度
              if(len == 0){ //判断选中的个数 如果只有一个选中
                $.alert('缴费项目不能为空,请选择其他缴费项目');
                $(this).children('i').addClass('weui-icon-success').removeClass('border'); //不去掉选中样式
                return;
              } else{//如果不止一个选中走这里
                $(this).parent('li').parent('ul').find('i.weui-icon-success').each(function(index, el) { //循环所有选中的
                    click_num += parseFloat($(this).parent('p').prev('input').val()); //计算所有选中的价格
                    console.log('不选中'+click_num)
                    $(this).parents('.sall_list').next('.total').find('i').text(click_num.toFixed(2)+'元'); //计算的结果赋值
                });
              }
              click_boole = false; //把变量设为未选中
            } else{//如果不选中 点击为选中
              $(this).children('i').addClass('weui-icon-success').removeClass('border'); //添加选中样式
              $(this).parent('li').parent('ul').find('i.weui-icon-success').each(function(index, el) { //循环所有选中价格
                  click_num += parseFloat($(this).parent('p').prev('input').val()); //计算价格
                  console.log('选中'+click_num)
                  $(this).parents('.sall_list').next('.total').find('i').text(click_num.toFixed(2)+'元')//计算结果赋值
              });
              click_boole = true; //把变量设为选中
            }
          });
      });
  });
})
