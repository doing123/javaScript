<?php
/**根据手机号查询订单数据**/
header('Content-Type:application/json');

$output = [];

@$phone = $_REQUEST['phone'];
if(empty($phone)){
    echo "[]"; //若客户端未提交电话号码，则返回一个空数组，
    return;    //并退出当前页面的执行
}

//访问数据库
//$conn = mysqli_connect('127.0.0.1','root','','kaifanla');
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql = 'SET NAMES utf8';
mysqli_query($conn, $sql);
$sql = "SELECT kf_order.oid,kf_order.user_name,kf_order.order_time,kf_dish.img_sm,kf_dish.did FROM kf_order,kf_dish WHERE kf_order.did=kf_dish.did AND kf_order.phone='$phone'";
$result = mysqli_query($conn, $sql);
//根据编号查询，结果集最多只有一行记录
while( ($row=mysqli_fetch_assoc($result))!==NULL ){
    $output[] = $row;
}

echo json_encode($output);
?>