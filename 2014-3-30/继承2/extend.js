//版权 北京智能社©, 保留所有权利

function extend(父级, 子级的属性, 子级的方法)
{
	//Child——子级的构造函数
	function Child()
	{
		//1.继承父级的属性
		父级.apply(this, arguments);
		
		//2.添加子级的属性
		子级的属性.apply(this, arguments);
		
		this._parent=父级;
	}
	
	//3.继承父级的方法
	Child.prototype=new 父级();
	Child.prototype.constructor=Child;
	
	//4.添加子级的方法
	for(var i in 子级的方法)
	{
		Child.prototype[i]=子级的方法[i];
	}
	
	return Child;
}