//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var modB=require('b.js');
	var modC=require('c.js');
	
	exports.result=modB.num1+modC.num2;
});