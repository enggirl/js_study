window.onload = function(){
  /*20140209
	基本选项卡特点：按钮个数=显示块个数，点击按钮，显示相同下标的块，其他块消失
	步骤：1.获取按钮元素 
		  2.给每个按钮添加click事件  当前按钮变激活状态
      3.跟按钮相同下标的对应块显示
  */
  var oBox = document.getElementById("box");
  var aInput = oBox.getElementsByTagName("input");
  var aDiv = oBox.getElementsByTagName("div");

//2.给每个按钮添加click事件  先把所有按钮清理激活类名，把所有的块都隐藏，给当前按钮添加激活类,因为给一组按钮
//执行相同js代码，用循环
  for(var i=0; i<aInput.length; i++){
    //3.js动态给每个input添加下标的自定义属性
    //aInput[i].setAttribute("a",i);
    aInput[i].a = i;//这个没有写在页面代码，但是一个自定义属性，作用等同于上一句

    aInput[i].onclick = function(){
     for(var j=0; j<aInput.length; j++){
       aInput[j].className = "";
       aDiv[j].className = "";
     }
     this.className = "active";
     //3.怎么能让块跟按钮是相同的下标呢？其实，就是先知道按钮的下标，然后把这个值作为块数组的下标，就能得到了。那么如何
     //获取按钮下标？
     //alert(this.a) //自定义属性，用来表示按钮下标的属性，在ie6，7,8支持，但是ie9,10，chrome等高级浏览器就获取不到a值
     //但是发现a跟i值是一样的,但是i不能用，js动态给每个input添加下标的自定义属性
     //aInput[i].index = i;//放在这里不好使,因为这时i已经是3了，而aInput数组没有下标是3的按钮，所以会报错
     aDiv[this.a].className = "show";
    }
  }

  // aInput[0].onclick = function(){
  // 	for(var i=0; i<aInput.length; i++){
  // 		aInput[i].className = "";
  // 	}
  // 	this.className = "active";
  // }
  // aInput[1].onclick = function(){
  // 	for(var i=0; i<aInput.length; i++){
  // 		aInput[i].className = "";
  // 	}
  // 	this.className = "active";
  // }
  // aInput[2].onclick = function(){
  //   for(var i=0; i<aInput.length; i++){
  //     aInput[i].className = "";
  //   }
  //   this.className = "active";
  // }
};