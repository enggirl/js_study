//版权 北京智能社©, 保留所有权利

var LimitDrag=extend(Drag, function (){}, {
	//重写父级的方法——覆盖
	fnMove:		function (ev)
	{
		//1.执行父级原有的方法
		var oldMove=this._parent.prototype.fnMove;
		
		oldMove.call(this, ev);
		
		//2.做子级的事
		if(this.obj.offsetLeft<0)
		{
			this.obj.style.left=0;
		}
		if(this.obj.offsetTop<0)
		{
			this.obj.style.top=0;
		}
	}
});

/*function LimitDrag()
{
}

LimitDrag.prototype=new Drag();*/