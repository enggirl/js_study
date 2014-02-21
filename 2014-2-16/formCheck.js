//版权 北京智能社©, 保留所有权利

(function (){
	var reg={
		email:	/^[\w\.]+@[0-9a-z\-]+(\.[a-z]{2,4}){1,2}$/i,
		tel:	/^(0[1-9]\d{1,2}\-)?[1-9]\d{6,7}$/,
		qq:		/^[1-9]\d{4,12}$/,
		age:	/^(1[2-9]|[2-9]\d|100)$/,
		pass:	/^.{6,}$/,
		pass2:	/^.{6,}$/,
		name:	/^[\u4e00-\u9fa5]{2,6}$/
	};
	
	window.formCheck=function (id, fnCheck)
	{
		var oForm=document.getElementById(id);
		
		var aInput=oForm.getElementsByTagName('input');
		
		for(var i=0;i<aInput.length;i++)
		{
			var re=reg[aInput[i].name];
			
			if(re)
			{
				(function (re){
					aInput[i].onblur=function ()
					{
						checkInput(this, re);
					};
				})(re);
			}
		}
		
		function checkInput(oTxt, re)
		{
			if(re.test(oTxt.value))
			{
				/*oTxt.className='ok';
				return true;*/
				if(fnCheck)
				{
					if(false==fnCheck(oTxt))
					{
						oTxt.className='error';
						return false;
					}
					else
					{
						oTxt.className='ok';
						return true;
					}
				}
				else
				{
					oTxt.className='ok';
					return true;
				}
			}
			else
			{
				oTxt.className='error';
				return false;
			}
		}
		
		oForm.onsubmit=function ()
		{
			var ok=true;
			
			for(var i=0;i<aInput.length;i++)
			{
				var re=reg[aInput[i].name];
				
				if(re)
				{
					if(false==checkInput(aInput[i], re))
					{
						ok=false;
					}
				}
			}
			
			if(!ok)
			{
				return false;
			}
		};
	};
})();