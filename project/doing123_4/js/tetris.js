var tetris={
	CSIZE:26,//保存每个格子的大小
	OFFSET:15,//保存游戏界面的内边距
	pg:null,//保存游戏的容器div元素
	shape:null,//主角图形
	nextShape:null,
	interval:200,
	timer:null,
	wall:[],//墙数组，二维数组
	RN:20,
	CN:10,
	score:0,
	lines:0,
	level:1,
	SCORES:[0,10,30,60,150],
	state:1,//保存游戏状态
	RUNNING:1,//运行中
	GAMEOVER:0,//游戏结束
	PAUSE:2,//暂停
	start:function(){//游戏启动方法
		this.state=this.RUNNING;
		this.score=0;
		this.lines=0;
		for(var r=0;r<this.RN;r++){
			this.wall[r]=new Array(this.CN);
		}
		//初始化RN行*CN列的二维数组
		//r从0开始，到<RN结束
			//设置wall中r行等于CN个空元素的新数组;
		this.pg=document.getElementsByClassName("playground")[0];
		this.shape=this.randomShape();
		this.nextShape=this.randomShape();
		this.paint();
		var me=this;
		document.onkeydown=function(e){//e: 事件对象
			switch(e.keyCode){
				case 37:me.state==me.RUNNING&&me.moveLeft();break;
				case 38:me.state==me.RUNNING&&me.rotateR();break;
				case 39:me.state==me.RUNNING&&me.moveRight();break;
				case 40:me.state==me.RUNNING&&me.moveDown();break;
				case 90:me.state==me.RUNNING&&me.rotateL();break;
				case 32:me.state==me.RUNNING&&me.hardDrop();break;
				case 80:me.state==me.RUNNING&&me.pause();break;
				case 67:me.state==me.PAUSE&&me.mycontinue();break;
				case 81:me.state!=me.GAMEOVER&&me.quit();break;
				case 83:me.state==me.GAMEOVER&&me.start();break;
			}
		};
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
	},
	quit:function(){
		this.state=this.GAMEOVER;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	mycontinue:function(){
		this.state=this.RUNNING;
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
	},
	pause:function(){
		this.state=this.PAUSE;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	hardDrop:function(){
		while(this.canDown()){
			this.shape.moveDown();
		}
		this.moveDown();
	},
	canRotate:function(){//判断能否旋转
		//遍历当前图形中每个cell
		for(var i=0;i<this.shape.cells.length;i++){
		  //将当前cell保存在变量cell中
		  var cell=this.shape.cells[i];
		  //如果cell的r<0或>=RN
		  console.log(cell.r);
		  if(cell.r<0||cell.r>=this.RN
			//或cell的c<0或>=CN
			||cell.c<0||cell.c>=this.CN
			//或wall中cell当前位置有格
			||this.wall[cell.r][cell.c]){
			return false//就返回false
		  }
		}//(遍历结束)
		return true;//就返回true
	},
	rotateR:function(){
		this.shape.rotateR();
		//如果不能旋转，再左转回来
		if(!this.canRotate()){
			this.shape.rotateL();
		}else{
			this.paint();
		}
	},
	rotateL:function(){
		this.shape.rotateL();
		//如果不能旋转，再左转回来
		if(!this.canRotate()){
			this.shape.rotateR();
		}else{
			this.paint();
		}
	},
	canLeft:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==0||this.wall[cell.r][cell.c-1]!=undefined){
				return false;
			}
		}
		return true;
	},
	moveLeft:function(){
		if(this.canLeft()){
			this.shape.moveLeft();
		}
	},
	canRight:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==this.CN-1||this.wall[cell.r][cell.c+1]!=undefined){
				return false;
			}
		}
		return true;
	},
	moveRight:function(){
		if(this.canRight()){
			this.shape.moveRight();
		}
	},
	randomShape:function(){
		var r=Math.floor(Math.random()*3);
		switch(r){
			case 0:return new O();break;
			case 1:return new T();break;
			case 2:return new I();break;
		}
	},
	paint:function(){//重绘一切
		var reg=/<img\ssrc="[^"]+"[^>]*>/g;
		this.pg.innerHTML=this.pg.innerHTML.replace(reg,"");
		this.paintShape();
		this.paintWall();
		this.paintScore();
		this.paintNext();
		this.paintState();
	},
	paintWall:function(){
		var frag=document.createDocumentFragment();
		for(var r=this.RN-1;r>=0&&this.wall[r].join("")!="";r--){
			for(var c=0;c<this.CN;c++){
				var cell=this.wall[r][c];
				if(cell!==undefined){
					this.addImg(frag,cell);
				}
			}
		}
		this.pg.appendChild(frag);
	},
	addImg:function(frag,cell){
		var img=new Image();
		img.src=cell.src;
		img.style.top=(cell.r)*this.CSIZE+this.OFFSET+"px";
		img.style.left=(cell.c)*this.CSIZE+this.OFFSET+"px";
		frag.appendChild(img);
	},
	canDown:function(){//专门检查主角图形是否可以继续下落
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]!==undefined){
				return false;
			}
		}
		return true;
    //遍历shape中每个cell
      //将当前图形临时保存在变量cell中
      //如果cell的r等于19
        //或wall中cell的r+1行，cell的c列有格
        //返回false
    //(遍历结束)——还可以下落
    //返回true
	},
	moveDown:function(){//专门负责将主角图形下落一格
		if(this.canDown()){
			//如果canDown
			  //调用主角图形shape的moveDown方法
			this.shape.moveDown();
		}else{
			this.landIntoWall();
			var lines=this.deleteRows();
			this.lines+=lines;
			//增加等级难度

			this.score+=this.SCORES[lines];
			if(!this.isGAMEOVER()){
				this.shape=this.nextShape;
				this.nextShape=this.randomShape();
			}else{
				this.state=this.GAMEOVER;
				clearInterval(this.timer);
				this.timer=null;
			}
			//否则
			  //调用landIntoWall，将shape放入墙中
			  //创建另一个新图形，保存在shape中
		}	
		this.paint();//重绘一切
	},
	isGAMEOVER:function(){
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			if(this.wall[cell.r][cell.c]!==undefined){
				return true;
			}
			return false;
		}
	},
	paintState:function(){
		if(this.state!=this.RUNNING){
			var img=new Image();
			if(this.state==this.GAMEOVER){
				img.src="img/game-over.png";
			}else if(this.state==this.PAUSE){
				img.src="img/pause.png";
				
			}
			this.pg.appendChild(img);
		}
	},
	paintScore:function(){
		score.innerHTML=this.score;
		lines.innerHTML=this.lines;
		level.innerHTML=this.level;
	},
	isFull:function(r){
		var reg=/^,|,,|,$/;
		var i=this.wall[r].toString().search(reg);//arr.toString()->String(arr)
		return i==-1;
	},
	deleteRows:function(){
		for(var r=this.RN-1,lines=0;r>=0;r--){
			if(this.isFull(r)){
				this.deleteRow(r);
				lines++;
				if(this.lines>=0&&this.lines<3){
					this.level=1;
					clearInterval(this.timer);
					this.timer=null;
					this.timer=setInterval(this.moveDown.bind(this),this.interval-(this.level-1)*50);
				}else if(this.lines>=3&&this.lines<=5){
					this.level=2;
					clearInterval(this.timer);
					this.timer=null;
					this.timer=setInterval(this.moveDown.bind(this),this.interval-(this.level-1)*50);
				}else if(this.lines>5&&this.lines<=8){
					this.level=3;
					clearInterval(this.timer);
					this.timer=null;
					this.timer=setInterval(this.moveDown.bind(this),this.interval-(this.level-1)*50);
				}else{
					this.level=4;
					clearInterval(this.timer);
					this.timer=null;
					this.timer=setInterval(this.moveDown.bind(this),this.interval-(this.level-1)*50);
				};
				r++;
				if(lines==4||this.wall[r-1].join("")==""){
					break;
				}
			}
		}
		return lines;
	},
	deleteRow:function(r){
		for(;r>=0;r--){
			this.wall[r]=this.wall[r-1];
			for(var c=0;c<this.CN;c++){
				if(this.wall[r][c]!=undefined){
					this.wall[r][c].r++;//r属性+1
				}
			}
			if(this.wall[r-2].join("")==""){
				this.wall[r-1]=new Array(this.CN);
				break;
			}
		}
	},
	landIntoWall:function(){//专门将停止下落的shape放入墙中
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.wall[cell.r][cell.c]=cell;
			//遍历主角图形中每个cell
			  //将当前图形存为cell
			  //将cell放入wall中cell的r行，cell的c列
		}
	},
	paintShape:function(){//专门负责绘制主角图形
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.addImg(frag,cell);
		}
		this.pg.appendChild(frag);
	},
	paintNext:function(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			var img=new Image();
			img.src=cell.src;
			img.style.top=(cell.r+1)*this.CSIZE+this.OFFSET+"px";
			img.style.left=(cell.c+10)*this.CSIZE+this.OFFSET+"px";
			frag.appendChild(img);
		}
		this.pg.appendChild(frag);
	},
}
window.onload=function(){tetris.start();}