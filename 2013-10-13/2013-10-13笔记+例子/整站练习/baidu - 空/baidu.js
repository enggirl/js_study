/*
20140203
1.更多产品列表显示隐藏
2.点击登录，显示登录窗口
3.点击右下角换肤传参


*/


window.onload = function(){
//1.鼠标滑入更多产品，显示下拉列表，滑出下拉列表消失

	//var oMoreCp= document.getElementById("more_cp");
	var oUiTool= document.getElementById("ui_tool_edit");
	var oToolbar = document.getElementById("toolbar");

	//分析:如果把事件加在omorecp上，那么就会出现鼠标移动不到下拉列表上
	//解决方法：把事件加在它们共同的父元素toolbar上
	oToolbar.onmouseover = function(){
		oUiTool.style.display = "block";
	}
	oToolbar.onmouseout = function(){
		oUiTool.style.display = "none";
	}


//2.点击登录，垂直水平居中显示登录窗口，还有一个半透明层，点击窗口的X关闭窗口
	var oLogin = document.getElementById("login");
	var oLayer= document.getElementById("layer");
	var oLoginBox = document.getElementById("login_box");
	var oLoginClose = document.getElementById("login_close");


	oLogin.onclick = function(){
		oLayer.style.display = "block";
		oLoginBox.style.display = "block";
		oLoginBox.style.left = "50%";
		oLoginBox.style.top = "50%";
		oLoginBox.style.marginLeft = "-200px";
		oLoginBox.style.marginTop = "-120px";
	};

	oLoginClose.onclick = function(){
		oLayer.style.display = "none";
		oLoginBox.style.display = "none";
	}


//3.点击右下角,点击每个图片就可以给body换肤，也就是替换body的背景图片地址，所以背景图片地址src就是参数
	var oSkin = document.getElementById("skin");
	var oSkinBox = document.getElementById("skin_box");
	var oSclose = document.getElementById("s_close");
	var oSbgList = document.getElementById("s_bg_list");
	var oSbgLi = oSbgList.children;
	var len = oSbgLi.length;
	//alert(len);

	oSkin.onclick = function(){
		oSkinBox.style.display = "block";
	}
	oSclose.onclick = function(){
		oSkinBox.style.display = "none";
	}

	for(var i=0; i<len; i++){
		oSbgLi[i].onclick = function(){
			var oImg = this.getElementsByTagName("img")[0];
			var src = oImg.getAttribute("src");
			changeSkin(src);
		};
	}

	function changeSkin(src){
			//console.log(src)
			document.body.style.background = "url("+ src + ")";
	}
}
