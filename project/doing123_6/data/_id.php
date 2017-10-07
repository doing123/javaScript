<?php
	header('Content-Type:application/json;charset=utf-8');
	$order_id=$_REQUEST['order_id'];
	//var_dump($order_id);
	//echo $order_id;
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	mysqli_query($conn,"SET NAMES UTF8");
	$sql='SELECT product_id FROM jd_order_product_detail WHERE order_id=$order_id';
	$result=mysqli_query($conn,$sql);
	echo json_encode($result);
	//var_dump($result);
	$arr=[];
	while(($row=mysqli_fetch_assoc($result))!==null){
		$arr[]=$row;
	};
	$str=json_encode($arr);
	echo $str;
	//$arr[]=$row;
	//var_dump($row);
	/*$row=mysqli_fetch_row($result);
	$str=json_encode($row);
	echo $str;*/
?>