(function(){
	
	window.zns_dataFn=function(id)
	{
		var oTex=document.getElementById(id);
		var oBigDiv=document.createElement('div');
		
		oBigDiv.innerHTML='<ul class="name"><li><span></span><a href="javascript:;" class="a1">上月</a><a href="javascript:;" class="a2">下月</a></li></ul><ul class="week"><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li style="color:#f00;">六</li><li style="color:#f00;">日</li></ul><ul class="dateUl"></ul>';	
			document.body.appendChild(oBigDiv);
			oBigDiv.className='dateDiv';
			var left=getPos(oTex).left;
			var top=getPos(oTex).top;
			oBigDiv.style.display='none';
			oBigDiv.style.left=left+'px';
			oBigDiv.style.top=top+oTex.offsetHeight+'px';
			
			var aUl=oBigDiv.children;
		
			function createLi()
			{
				aUl[2].innerHTML='';  
				 var oneDay=getoneDay(iNow); 
				 if(oneDay==0)oneDay=7;
				 oneDay--;
				 for(var i=0;i<oneDay;i++)
				 {
					var oNewLi=document.createElement('li');
					aUl[2].appendChild(oNewLi);	
				 }
				 
				 
				var days=getDates(iNow); 
				for(var i=0;i<days;i++)
				{
					var oNewLi=document.createElement('li');
					oNewLi.innerHTML=i+1;
					aUl[2].appendChild(oNewLi);	
					
					//加点击
					oNewLi.onclick=function()
					{
						if(this.className=='ccc')
						{
						   alert('日期已过');
						   return;	
						}
						else
						{
							//oTex  
							oBigDiv.style.display='none';
							var oDate=new Date();
							//  oDated存了一个时间。这个时间是现在的日期和时间分秒   2013,12,22   
							oDate.setMonth( oDate.getMonth()+iNow );
							//  2014,1,22
							//  有一个bug,跟多少号是有关系
							oTex.value=oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+this.innerHTML;	
						}
					};
				};
				
				
				
				
				var oSpan=oBigDiv.getElementsByTagName('span')[0];
				var oDate=new Date();
				oDate.setMonth( oDate.getMonth()+iNow ); // 5-
				oSpan.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月';
				var aLi=aUl[2].children;
				if(iNow<0)
				{	
				   for(var i=0;i<aLi.length;i++)
					{
						aLi[i].className='ccc';	
					};
				}
				else if(iNow==0)
				{
				   for(var i=0;i<aLi.length;i++)
					{
						if(aLi[i].innerHTML<oDate.getDate())
						{
							aLi[i].className='ccc';	
						}	
						else if(aLi[i].innerHTML==oDate.getDate())
						{
							aLi[i].className='red';
						}
						else if(i%7==5||i%7==6)  //星期六星期天
						{
							aLi[i].className='sun';
						};
					};	
				}
				else
				{
					for(var i=0;i<aLi.length;i++)
					{
						if(i%7==5||i%7==6)  //星期六星期天
						{
							aLi[i].className='sun';
						};
					};	
				}
					
			};
			var iNow=0;
			createLi(); 
			var a=oBigDiv.getElementsByTagName('a');
			var oPre=a[0];
			var next=a[1];
	
			oPre.onclick=function()
			{
				iNow--;
				createLi();
			};
			
			next.onclick=function()
			{
				iNow++;
				createLi();
			};
		
		
		
		oTex.onclick=function(ev)
		{
			var oEvent=ev||event;
			oEvent.cancelBubble=true;
			
			oBigDiv.style.display='block';	
		};
		
		oBigDiv.onclick=function(ev)
		{
			var oEvent=ev||event;
			oEvent.cancelBubble=true;	
		};
		
	
		addEvent(document,'click',function(){
				oBigDiv.style.display='none';	
		});
	};
	
	
	
	
	var oLink=document.createElement('link');
	oLink.href='css.css';
	oLink.rel='stylesheet';
	oLink.type='text/css';
	document.getElementsByTagName('head')[0].appendChild(oLink);
	
	
	function addEvent(obj,sEv,fn)
	{
		if(document.addEventListener)
		{
			obj.addEventListener(sEv,fn,false);	
		}	
		else
		{
			obj.attachEvent('on'+sEv,fn)	
		};
	}
	function getDates(iNow)
	{
		var oDate=new Date();
		oDate.setMonth( oDate.getMonth()+iNow );
		oDate.setMonth( oDate.getMonth()+1 );  //到下个月
		oDate.setDate(0);  //上个月最后一天
		return oDate.getDate();		
	};
	
	
	//本月第一天是星期
	function getoneDay(iNow)
	{
		var oDate=new Date();
		oDate.setMonth( oDate.getMonth()+iNow );	
		oDate.setDate(1);
		return oDate.getDay();  //  返回0-6
	};
	
	function getPos(obj)
	{
		var l=0;
		var t=0;
		while(obj)
		{
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj=obj.offsetParent;	
		};
		
		return {left:l,top:t};
	};
})();