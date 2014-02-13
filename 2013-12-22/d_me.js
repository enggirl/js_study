function createSelect(){
  var oSel = document.getElementsByTagName("select");

  //第一个select初始化
  for(var i=0; i<date.length; i++){
    var newOp = new Option(date[i].name,date[i].name);
    oSel[0].options[i] = newOp;
  }
  //根据第一个select选项第二个select插入数据
  oSel[0].onchange = function(){
    var oneIndex = oSel[0].selectedIndex;
    var arr = date[oneIndex].sub;
    //alert(arr.length);
    for(var i=0; i<arr.length; i++){
      var newOp = new Option(arr[i].name,arr[i].name);
      oSel[1].options[i] = newOp;
    }
    //根据第二个select选项第三个select插入数据
    oSel[1].onchange = function(){
      var twoIndex = oSel[1].selectedIndex;
      if(!date[oneIndex].sub[twoIndex].sub) return; //没有第三个select数据
      var arr2 = date[oneIndex].sub[twoIndex].sub;
      for(var i=0; i<arr2.length; i++){
        var newOp = new Option(arr2[i].name,arr2[i].name);
        oSel[2].options[i] = newOp;
      }
    };
  }
}