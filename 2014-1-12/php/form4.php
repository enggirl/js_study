<?php
   
   $user=$_GET['user'];
   $pass=$_GET['pass'];
   $act=$_GET['act'];
   
   //  1.连接数据库
   
   mysql_connect('localhost','root','');
    
   //  2.选择库
   
   mysql_select_db('0112');
   
   
   //  3.查询
   $sql="SELECT * FROM abc";
   
  
   //执行
   
   $result=mysql_query($sql);
   
  // 取数据
  
  // $row=mysql_fetch_row($result);
   
   
   //echo  '第一个用户名是：'.$row[0]."\n";
   //echo  '第一个密码是：'.$row[1];
   
   
   while($row=mysql_fetch_row($result))
   {
	  echo  '用户名是：'.$row[0];
      echo  '密码是：'.$row[1]."<br>"; 
   };

   

?>
