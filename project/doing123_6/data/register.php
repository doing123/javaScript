<?php
	header('Content-Type:text/plain;charset=utf-8');
	$uname=$_REQUEST['uname'];
	$upwd=$_REQUEST['upwd'];
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
    mysqli_query($conn,"SET NAMES UTF8");
    $sql="SELECT user_id FROM jd_users WHERE user_name='$uname' AND user_pwd='$upwd'";
    $result=mysqli_query($conn,$sql);
    if($result===FALSE){
        echo "SQL语句语法错误：".$sql;
    }else{
        $row=mysqli_fetch_assoc($result);
        if($row===null){
            echo "bucunzai";
        }else{
            echo "cunzai";
        }
    }	
	
?>
