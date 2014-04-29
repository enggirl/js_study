//版权 北京智能社©, 保留所有权利

var dbMod=require('./db.js');

exports.aaa=function (response, GET, POST)
{
	var re=/^\w{6,24}$/;
	
	if(re.test(GET.user))
	{
		switch(GET.act)
		{
			case 'reg':		//注册
				var db=dbMod.getDb();
				
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
};