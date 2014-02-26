//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function startMove(obj, json, options)
{
	var start={};
	var dis={};
	
	for(var name in json)
	{
		if(name=='opacity')
		{
			start[name]=Math.round(parseFloat(getStyle(obj, name))*100);
		}
		else
		{
			start[name]=parseInt(getStyle(obj, name));
		}
		dis[name]=json[name]-start[name];
	}
		
	var count=parseInt(options.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json)
		{
			switch(options.type)
			{
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'buffer':
					var a=1-n/count;
					
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
				case 'ease-out':
					var a=n/count;
					
					var cur=start[name]+dis[name]*(a*a*a);
					break;
			}
			
			if(name=='opacity')
			{
				obj.style.opacity=cur/100;
				obj.style.filter='alpha(opacity:'+cur+')';
			}
			else
			{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			
			options.end && options.end();
		}
	}, 30);
}