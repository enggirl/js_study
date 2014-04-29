//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');
var querystring=require('querystring');

var httpServer=http.createServer(function (request, response){
	//post——不在url中
	//request.addListener('事件名', function (){});
	
	var tmp='';
	var POST={};
	
	//data事件——当有post数据到达的时候
	request.addListener('data', function (data){
		tmp+=data;
	});
	
	//end事件——当所有数据都到达的时候；就算没有post数据，end事件也会发生
	request.addListener('end', function (){
		//处理tmp
		//console.log(tmp);
		POST=querystring.parse(tmp);
		
		console.log(POST);
	});
	
	
	
	
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








