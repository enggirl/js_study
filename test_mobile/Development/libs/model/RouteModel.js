/**
 ************************************************************
 * project 路由具体事务处理
 * author XinLiang
 * Mail 939898101@qq.com
 * ver version 1.0
 * time 2014-02-26
 * company : tianji
 * Copyright : BSD License
 ************************************************************
 */

define(function(){

    //路由模型
    var RouteModel = function(){
    }

    //路由跳转
    RouteModel.prototype.goUrl = function(m){
        m.each(function(){
            $(this).bind("vclick", function(){
                var transition = $(this).attr("route-transition");
                if(!transition || transition == "none"){
                    window.location.href = m.attr("route-target");
                }else{
                    $.mobile.changePage(m.attr("route-target"),{ transition: transition });
                }

            });
        });
    }

    return RouteModel;
});