//版权 北京智能社©, 保留所有权利

$.fn.slider=function (){
	this.each(function (index, element){
		var aBtn=$(this).find('ol li');
		var oUl=$(this).find('ul');
		var aLi=oUl.find('li');
		
		var now=0;
		
		aBtn.mouseover(function (){
			now=$(this).index();
			
			tab();
		});
		
		function tab()
		{
			aBtn.removeClass('active');
			aBtn.eq(now).addClass('active');
			
			oUl.stop().animate({top: -now*150+'px'});
		}
		
		var timer=setInterval(next, 2000);
		function next()
		{
			now++;
			
			if(now==aLi.length)
			{
				now=0;
			}
			
			tab();
		}
		
		$('#play').hover(function (){
			clearInterval(timer);
		}, function (){
			timer=setInterval(next, 2000);
		});
	});
};