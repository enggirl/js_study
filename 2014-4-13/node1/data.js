//版权 北京智能社©, 保留所有权利
var querystring=require('querystring');

exports.dataReady=function (request, fnSucc)
{
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
		
		fnSucc && fnSucc(url, GET, POST);
	});
};



