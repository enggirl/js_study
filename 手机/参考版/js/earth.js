$(function(){
	  var aSec = $(".sec");
	  var length = aSec.size();
	  var oW = parseInt($(window).width());
	  var oH = parseInt($(window).height());
	  var loading = $("#loading");
	  var loading_text = $("#loading_text");
	  var tag = false;
    var start = false;
	  var curFlg = true;
	  var iNow = 0;
	  var curWin = 0;
	  var t = null;
    var t1 = 30;
	  var time = 100;
    var starflg = false;
    var flgMatch = navigator.userAgent.match(/(iPhone|iPod|Android|ios|Windows Phone|BlackBerry|BB10; Touch)/i);
    var imgs = ["images/logo.png","images/first.png","images/two.png","images/three.png","images/text1.png","images/text2.png","images/text3.png","images/text4.png","images/text5.png","images/text6.png","images/text7.png","images/text11.png","images/text5.png","images/text12.png","images/textOther.png","images/text5.png","images/zuozi.png","images/xing1.png","images/xing2.png","images/xing3.png"];
	   
     $('body').animate({scrollTop:'0px'},'fast');
     //默认暂停
     $("#kj_audio")[0].pause();  
     if(!flgMatch)
     {
        $(".noloading").css({"display":"block"});
        loading.css({"display":"none"});
        alert("请选择适合设备浏览！");
        return false;
     }else{
        $(".noloading").css({"display":"none"});
     }

     //预加载
     for(var i=0;i<imgs.length;i++)
     {
         var imgpic = new Image;
         imgpic.onload = function()
         { 
              iNow++;
              loading_text.html(parseInt((iNow/imgs.length)*100)+"%");

              if(iNow===imgs.length)
              {  
                  loading.stop().animate({"opacity":0},'slow',function(){
                     $(this).css({"display":"none"});
                     hideLoading();
                  });
              }
         }
         imgpic.src = imgs[i];
     }
     
     //屏幕高度尺寸设置
     $(".wrap").height(length*oH);
     aSec.each(function(index,obj){
        var oH = $(window).height();
        $(obj).css({"height":oH});
     });
     
     //音乐控制
     $(".sMuisbtn").on('touchstart',function(event){
        if(event.currentTarget===$(this)[0])
        {
           tag = false;
        }
        if(starflg===true)
        { 
           $("#kj_audio")[0].pause(); 
           $(this).addClass("sMuisbtnStop");
           starflg = false;  
        }else{
           $("#kj_audio")[0].play();
           $(this).removeClass("sMuisbtnStop");
           starflg = true;
        }
        event.stopPropagation();
        event.preventDefault();
        return false;
     });     

     //链接跳转控制
     $(".weblink,.abtn").on('touchstart',function(event){
        if(event.currentTarget===$(this)[0])
        {
           tag = false;
        }
        $(".wrap").off('touchstart');
        event.stopPropagation();
     });
     

     //影藏loading
     function hideLoading()
     {
       var x;
       var y;
       var keyX;
       var keyY;
       
       //默认加载音乐
       $(".audios").css({"display":"block"});
       if(starflg===false)
       {
          $("#kj_audio")[0].play();
          starflg = true;
       }
       
       //动画  curWin当前屏幕
       function startMove(curWin,curFlg)
       {   
           if(curFlg===true)
           {
             restoreDefault();
             if(curWin===0)
             {
                  var logoDelay = $(".logo").attr("delay");
                  var addClassName = $(".logo").attr("addclass");   
                  setTimeout(function(){
                      $(".logo").addClass(addClassName);
                      $(".logo").css({"opacity":1});
                      setTimeout(function(){
                         tag = true; 
                         start = true;
                         curWin = 0;
                      },logoDelay);
                  },t1);
             }else if(curWin===1)
             {
                  var firstRenDelay = $(".first").attr("delay");
                  var firstRenAddClassName = $(".first").attr("addclass");
                  var twoRenDelay = $(".two").attr("delay");
                  var twoRenAddClassName = $(".two").attr("addclass");
                  var threeRenDelay = $(".three").attr("delay");
                  var threeRenAddClassName = $(".three").attr("addclass");
                  var text1Delay = $(".text1").attr("delay");
                  var text1AddClassName = $(".text1").attr("addclass");
                  var text2Delay = $(".text2").attr("delay");
                  var text2AddClassName = $(".text2").attr("addclass");  
                  setTimeout(function(){
                     $(".first").addClass(firstRenAddClassName);
                     $(".first").css({"opacity":1,"left":20});
                     setTimeout(function(){
                        $(".two").addClass(twoRenAddClassName);
                        $(".two").css({"opacity":1,"top":0});
                        setTimeout(function(){
                            $(".three").addClass(threeRenAddClassName);
                            $(".three").css({"opacity":1,"right":"15px"});
                            setTimeout(function(){
                                $(".text1").addClass(text1AddClassName);
                                $(".text1").css({"opacity":1});
                                $(".line1").stop().animate({"opacity":1},'fast');
                                $(".text2").addClass(text2AddClassName);
                                $(".text2").css({"opacity":1});
                            },threeRenDelay);
                        },twoRenDelay);
                     },firstRenDelay);
                     curWin=1
                  },t1);     
             }else if(curWin===2)
             {
                  var text3Delay = $(".text3").attr("delay");
                  var text3AddClassName = $(".text3").attr("addclass");
                  var text4Delay = $(".text4").attr("delay");
                  var text4AddClassName = $(".text4").attr("addclass");
                  var text4Delay01 = parseInt(text4Delay)+10;
                  var sflg = false;
                  var ik = 0;
                  var t2 = null;
                  setTimeout(function(){
                     $(".text3").addClass(text3AddClassName);
                     $(".text3").css({"opacity":1});
                     setTimeout(function(){
                        if(oW<424)
                        {
                           var tTop = 0.3;
                        }else if(oW>=424 && oW<720){
                           var tTop = 0.25;
                        }else if(oW>=720){
                           var tTop = 0.28;
                        }
                        $(".jieshao").stop().animate({"top":tTop*oH,"opacity":1},'fast',function(){
                            setTimeout(function(){
                               t2 = setInterval(function(){
                                   if(ik>=8)
                                   {
                                      clearInterval(t2);
                                      t2 = null;
                                      $(".jieshao").removeClass("jieShao01");
                                      $(".jieshao").removeClass("jieShao02");
                                      return;
                                   }
                                   ik++;
                                   if(sflg)
                                   { 
                                      $(".jieshao").removeClass("jieShao02");
                                      $(".jieshao").addClass("jieShao01");
                                      sflg = false;
                                   }else{
                                      $(".jieshao").removeClass("jieShao01");
                                      $(".jieshao").addClass("jieShao02");
                                      sflg = true;
                                   }
                               },30);
                            },30);
                        });
                        setTimeout(function(){
                           $(".text4").addClass(text4AddClassName);
                           setTimeout(function(){
                              $(".text4").addClass("text4ToLeft1");
                           },text4Delay01);
                        },300);
                     },text3Delay);
                     curWin=2;
                  },t1);
             }else if(curWin===3)
             {
                  var firstManDelay = $(".caopin li:eq(0)").attr("delay");
                  var firstManAddClassName = $(".caopin li:eq(0)").attr("addclass");
                  var text5Delay = $(".text5").attr("delay");
                  var text5Delay01 = parseInt(text5Delay)+10;
                  var text5AddClassName = $(".text5").attr("addclass");
                  setTimeout(function(){
                     $(".caopin li:eq(0)").addClass(firstManAddClassName);
                     $(".caopin li:eq(0)").css({"opacity":1});
                     setTimeout(function(){
                        $(".caopin li:eq(1)").addClass(firstManAddClassName);
                        $(".caopin li:eq(1)").css({"opacity":1});
                        setTimeout(function(){
                          $(".caopin li:eq(2)").addClass(firstManAddClassName);
                          $(".caopin li:eq(2)").css({"opacity":1});
                          setTimeout(function(){
                              $(".text5").addClass(text5AddClassName);
                              setTimeout(function(){
                                 $(".text5").addClass("text4ToLeft1");
                              },text5Delay01);
                          },parseInt(firstManDelay));
                        },parseInt(firstManDelay)+100);
                     },parseInt(firstManDelay)+100);
                     curWin = 3;
                  },t1);
             }else if(curWin===4)
             {
                  var jzDelay = $(".jz").attr("delay");
                  var jzAddClassName = $(".jz").attr("addclass");
                  var jzDelay1 = parseInt(jzDelay)+100;
                  var hxingDelay = $(".hxing span:eq(0)").attr("delay");
                  var hxingAddClassName = $(".hxing span:eq(0)").attr("addclass");
                  var text8Delay = $(".text8").attr("delay");
                  var text8Delay1 = parseInt(text8Delay)+10;
                  var text8AddClassName = $(".text8").attr("addclass");
                  setTimeout(function(){
                     $(".jz").addClass(jzAddClassName);
                     setTimeout(function(){
                         $(".hxing span:eq(0)").addClass(hxingAddClassName);
                         setTimeout(function(){
                            $(".hxing span:eq(1)").addClass(hxingAddClassName);
                            setTimeout(function(){
                               $(".hxing span:eq(2)").addClass(hxingAddClassName);
                               setTimeout(function(){
                                  $(".text8").addClass(text8AddClassName);
                                  setTimeout(function(){
                                      $(".text8").addClass("text8ToLeft1");
                                  },text8Delay1);
                               },hxingDelay)
                            },hxingDelay);
                         },hxingDelay)
                     },jzDelay1);
                     curWin=4;
                  },t1);
             }else if(curWin===5)
             {
                var listOneDelay = $(".ulist li:eq(0)").attr("delay");
                var listOneDelay1 = parseInt(listOneDelay)+10;
                var listOneAddClassName = $(".ulist li:eq(0)").attr("addclass");
                var scrollDelay = $(".scrollRen").attr("delay");
                var scrollAddClassName = $(".scrollRen").attr("addclass");
                setTimeout(function(){
                    $(".ulist li:eq(0)").addClass(listOneAddClassName);
                    $(".ulist li:eq(0)").css({"opacity":1});
                    setTimeout(function(){
                         $(".ulist li:eq(1)").addClass(listOneAddClassName);
                         $(".ulist li:eq(1)").css({"opacity":1});
                         setTimeout(function(){
                             $(".ulist li:eq(2)").addClass(listOneAddClassName);
                             $(".ulist li:eq(2)").css({"opacity":1});
                             setTimeout(function(){
                                $(".ulist li:eq(3)").addClass(listOneAddClassName);
                                $(".ulist li:eq(3)").css({"opacity":1});
                                setTimeout(function(){
                                     $(".scrollRen").addClass(scrollAddClassName);
                                     $(".scrollRen").css({"left":0,"opacity":1});
                                },listOneDelay1);
                             },listOneDelay1);
                         },listOneDelay1);
                    },listOneDelay1);
                },t1);
             }else if(curWin===6)
             {
                var text11Delay = $(".text11").attr("delay");
                var text11AddClassName = $(".text11").attr("addclass");
                var text11Delay1 = parseInt(text11Delay)+10;
                var yuanDelay = $(".yuanx span:eq(1)").attr("delay");
                var yuanAddClassName = $(".yuanx span:eq(1)").attr("addclass");
                setTimeout(function(){
                    $(".text11").addClass(text11AddClassName);
                    setTimeout(function(){
                        $(".text11").addClass("text8ToLeft1");
                        setTimeout(function(){
                            $(".yuanx span:eq(1)").addClass(yuanAddClassName);
                            setTimeout(function(){
                               $(".yuanx span:eq(2)").addClass(yuanAddClassName);
                               setTimeout(function(){
                                  $(".yuanx span:eq(3)").addClass(yuanAddClassName);
                                  setTimeout(function(){
                                     $(".yuanx span:eq(4)").addClass(yuanAddClassName);
                                     setTimeout(function(){
                                         $(".yuanx span:eq(5)").addClass(yuanAddClassName);
                                         setTimeout(function(){
                                             $(".yuanx span:eq(6)").addClass(yuanAddClassName);
                                             setTimeout(function(){
                                                 $(".yuanx span:eq(7)").addClass(yuanAddClassName);
                                                 setTimeout(function(){
                                                     $(".yuanx span:eq(8)").addClass(yuanAddClassName);
                                                     setTimeout(function(){
                                                         $(".yuanx span:eq(9)").addClass(yuanAddClassName);
                                                         setTimeout(function(){
                                                             $(".yuanx span:eq(10)").addClass(yuanAddClassName);
                                                         },text11Delay1);
                                                     },text11Delay1);
                                                 },text11Delay1);
                                             },text11Delay1);
                                          },text11Delay1);
                                      },text11Delay1);
                                  },text11Delay1);
                               },text11Delay1);
                            },text11Delay1);
                        },text11Delay1)
                    },text11Delay1);
                    curWin=6;
                },t1);
             }else if(curWin===7)
             {
                var text10Delay = $(".text10").attr("delay");
                var text10Delay1 = parseInt(text10Delay)+10;
                var text10AddClassName = $(".text10").attr("addclass");
                setTimeout(function(){
                    $(".text10").addClass(text10AddClassName);
                    setTimeout(function(){
                        $(".text10").addClass("text8ToLeft1");
                    },text10Delay1);
                    curWin=7;
                },t1);
             }
           }
       }

       //恢复默认设置
       function restoreDefault()
       {
           $(".logo").removeClass($(".logo").attr("addclass"));
           $(".logo").css({"opacity":0});
           $(".first").removeClass($(".first").attr("addclass"));
           $(".first").css({"left":-200,"opacity":0});
           $(".two").removeClass($(".two").attr("addclass"));
           $(".two").css({"top":-200,"opacity":0});
           $(".three").removeClass($(".three").attr("addclass"));
           $(".three").css({"right":-200,"opacity":0});
           $(".text1").removeClass($(".text1").attr("addclass"));
           $(".text1,.text2,.line1,.text3").css({"opacity":0});
           $(".text2").removeClass($(".text2").attr("addclass"));
           $(".text3").removeClass($(".text3").attr("addclass"));
           
           $(".jieshao").removeClass($(".jieshao").attr("addclass"));
           $(".jieshao").css({"top":"0","opacity":0});
           $(".text4,.text5").removeClass("text4ToLeft");
           $(".text4,.text5").removeClass("text4ToLeft1");

           $(".caopin li,.ulist li").removeClass("firstMan");
           $(".caopin li,.ulist li").css({"opacity":0});

           $(".jz").removeClass($(".jz").attr("addclass"));
           $(".hxing span").removeClass("showXing");
           $(".text8,.text11,.text10").removeClass("text8ToLeft");
           $(".text8,.text11,.text10").removeClass("text8ToLeft1");

           $(".scrollRen").removeClass("scrollShow");
           $(".scrollRen").css({"left":-300,"opacity":0});

           $(".yuanx span").removeClass("shows");
       }
	     //动画调用
	     startMove(curWin,curFlg);
       //触屏效果
       
       if("ontouchstart" in document)
       {
          var touchstart = "touchstart";
          var touchend = "touchend";
          var touchmove = "touchmove";
       }else{
          var touchstart = "mousedown";
          var touchend = "mouseup";
          var touchmove = "mousemove";
       }

       $(".wrap").on(touchstart,function(event){
          if(event.currentTarget===$(".wrap")[0])
          {
             tag = true;
          }
          if(tag===true && start===true)
          { 
            if(touchstart==="touchstart")
            { 
               x = event.originalEvent.targetTouches[0].pageX;
               y = event.originalEvent.targetTouches[0].pageY;
            }else{
               x = event.clientX;
               y = event.clientY;
            }
          }
          event.stopPropagation();
          event.preventDefault();
          return false;
       });
       $(".wrap").on(touchend,function(event){
          if(tag===true && start===true)
          {
              if(flgMatch)
              {
                 //向下拖动
                 if((keyY-y)>0 && parseInt(keyY-y)>120 && Math.abs(keyY-y)>Math.abs(keyX-x))
                 {   
                    if(parseInt(curWin)<=0)
                    {
                      curWin = 0;
                      return false;
                    }
                    curWin--;  
                 }else if(keyY-y<0 && parseInt(keyY-y)<-120 && Math.abs(keyY-y)>Math.abs(keyX-x)){
                    //向上拖动
                    if(parseInt(curWin)>=length-1)
                    {    
                         curWin = length-1; 
                         return false; 
                    }
                    curWin++;  
                 }
                 if(parseInt(keyY-y)>120 || parseInt(keyY-y)<-120)
                 {   
                    //alert(1);
                    curFlg = true;
                 }else{
                    //alert(2);
                    curFlg = false; 
                    //$('.wrap').removeClass('keep');
                 }
                 //$('body').stop().animate({scrollTop:curWin*oH+'px'},'fast',function(){
                       //-webkit-transform: translate3d(0px, -568px, 0px);
                 //});
                
                $('.wrap').addClass('keep');
                $('.wrap')[0].style.WebkitTransform = "translate3d(0px, "+-(curWin*oH)+"px, 0px)";
                $('.wrap')[0].style.MozTransform = "translate3d(0px, "+-(curWin*oH)+"px, 0px)";
                $('.wrap')[0].style.OTransform = "translate3d(0px, "+-(curWin*oH)+"px, 0px)";
                $('.wrap')[0].style.msTransform = "translate3d(0px, "+-(curWin*oH)+"px, 0px)";
                $('.wrap')[0].style.Transform = "translate3d(0px, "+-(curWin*oH)+"px, 0px)";
                if(curFlg===true)
                {
                   setTimeout(function(){
                      startMove(curWin,curFlg);
                   },400);
                }
              }    
          } 
          event.stopPropagation();
          event.preventDefault();
          return false;
       });
       $(".wrap").on(touchmove,function(event){
          if(flgMatch)
          {   
              if(tag===true && start===true)
              {
                  if(touchmove==="touchmove")
                  {
                     keyX = event.originalEvent.targetTouches[0].pageX;
                     keyY = event.originalEvent.targetTouches[0].pageY;
                  }else{
                     keyX = event.clientX;
                     keyY = event.clientY;
                  }
              }
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
       });  
     }
});