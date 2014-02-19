window.onload = function(){
	/*效果：鼠标滑过第一级菜单，会出现下拉菜单，滑过下拉的一级菜单，会出现下拉的二级菜单
		特点：第一级菜单都有list类，第二级菜单都有child_list类
		步骤：1.鼠标移入第一级菜单，如果有list类的div就显示
					2.鼠标移出，如果有list类的div就消失
					3.一级下拉菜单展开 鼠标移入某项菜单 如果有child_list类的div显示
	*/
	var oNavUl = document.getElementById("nav_ul");
	var aNavLi = oNavUl.children;

	for(var i=0; i<aNavLi.length; i++){
		//1.鼠标移入第一级菜单，如果有list类的div就显示
		aNavLi[i].onmouseover = function(){
			var oDiv = this.children[1];
			if(oDiv){
				oDiv.style.display = "block";
			}
			var oUl = this.getElementsByTagName("ul")[0];
			var aLi = oUl.children;
			show(aLi); 
		}
		//2.鼠标移出，如果有list类的div就消失
		aNavLi[i].onmouseout = function(){
			var oDiv = this.children[1];
			if(oDiv){
				oDiv.style.display = "none";
			}
		}
	}

	//3.一级下拉菜单展开 鼠标移入某项菜单 如果有child_list类的div显示 鼠标移出某项菜单 如果有child_list类的div消失
	function show(arr){
		for(var i=0; i<arr.length; i++){
			arr[i].onmouseover = function(){
				var childDiv = this.children[1];
				if(childDiv){
					childDiv.style.display = "block";
				}
			}
			arr[i].onmouseout = function(){
				var childDiv = this.children[1];
				if(childDiv){
					childDiv.style.display = "none";
				}
			}
		}
	}
};