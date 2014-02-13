function myselect(name,cbFn)
{
	
	var oSe=document.getElementsByName(name)[0];
	
	
   	var oDiv=document.createElement('div');
	oDiv.className='seDiv';
	oSe.parentNode.insertBefore(oDiv,oSe);
   
	var oP=document.createElement('p');
	oDiv.appendChild(oP);
	oP.innerHTML=oSe.options[oSe.selectedIndex].innerHTML;
	
	oP.onmousedown=function()
	{
	  return false;	
	};
	oP.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEvent.cancelBubble=true;
		
	   if(oUl.style.display=='block')
	   {
		 oUl.style.display='none';    
		}
	   else
	   {
		  oUl.style.display='block'; 
	    }
	      	
	};
	
	var oUl=document.createElement('ul');
	oDiv.appendChild(oUl);
	
	for(var i=0;i<oSe.options.length;i++)
	{
	    var oLi=document.createElement('li');
		oUl.appendChild(oLi);
		oLi.innerHTML=oSe.options[i].innerHTML;
		oLi.index=i;
		oLi.onclick=function()
	    {
		  oP.innerHTML=this.innerHTML; 
		  oUl.style.display='none';
		  oSe.selectedIndex=this.index;   
		  cbFn && cbFn(this);   
		};
	   	
	}
	
	
	oSe.style.display='none';
	
	document.onclick=function()
	{
	   	oUl.style.display='none';
	};
	
};