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
			
			//解决方法——麻烦
			if(isNaN(start[name]))	//默认值
			{
				switch(name)
				{
					case 'left':
						start[name]=obj.offsetLeft;
						break;
					case 'top':
						start[name]=obj.offsetTop;
						break;
					case 'width':
						start[name]=obj.offsetWidth;
						break;
					case 'height':
						start[name]=obj.offsetHeight;
						break;
					case 'margin':
						start[name]=0;
						break;
					case 'marginLeft':
						start[name]=0;
						break;
					case 'marginTop':
						start[name]=0;
						break;
					case 'marginRight':
						start[name]=0;
						break;
					case 'marginBottom':
						start[name]=0;
						break;
					case 'padding':
						start[name]=0;
						break;
					case 'paddingLeft':
						start[name]=0;
						break;
					case 'paddingRight':
						start[name]=0;
						break;
					case 'paddingTop':
						start[name]=0;
						break;
					case 'paddingBottom':
						start[name]=0;
						break;
					case 'borderWidth':
						start[name]=0;
						break;
					case 'borderLeftWidth':
						start[name]=0;
						break;
					case 'borderRightWidth':
						start[name]=0;
						break;
					case 'borderTopWidth':
						start[name]=0;
						break;
					case 'borderBottomWidth':
						start[name]=0;
						break;
					case 'opacity':
						start[name]=100;
						break;
					case 'zIndex':
						start[name]=0;
						break;
				}
			}
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