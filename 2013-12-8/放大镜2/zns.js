window.onload=function ()
{
	var oDiv=document.getElementById('div1');
	var oShadow=oDiv.getElementsByTagName('div')[0];
	var oSpan=oDiv.getElementsByTagName('span')[0];
	var oImg=document.getElementById('img1');
	
	oShadow.onmouseover=function ()
	{
		oSpan.style.display='block';
		oImg.parentNode.style.display='block';
	};
	
	oShadow.onmouseout=function ()
	{
		oSpan.style.display='none';
		oImg.parentNode.style.display='none';
	};
	
	oShadow.onmousemove=function (ev)
	{
		var oEvent=ev||event;
		
		var x=oEvent.clientX-oDiv.offsetLeft-oSpan.offsetWidth/2;
		var y=oEvent.clientY-oDiv.offsetTop-oSpan.offsetHeight/2;
		
		if(x<0)
		{
			x=0;
		}
		else if(x>oShadow.offsetWidth-oSpan.offsetWidth)
		{
			x=oShadow.offsetWidth-oSpan.offsetWidth;
		}
		
		if(y<0)
		{
			y=0;
		}
		else if(y>oShadow.offsetHeight-oSpan.offsetHeight)
		{
			y=oShadow.offsetHeight-oSpan.offsetHeight;
		}
		
		oSpan.style.left=x+'px';
		oSpan.style.top=y+'px';
		
		var percentY=y/(oShadow.offsetHeight-oSpan.offsetHeight);
		var percentX=x/(oShadow.offsetWidth-oSpan.offsetWidth);
		var oImgParent=oImg.parentNode;
		
		oImg.style.top=-percentY*(oImg.offsetHeight-oImgParent.offsetHeight)+'px';
		oImg.style.left=-percentX*(oImg.offsetWidth-oImgParent.offsetWidth)+'px';
	};
};
