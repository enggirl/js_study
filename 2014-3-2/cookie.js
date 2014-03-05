function setCookie(name, value, iDay)
{
	var oDate=new Date();
	
	oDate.setDate(oDate.getDate()+iDay);
	
	document.cookie=name+'='+value+';expires='+oDate;
}

function getCookie(name)
{
	//cookie='user=blue; sex=1; city=010; pass=123456'
	var arr=document.cookie.split('; ');
	
	//arr=['user=blue', 'sex=1', ....]
	for(var i=0;i<arr.length;i++)
	{
		var arr2=arr[i].split('=');
		//arr2[0]->'user'
		//arr2[1]->'blue'
		
		if(arr2[0]==name)
		{
			return arr2[1];
		}
	}
	
	//没找到
	return '';
}

function removeCookie(name)
{
	setCookie(name, '1', -1);
}