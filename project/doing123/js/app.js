/***************全局变量*******************/
var canvasWidth=480;//$(window).width;画布的宽
var canvasHeight=650;//画布的高

var score=0;//当前的积分
var lives=3;//玩家剩余的命数

//var canvas=document.getElementById('canvas');
canvas.width=canvasWidth;
canvas.height=canvasHeight;
var ctx=canvas.getContext('2d');//绘图上下文

const PHASE_DOWNLOADING=1;//图片下载阶段
const PHASE_READY=2;//就绪阶段
const PHASE_STARTING=3;//启动中
const PHASE_PLAY=4;//游戏进行中阶段
const PHASE_PAUSE=5;//游戏暂停阶段
const PHASE_GAMEOVER=6;//游戏结束阶段
var cur_phase=PHASE_DOWNLOADING;//游戏当前所处阶段

//游戏所需所有图片
var imgBackground;
var imgBullet1;
var imgsEnemy1=[];
//var imgBackground=new Image();
//var imgBullet1=new Image();
//var imgsEnemy1=[new Image(),new Image(),new Image(),new Image(),new Image()];
//var imgsEnemy2=[new Image(),new Image(),new Image(),new Image(),new Image()];
//var imgsEnemy3=[new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
//var imgsGameLoading=[new Image(),new Image(),new Image()];
//var imgGamePause=[new Image()];
//var imgsHero=[new Image(),new Image(),new Image(),new Image(),new Image()];
//var imgStart=new Image();
var imgsEnemy2=[];
var imgsEnemy3=[];
var imgsGameLoading=[];
var imgGamePause;
var imgsHero=[];
var imgStart;

/*********************阶段1：PHASE_DOWNLOADING***************************/
//下载图片
download();
function download(){//下载游戏必须的图片
	var progress=0;//当前已加载的进度
	ctx.font='80px SimHei';
	ctx.strokeStyle='#aaa';
	ctx.fillStyle='#e4393c';
	ctx.lineWidth=30;
	function drawProgress(){//绘制圆形进度条
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		var txt=progress+'%';
		var w=ctx.measureText(txt).width;
		ctx.fillText(txt,canvasWidth/2-w/2,canvasHeight/2+80/2);
		//ctx.strokeText(txt,canvasWidth/2-w/2,canvasHeight/2+80/2);
		ctx.beginPath();
		var endAngle=(-90+progress*3.6)*Math.PI/180;
		ctx.arc(canvasWidth/2,canvasHeight/2,120,-90*Math.PI/180,0+endAngle);
		
		ctx.stroke();
		if(progress>=100){
			cur_phase=PHASE_READY;
			sky=new Sky(imgBackground);
			startEngine();
		}
	}
	imgBackground=new Image();
	imgBackground.src='img/background.png';
	imgBackground.onload=function(){
		progress+=4;
		drawProgress();
	}
	imgBullet1 = new Image();
	imgBullet1.src = 'img/bullet1.png';
	imgBullet1.onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[0] = new Image();
	imgsEnemy1[0].src = 'img/enemy1.png';
	imgsEnemy1[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[1] = new Image();
	imgsEnemy1[1].src = 'img/enemy1_down1.png';
	imgsEnemy1[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[2] = new Image();
	imgsEnemy1[2].src = 'img/enemy1_down2.png';
	imgsEnemy1[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[3] = new Image();
	imgsEnemy1[3].src = 'img/enemy1_down3.png';
	imgsEnemy1[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[4] = new Image();
	imgsEnemy1[4].src = 'img/enemy1_down4.png';
	imgsEnemy1[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[0] = new Image();
	imgsEnemy2[0].src = 'img/enemy2.png';
	imgsEnemy2[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[1] = new Image();
	imgsEnemy2[1].src = 'img/enemy2_down1.png';
	imgsEnemy2[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[2] = new Image();
	imgsEnemy2[2].src = 'img/enemy2_down2.png';
	imgsEnemy2[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[3] = new Image();
	imgsEnemy2[3].src = 'img/enemy2_down3.png';
	imgsEnemy2[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[4] = new Image();
	imgsEnemy2[4].src = 'img/enemy2_down4.png';
	imgsEnemy2[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[0] = new Image();
	imgsEnemy3[0].src = 'img/enemy3_n1.png';
	imgsEnemy3[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[1] = new Image();
	imgsEnemy3[1].src = 'img/enemy3_n2.png';
	imgsEnemy3[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[2] = new Image();
	imgsEnemy3[2].src = 'img/enemy3_hit.png';
	imgsEnemy3[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[3] = new Image();
	imgsEnemy3[3].src = 'img/enemy3_down1.png';
	imgsEnemy3[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[4] = new Image();
	imgsEnemy3[4].src = 'img/enemy3_down2.png';
	imgsEnemy3[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[5] = new Image();
	imgsEnemy3[5].src = 'img/enemy3_down3.png';
	imgsEnemy3[5].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[6] = new Image();
	imgsEnemy3[6].src = 'img/enemy3_down4.png';
	imgsEnemy3[6].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[7] = new Image();
	imgsEnemy3[7].src = 'img/enemy3_down5.png';
	imgsEnemy3[7].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[8] = new Image();
	imgsEnemy3[8].src = 'img/enemy3_down6.png';
	imgsEnemy3[8].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[0] = new Image();
	imgsGameLoading[0].src = 'img/game_loading1.png';
	imgsGameLoading[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[1] = new Image();
	imgsGameLoading[1].src = 'img/game_loading2.png';
	imgsGameLoading[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[2] = new Image();
	imgsGameLoading[2].src = 'img/game_loading3.png';
	imgsGameLoading[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[3] = new Image();
	imgsGameLoading[3].src = 'img/game_loading4.png';
	imgsGameLoading[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgGamePause = new Image();
	imgGamePause.src = 'img/game_pause_nor.png';
	imgGamePause.onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[0] = new Image();
	imgsHero[0].src = 'img/hero1.png';
	imgsHero[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[1] = new Image();
	imgsHero[1].src = 'img/hero2.png';
	imgsHero[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[2] = new Image();
	imgsHero[2].src = 'img/hero_blowup_n1.png';
	imgsHero[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[3] = new Image();
	imgsHero[3].src = 'img/hero_blowup_n2.png';
	imgsHero[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[4] = new Image();
	imgsHero[4].src = 'img/hero_blowup_n3.png';
	imgsHero[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[5] = new Image();
	imgsHero[5].src = 'img/hero_blowup_n4.png';
	imgsHero[5].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgStart = new Image();
	imgStart.src = 'img/start.png';
	imgStart.onload = function(){
		progress += 3;
		drawProgress();
	}
}

/*********************阶段2：PHASE_READY***************************/
var sky=null;
//天空的构造方法
function Sky(img){
	this.x1=0;
	this.y1=0;
	this.x2=0;
	this.y2=-img.height;
	this.draw=function(){
		ctx.drawImage(img,this.x1,this.y1);
		ctx.drawImage(img,this.x2,this.y2);
	}
	this.move=function(){
		this.y1++;
		this.y2++;
		if(this.y1>=canvas.height){
			this.y1=this.y2-img.height;
		}
		if(this.y2>=canvas.height){
			this.y2=this.y1-img.height;
		}
	}
}
//LOGO的绘制方法
function drawLogo(){
	ctx.drawImage(imgStart,canvasWidth/2-imgStart.width/2,canvasHeight/2-imgStart.height/2);
}
//为画布添加单击事件监听函数
canvas.addEventListener('click',function(){
	//若当前处于就绪阶段，则进入开始阶段
	if(cur_phase===PHASE_READY){
		cur_phase=PHASE_STARTING;
		//创建奔跑的小飞机
		runningPlane=new RunningPlane(imgsGameLoading);
	}
},false);

/*********************阶段3：PHASE_STARTING***************************/
var runningPlane=null;
//奔跑的小飞机的构造函数
function RunningPlane(img){
	this.x=0;
	this.y=canvasHeight-img[0].height;
	this.index=0;//当前要绘制的图片的下标
	this.draw=function(){//绘制奔跑的小飞机
		ctx.drawImage(img[this.index],this.x,this.y);
	}
	this.moveCount=0;//move()函数被调用次数
	this.move=function(){
		this.moveCount++;
		if(this.moveCount%8===0){
			this.index++;//每过42*8ms才会换下一张
			if(this.index===img.length){//this.index>img.length=>undefined;
				//进入下一个阶段：游戏进行中
				cur_phase=PHASE_PLAY;
				hero=new Hero(imgsHero);//创建英雄
				bulletList=new BulletList();//子弹列表
				enemyList=new EnemyList();//敌人列表
			}
		}
	}
}

/*********************阶段4：PHASE_PLAY***************************/

//我方英雄和子弹列表
var hero=null;
var bulletList=null;
function Hero(imgs){
	this.x=canvasWidth/2-imgs[0].width/2;
	this.y=canvasHeight-imgs[0].height;
	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.index=0;//当前要绘制哪张图片
	this.crashed=false;//当前是否被撞毁
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
		//debugger;
	}
	this.moveCount=0;
	this.move=function(){
		this.moveCount++;
		if(!this.crashed){//当前未被撞毁
			if(this.index===0){
				this.index=1;
			}else if(this.index===1){
				this.index=0;
			}
		}			
		if(this.moveCount%5===0){//每42ms*5发一发子弹
			//英雄边移动边发子弹
			var bullet0=new Bullet(imgBullet1);
			bulletList.add(bullet0);
			if(score>8000){
				var bullet1=new Bullet(imgBullet1);
				bulletList.add(bullet1);
				bullet1.x-=25;
				var bullet2=new Bullet(imgBullet1);
				bulletList.add(bullet2);
				bullet2.x+=25;
			}
		}
		//开始坠毁程序
		if(this.crashed&&this.moveCount%2===0){
			if(this.index==0||this.index==1){
				this.index=2;
			}else{
				this.index++;
				if(this.index==imgs.length-1){//绘制完成所有坠毁图片
					lives--;//命数-1
					if(lives>0){//回到画布的下方
						hero = new Hero(imgsHero);
					}else{//剩余命数为零，GAMEOVER
						cur_phase=PHASE_GAMEOVER;
					}
				}
			}
		}
	}
	//绑定鼠标移动事件，让英雄随着鼠标而移动
	canvas.addEventListener('mousemove',function(event){
		var x=event.offsetX-imgs[0].width/2;
		var y=event.offsetY-imgs[0].height/2;
		hero.x=x;
		hero.y=y;
	},false);
}
function Bullet(img){
	this.x=hero.x+(imgsHero[0].width/2-img.width/2);
	this.y=hero.y-img.height;
	this.width=img.width;
	this.height=img.height;
	this.removable=false;//子弹是否可以在画布上面移除
	this.draw=function(){
		ctx.drawImage(img,this.x,this.y);
	}
	this.move=function(){
		this.y-=10;//子弹的飞行速度
		if(this.y<-img.height){//子弹飞出画布可以删除
			this.removable=true;
		}
	}
}
function BulletList(){
	this.list=[];//保存着当前需要绘制的所有子弹
	this.add=function(bullet){//向列表中添加子弹
		this.list.push(bullet);
	}
	this.draw=function(){
		for(var i=0;i<this.list.length;i++){
			this.list[i].draw();//绘制每一个子弹
		}
	}
	this.move=function(){
		for(var i=0;i<this.list.length;i++){
			this.list[i].move();
			if(this.list[i].removable){//某颗子弹可被删除
				this.list.splice(i,1);//删除一个
				i--;
			}
		}
	}
}
//敌机列表
var enemyList=null;
function Enemy1(imgs){
	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.x=Math.random()*(canvasWidth-this.width);
	this.y=-this.height;
	this.index=0;//当前绘制的图片的下标
	this.blood=1;//敌机的血格
	this.removable=false;//当前敌机是否可被删除
	this.score=10;//击落敌机后我方英雄的得分
	this.crashed=false;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.moveCount=0;
	this.move=function(){
		this.y+=6;
		this.moveCount++;
		//this.checkHit();
		if(this.y>=canvasHeight){
			this.removable=true;
		}
		if(this.crashed&&this.moveCount%2===0){
			this.index++;//绘制下一张坠毁图
			if(this.index===imgs.length){
				this.removable=true;//坠毁播放到最后一张图片
				//score+=this.score;
			}
		}
	}
	this.checkHit=function(){
		for(var i in bulletList.list){
			var b=bulletList.list[i];
			if((this.x<=b.x+b.width)
			  &&(this.x+this.width>=b.x)
			  &&(this.y+this.height>=b.y)
			  &&(this.y<=b.y+b.height)){
				b.removable=true;
				this.blood--;
				//debugger;
				if(this.blood<=0){
					this.crashed=true;
				}
			}
		}
		if((hero.x<=this.x+this.width)
		  &&(hero.x+hero.width>=this.x)
		  &&(this.y+this.height>=hero.y)
		  &&(hero.y+hero.height>=this.y)){
			hero.crashed=true;
		}
	}
}
function Enemy2(imgs){
	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.x=Math.random()*(canvasWidth-this.width);
	this.y=-this.height;
	this.index=0;//当前绘制的图片的下标
	this.blood=4;//敌机的血格
	this.removable=false;//当前敌机是否可被删除
	this.score=50;//击落敌机后我方英雄的得分
	this.crashed=false;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.moveCount=0;
	this.move=function(){
		this.moveCount++;
		this.y+=3;
		//this.checkHit();
		if(this.y>=canvasHeight){
			this.removable=true;
		}
		if(this.crashed&&this.moveCount%2===0){
			this.index++;
			if(this.index===imgs.length){
				this.removable=true;
				//score+=this.score;
			}
		}
	}
	this.checkHit=function(){
		for(var i in bulletList.list){
			var b=bulletList.list[i];
			if((this.x<=b.x+b.width)
			  &&(this.x+this.width>=b.x)
			  &&(this.y+this.height>=b.y)
			  &&(this.y<=b.y+b.height)){
				b.removable=true;
				this.blood--;
				if(this.blood<=0){
					this.crashed=true;
				}
			}
		}
		if((hero.x<=this.x+this.width)
		  &&(hero.x+hero.width>=this.x)
		  &&(this.y+this.height>=hero.y)
		  &&(hero.y+hero.height>=this.y)){
			hero.crashed=true;
		}
	}
}
function Enemy3(imgs){
	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.x=Math.random()*(canvasWidth-this.width);
	this.y=-this.height;
	this.index=0;//当前绘制的图片的下标
	this.blood=10;//敌机的血格
	this.removable=false;//当前敌机是否可被删除
	this.score=150;//击落敌机后我方英雄的得分
	this.crashed=false;//是否被撞毁
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.moveCount=0;
	this.move=function(){
		this.y+=2;
		this.moveCount++;
		//this.checkHit();
		if(this.y>=canvasHeight){
			this.removable=true;
		}
		if(this.moveCount%2===0){
			if(!this.crashed){//尚未被撞毁
				if(this.index===0)this.index=1;
				else if(this.index===1)this.index=0;
			}else{
				if(this.index==0||this.index==1){
					this.index=3;
				}else{
					this.index++;
				}
				if(this.index===imgs.length){
					this.removable=true;
					//score+=this.score;
				}
			}
		}
	}
	this.checkHit=function(){
		for(var i in bulletList.list){
			var b=bulletList.list[i];
			if((this.x<=b.x+b.width)
			  &&(this.x+this.width>=b.x)
			  &&(this.y+this.height>=b.y)
			  &&(this.y<=b.y+b.height)){
				b.removable=true;
				this.blood--;
				if(this.blood<=0){
					this.crashed=true;
				}
			}
		}
		if((hero.x<=this.x+this.width)
		  &&(hero.x+hero.width>=this.x)
		  &&(this.y+this.height>=hero.y)
		  &&(hero.y+hero.height>=this.y)){
			hero.crashed=true;
		}
	}
}
function EnemyList(){
	this.list=[];//保存当前所有的敌机
	this.add=function(enemy){
		this.list.push(enemy);
	}
	this.draw=function(){
		for(var i=0;i<this.list.length;i++){
			this.list[i].draw();
		}
		//debugger;
	}	
	this.move=function(){
		//随机生成敌机
		var num=Math.floor(Math.random()*200);
		if(num<6){//创建小号敌机 6
			this.add(new Enemy1(imgsEnemy1));
		}else if(num<9){//创建中号敌机 3
			this.add(new Enemy2(imgsEnemy2));
		}else if(num<10){//创建大号敌机 1
			this.add(new Enemy3(imgsEnemy3));
		}
		/**********敌方飞机与我方子弹碰撞检验*************/
		for(var i=0;i<this.list.length;i++){
			var enemy=this.list[i];//一个敌机
			for(var j=0;j<bulletList.list.length;j++){
				var bullet=bulletList.list[j];//一个子弹
				if((enemy.x<=bullet.x+bullet.width)
				  &&(enemy.x+enemy.width>=bullet.x)
				  &&(enemy.y+enemy.height>=bullet.y)
				  &&(enemy.y<=bullet.y+bullet.height)){
					bullet.removable=true;//碰撞后子弹消失
					enemy.blood--;//敌机减血
					//debugger;
					if(enemy.blood<=0){
						enemy.crashed=true;//开始启动撞毁程序
						score+=enemy.score;
					}
				}
				if((hero.x<=enemy.x+enemy.width)
				  &&(hero.x+hero.width>=enemy.x)
				  &&(enemy.y+enemy.height>=hero.y)
				  &&(hero.y+hero.height>=enemy.y)){
					hero.crashed=true;
				}
			}
		}
		/**********敌方飞机与我方英雄碰撞检验*************/
		//移动每一个敌机
		for(var i=0;i<this.list.length;i++){
			var e=this.list[i];
			e.move();//移动敌机
			if(e.removable){//当前敌机可被删除了
				this.list.splice(i,1);
				i--;
			}
		}
	}
}
//绘制当前得分和剩余英雄数量
function drawStat(){//绘制统计数据
	ctx.font='30px SimHei';
	ctx.fillStyle='#333';
	var txtScore='SCORE:'+score;
	ctx.fillText(txtScore,10,40);
	var txtLives='lives:'+lives;
	var w=ctx.measureText(txtLives).width;
	ctx.fillText(txtLives,canvasWidth-w-10,40);
}
/*********************阶段5：PHASE_PAUSE***************************/
canvas.addEventListener('mouseout',function(){
	if(cur_phase===PHASE_PLAY){
		cur_phase=PHASE_PAUSE;
	}
},false);
canvas.addEventListener('mouseover',function(){
	if(cur_phase===PHASE_PAUSE){
		cur_phase=PHASE_PLAY;
	}
},false);
function drawPause(){
	ctx.drawImage(imgGamePause,canvasWidth/2-imgGamePause.width/2,canvasHeight/2-imgGamePause.height/2);
}
/*********************阶段6：PHASE_GAMEOVER***************************/
function drawGameOver(){
	ctx.font='50px SimHei';
	var txt='GAME OVER';
	var w=ctx.measureText(txt).width;
	ctx.fillText(txt,canvasWidth/2-w/2,canvasHeight/2-50/2);
}
/*********************游戏的主引擎——周期固定的定时器********************/
function startEngine(){
	setInterval(function(){
		sky.draw();//绘制天空
		sky.move();//移动天空
		switch(cur_phase){
			case PHASE_READY:drawLogo();break;//绘制LOGO
			case PHASE_STARTING:
				runningPlane.draw();
				runningPlane.move();
				break;
			case PHASE_PLAY:
				hero.draw();
				hero.move();
				bulletList.draw();
				bulletList.move();
				enemyList.draw();
				enemyList.move();
				drawStat();
				break;
			case PHASE_PAUSE:
				hero.draw();
				bulletList.draw();
				enemyList.draw();
				drawStat();
				drawPause();	
				break;
			case PHASE_GAMEOVER:
				drawGameOver();
				break;
		}
	},42);
}
