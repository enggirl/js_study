//版权 北京智能社©, 保留所有权利

exports.sendFile=function (url, response)
{
	var fName='www'+url;
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
};