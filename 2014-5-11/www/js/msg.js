//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var token=require('token.js');
	
	module.exports={
		snd_msg:		function (content, cb)
		{
			var token=token.get();
		},
		get_msg:		function (cb)
		{
			var token=token.get();
		},
		get_msg_n:		function (n, cb)
		{
			var token=token.get();
		}
	};
});