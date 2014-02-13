function $(str)
{
	if(typeof str=='function')
	{
	   window.onload=str;	
	}
	else
	{
	    var oneString=str.charAt(0);
		switch(oneString)
		{
		    case '#':
			    return document.getElementById(str.substring(1));
			    break;
		    case '.':
			    return getByClass(document,str.substring(1));
			    break;
		          default:
				return document.getElementsByTagName(str);	  
		}
	}
};

//第一版的BYCLASS
function getByClass(oParent,iClass)
{
	
	if(document.getElementsByClassName) {
		return oParent.getElementsByClassName(iClass); 
	}

	   var arr=[];
	   var aEl=oParent.getElementsByTagName('*');
	   for(var i=0;i<aEl.length;i++)
	   {
		   if(aEl[i].className==iClass)
		   {
			  arr[arr.length]=aEl[i];
			   
		   }   
	   };
	   
	   return arr;

};


function toDou(n)
{
   if(n<10)
   {
	 return '0'+n;   
	}	
	else
	{
	  return ''+n;	
	}
};