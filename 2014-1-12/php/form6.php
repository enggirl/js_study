<?php
   
   $user=$_GET['user'];
   $pass=$_GET['pass'];
   $act=$_GET['act'];
   
   //  1.连接数据库
   
   mysql_connect('localhost','root','');
    
   //  2.选择库
   
   mysql_select_db('0112');
   
   
   if($act=='login')
   {

  		 $sql="SELECT * FROM abc WHERE user='".$user."'";
		 //   WHERE  写条件  
  		 $result=mysql_query($sql); 
		 
		 $row=mysql_fetch_row($result); 
		 
		 if($row)
		 {
			 if($row[1]==$pass)
			 {
				echo '{error:0,desc:"ok"}'; 
			 }
			 else
			 {
			   	echo '{error:1,desc:"密码错误"}'; 
			 }; 
	     }
		 else
		 {
		 	echo '{error:1,desc:"没有这个用户"}';
				 
		 }; 
		 
   }
   else
   {
	     $sql="SELECT * FROM abc WHERE user='".$user."'";
		 //   WHERE  写条件  
  		 $result=mysql_query($sql); 
		 
		 $row=mysql_fetch_row($result); 
		 
		 if($row)
		 {
			   	echo '{error:1,desc:"有这个用户名"}'; 
	     }
		 else
		 {
			 
		 //  $sql="INSERT INTO abc VALUES('用户名','密码')"; 
		  $sql="INSERT INTO abc VALUES('".$user."','".$pass."')"; 
		  
		  mysql_query($sql);
		  
		  
			 
		 	echo '{error:0,desc:"注册成功"}';
				 
		 };
	  
	  
	     
    }
   
   

   


?>
