window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}
function getElementTop(elem){
	var sum=elem.offsetTop;
	while((elem=elem.offsetParent)!=null){
	sum+=elem.offsetTop;
	}
	return sum;			
}
var elevator={
	UPLEVEL:0,
	DOWNLEVEL:0,
	FHEIGHT:0,
	
	DURATION:1000,
	DISTANCE:0,
	STEPS:200,
	interval:0,//每步的时间间隔
	step:0,
	moved:0,//保存本次动画已经移动的步数，控制停止计时器
	timer:null,//保存定时器序号，专门用于停止计时器
	init:function(){
		this.FHEIGHT=parseFloat(getComputedStyle($("#f1")).height)
			+parseFloat(getComputedStyle($("#f1")).marginBottom);
		this.UPLEVEL=(window.innerHeight-this.FHEIGHT)/2;
		this.DOWNLEVEL=this.UPLEVEL+this.FHEIGHT;
		window.addEventListener("scroll",this.checkLight.bind(this));
		$("#elevator>ul").addEventListener("mouseover",function(e){
			var target=e.target;
			if(target.nodeName=="A"){
				target=target.parentNode;
			}
			if(target.nodeName=="LI"){
				target.lastElementChild.style.display="block";
				target.firstElementChild.style.display="none";
			}
		});
		$("#elevator>ul").addEventListener("mouseout",function(e){
			var target=e.target;
			if(target.nodeName=="A"){
				target=e.target.parentNode;
			}
			if(target.nodeName=="LI"){
				var i=parseInt(target.firstElementChild.innerHTML)-1;
				var span=$(".floor>header>span")[i];
				if(span.className!="hover"){
					target.lastElementChild.style.display="none";
					target.firstElementChild.style.display="block";
				}
			}
		});
		this.interval=this.DURATION/this.STEPS;
		var me=this;
		$("#elevator>ul").addEventListener("click",function(e){
			if(me.timer==null){
				var target=e.target;
				if(target.nodeName=="A"&&target.className=="etitle"){
					var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
					var i=parseInt(target.previousElementSibling.innerHTML)-1;
					var span=$(".floor>header>span")[i];
					var elemTop=getElementTop(span);
					me.DISTANCE=elemTop-(me.UPLEVEL+scrollTop);
					me.step=me.DISTANCE/me.STEPS;
					me.timer=setTimeout(me.moveStep.bind(me),me.interval);
				}
			}
		});
	},
	moveStep:function(){
		window.scrollBy(0,this.step);
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this),this.interval);
		}else{
			this.timer=null;
			console.log(this.timer);
			this.moved=0;
		}
	},
	checkLight:function(){
		var spans=$(".floor>header>span");
		//当前页面滚动过的高度scrollTop
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		for(var i=0;i<spans.length;i++){
			var top=getElementTop(spans[i]);//当前span距页面顶部的高度
			var elemTop=top-scrollTop;//当前span距文档显示区顶部的距离
			var li=$("#elevator>ul>li")[i];
			if(elemTop>=this.UPLEVEL&&elemTop<=this.DOWNLEVEL){
				spans[i].className="hover";
				li.lastElementChild.style.display="block";
				li.firstElementChild.style.display="none";
			}else{
				spans[i].className="";
				li.lastElementChild.style.display="none";
				li.firstElementChild.style.display="block";
			}
		}
		var span=$(".floor>header>span.hover");
		$("#elevator").style.display=span!=null?"block":"none";
	},
}
window.addEventListener("load",function(){elevator.init();});