//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var common=require('common.js');
	var config=require('config.js');
	var token=require('token.js');
	
	var jsonp=common.jsonp;
	var url=config.API_URL;
	var cbName=config.CB_NAME;
	var timeout=config.TIMEOUT;
		
	module.exports={
		/*M*/
		reg:				function (user, pass, face, cb)
		{
			//检验-TODO
			
			jsonp({
				url:	url,
				data:	{
					a:		'reg',
					user:	user,
					pass:	pass,
					face:	face
				},
				cbName:	cbName,
				success:cb,
				timeout:timeout
			});
		},
		lgn:				function (user, pass, cb)
		{
			jsonp({
				url:	url,
				data:	{
					a:	'lgn',
					user:user,
					pass:pass
				},
				cbName:	cbName,
				success:function (json)
				{
					if(!json.err)
					{
						token.set(json.token);
					}
					
					cb(json);
				},
				timeout:	timeout
			});
		},
		logout:				function (cb)
		{
			var token=token.get();
		},
		get_user_list:		function (cb)
		{
			var token=token.get();
			
			jsonp({
				url:	url,
				data:	{
					a:	'get_user_list',
					token:	token
				},
				cbName:	cbName,
				success:	cb,
				timeout:	timeout
			});
		},
		
		/*V*/
		
		/*C*/
		user_reg:	function ()
		{
		}
	};
});







