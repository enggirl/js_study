window.onload=function()
{
   ///********用户是不是也可能会写一个 onload
   // 会覆盖
   
   var aInput=document.getElementsByTagName('input');
   
   /*for(var i=0;i<aInput.length;i++)
   {
	   if(aInput[i].getAttribute('_myradio'))   
	   {
		  //同一个name会执行三次 
		  radio(aInput[i].name);   
	   }
   }*/
   
   
   var arr=[];
   
   for(var i=0;i<aInput.length;i++)
   {
	   
	   if(aInput[i].getAttribute('_myradio')&&aInput[i].type=='radio'&&!findSame(arr,aInput[i].name))   
	   {
		   
		  radio(aInput[i].name);   
		  arr.push(aInput[i].name);
	   }
   };
   
   function findSame(arr,n)
   {
	  for(var i=0;i<arr.length;i++)
	  {
		 if(arr[i]==n)
		 {
		   return true;	 
	     } 
		    
	  } ;
	  
	  //要没有相同的
	  return false;
	      
   }
   	
};


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
   