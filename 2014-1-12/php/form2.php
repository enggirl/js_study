<?php
   
   //echo 324234;
   
   $user=$_GET['user'];
   $pass=$_GET['pass'];
   
   
  if($user=='abc'&&$pass=='abc')
  {
	  echo '{error:0,desc:"成功"}';  
  }
  else
  {
	  echo '{error:1,desc:"不成功"}';  
  }
   
   

?>
