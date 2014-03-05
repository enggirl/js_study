/**
 ************************************************************
 * project 表单具体事务处理
 * author XinLiang
 * Mail 939898101@qq.com
 * ver version 1.0
 * time 2014-02-26
 * company : tianji
 * Copyright : BSD License
 ************************************************************
 */

define(["Input"],function(Input){

    //用户模型
    var FormModel = function(){
        var self = this;

        this.form = null,

        //表单初始化
        this.init = function(options){
            options = options || {};

            this.form = options.form || null;
            var i = new Input();
            //验证
            if(options.verify){
                i.bindVerify(options.verify);
            }

            //字符限制
            if(options.limitCharacter){
                i.limitCharacter(options.limitCharacter);
            }

            //提交
            if(options.submit){
                this.bindSubmit(options.submit);
            }



        }
    }

    //提交
    FormModel.prototype.bindSubmit = function(sBtn){
        var
            f = "",//被提交的表单

            sl = 0 //没有验证通过的个数
            ;

        sBtn.bind("vclick", function(){

            f = $($(this).attr("data-Form"));

            sl = f.children().find("input[data-verify='false']").length; //没有验证通过的个数

            if(sl == 0){
                f.submit();
            }
        });

    }

    return FormModel;
});