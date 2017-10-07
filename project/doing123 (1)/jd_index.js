/*封装$*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}
/*广告图片数组*/
var imgs=[
	{"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];
var slider={
	LIWIDTH:0,//保存每个li的宽度

	DURATION:500,
	DISTANCE:0,
	STEPS:100,
	interval:0,
	step:0,//每一步的步长
	moved:0,//移动的步数
	timer:null,//保存当前动画的序号
	WAIT:3000,
	canAuto:true,

	init:function(){
		this.LIWIDTH=parseFloat(getComputedStyle($("#slider")).width);
		this.updateView();
		var me=this;
		this.interval=this.DURATION/this.STEPS;
		$("#idxs").addEventListener("mouseover",function(e){
			var target=e.target;
			if(target.nodeName=="LI"&&target.className!="hover"){
				/*var n=target.innerHTML>=$("#idxs>.hover").innerHTML?
					target.innerHTML-$("#idxs>.hover").innerHTML:
					-($("#idxs>.hover").innerHTML-target.innerHTML);*/
				var n=target.innerHTML-$("#idxs>.hover").innerHTML;
				$("#idxs>.hover").className="";
				target.className="hover";
				me.move(n);
			}
		});
		$("#slider").addEventListener("mouseover",function(){
			me.canAuto=false;
		});
		$("#slider").addEventListener("mouseout",function(){
			me.canAuto=true;
		});
		this.autoMove();
	},
	autoMove:function(){
		var me=this;
		this.timer=setTimeout(function(){
			if(me.canAuto==true){
			me.move(1);
			}else{
				me.autoMove();
			}
		},me.WAIT);
	},
	move:function(n){
		if(this.timer!=null){
			clearTimeout(this.timer);
			this.timer=null;
			$("#imgs").style.left="";
		}
		this.DISTANCE=this.LIWIDTH*n;
		this.step=this.DISTANCE/this.STEPS;
		if(n<0){
			var deletes=imgs.splice(imgs.length+n);
			imgs=deletes.concat(imgs);
			$("#imgs").style.left=this.DISTANCE+"px";
			this.updateView();
		}
		this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
	},
	moveStep:function(n){
		$("#imgs").style.left=parseFloat(getComputedStyle($("#imgs")).left)-this.step+"px";
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
		}else{
			if(n>0){
				imgs=imgs.concat(imgs.splice(0,n));
				this.updateView();
			}
			$("#imgs").style.left="";
			this.timer=null;
			this.moved=0;
			this.autoMove();
		}
	},
	updateView:function(){
		$("#imgs").style.width=this.LIWIDTH*imgs.length+"px";
		for(var i=0,lis="",idxs="";i<imgs.length;i++){
			lis+='<li><img src="'+imgs[i].img+'"></li>';
			idxs+="<li>"+(i+1)+"</li>";
		}
		$("#imgs").innerHTML=lis;
		$("#idxs").innerHTML=idxs;
		$("#idxs>li")[imgs[0].i].className="hover";
	}
}
window.addEventListener("load",function(){slider.init();});

