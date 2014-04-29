//版权 北京智能社©, 保留所有权利

var http=require('http');

var httpServer=http.createServer(function (request, response){	//回调函数
	//当有人来访问的时候——执行
	
	response.write('<html><head><title>标题</title></head><body><div style="width:200px; height:200px; background:red;"></div></body></html>');
	response.end();
	
	console.log('有人来了：'+request.url);
});

//监听——等着
httpServer.listen(8080);








