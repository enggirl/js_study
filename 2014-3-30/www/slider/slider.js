//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var move=require('move.js');
	
	exports.create=function (id)
	{
		//幻灯片
		var oDiv=document.getElementById(id);
		var aBtn=oDiv.getElementsByTagName('ol')[0].children;
		var aLi=oDiv.getElementsByTagName('ul')[0].children;
		
		for(var i=0;i<aBtn.length;i++)
		{
			(function (index){
				aBtn[i].onmouseover=function ()
				{
					for(var i=0;i<aBtn.length;i++)
					{
						aBtn[i].className='';
						move.startMove(aLi[i], {opacity: 0});
					}
					this.className='active';
					move.startMove(aLi[index], {opacity: 100});
				};
			})(i);
		}
	};
});