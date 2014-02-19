window.onload = function(){
	/*1.出现广告
		2.出现登陆框
		3.顶部菜单，鼠标滑过，出现下拉菜单
		4.点击输入框，出现下拉框
		5.全选反选不选
	*/
	showNav();
	showSearch();

	//1.点击左侧广告，广告大图出现中间
	var oAdl= document.getElementById("adl");
	var oAdm = document.getElementById("adm");
	var oSpan = oAdm.getElementsByTagName("span")[0];

	oAdl.onclick = function(){
		oAdm.style.display = "block";
	}
	oSpan.onclick = function(){
		oAdm.style.display = "none";
	}


	//2.点击头部登录，登陆框出现
	var oLoginBtn = document.getElementById("loginBtn");
	var oLoginBox = document.getElementById("loginBox");
	var oLoginClose = document.getElementById("loginClose");
	oLoginBtn.onclick = function(){
		oLoginBox.style.display = "block";
	}
	oLoginClose.onclick = function(){
		oLoginBox.style.display = "none";
	}

	//3.顶部菜单，鼠标滑过每个菜单项，如果有下拉菜单，就出现下拉菜单，所以需要判断一下是否有下拉菜单
	function showNav(){
		var oLeftNav = document.getElementById("leftNav");
		var oLeftNavR = document.getElementById("leftNav_right");

		var aLeftLi = oLeftNav.children;
		var aLeftNevRL = oLeftNavR.children;

		for(var i=0; i<aLeftLi.length; i++){
			aLeftLi[i].onmouseover = function(){
				var oDiv = this.getElementsByTagName("div")[0];
				if(oDiv){
					oDiv.style.display = "block";
					//oDiv.style.zIndex = ;
				}
			}
			aLeftLi[i].onmouseout = function(){
				var oDiv = this.getElementsByTagName("div")[0];
				if(oDiv){
					oDiv.style.display = "none";
				}
			}
		}
		for(var i=0; i<aLeftNevRL.length; i++){
			aLeftNevRL[i].onmouseover = function(){
				var oDiv = this.getElementsByTagName("div")[0];
				if(oDiv){
					oDiv.style.display = "block";
				}
			}
			aLeftNevRL[i].onmouseout = function(){
				var oDiv = this.getElementsByTagName("div")[0];
				if(oDiv){
					oDiv.style.display = "none";
				}
			}
		}
	}

	//4.点击输入框，触发focus事件，出现下拉框,当鼠标离开输入框，触发blur，如果文本框为空，就显示span内容，下拉框消失
	//	下拉框展开，鼠标按下某个选项，span内容被改写
	function showSearch(){
		var oSp = document.getElementById("sp");
		var oTxt = document.getElementById("txt");
		var oPleceWrap = document.getElementById("pleceWrap");

		oTxt.onfocus = function(){
			oSp.style.display = "none";
			oPleceWrap.style.display = "block";

			var aPleceLi = oPleceWrap.children;
			for(var j=0; j<aPleceLi.length; j++){
				aPleceLi[j].onmousedown = function(){
					var str = this.children[0].innerHTML;
					oSp.innerHTML = str;
				}
			}

		}
		oTxt.onblur = function(){
			if(oTxt.value == ""){
				oSp.style.display = "block";
			}
			oPleceWrap.style.display = "none";
		}
	}

	//5.全选反选不选
	var oListChoice = document.getElementById("list_choice");
	var aInput = oListChoice.getElementsByTagName("input");
	var oListItem = document.getElementById("list_item");
	var aListItem = oListItem.getElementsByTagName("input");

	aInput[0].onclick = function(){
		//alert(aListItem.length)
		for(var i=0; i<aListItem.length; i++){
			aListItem[i].checked = true;
		}
		aInput[2].checked = false;
		aInput[1].checked = false;
	}
	aInput[1].onclick = function(){
		//alert(aListItem.length)
		for(var i=0; i<aListItem.length; i++){
			if(aListItem[i].checked==true){
				aListItem[i].checked = false;
			}else{
				aListItem[i].checked = true;
			}
		}
		aInput[0].checked = false;
		aInput[2].checked = false;
	}
	aInput[2].onclick = function(){
		//alert(aListItem.length)
		for(var i=0; i<aListItem.length; i++){
			aListItem[i].checked = false;
		}
		aInput[0].checked = false;
		aInput[1].checked = false;
	}
}