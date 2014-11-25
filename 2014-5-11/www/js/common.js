//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	module.exports={
		jsonp:		function (options)
		{
			options=options||{};
			options.data=options.data||{};
			
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
		},
		setCookie:	function (name, value, iDay)
		{
			var oDate=new Date();
			
			oDate.setDate(oDate.getDate()+iDay);
			
			document.cookie=name+'='+value+';expires='+oDate;
		},
		getCookie:	function (name)
		{
			var arr=document.cookie.split('; ');
			
			for(var i=0;i<arr.length;i++)
			{
				var arr2=arr[i].split('=');
				
				if(arr2[0]==name)
				{
					return arr2[1];
				}
			}
			
			return '';
		},
		removeCookie:	function (name)
		{
			setCookie(name, '1', -1);
		}
	};
});