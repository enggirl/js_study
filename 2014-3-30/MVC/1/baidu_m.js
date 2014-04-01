//版权 北京智能社©, 保留所有权利

//分离：修改
//m——读取数据
function readFromBaidu(str, fnSucc)
{
	//http://suggestion.baidu.com/su?wd=a&cb=xxx
	
	var fnName='jsonp_'+Math.random();
	fnName=fnName.replace('.', '');
	
	window[fnName]=function (json)
	{
		//.....
		window[fnName]=null;
		oHead.removeChild(oS);
		
		fnSucc && fnSucc(json.s);
	};
	
	var url='http://suggestion.baidu.com/su?wd='+str+'&cb='+fnName;
	
	var oS=document.createElement('script');
	var oHead=document.getElementsByTagName('head')[0];
	
	oS.src=url;
	
	oHead.appendChild(oS);
}











