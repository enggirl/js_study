/**
 ************************************************************
 * project First处理事务调度
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
        "Route":"libs/model/RouteModel"
    }
});
require([
    "jquery",
    "jqueryMobile",
    "Input",
    "Route"
], function ($, jm, Input, Route){

    var FirstController = {};  //定义当前页面---控制器

    FirstController.init = function(){

        FirstController.initCss();

        FirstController.initEvent();
    }

    FirstController.initCss = function(){//初始化样式

    }

    FirstController.initEvent = function(){//初始化事件

        //页面跳转
        var r = new Route();
        r.goUrl($(".goUrl"));

    }

    $(document).ready(function(){
        FirstController.init();//初始化
    });
});