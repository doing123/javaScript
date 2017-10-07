window.$=HTMLElement.prototype.$=function(selector){
	var elems=(this==window?document:this).querySelectorAll(selector);
	return elems.length==0?null:
		   elems.length==1?elems[0]:elems;
}
//-----------------------顶部菜单-----------------------------------
function showItems(){
	//var items=this.querySelector("[id$='_items']");
	this.$("[id$='_items']").style.display="block";
	this.$("b+a").className="hover";
}
function hideItems(){
	//var items=this.querySelector("[id$='_items']");
	this.$("[id$='_items']").style.display="none";
	this.$("b+a").className="";
}
window.onload=function(){
	//var app_jd=document.querySelector(".app_jd");
	//var app_jd=document.getElementsByClassName("app_jd")[0];
	//var service=document.getElementsByClassName("service")[0];
	//var service=document.querySelector(".service");
	$(".app_jd").addEventListener("mouseover",showItems);
	$(".app_jd").addEventListener("mouseout",hideItems);
	$(".service").addEventListener("mouseover",showItems);
	$(".service").addEventListener("mouseout",hideItems);
	$("#category").addEventListener("mouseover",showSub1);
	$("#category").addEventListener("mouseout",hideSub1);
	$("#cate_box").addEventListener("mouseover",showSub2);
	$("#cate_box").addEventListener("mouseout",hideSub2);
	//为id为product_detail下的class为main_tabs的ul绑定单击事件为change
	$("#product_detail>ul.main_tabs").addEventListener("click",change);
	$("#comment_list>ul.main_tabs").addEventListener("click",change);
	$("#discuss>ul.main_tabs").addEventListener("click",change);
	$("#consult>ul.main_tabs").addEventListener("click",change);
	zoom.init();
	$("#store_select").addEventListener("mouseover",function(){
		$("#store_content").style.display="block";
		$("#store_select>h3").className="hover";
	});
	$("#store_select").addEventListener("mouseout",function(){
		$("#store_content").style.display="none";
		$("#store_select>h3").className="";
	});
	$("#store_tabs").addEventListener("mouseover",change1);
	$("#choose_color>div.content").addEventListener("click",change2);
	$("#choose_amount>div.content").addEventListener("click",num);
}
//---------------------全部商品分类菜单---------------------------------
function showSub1(){
	$("#cate_box").style.display="block";
}
function hideSub1(){
	$("#cate_box").style.display="none";
}
function showSub2(e){
	var target=e.target;
	if(target.id!="cate_box"){
		while(!(target.nodeName=="LI"&&target.parentNode.id=="cate_box")){
			target=target.parentNode;
		}
		target.$(".sub_cate_box").style.display="block";
		target.$("h3").className="hover";
	}
}
function hideSub2(e){
	var target=e.target;
	if(target.id!="cate_box"){
		while(!(target.nodeName=="LI"&&target.parentNode.id=="cate_box")){
			target=target.parentNode;
		}
		target.$(".sub_cate_box").style.display="none";
		target.$("h3").className="";
	}
}
function change(e){
	var target=e.target;
	if(target.nodeName=="A"){
		target=target.parentNode;
	}
	if(target.nodeName=="LI"&&target.className!="current"){
		target.parentNode.$(".current").className="";
		target.className="current";
		var curr=$("#product_detail>.show");
		if(curr!=null){//curr&&(curr.className="");
			curr.className="";
		}
		if(target.getAttribute("data-i")!=-1){//target.dataset.i!=-1;
			var i=target.getAttribute("data-i");//var i=target.dataset.i!=-1;
			if(target.parentNode.parentNode.id=="product_detail"){
				$("#product_detail>[id^=product_]")[i].className="show";
			}
		}
	}
	//获得目标元素target
  //如果target是a，就将target换成其父元素
  //如果target是li,且target的class不是current
    //找到target的父元素下的class为current的li，清除其样式
    //设置target的class为current
    //找到id为product_detail下的class为show的直接子元素，保存在变量curr中
    //如果curr不等于null，就清除curr的class
    //如果target的i不是-1
      //获得target的i，保存在变量i中
      //找到id为product_detail下的所有id以product_开头的直接子元素，取其中第i个，设置其class为show
}
function change1(e){//配送地址
	var target=e.target;
	if(target.nodeName=="LI"&&target.className!="hover"){
		target.parentNode.$(".hover").className="";
		target.className="hover";
	}
}
function change2(e){//选择颜色
	var target=e.target;
	if(target.nodeName=="SPAN"||target.nodeName=="IMG"||target.nodeName=="B"){
		target=target.parentNode;
	}
	if(target.nodeName=="A"&&target.className!="selected"){
		target.parentNode.$(".selected").className="";
		target.className="selected";
	}
}
function num(e){//购买数量
	var target=e.target;
	if(target.nodeName=="A"&&target.className=="btn_reduce"){
		var n=parseFloat(target.nextElementSibling.value);
		n--;
		target.nextElementSibling.value=n;
		if(target.nextElementSibling.value==0){
			target.nextElementSibling.value=1;
		}
	}
	if(target.nodeName=="A"&&target.className=="btn_add"){
		var n=parseFloat(target.previousElementSibling.value);
		n++;
		target.previousElementSibling.value=n;
	}
}
var zoom={
	WIDTH:0,
	OFFSET:0,
	moved:0,

	MSIZE:0,
	MAX:0,
	init:function(){
		this.WIDTH=parseFloat(getComputedStyle($("#icon_list>li:first-child")).width);
		this.OFFSET=parseFloat(getComputedStyle($("#icon_list")).left);
		$("#preview>h1").addEventListener("click",this.move.bind(this));
		$("#icon_list").addEventListener("mouseover",this.changeMImg);
		$("#superMask").addEventListener("mouseover",function(){
			$("#mask").style.display="block";
			var src=$("#mImg").src;
			var i=src.lastIndexOf(".");
			src=src.slice(0,i-1)+"l"+src.slice(i);
			$("#largeDiv").style.background="url("+src+")";
			$("#largeDiv").style.display="block";
		});
		$("#superMask").addEventListener("mouseout",function(){
			$("#mask").style.display="none";
			$("#largeDiv").style.display="none";
		});
		this.MSIZE=parseFloat(getComputedStyle($("#mask")).width);
		var ssize=parseFloat(getComputedStyle($("#superMask")).width);
		this.MAX=ssize-this.MSIZE;
		$("#superMask").addEventListener("mousemove",this.maskMove.bind(this))
	},
	move:function(e){
		var target=e.target;
		if(target.nodeName=="A"&&!target.className.endsWith("_disabled")){
							//target.className.indexOf("disabled")==-1;
			this.moved+=target.className.startsWith("forward")?1:-1;
					  //target.className.indexOf("forward")!==-1;
			var left=-(this.WIDTH*this.moved-this.OFFSET);
			$("#icon_list").style.left=left+"px";
			//icon_list.style.left=-(this.WIDTH*this.moved-this.OFFSET)+"px";
			this.checkA();
		}
	},
	checkA:function(){
		if(this.moved==0){
			$("[class^='backward']").className+="_disabled";
		}else if(this.moved==$("#icon_list>li").length-5){
			$("[class^='forward']").className+="_disabled";
		}else{
			$("[class^='backward']").className="backward";
			$("[class^='forward']").className="forward"
		}
	},
	changeMImg:function(e){
		var target=e.target;
		if(target.nodeName=="IMG"){
			var src=target.src;
			var i=src.lastIndexOf(".");
			$("#mImg").src=src.slice(0,i)+"-m"+src.slice(i);
		}
	},
	maskMove:function(e){
		var x=e.offsetX;
		var y=e.offsetY;
		var t=y-this.MSIZE/2;
		var l=x-this.MSIZE/2;
		if(t<0){
			t=0;
		}else if(t>this.MAX){
			t=this.MAX;
		}
		if(l<0){
			l=0;
		}else if(l>this.MAX){
			l=this.MAX;
		}
		$("#mask").style.top=t+"px";
		$("#mask").style.left=l+"px";
		$("#largeDiv").style.backgroundPosition=-16/7*+l+"px "+-16/7*+t+"px";
	}
}