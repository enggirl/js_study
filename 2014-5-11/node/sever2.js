//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');
var qs=require('querystring');

var mod=require('./www/public.js');

console.log(mod.re);

http.createServer(function (request, response){
	var url='';
	var GET={};
	
	if(request.url.indexOf('?')!=-1)
	{
		var arr=request.url.split('?');
		
		url=arr[0];
		GET=qs.parse(arr[1]);
	}
	else
	{
		url=request.url;
		GET={};
	}
	
	fs.readFile('www'+url, function (err, data){
		if(/\.js$/i.test(url) && url!='/sea.js')
		{
			data+='';
			if(data.indexOf('define(')==-1)
			{
				data=
					'define(function (require, exports, module){'+
					data+
					'});'
			}
		}
		
		response.write(data);
		response.end();
	});
}).listen(8080);