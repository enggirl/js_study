//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	//模块
	
	//require		请求、包含
	//exports		输出、导出
	//module		模块
	
	//必须exports，然后外面才能用
	
	var modA=require('a.js');
	var modB=require('b.js');
	
	exports.sum=function ()
	{
		alert(modA.num+modB.num);
	};
});


