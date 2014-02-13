  function createRadio(id){
    var oForm = document.getElementById(id);
      var oInput =document.getElementsByTagName("input");
      var arr = [];

      for(var i=0; i<oInput.length; i++){
        var oSpan =document.createElement("span");
        oSpan.className = "radio_off";
        if(oInput[i].type != "radio"){
          return;
        }
        arr.push(oSpan);
        oForm.insertBefore(oSpan,oInput[i]);
        
        oInput[i].style.display = "none";
        oSpan.onclick = function(){
          for(var i=0; i<arr.length; i++){
            //arr[i].index = i;
            arr[i].className = "radio_off";
          }
          this.className = "radio_on";
          //alert(this.index);
          //oInput[arr[i].index].checked = true;
          var next = this.nextElementSibling || this.nextSibling;//因为span的兄弟节点就是input
          next.checked = true;
        };
      }
    }