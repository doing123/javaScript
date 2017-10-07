<?php
	header('Content-Type:application/json;charset=utf-8');
	$product_id=$_REQUEST['product_id'];
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	mysqli_query($conn,"SET NAMES UTF8");
	$sql='SELECT product_img FROM jd_products WHERE product_id="$product_id"';
	$result=mysqli_query($conn,$sql);
	$arr=[];
	while(($row=mysqli_fetch_assoc($result))!==null){
		$arr[]=$row;
	};
	$str=json_encode($arr);
	echo $str;
?>