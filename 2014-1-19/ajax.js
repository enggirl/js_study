function ajax(url,data,type,fnSucc,fnFaild,time)
{
	data.t=Math.random()+new Date().getTime();
	var arr=[];
	for(var i in data)
	{
		arr.push(i+'='+encodeURIComponent(data[i]));	
	};
	
	var sData=arr.join('&');
	
	/// 创建AJAX
	
	if(window.XMLHttpRequest)  
	{
		var oAjax=new XMLHttpRequest();	
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');	
	}
	
	// 连接 发送
	
	
	switch(type.toLowerCase())
	{
		case 'get':
			
			oAjax.open('GET',url+'?'+sData,true);
			oAjax.send();
		
		   break;
		case 'post':
			
			oAjax.open('POST',url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(sData);
		
		   break;
		
	};
	
	
	//接收
	
	oAjax.onreadystatechange=function()
	{
		if(oAjax.readyState==4)
		{
			
			//oAjax.statu 状态码
			if(oAjax.status>=200&&oAjax.status<300)
			{
				
				fnSucc&&fnSucc( oAjax.responseText  );
					
			}
			else
			{
				
				fnFaild&&fnFaild(  oAjax.status  );
					
			};
			
			clearTimeout(timer);
				
		}
			
	};
	
	
	
	if(time)
	{
		
		var timer=setTimeout(function(){
			
			oAjax.onreadystatechange=null;	
			fnFaild&&fnFaild(  0  );
			
		},time);	
			
					
	};

		
};