
function createDate(id){

  var oDateDiv = document.createElement("Div");
  oDateDiv.className = "dateDiv";
  document.body.appendChild(oDateDiv);
  createDateDiv(oDateDiv);

  var oDateUI = oDateDiv.getElementsByTagName("ul")[2];
  //var oDateUI = document.getElementById("dateUI");
  var oTxt = document.getElementById(id);
  
  // oTxt.onclick = showDateDiv;
  addEvent(oTxt,"click",showDateDiv);

  addEvent(document,"click",function(){
    oDateDiv.style.display = "none";
  });


  oTxt.onmousedown = function(){//取消mousedown出现提示
    return false;
  };

  function showDateDiv(ev){
    var eve = ev || event;
    eve.cancelBubble=true;
    //console.log(oDateDiv)
    oDateDiv.style.display = "block";
    //eve.callcancel = true;
    oDateDiv.style.left = getPos(this).left + "px";
    oDateDiv.style.top = getPos(this).top + this.offsetHeight + "px";

  }

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

      //添加点击li,往text文本框里点击选中的日期
      newLi.onclick = function(){
        if(this.innerHTML == "") return;

        if(this.className == "ccc"){
          alert("日期过期了");
        }else{
          var nowD = new Date();
          nowD.setMonth(nowD.getMonth()+iNow);
          oTxt.value =  nowD.getFullYear()+"年"+ (nowD.getMonth()+1) +"月" + this.innerHTML;
        } 
      }

    }

    //修改日历标题
    var oSpan = oDateDiv.getElementsByTagName("span")[0];
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

  var oA = oDateDiv.getElementsByTagName("a");
  var oPre = oA[0];
  oPre.onclick = function(ev){
    var eve = ev || event;
    eve.cancelBubble=true;
    iNow--;
    createLi();
  };
  var oNext =oA[1];
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
function createDateDiv(obj){
    //var oDateDiv = document.getElementsByTagName("div")[0];
    var html = "";
    html += '<ul class="name">';
    html +=  '<li>';
    html +=     '<span id="s">2013年10月</span>';
    html +=       '<a href="javascript:;" class="a1">上月</a>';
    html +=       '<a href="javascript:;" class="a2">下月</a>';
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
    html += '<ul class="dateUl">';
        
    html += '</ul>';
    obj.innerHTML = html;
}

function getPos(obj){
  var l = 0;
  var t = 0;
  while(obj){
    l += obj.offsetLeft;
    t += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return {left:l,top:t};
}

function addEvent(obj,evfn,fn){
  if(document.addEventListener){
    obj.addEventListener(evfn,fn,false);
  }else{
    obj.attachEvent("on"+evfn,fn);
  }

}
