//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var common=require('common.js');
	
	var _token='';
	
	module.exports={
		set:	function (str)
		{
			_token=json.token;
			
			common.setCookie('token', _token, 2*7);
		},
		get:	function ()
		{
			if(_token)
			{
				return _token;
			}
			else
			{
				_token=common.getCookie('token');
				
				return _token;
			}
		}
	};
});