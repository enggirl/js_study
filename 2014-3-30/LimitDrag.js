//版权 北京智能社©, 保留所有权利

var LimitDrag=extend(Drag, function (){}, {
	//重写父级的方法——覆盖
	fnMove:		function (ev)
	{
		var oEvent=ev||event;
		
		var l=oEvent.clientX-this.disX;
		var t=oEvent.clientY-this.disY;
		
		if(l<0)
		{
			l=0;
		}
		
		if(t<0)
		{
			t=0;
		}
		
		this.obj.style.left=l+'px';
		this.obj.style.top=t+'px';
	}
});

/*function LimitDrag()
{
}

LimitDrag.prototype=new Drag();*/