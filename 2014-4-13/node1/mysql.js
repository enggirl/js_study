//版权 北京智能社©, 保留所有权利

var mysql=require('mysql');

var db=mysql.createConnection({
	host:		'localhost',
	user:		'root',
	password:	'',
	database:	'20140413'
});

//query('SQL语句', 回调函数);
db.query('SELECT * FROM user_table', function (err, data){
	//console.log(err);
	if(err)
	{
		console.log('数据有错');
	}
	else
	{
		console.log(data);
	}
});






