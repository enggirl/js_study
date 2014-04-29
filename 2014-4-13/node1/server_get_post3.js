//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');
var querystring=require('querystring');
var mysql=require('mysql');

var httpServer=http.createServer(function (request, response){
	//post——不在url中
	//request.addListener('事件名', function (){});
	
	//get
	var GET={};
	if(request.url.indexOf('?')!=-1)
	{
		var arr=request.url.split('?');
		//arr[0]	->	文件名	'/user'
		//arr[1]	->	参数		'user=xxx&pass=xxx'
		
		url=arr[0];	//?之前的东西
		GET=querystring.parse(arr[1]);
	}
	else
	{
		url=request.url;
		GET={};
	}
	
	//post
	var tmp='';
	var POST={};
	
	//data事件——当有post数据到达的时候
	request.addListener('data', function (data){
		tmp+=data;
	});
	
	//end事件——当所有数据都到达的时候；就算没有post数据，end事件也会发生
	request.addListener('end', function (){
		//处理tmp
		POST=querystring.parse(tmp);
		
		//user不是文件——接口：程序
		if(url=='/user')	//请求接口
		{
			var re=/^\w{6,24}$/;
			
			if(re.test(GET.user))
			{
				switch(GET.act)
				{
					case 'reg':		//注册
						var db=mysql.createConnection({
							host:	'localhost',
							user:	'root',
							password:	'',
							database:	'20140413'
						});
						
						db.query("SELECT * FROM user_table WHERE username='"+GET.user+"'", function (err, data){
							if(err)
							{
								response.write('{err: 1, msg: "数据库出错"}');
								response.end();
							}
							else
							{
								if(data.length>0)
								{
									response.write('{err: 1, msg: "用户名已被占用"}');
									response.end();
								}
								else
								{
									//插入
									db.query("INSERT INTO user_table VALUES('"+GET.user+"', '"+GET.pass+"')", function (err, data){
										if(err)
										{
											response.write('{err: 1, msg: "数据库出错"}');
											response.end();
										}
										else
										{
											response.write('{err: 0, msg: "注册成功"}');
											response.end();
										}
									});
								}
							}
						});
						break;
					case 'login':	//登录
						var db=mysql.createConnection({host: 'localhost', user: 'root', password: '', database: '20140413'});
						
						db.query("SELECT * FROM user_table WHERE username='"+GET.user+"'", function (err, data){
							if(err)
							{
								response.write('{err: 1, msg: "数据库出错"}');
								response.end();
							}
							else
							{
								if(data.length==0)
								{
									response.write('{err: 1, msg: "用户名未注册"}');
									response.end();
								}
								else
								{
									if(data[0].password==GET.pass)
									{
										response.write('{err: 0, msg: "登录成功"}');
										response.end();
									}
									else
									{
										response.write('{err: 1, msg: "密码错误"}');
										response.end();
									}
								}
							}
						});
						break;
				}
			}
			else
			{
				response.write('{err: 1, msg: "用户名不符合规范"}');
				response.end();
			}
		}
		else
		{
			var fName='www'+url;
			fs.readFile(fName, function (err, data){
				//都完成了
				
				//GET
				//POST
				//文件
				
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
		}
	});
});

httpServer.listen(8080);








