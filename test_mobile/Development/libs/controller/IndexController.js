/**
 ************************************************************
 * project 首页处理事务调度
 * author XinLiang
 * Mail 939898101@qq.com
 * ver version 1.0
 * time 2014-02-26
 * company : tianji
 * Copyright : BSD License
 ************************************************************
 */
requirejs.config({

    baseUrl: '/mobile_h5/Development/',

    paths: {
        "jquery":"core/jquery",
        "jqueryMobile":"core/jquery.mobile-1.4.1",
        "Input":"libs/model/InputModel",
        "Form":"libs/model/FormModel"
    }
});
require([
    "jquery",
    "jqueryMobile",
    "Input",
    "Form"
], function ($, jm, Input, Form){

    var IndexController = {};  //定义当前页面---控制器

    IndexController.init = function(){

        IndexController.initCss();

        IndexController.initEvent();
    }

    IndexController.initCss = function(){//初始化样式

    }

    IndexController.initEvent = function(){//初始化事件
          //注册
          new Form().init({
              "form":$("#resgeter"),
              "verify":$("#resgeter input[verify]"),
              "limitCharacter":$("#resgeter input[data-limitCharacter]"),
              "submit":$("#registerBtn")
          });
          //注册
          new Form().init({
              "form":$("#login"),
              "verify":$("#login input[verify]"),
              "limitCharacter":$("#login input[data-limitCharacter]"),
              "submit":$("#loginBtn")
          });

          //注册响应动画
          $(".addInformation").each(function(){
              $(this).bind("vclick", function(event) {
                  $(".addInformation").removeClass("clicked").addClass("unclicked");
                  $(this).addClass("clicked").removeClass("unclicked");
                  if($(this).html() == "注册"){
                      //注册动画
                      $("#login").hide();
                      $("#resgeter").show();
                  }else{
                      //登陆动画
                      $("#resgeter").hide();
                      $("#login").show();
                  }
                  //欢迎背景动画
                  $(".logo_sense").animate({height: '0%'}, "normal","swing",function(){

                  });
                  $(".register_form").show().animate({height: '100%'}, "normal","swing",function(){

                  });
              });
          });
        //返回欢迎页
        $(".backWelcome").each(function(){
            $(this).bind("vclick", function(event) {
                if($(this).html() == "注册"){
                    $(".addInformation").first().click();
                }else{
                    $(".addInformation").eq(1).click();
                }
                $.mobile.changePage("#welcome",{ transition: "slidedown" });
            });
        });
    }

    $(document).ready(function(){
        IndexController.init();//初始化
    });
    $(document).bind("mobileinit", function(){
        $.mobile.ajaxEnabled=false;
    });
});