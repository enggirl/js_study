function jsonp(url,data,fnSucc,fnFaild,cbName,time)
{
	var str='jsonp_'+Math.random();
	str=str.replace('.','');
	
	window[str]=function(json)
	{
		oHead.removeChild(oS);
		clearTimeout(timer);
		window[str]=null;
		fnSucc&&fnSucc(json);	
	};
	
	data[cbName]=str;
	
	var arr=[];
	for(var i in data)
	{
		arr.push(i+'='+encodeURIComponent(data[i]));	
	};
	
	var sData=arr.join('&');
	
	
	var oS=document.createElement('script');
	
	oS.src=url+'?'+sData;
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
	
	
	if(time)
	{
		var timer=setTimeout(function(){
			
			window[str]=null;
			oHead.removeChild(oS);
			fnFaild&&fnFaild(0);
			
			
		},time);
	}
	
	
		
};