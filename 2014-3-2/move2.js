//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function startMove(obj, json, options)
{
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'linear';
	//width
	
	//不能整除
	var count=parseInt(options.time/30);
	var n=0;
	
	//1.parseInt——opacity完蛋了
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
		
		/*if(isNaN(start[name]))
		{
			switch(name)
			{
				case 'left':
					start[name]=obj.offsetLeft;
			}
		}*/
		
		dis[name]=json[name]-start[name];
	}
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json)
		{
			switch(options.type)
			{
				case 'linear':
					var cur=start[name]+n*dis[name]/count;
					break;
				case 'buffer':
					var a=1-n/count;
					
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
				case 'ease-in':
					var a=n/count;
					
					var cur=start[name]+dis[name]*a*a*a;
					break;
			}
			
			if(name=='opacity')
			{
				obj.style.filter='alpha(opacity:'+cur+')';
				obj.style.opacity=cur/100;
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