/**
 ************************************************************
 * project input具体事务处理
 * author XinLiang
 * Mail 939898101@qq.com
 * ver version 1.0
 * time 2014-02-26
 * company : tianji
 * Copyright : BSD License
 ************************************************************
 */

define(function(){

    //用户模型
    var InputModel = function(){
    }

    //绑定验证
    InputModel.prototype.bindVerify = function(member){
        var l = member.length,
            self = this,
            i = 0,
            m = null,
            tArr = [],//所有验证类型
            t = "",//验证类型
            msgArr = [],//所有错误信息
            msg = "";//错误信息
            s = null,
            v = "",
            ver = false,
            p = "",
            _this = null,//响应事件的对象
            a = "",//是否存在data-ajaxUrl,与服务端匹配数据
            mEvent = ""
            ;
        for(; i < l ; i++){

            m = typeof member == "object" ? member.eq(i) : member[i] ,//获取成员

                m.attr("data-verify", "false");
                mEvent = m.attr("data-event") || "blur";

            m.bind(mEvent, function(event) {

                s = $($(this).attr("data-target"));

                p = $(this).attr("placeholder");

                v = $.trim($(this).val());

                ver = true;
                /*
                * 过滤验证
                * */
                tArr = $(this).attr("data-type").split(",");
                msgArr = $(this).attr("data-msg") || "填写错误";
                msgArr = msgArr.split(",");
                for(var ii in tArr){
                    if(!self.verify(v, tArr[ii])){
                        ver = false;
                        s.html(msgArr[ii]);
                        break;
                    }
                }
                a = $(this).attr("data-ajaxUrl");

                if(a){
                    _this = $(this);
                    $.ajax({
                        type: "post",
                        url: "/ce/ajax/webapp_accounts_login",
                        data: {
                            "account[email]": loginPhoneEmailVal,
                            "account[password]":passwordVal
                        },
                        dataType : "json",
                        error:function(jqXHR, textStatus, errorThrown){

                        },
                        beforeSend:function(XMLHttpRequest){
                            $.mobile.loadingMessage = true;
                            $.mobile.showPageLoadingMsg("a", "账号验证中···");
                        },
                        success: function(result){
                            $.mobile.hidePageLoadingMsg();
                            if(result.status == "ok")
                            {
                                //账号存在，不通过
                                s.html(_this.attr("data-ajaxMsg"));
                                s.show(200);
                                $(_this).attr("data-verify", "false");
                            }else{
                                //账号不存在，通过
                                s.hide(200);
                                $(_this).attr("data-verify", "true");
                            }
                        }
                    });
                }else{
                    if(!ver && v != p){
                        s.show();
                        $(this).attr("data-verify", "false");
                    }else{
                        s.hide();
                        $(this).attr("data-verify", "true");
                    }
                }

            });
        }

        return this;

    }



    //验证是否符合规则
    InputModel.prototype.verify = function(value, auType){
        var _bFail = false;
        switch (auType){
            case 'notnull':
                if(value !== ''){
                    _bFail = true;
                }
                break;
            case 'email_mobile':
                var emailReg = /^\s*[a-zA-Z0-9]+(([\._\-]?)[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/;
                var phoneReg = /^1[012345678]\d{9}$/;
                _bFail = ((emailReg.test(value)) || phoneReg.test(value));
                break;
            case 'email':
                var emailReg = /^\s*[a-zA-Z0-9]+(([\._\-]?)[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/;
                _bFail = emailReg.test(value);
                break;
            case 'mobile':
                var phoneReg = /^1[012345678]\d{9}$/;
                _bFail = phoneReg.test(value);
                break;
            case 'phoneCode':
                var phoneReg = /^\d{4}$/;
                _bFail = phoneReg.test(value);
                break;
            case 'password':
                var passwordReg = /^.{6,16}$/;
                _bFail = passwordReg.test(value);
                break;
            case 'chinese':
                var chineseReg = /^\s*([\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*|[a-zA-Z]{2,20}(\s+[a-zA-Z]{2,20})+)\s*$/;
                _bFail = (chineseReg.test(value) && /^\s*([\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*|[a-zA-Z][\sa-zA-Z]{3,63})\s*$/.test(value) );
        }
        return  _bFail;
    }

    //限制字符
    InputModel.prototype.limitCharacter = function(member){
         member && member.each(function(){
             $(this).on("keyup", function(){
                 var str = $(this).val(),
                     l = $(this).attr("data-limitCharacter");
                 if(str.length > l){
                     $(this).val(str.substr(0,l));
                 }

             });
         });
    }

    return InputModel;
});