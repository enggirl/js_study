//版权 北京智能社©, 保留所有权利

function ajax(url, fnSucc, fnFaild)
{
	//1.创建
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHttp');
	}
	
	//2.连接——open
	oAjax.open('GET', url, true);
	
	//3.发送——send
	oAjax.send();
	
	//4.接收
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)	//完成
		{
			//成功
			//2xx	304
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				//alert('成功：'+oAjax.responseText);
				fnSucc && fnSucc(oAjax.responseText);
			}
			else
			{
				//alert('失败');
				fnFaild && fnFaild();
			}
		}
	};
}