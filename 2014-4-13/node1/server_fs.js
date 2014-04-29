//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');

var httpServer=http.createServer(function (request, response){
	
	//localhost/a.html		url="/a.html"		"www/a.html"
	//localhost/index.html	url="/index.html"	"www/index.html"
	
	var fName='www'+request.url;
	fs.readFile(fName, function (err, data){
		if(err)
		{
			response.write('404');
		}
		else
		{
			response.write(data);
		}
		response.end();
	});
	
	console.log('有人来了：'+request.url);
});

httpServer.listen(8080);








