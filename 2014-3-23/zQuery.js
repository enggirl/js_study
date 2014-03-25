//版权 北京智能社©, 保留所有权利

function ZQuery(arg)
{
	this.elements=[];		//存放选出来的元素
	this.domString='';
	
	switch(typeof arg)
	{
		case 'function':	//ready
			addReady(arg);
			break;
		case 'string':
			if(arg.indexOf('<')!=-1)
			{
				//创建
				this.domString=arg;
			}
			else
			{
				//选择
				this.elements=getEle(arg);
			}
			break;
		case 'object':		//包装
			if(arg instanceof Array)
			{
				this.elements=this.elements.concat(arg);
			}
			else
			{
				this.elements.push(arg);
			}
			break;
	}
}

'click|mouseover|mousedown|mouseout|mousemove|mouseup|focus|keydown|blur|keyup|contextmenu|change|input'.replace(/\w+/g, function (s){
	ZQuery.prototype[s]=function (fn)
	{
		for(var i=0;i<this.elements.length;i++)
		{
			addEvent(this.elements[i], s, fn);
		}
	};
});

/*
ZQuery.prototype['click']=function (fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		addEvent(this.elements[i], 'click', fn);
	}
};

ZQuery.prototype['mouseover']=function (fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		addEvent(this.elements[i], 'mouseover', fn);
	}
};
*/


ZQuery.prototype.mouseenter=function (fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		addEvent(this.elements[i], 'mouseover', function (ev){
			var oFrom=ev.fromElement||ev.relatedTarget;
			
			if(isChild(this, oFrom))return;
			
			fn && fn.call(this, ev);
		});
	}
};

ZQuery.prototype.mouseleave=function (fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		addEvent(this.elements[i], 'mouseout', function (ev){
			var oTo=ev.toElement||ev.relatedTarget;
			
			if(isChild(this, oTo))return;
			
			fn && fn.call(this, ev);
		});
	}
};

ZQuery.prototype.hover=function (fnOver, fnOut)
{
	fnOver && this.mouseenter(fnOver);
	fnOut && this.mouseleave(fnOut);
};

ZQuery.prototype.css=function (name, value)
{
	if(arguments.length==2)		//赋值
	{
		for(var i=0;i<this.elements.length;i++)
		{
			this.elements[i].style[name]=value;
		}
	}
	else
	{
		if(typeof name=='string')
		{
			//获取
			var obj=this.elements[0];
			
			//return obj.style[name];
			
			return getStyle(obj, name);
		}
		else
		{
			//批量赋值
			for(var i=0;i<this.elements.length;i++)
			{
				for(var j in name)
				{
					this.elements[i].style[j]=name[j];
				}
			}
		}
	}
};

ZQuery.prototype.attr=function (name, value)
{
	if(arguments.length==2)
	{
		for(var i=0;i<this.elements.length;i++)
		{
			//this.elements[i][name]=value;
			this.elements[i].setAttribute(name, value);
		}
	}
	else
	{
		if(typeof name=='string')
		{
			var obj=this.elements[0];
			
			return obj.getAttribute(name);
		}
		else
		{
			for(var i=0;i<this.elements.length;i++)
			{
				for(var j in name)
				{
					//this.elements[i][j]=name[j];
					this.elements[i].setAttribute(j, name[j]);
				}
			}
		}
	}
};

ZQuery.prototype.toggle=function ()
{
	var _this=this;
	var _arg=arguments
	//var count=0;
	
	for(var i=0;i<this.elements.length;i++)
	{
		(function (count){
			addEvent(_this.elements[i], 'click', function (ev){
				//alert(count);
				var fn=_arg[count%_arg.length];
				
				fn.call(this, ev);
				
				count++;
			});
		//count-次数		从0开始
		})(0);
	}
};

ZQuery.prototype.html=function (html)
{
	if(arguments.length==1)
	{
		for(var i=0;i<this.elements.length;i++)
		{
			this.elements[i].innerHTML=html;
		}
	}
	else
	{
		return this.elements[0].innerHTML;
	}
};

ZQuery.prototype.animate=function (json)
{
	for(var i=0;i<this.elements.length;i++)
	{
		startMove(this.elements[i], json);
	}
};

ZQuery.prototype.bind=function (sEv, fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		addEvent(this.elements[i], sEv, fn);
	}
};

ZQuery.prototype.appendTo=function (str)
{
	var arr=getEle(str);
	
	for(var i=0;i<arr.length;i++)
	{
		_appendTo(arr[i], this.domString);
	}
};

ZQuery.prototype.insertBefore=function (str)
{
	var arr=getEle(str);
	
	for(var i=0;i<arr.length;i++)
	{
		_insertBefore(arr[i], this.domString);
	}
};

ZQuery.prototype.remove=function ()
{
	for(var i=0;i<this.elements.length;i++)
	{
		this.elements[i].parentNode.removeChild(this.elements[i]);
	}
};

ZQuery.prototype.get=function (n)
{
	return this.elements[n];
};

ZQuery.prototype.eq=function (n)
{
	return $(this.elements[n]);
};

ZQuery.prototype.index=function ()
{
	var sum=0;
	
	for(var i=0;i<this.elements.length;i++)
	{
		sum+=_index(this.elements[i]);
	}
	
	return sum;
};

ZQuery.prototype.find=function (str)
{
	//this.elements
	//str
	
	var aChild=getEle(str, this.elements);
	
	return $(aChild);
};

ZQuery.prototype.each=function (fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		fn.call(this.elements[i], i, this.elements[i]);
	}
};

$.ajax=function (options)
{
	options=options||{};
	options.data=options.data||{};
	options.type=options.type||'get';		//get/post/jsonp
	
	if(options.type=='jsonp')
	{
		//jsonp
		var fnName='jsonp_'+Math.random();
		fnName=fnName.replace('.', '');
		
		//全局
		window[fnName]=function ()
		{
			options.success && options.success.apply(null, arguments);
			
			options.complete && options.complete();
			
			//清理
			oHead.removeChild(oS);
			window[fnName]=null;
			
			//超时
			clearTimeout(timer);
		};
		
		options.data[options.cbName]=fnName;
		
		//拼
		var arr=[];
		for(var i in options.data)
		{
			arr.push(i+'='+options.data[i]);
		}
		var sData=arr.join('&');
		
		//
		var oS=document.createElement('script');
		
		oS.src=options.url+'?'+sData;
		
		var oHead=document.getElementsByTagName('head')[0];
		
		oHead.appendChild(oS);
		
		//超时
		if(options.timeout)
		{
			var timer=setTimeout(function (){
				options.error && options.error();
				options.complete && options.complete();
				
				oHead.removeChild(oS);
				window[fnName]=null;
			}, options.timeout);
		}
	}
	else
	{
		//ajax
		//1.创建
		if(window.XMLHttpRequest)
		{
			var oAjax=new XMLHttpRequest();
		}
		else
		{
			var oAjx=new ActiveXObject('Microsoft.XMLHTTP');
		}
		
		//拼数据
		options.data.t=Math.random();
		var arr=[];
		for(var i in options.data)
		{
			arr.push(i+'='+encodeURIComponent(options.data[i]));
		}
		var sData=arr.join('&');
		
		//2.连接
		//open(方法, url, 异步)
		if(options.type=='get')
		{
			oAjax.open('get', options.url+'?'+sData, true);
			
			oAjax.send();
		}
		else
		{
			oAjax.open('post', options.url, true);
			
			oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			
			oAjax.send(sData);
		}
		
		//3.发送
		
		//4.接收
		oAjax.onreadystatechange=function ()
		{
			if(oAjax.readyState==4)
			{
				//2xx 304
				if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
				{
					options.success && options.success(oAjax.responseText);
				}
				else
				{
					options.error && options.error();
				}
				
				options.complete && options.complete();
				
				clearTimeout(timer);
			}
		};
		
		if(options.timeout)
		{
			var timer=setTimeout(function (){
				options.error && options.error();
				options.complete && options.complete();
				
				oAjax.onreadystatechange=null;
			}, options.timeout);
		}
	}
};

$.fn=ZQuery.prototype;

$.fn.extend=function (json)
{
	for(var i in json)
	{
		//i->?	'toRed'		名字
		//json[i]->			function
		
		ZQuery.prototype[i]=json[i];
	}
};


function $(arg)
{
	return new ZQuery(arg);
}
























































function _index(obj)
{
	var arr=obj.parentNode.children;
	
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==obj)
		{
			return i;
		}
	}
}

function _appendTo(oParent, str)
{
	var oTmp=document.createElement('div');
	
	oTmp.innerHTML=str;
	
	while(oTmp.childNodes.length>0)
	{
		oParent.appendChild(oTmp.childNodes[0]);
	}
}

function _insertBefore(oSibling, str)
{
	var oTmp=document.createElement('div');
	oTmp.innerHTML=str;
	
	while(oTmp.childNodes.length>0)
	{
		oSibling.parentNode.insertBefore(oTmp.childNodes[0], oSibling);
	}
}

//?
function addEvent(obj, sEv, fn)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(sEv, function (ev){
			if(false==fn.call(obj, ev))
			{
				ev.cancelBubble=true;
				ev.preventDefault();
			}
		}, false);
	}
	else
	{
		obj.attachEvent('on'+sEv, function (){
			if(false==fn.call(obj, event))
			{
				event.cancelBubble=true;
				return false;
			}
		});
	}
}

function isChild(oParent, obj)
{
	while(obj)
	{
		if(obj==oParent)return true;
		
		obj=obj.parentNode;
	}
	
	return false;
}

function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}

function addReady(fn)
{
	if(document.addEventListener)
	{
		//高级
		document.addEventListener('DOMContentLoaded', fn, false);
	}
	else
	{
		//IE6-8
		document.attachEvent('onreadystatechange', function (){
			if(document.readyState=='complete')
			{
				fn && fn();
			}
		});
	}
}

Array.prototype.indexOf=Array.prototype.indexOf||function (n)
{
	for(var i=0;i<this.length;i++)
	{
		if(this[i]==n)return i;
	}
	
	return -1;
};

Array.prototype.pushUnique=function (obj)
{
	if(this.indexOf(obj)==-1)
	{
		this.push(obj);
	}
};

function getByClass(oParent, sClass)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);
	}
	
	var aEle=oParent.getElementsByTagName('*');
	var result=[];
	
	var re=new RegExp('\\b'+sClass+'\\b');
	
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			result.push(aEle[i]);
		}
	}
	
	return result;
}

function getByStr(aParent, str)
{
	var aChild=[];
	
	for(var i=0;i<aParent.length;i++)
	{
		//aParent[i]->str
		switch(str.charAt(0))
		{
			case '#':
				var obj=document.getElementById(str.substring(1));
				
				aChild.pushUnique(obj);
				break;
			case '.':
				var arr=getByClass(aParent[i], str.substring(1));
				
				for(var j=0;j<arr.length;j++)
				{
					aChild.pushUnique(arr[j]);
				}
				break;
			default:
				//li	li.box li#li1 li[value=ab cd] li:first
				
				//li.box
				if(/\w+\.\w+/.test(str))
				{
					var aStr=str.split('.');
					//aStr[0]	标签
					//aStr[1]	class
					
					//第一关
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					var re=new RegExp('\\b'+aStr[1]+'\\b');
					for(var j=0;j<arr.length;j++)
					{
						//第二关
						if(re.test(arr[j].className))
						{
							aChild.pushUnique(arr[j]);
						}
					}
				}
				//li#li1
				else if(/\w+#\w+/.test(str))
				{
					var aStr=str.split('#');
					//aStr[0]		标签
					//aStr[1]		id
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].id==aStr[1])
						{
							aChild.pushUnique(arr[j]);
						}
					}
				}
				//li[xxx=xxx]
				else if(/\w+\[\w+=.+\]/.test(str))
				{
					//input[type=button]
					var aStr=str.split(/\[|=|\]/g);
					//aStr[0]	标签
					//aStr[1]	属性名
					//aStr[2]	属性值
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].getAttribute(aStr[1])==aStr[2])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//li:first	li:eq(0)	li:has(.box)
				else if(/\w+:\w+(\(.+\))?/.test(str))
				{
					var aStr=str.split(/:|\(|\)/g);
					//aStr[0]	标签
					//aStr[1]	名字
					//aStr[2]	[可能有]参数
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					switch(aStr[1])
					{
						case 'first':
							aChild.push(arr[0]);
							break;
						case 'eq':
							var n=parseInt(aStr[2]);
							
							if(!isNaN(n) && n>=0 && n<arr.length)
							{
								aChild.pushUnique(arr[aStr[2]]);
							}
							break;
						case 'odd':		//单数、奇数
							/*for(var j=0;j<arr.length;j++)
							{
								if(j%2)
								{
									aChild.pushUnique(arr[j]);
								}
							}*/
							for(var j=1;j<arr.length;j+=2)
							{
								aChild.pushUnique(arr[j]);
							}
							break;
					}
				}
				//li
				else
				{
					var arr=aParent[i].getElementsByTagName(str);
					
					for(var j=0;j<arr.length;j++)
					{
						aChild.pushUnique(arr[j]);
					}
					break;
				}
		}
	}
	
	return aChild;
}

function getEle(str, aParent)
{
	var arr=str.replace(/^\s+|\s+$/g, '').split(/\s+/g);
	
	aParent=aParent||[document];
	var aChild=[];
	
	for(var i=0;i<arr.length;i++)
	{
		aChild=getByStr(aParent, arr[i]);
		
		aParent=aChild;
	}
	
	return aChild;
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






