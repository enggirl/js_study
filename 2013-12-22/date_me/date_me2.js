
function createDate(id){
  createDateDiv();
  var oDateUI = document.getElementById(id);
  function createLi(){
    oDateUI.innerHTML = "";

  //补全1号前面的空li

    var firstDay = getFirstDay(iNow);
    if(firstDay==0) firstDay = 7;
    firstDay--;
    for(var i=0; i<firstDay; i++){
      var newLi = document.createElement("li");
      oDateUI.appendChild(newLi);
    }

    //var iNow = 0;//标示当前日

    //生成当前月份的天数
    for(var i=0; i<getDates(iNow); i++){
      var newLi = document.createElement("li");
      newLi.innerHTML = i+1;
      oDateUI.appendChild(newLi);

    }

    //修改日历标题
    var oSpan = document.getElementById("s");
    var nowD = new Date();
    nowD.setMonth(nowD.getMonth()+iNow);
    oSpan.innerHTML = nowD.getFullYear()+"年"+ (nowD.getMonth()+1) +"月";
    
    //给特殊的日期添加类
    var aLi = oDateUI.children;
    
      if(iNow<0){
       for(var i=0; i<aLi.length; i++){
          aLi[i].className = "ccc";
       }
      }else if(iNow == 0){
        for(var i=0; i<aLi.length; i++){
          if(aLi[i].innerHTML==nowD.getDate()){
            aLi[i].className = "red";
          }else if(aLi[i].innerHTML<nowD.getDate()){
            aLi[i].className = "ccc";
          }else if(i%7==5 ||i%7==6){
            aLi[i].className = "sun";
          }
       }
      }else{
        for(var i=0; i<aLi.length; i++){
         if(i%7==5 ||i%7==6){
            aLi[i].className = "sun";
          }
        }
      }
  }

  iNow = 0;//当前月份
  createLi();

  var oPre = document.getElementById("pre");
  oPre.onclick = function(ev){
    var eve = ev || event;
    eve.cancelBubble=true;
    iNow--;
    createLi();
  };
  var oNext = document.getElementById("next");
  oNext.onclick = function(ev){
    var eve = ev || event;
    eve.cancelBubble=true;
    iNow++;
    createLi();
  };

  //计算本月有多少天
  function getDates(iNow){
    var nowD = new Date();
    //alert(nowD);
    nowD.setMonth(nowD.getMonth()+iNow);
    //alert(nowD.getMonth()+1)
    nowD.setDate(0);
    //alert(nowD.getMonth()+1)
    return nowD.getDate();
  }
  function getFirstDay(iNow){
    var nowD = new Date();
    nowD.setDate(nowD.getDate()+iNow);
    return nowD.getDay();
  }
}
var oLink = document.createElement("link");
oLink.rel = "stylesheet";
oLink.type = "text/css";
oLink.href = "date_me.css";
document.getElementsByTagName("head")[0].appendChild(oLink);

//创建dateUI结构
function createDateDiv(){
    var oDateDiv = document.getElementById("dateDiv");
    var html = "";
    html += '<ul class="name">';
    html +=  '<li>';
    html +=     '<span id="s">2013年10月</span>';
    html +=       '<a href="javascript:;" id="pre" class="a1">上月</a>';
    html +=       '<a href="javascript:;" id="next" class="a2">下月</a>';
    html +=  '</li>';
    html += '</ul>';
    html += '<ul class="week">';
    html +=    '<li>一</li>';
    html +=    '<li>二</li>';
    html +=    '<li>三</li>';
    html +=    '<li>四</li>';
    html +=    '<li>五</li>';
    html +=    '<li style="color:#f00;">六</li>';
    html +=    '<li style="color:#f00;">日</li>';
    html += '</ul>';
    html += '<ul class="dateUl" id="dateUI">';
        
    html += '</ul>';
    oDateDiv.innerHTML = html;
}