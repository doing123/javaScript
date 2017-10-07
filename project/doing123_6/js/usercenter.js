$('section').load('header.php');
$('#foot').load('footer.php');

//登录-------------------------------------------------------
$('#btn').click(function(){
	var result=$('#login-form').serialize();
	//console.log(result);
	$.post('data/register.php',result,function(txt){
		//console.log(arguments);
		if(txt==="cunzai"){
			//alert('登陆成功！');
			
			$('.model').css('display','none');
			//var uname=$('#uname').val();
			var uname = $('[name="uname"]').val();
			//$('.model').fadeOut();
			$('.welcome-msg').html('欢迎回来！'+uname);
			loadOrders(uname,1);
			drawBuyState(uname);//异步请求消费统计信息，绘制统计图
			drawLuckLottery();//绘制幸运抽奖内容
		}else if(txt==='bucunzai'){
			alert('用户名不存在，请重新登录！');
		}
	});
});
//我的京东---------------------------------------------------
	/*var M=parseFloat(getComputedStyle(main).width);
	var L=parseFloat(getComputedStyle(left_nav).width);
	console.log(M-L);
	var T=M-L-1+"px";
	console.log(T);
	right_main.style.width=T;*/
$('#left_nav ul li a').click(function(){
	event.preventDefault();
	$(this).parent().addClass('active').siblings('.active').removeClass('active');
	var id=$(this).attr('href');
	$(id).addClass('active').siblings('.active').removeClass('active');
});
function loadOrders(uname,pno){
	$.getJSON('data/my_order2.php',{uname:uname,pno:pno},function(arr,msg,xhr){
		//console.log(arguments);
		var arr1=arr.data;
		$('#my_order>table>tbody').empty();
		for(var i=0;i<arr1.length;i++){
			var e=arr1[i];
			var str='<tr><td colspan="6"> 订单编号：'
				+e.order_num+'<a href="#">'+e.shop_name+'</a></td></tr>'
				+'<tr><td>';
			//老师的思路-----------------------------------------------------------------------
			$.each(e.productList,function(j,p){
				//console.log(arguments);
				str+='<a href="'+p.product_url +'"><img src="'+p.product_img+'"title="'+p.product_name+'"></a>';
			});
			/*$.each(e.order_id1,function(j,p){
				console.log(arguments);
				str+='<a href="'+p.product_url +'"><img src="'+p.product_img+'"title="'+p.product_name+'"></a>';
			});*/
				str+='</td><td>'
				+e.user_name+'</td><td><span>'
				+e.price+'</span><br><span>'
				+e.payment_mode+'</span></td><td>'
				+e.submit_time+'</td><td>'
				+e.order_state+'</td><td>'
				+'<a href="#">查看</a><br>'
                +'<a href="#">确认收货</a><br>'
                +'<a href="#">取消订单</a>'
				+'</td></tr>';
			$('#my_order>table>tbody').append(str);	
		};
		//////////创建动态的分页条//////////
		$('.pager').empty();
		//当前-2页
		if(arr.cur_page-2>0){
			$('.pager').append('<li><a href="#">'+(arr.cur_page-2)+'</a></li>');
		};
		//当前-1页
		if(arr.cur_page-1>0){
			$('.pager').append('<li><a href="#">'+(arr.cur_page-1)+'</a></li>');
		};
		//当前页
		$('.pager').append('<li class="active"><a href="javascript: loadOrders(\'强东\', '+arr.cur_page+')">'+arr.cur_page+'</a></li>');
		/*var cur=arr.cur_page;
		var Str='<li><a>上一页</a></li>'+
          '<li class="active"><a href="javascript: loadOrders(\'强东\', '+cur+')">'+cur+'</a></li>';
		for(var i=1;i<arr.page_count;i++){
			Str+=' <li><a>'+(cur+i)+'</a></li>';
		}
        Str+='<li><a>下一页</a></li>';
		$('.pager').append(Str);*/
		//当前+1页
		if(arr.cur_page+1<=arr.page_size){
			$('.pager').append('<li><a href="javascript: loadOrders(\'强东\', '+(arr.cur_page+1)+')">'+(arr.cur_page+1)+'</a></li>');
		};
		//<a href="javascript:loadOrders('强东',2)">
		//当前+2页
		if(arr.cur_page+2<=arr.page_size){
			$('.pager').append('<li><a href="#">'+(arr.cur_page+2)+'</a></li>');
		};
	});
};
/*$('#subi').on('click',$('#subi li a'),function(){
	console.log(this);
	event.preventDefault();
	$('#subi li a').parent().addClass('active').siblings('.active').removeClass('active');
	$('[href]').removeAttr('href');
	var v=$('#subi li a').val();
	console.log(v);
	$('#subi li a').attr("href","javascript: loadOrders(\"强东\", "+v+")");
});*/ //无效果
function drawBuyState(uname){
	$.get('data/buy-state.php',{uname:uname},function(data){
		//console.log('开始处理返回的数据！');
		//console.log(data);
		//console.log(arguments);
		var ctx=$('#canvasBuyState')[0].getContext('2d');
		var dataCount=data.length;//数据的数量
		var dataMax=getMax();
		var yAxisDataCount=6;//y轴上坐标点上的数量
		var xAxisDataCount=dataCount;//x轴上坐标点上的数量
		var padding=30;//绘图内容距画布边界的距离
		var canvasWidth=canvasBuyState.width;
		var canvasHeight=canvasBuyState.height;
		var origin={x:padding,y:canvasHeight-padding};
		
		var xAxisEnd={x:canvasWidth-padding,y:canvasHeight-padding};
		var yAxisEnd={x:padding,y:padding};
		//debugger;

		function getMax(){
			var m=data[0].value;
			for(var i=1;i<dataCount;i++){
				if(data[i].value>m){
					m=data[i].value;
				}
			}
			return m;
		}

		//绘制X轴及坐标点
		ctx.beginPath();
		ctx.moveTo(origin.x,origin.y);
		ctx.lineTo(xAxisEnd.x,xAxisEnd.y);
		ctx.lineTo(xAxisEnd.x-10,xAxisEnd.y-10);
		ctx.moveTo(xAxisEnd.x,xAxisEnd.y);
		ctx.lineTo(xAxisEnd.x-10,xAxisEnd.y+10);

		//绘制Y轴及坐标点
		ctx.moveTo(origin.x,origin.y);
		ctx.lineTo(yAxisEnd.x,yAxisEnd.y);
		ctx.lineTo(yAxisEnd.x-10,yAxisEnd.y+10);
		ctx.moveTo(yAxisEnd.x,yAxisEnd.y);
		ctx.lineTo(yAxisEnd.x+10,yAxisEnd.y+10);
		ctx.stroke();//对X轴/Y轴及坐标点描边

		for(var i=1;i<=yAxisDataCount;i++){
			//console.log(i);
			ctx.beginPath();
			var Y=origin.y-75*i;
			//console.log(Y);
			ctx.moveTo(padding,Y);
			ctx.lineTo(padding+10,Y);
			ctx.font='7px SimHei';
			var txt=1500*i;
			var Twidth=ctx.measureText(txt).width;
			ctx.fillText(txt,padding-Twidth,Y+3.5);
			ctx.stroke();
		}
		
		for(var i=0;i<xAxisDataCount;i++){
			//绘制X轴坐标值——月份
			ctx.beginPath();
			var X=origin.x+53*i;//X轴间距53;
			//console.log(X);
			ctx.moveTo(X,origin.y);
			ctx.lineTo(X,origin.y-10);
			ctx.closePath();
			ctx.font='7px SimHei';
			var txt=data[i].label;
			//console.log(txt);
			var Twidth=ctx.measureText(txt).width;
			ctx.fillText(txt,X-Twidth/2,origin.y+10);

			//在数据坐标点绘制数据值
			var Txt=data[i].value;
			//console.log(Txt+'-'+i);
			var TWidth=ctx.measureText(Txt).width;
			ctx.fillText(Txt,X-Twidth/2,origin.y-Txt/20);
			ctx.stroke();			
		}
		//绘制数据值坐标点
		ctx.beginPath();
		for(var i=0;i<xAxisDataCount;i++){
			var X=origin.x+53*i;
			var Txt=data[i].value;
			//绘制小圆点
			ctx.arc(X,origin.y-Txt/20,2,0,2*Math.PI);
			if(i===0){
				ctx.moveTo(X,origin.y-Txt/20);
			}else{
				ctx.lineTo(X,origin.y-Txt/20);
			}
			ctx.fillStyle='red';
			ctx.stroke();
		}
		ctx.closePath();
	});
}
function drawLuckLottery(){
	var ctx=canvasLuckLottery.getContext('2d'); 
	var pan=new Image();
	pan.src='img/pan.png';
	var panLoaded=false;
	pan.onload=function(){
		panLoaded=true;
		if(pinLoaded){
			draw();
		}
	}
	var pin=new Image();
	pin.src='img/pin.png';
	var pinLoaded=false;
	pin.onload=function(){
		pinLoaded=true;
		if(panLoaded){
			draw();
		}
	}
	function draw(){
		console.log('开始绘制...');
		ctx.drawImage(pan,0,0);
		ctx.drawImage(pin,canvasLuckLottery.width/2-pin.width/2,canvasLuckLottery.height/2-pin.height/2);
		$('#btLottery').on('click',function(){
			ctx.translate(canvasLuckLottery.width/2,canvasLuckLottery.height/2);
			var degree=5;
			var duration=Math.random()*4000+5000;//允许转动总时长
			console.log(duration);
			var last=0;//当前已经连续旋转的时间
			var timer=setInterval(function(){
				ctx.rotate(degree*Math.PI/180);
				ctx.drawImage(pan,-pan.width/2,-pan.height/2);
				ctx.rotate(-degree*Math.PI/180);
				ctx.drawImage(pin,-pin.width/2,-pin.height/2);
				if(last>0&&last<=duration/10){
					degree+=4;
				}else if(last>duration/10&&last<=duration/3){
					degree+=6;
				}else if(last>duration/3&&last<=2*duration/3){
					degree+=10;
				}else if(last>2*duration/3&&last<duration){
					degree+=5;
				}
				last+=42;
				if(last>=duration){
					clearInterval(timer);
					var Der=degree%360;
					if((Der>0&&Der<=30)||(Der>210&&Der<=240)){
						alert('恭喜您获得二等奖！！！');
					}else if((Der>30&&Der<=60)||(Der>90&&Der<=120)||(Der>150&&Der<=180)||(Der>300&&Der<=330)){
						alert('恭喜您获得三等奖！！！');
					}else if((Der>60&&Der<=90)||(Der>120&&Der<=150)||(Der>180&&Der<=210)||(Der>240&&Der<=270)||(Der>300&&Der<=360)){
						alert('幸运奖！！！');
					}else if(Der>270&&Der<=300){
						alert('恭喜您获得一等奖！！！');
					};
					ctx.translate(-canvasLuckLottery.width/2,-canvasLuckLottery.height/2);
				}

			},42);
			
		});
	}
}
