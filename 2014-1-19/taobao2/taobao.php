<?php
header("Content-type: text/html; charset=utf-8");
/*
**********************************************
	Author:	strive
	Date:	2012-4-5

	usage:
==============================================================
		taobao.php?act=insert&goods_name=xxx&goods_price=xxx&goods_img=xxx&click_url=xxx&goods_count=xxx&shop_name=xxx&shop_addr=xxx   添加商品
返回：
	{error: 0, des:'商品添加成功'}

==============================================================
	taobao.php?act=random	随机获取几条数据
返回:[{"id":"4","goods_name":xxxx","goods_price":"xx","goods_img":"url","click_url":"","goods_count":"0","shop_name":"","city":""}]
==============================================================
	taobao.php?act=search&key=xxx&page=1;  搜索
返回：[5,{"id":"4","goods_name":xxxx","goods_price":"xx","goods_img":"url","click_url":"","goods_count":"0","shop_name":"","city":""}]

数组的第一项是搜索分页个数
		
==============================================================
	taobao.php?act=get&page=1  获取一页的宝贝
返回：跟以上数据一样

==============================================================
	taobao.php?act=get_page;  获取所有页码
返回：{count: {5}}	

**********************************************
*/
$conn=@mysql_connect('localhost','root','admin') or mysql_connect('localhost','root','') or die('数据库连接错误: ' . mysql_error());

mysql_query('CREATE DATABASE taobao_test');
mysql_select_db('taobao_test',$conn) or die('数据库错误:'.mysql_error());
mysql_query('set names utf8');

$create_table="CREATE TABLE `taobao` (
  `id` int(50) NOT NULL auto_increment,
  `goods_name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `goods_price` varchar(50) collate utf8_unicode_ci NOT NULL,
  `goods_img` varchar(50) collate utf8_unicode_ci NOT NULL,
  `click_url` varchar(50) collate utf8_unicode_ci NOT NULL,
  `goods_count` int(50) NOT NULL,
  `shop_name` varchar(128) collate utf8_unicode_ci NOT NULL,
  `city` varchar(50) collate utf8_unicode_ci default '北京',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6";
mysql_query($create_table);



$act=$_GET['act'];
$key=urldecode($_GET['key']);
$page=(int)$_GET['page'];
$page--;
$page_size=2;
$s=$page*$page_size;

if(strlen($key)>0){
	$w=<<<ENDL
goods_name LIKE '%{$key}%'
ENDL;
}
else{
	$w='1=1';
}


switch($act){
	case 'search':
		$sql="SELECT * FROM taobao WHERE {$w} LIMIT {$s},{$page_size}";
		$sqlSearch="SELECT count(*) FROM taobao WHERE {$w}";
		$allSearchNum=mysql_fetch_array(mysql_query($sqlSearch));
		$serachCount=ceil((int)$allSearchNum[0]/$page_size);
		
		break;
	case 'random':
		$sql="SELECT * FROM taobao ORDER BY RAND() LIMIT 3";
		break;
	case 'get':
		$sql="SELECT * FROM taobao LIMIT {$s},{$page_size}";
		break;
	case 'get_page':
		$sql="SELECT count(*) AS count FROM taobao";
		$allNum=mysql_fetch_array(mysql_query($sql));
		$count=ceil((int)$allNum[0]/$page_size);
		echo "{count: {$count}}";continue;
		break;
	case 'insert':
		$goods_name=$_GET['goods_name'];
		$goods_price=$_GET['goods_price'];
		$goods_img=$_GET['goods_img'];
		$click_url=$_GET['click_url'];
		$goods_count=$_GET['goods_count'];
		$shop_name=$_GET['shop_name'];
		$shop_addr=$_GET['shop_addr'];
		$insertsql="INSERT INTO `taobao` VALUES ('".$goods_name."', '".$goods_price."', '".$goods_img."', '".$click_url."', ".$goods_count.", '".$shop_name."', '".$shop_addr."');";
		$insertsql="INSERT INTO  `taobao_test`.`taobao` (
				`id` ,
				`goods_name` ,
				`goods_price` ,
				`goods_img` ,
				`click_url` ,
				`goods_count` ,
				`shop_name` ,
				`city`
				)
				VALUES (
				NULL ,  '".$goods_name."',  '".$goods_price."',  '".$goods_img."',  '".$click_url."',  '".$goods_count."',  '".$shop_name."',  '".$shop_addr."')";
		//echo $insertsql;exit;
		mysql_query($insertsql);
		echo "{error: 0, des:'商品添加成功'}";	
		break;
	default:
		echo "{'act是不能少的亲'}";exit();	
}
$result=mysql_query($sql);

if($act=='insert')exit();
$jsonMsg=array();

if($act=='search'){
	$jsonMsg[0]=$serachCount;	
}
while($row=mysql_fetch_array($result)) {
	foreach($row as $key=>$value){
		if(is_numeric($key))unset($row[$key]);
	}
  	$jsonMsg[]=$row;
}
if($act=='get_page'){
}else{
	echo json_encode($jsonMsg);
}
?>