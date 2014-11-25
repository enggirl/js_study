//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');
var qs=require('querystring');

function getModName()
{
	var s='____mod'+Math.random();
	
	s=s.replace('.', '');
	
	return s;
}

http.createServer(function (request, response){
	var url='';
	var GET={};
	
	if(request.url.indexOf('?')!=-1)
	{
		var arr=request.url.split('?');
		
		url=arr[0];
		GET=qs.parse(arr[1]);
	}
	else
	{
		url=request.url;
		GET={};
	}
	
	fs.readFile('www'+url, function (err, data){
		if(err)
		{
			response.write('404');
			response.end();
		}
		else
		{
			if(/\.js$/i.test(url) && url!='/sea.js')
			{
				var total=0;
				var count=0;
				//找出所有require
				var str=data+'';
				str=str.replace(/require\(.*\)/g, function (s){
					total++;
					var name=getModName();
					
					//1.读文件
					var fName=s.replace(/require\(['"]/i, '').replace(/['"]\)/, '');
					(function (name){
						fs.readFile('www/'+fName, function (err, data){
							if(err)
							{
								console.log('有错');
							}
							
							data='\nvar '+name+'={};\n'+data;
							
							//1.去壳
							data=data.replace(/define\s*\(\s*function\s*\(\s*require\s*,\s*exports\s*,\s*module\s*\)\s*\{\s*/, '(function (){').replace(/\s*\}\s*\)\s*;\s*?/, '})()');
							
							data=data.replace(/exports|module.exports/g, name);
							
							str=data+''+str;
							count++;
							
							if(count==total)
							{
								response.write(str);
								response.end();
							}
						});
					})(name);
					
					//2.插入页面
					return name;
				});
			}
			else
			{
				response.write(data);
				response.end();
			}
		}
	});
}).listen(8080);