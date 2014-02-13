function radio(name)
{
  
   var aSex=document.getElementsByName(name);
   
   //创建 span
   var arr=[];
   for(var i=0;i<aSex.length;i++)
   {
	  var oNEWspan=document.createElement('span');
	  oNEWspan.className='radio_off';
	  arr.push(oNEWspan);
	  aSex[i].parentNode.insertBefore(oNEWspan,aSex[i]);
	   aSex[i].style.display='none';
	  (function(index){
		  oNEWspan.onclick=function()
		  {
			for(var i=0;i<arr.length;i++)
			  {
				
				 arr[i].className='radio_off'; 
			  };
			  this.className='radio_on';
			  aSex[index].checked=true;     
		  };  
		  
	  })(i);
	 
   };
   

};

var oLink=document.createElement('link');
oLink.href='myradio/r.css';
oLink.type='text/css';
oLink.rel='stylesheet';
document.getElementsByTagName('head')[0].appendChild(oLink);
   