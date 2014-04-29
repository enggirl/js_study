//版权 北京智能社©, 保留所有权利

var mysql=require('mysql');

exports.getDb=function ()
{
	var db=mysql.createConnection({
		host:	'localhost',
		user:	'root',
		password:	'',
		database:	'20140413'
	});
	
	return db;
};