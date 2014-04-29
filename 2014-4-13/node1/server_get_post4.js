//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');

var data=require('./data.js');
var userMod=require('./user.js');
var fileMod=require('./file.js');

var httpServer=http.createServer(function (request, response){
	data.dataReady(request, function (url, GET, POST){
		if(url=='/user')
		{
			userMod.aaa(response, GET, POST);
		}
		else
		{
			fileMod.sendFile(url, response);
		}
	});
});

httpServer.listen(8080);








