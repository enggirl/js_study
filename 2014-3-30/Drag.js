//版权 北京智能社©, 保留所有权利

function Drag(obj)
{
	//父级准备：
	//1.真的执行函数
	//2.为了继承执行
	
	/*
	if(obj)		//真的要执行——真的要加拖拽
	{
		var _this=this;
		this.obj=obj;
		
		this.obj.onmousedown=function (ev)
		{
			_this.fnDown(ev);
		};
	}
	*/
	
	if(!obj)		//想继承
	{
		return;
	}
	
	var _this=this;
	this.obj=obj;
	
	this.obj.onmousedown=function (ev)
	{
		_this.fnDown(ev);
	};
}

Drag.prototype.fnDown=function (ev)
{
	var _this=this;
	var oEvent=ev||event;
	
	this.disX=oEvent.clientX-this.obj.offsetLeft;
	this.disY=oEvent.clientY-this.obj.offsetTop;
	
	document.onmousemove=function (ev)
	{
		_this.fnMove(ev);
	};
	document.onmouseup=function ()
	{
		_this.fnUp();
	};
	
	return false;
};

Drag.prototype.fnMove=function (ev)
{
	var oEvent=ev||event;
	
	this.obj.style.left=oEvent.clientX-this.disX+'px';
	this.obj.style.top=oEvent.clientY-this.disY+'px';
};

Drag.prototype.fnUp=function ()
{
	document.onmousemove=null;
	document.onmouseup=null;
};