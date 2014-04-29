//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');

var httpServer=http.createServer(function (request, response){
	//get——url中
	var url='';	//真正的地址
	var GET={};	//装结果
	
	// /user?user=xxx&pass=xxx
	if(request.url.indexOf('?')!=-1)
	{
		var arr=request.url.split('?');
		//arr[0]	->	文件名	'/user'
		//arr[1]	->	参数		'user=xxx&pass=xxx'
		
		url=arr[0];	//?之前的东西
		
		var arr2=arr[1].split('&');
		//arr2->['user=xxx', 'pass=xxx']
		
		for(var i=0;i<arr2.length;i++)
		{
			//user=xxx
			var arr3=arr2[i].split('=');
			//arr3[0]	->	名字	'user'
			//arr3[1]	->	值	'xxx'
			
			GET[arr3[0]]=arr3[1];
		}
	}
	else
	{
		url=request.url;
		GET={};
	}
	
	console.log(url, GET);
	
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
});

httpServer.listen(8080);








