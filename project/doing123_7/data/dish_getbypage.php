<?php
 /**分页查询数据，由main.html调用**/
 header('Content-Type:application/json');
$output = [];

$count = 5; //一次最多查询 5 条
@$start = $_REQUEST['start'];  //@符号可以压制当前行产生的错误提示

if(empty($start)) {
    $start = 0; //默认从 0 开始
 }

 //$conn = mysqli_connect('127.0.0.1','root','','kaifanla');
 $conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT did,name,price,img_sm,material  FROM  kf_dish  LIMIT  $start,$count";
 $result = mysqli_query($conn, $sql);
 while( true ){
     //从结果集中读取一行记录
     $row = mysqli_fetch_assoc($result);
     if(! $row ){  //没有获取到更多记录行
         break;
     }
     $output[] = $row;
 }

  echo json_encode($output);
  ?>