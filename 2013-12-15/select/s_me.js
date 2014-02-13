function createSelect(id){
  var oSel = document.getElementById(id);
      var len = oSel.options.length;

      var oSelDiv = document.createElement("div");
      oSelDiv.className = "selDiv";
      var oP = document.createElement("p");
      oP.innerHTML = oSel.options[oSel.selectedIndex].innerHTML;
      var oUl = document.createElement("ul");
      oSelDiv.appendChild(oP);
      oSelDiv.appendChild(oUl);
      document.forms["frm"].insertBefore(oSelDiv,oSel);

      for(var i=0; i<len; i++){
        var oLi = document.createElement("li");
        oLi.innerHTML = oSel.options[i].text;
        //arr.push(oLi);
        oUl.appendChild(oLi);

        oLi.index = i;//不需要数组，直接用li.index说明他是第几个
        oLi.onclick = function(){
          oP.innerHTML = this.innerHTML;
          oUl.style.display = "none";
          oSel.selectedIndex = this.index;
        }
      }

      oP.onclick = function(){
        if( oUl.style.display == "block"){

           oUl.style.display = "none";

        }else{

           oUl.style.display = "block";
        }
      };
       // for(var i=0; i<oLi.length; i++){
      //   oLi[i].index = i;
      //   oLi[i].onclick = function(){
      //     var str = this.innerHTML;
      //     oP.innerHTML = str;
      //     oUl.style.display = "none";
      //     //oSel.options[this.index].selected = true;
      //     //alert(oSel.selectedIndex)
      //     oSel.selectedIndex = this.index;
      //   };

      // }
}
var oLink = document.createElement("link");
oLink.rel = "stylesheet";
oLink.type = "text/css";
oLink.href = "select/s_me.css";
var oHead = document.getElementsByTagName("head")[0];
oHead.appendChild(oLink);