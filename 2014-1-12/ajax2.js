function ajax(url,data,type,fnSucc,fnFaild)
{
	data.t=Math.random();
	var arr=[];
	for(var i in data)
	{
		arr.push(i+'='+encodeURIComponent(data[i]));	
	};
	
	var sUrl=arr.join('&');
	
	
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
	
	switch(type.toLowerCase())
	{
		case 'get':
		//通过url来提交  数据都放url里  
			oAjax.open( 'GET',url+'?'+sUrl,true  );
			oAjax.send();
		   break;
		case 'post':
		 // 数据不放url里
			oAjax.open( 'POST',url,true  );
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(sUrl);
		
		   break;
			
	}
	
	
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



