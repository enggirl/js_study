//版权 北京智能社©, 保留所有权利

var fs=require('fs');

//file system

//读取文件——readFile('文件名', 回调函数)
fs.readFile('2.js', function (err, data){	//完成
	//console.log('读完了');
	//console.log(err);
	
	if(err)
	{
		console.log('读取失败');
	}
	else
	{
		console.log('读取成功\n'+data);
	}
})