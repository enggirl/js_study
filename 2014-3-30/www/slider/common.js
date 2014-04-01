//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	module.exports={
		getByClass:		function (oParent, sClass)
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
		},
		addReady:		function (fn)
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
		},
		getStyle:		function (obj, name)
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
	};
});