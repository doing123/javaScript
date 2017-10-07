<?php
	header('Content-Type:application/json');
	//老师的思路-------------------------------------------------------
	/**返回当前登录的用户的订单信息，返回数据形如：
{
	"record_count": 22,	//总记录数
	"page_size": 5,		//页面大小
	"page_count": 5,	//总页数
	"cur_page": 5,		//当前页号
	"data": [ {},{},{},{},{} ]//当前页中的数据
}
**/
	$pager=[
		'record_count'=>0,
		'page_size'=>5,
		'page_count'=>0,
		'cur_page'=>intval($_REQUEST['pno']),
		'data'=>null
	];
	$uname=$_REQUEST['uname'];
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	mysqli_query($conn,"SET NAMES UTF8");
	///获取符合条件的总记录数
	$sql="SELECT COUNT(order_id) FROM jd_orders WHERE user_name='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$pager['record_count']=intval($row['COUNT(order_id)']);//把string解析为int
	///计算总页数 = 总记录数/页面大小
	$pager['page_count']=ceil($pager['record_count']/$pager['page_size']);

	///获取当前页号对应的记录
	$start = ($pager['cur_page']-1)*$pager['page_size'];
	$count = $pager['page_size']; //想读取的记录数量
	$sql = "SELECT * FROM jd_orders WHERE user_name='$uname' LIMIT  $start, $count";
	$result = mysqli_query($conn, $sql);

	if($result===false){
		echo '{"msg":"SQL ERR!"}';
		return;
	}
	$arr=[];
	while(($row=mysqli_fetch_assoc($result))!==null){
		$row['productList']=[];
		$oid=$row['order_id'];
		$sql="SELECT * FROM jd_products WHERE product_id IN ( SELECT product_id FROM jd_order_product_detail WHERE order_id=$oid)";
		$productResult=mysqli_query($conn,$sql);
		while(($p=mysqli_fetch_assoc($productResult))!==null){
			$row['productList'][]=$p;
		}
		$arr[]=$row;
	};
	$pager['data']=$arr;
	$str=json_encode($pager);
	echo $str;
?>