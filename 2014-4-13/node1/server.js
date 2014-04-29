//版权 北京智能社©, 保留所有权利

var http=require('http');

var httpServer=http.createServer(function (request, response){	//回调函数
	//当有人来访问的时候——执行
	//request		请求		被请求——输入
	//response		响应		主动——输出
	
	console.log('有人来了');
});

//监听——等着
httpServer.listen(8080);








