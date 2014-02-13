function ajax(url,fnSucc,fnFaild)
{
	//创建
	if(window.XMLHttpRequest)
	{
		//不是IE6
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');	
	}
	
	// 连接
	oAjax.open( 'GET',url,true  );
	
	// 发送
	oAjax.send();
	
	//接收
	
	oAjax.onreadystatechange=function()
	{
		if(oAjax.readyState==4)
		{
		    //完成不代表成功
			if(oAjax.status>=200&&oAjax.status<300)
			{
				fnSucc&&fnSucc( oAjax.responseText  );	
			}	
			else
			{
				fnFaild&&fnFaild(oAjax.status);	
			}
		};
	};
};



