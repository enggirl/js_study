//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var jsonp=require('common.js').jsonp;
	var url=require('config.js').API_URL;
	
	module.exports={
		//M
		reg:			function (user, pass, face, fnSucc)
		{
			jsonp(url, {
				a:		'reg',
				user:	user,
				pass:	pass,
				face:	face
			}, 'cb', fnSucc);
		},
		lgn:			function ()
		{
		},
		logout:			function ()
		{
		},
		get_user_list:	function ()
		{
		},
		//V
		create_user_list:function ()
		{
		}
	};
});