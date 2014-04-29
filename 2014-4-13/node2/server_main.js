//版权 北京智能社©, 保留所有权利

var http=require('http');

var data=require('./data.js');
var userMod=require('./user.js');
var fileMod=require('./file.js');

var dbMod=require('./db.js');

var httpServer=http.createServer(function (request, response){
	data.dataReady(request, function (url, GET, POST){
		switch(url.substring(1))
		{
			case 'user':
				userMod.aaa(response, GET, POST);
				break;
			case 'flow':
				var page=parseInt(GET.page);
				
				var PAGE_SIZE=10;
				
				if(page<1 && !isNaN(page))
				{
					page=1;
				}
				
				//取数据
				var db=dbMod.getDb();
				
				db.query("SELECT * FROM flow LIMIT "+(page-1)*PAGE_SIZE+","+PAGE_SIZE, function (err, data){
					if(err)
					{
						response.write('{err: 1, msg: "数据库出错"}');
						response.end();
					}
					else
					{
						response.write('{err: 0, data: '+JSON.stringify(data)+'}');
						response.end();
					}
				});
				break;
			default:	//文件
				fileMod.sendFile(url, response);
		}
	});
});

httpServer.listen(8080);








