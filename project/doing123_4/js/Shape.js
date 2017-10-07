function Cell(r,c,src){
	this.r=r;
	this.c=c;
	this.src=src;
}
function State(r0,c0,r1,c1,r2,c2,r3,c3){
	this.r0=r0;this.c0=c0;
	this.r1=r1;this.c1=c1;
	this.r2=r2;this.c2=c2;
	this.r3=r3;this.c3=c3;
}
function Shape(cells,orgi,states){
	this.cells=cells;
	this.orgi=orgi;
	this.states=states;
	this.statei=0;
}
Shape.prototype.IMGS={
	T:"img/T.png",
	O:"img/O.png",
	I:"img/I.png",
	J:"img/J.png",
	L:"img/L.png",
	S:"img/S.png",
	Z:"img/Z.png",
}
Shape.prototype.moveDown=function(){//this->shape
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].r++;
	}
}
Shape.prototype.moveLeft=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c--;
	}
}
Shape.prototype.moveRight=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c++;
	}
}
Shape.prototype.rotateR=function(){
	this.statei++;//将当前对象的statei+1
  //如果statei==当前对象的states的元素个数，就将statei改为0
  this.statei==this.states.length&&(this.statei=0);
  this.rotate();//旋转当前图形
}
Shape.prototype.rotate=function(){
  //获得当前对象的cells中orgi位置的格，保存在orgCell中
  var orgCell=this.cells[this.orgi];
  //获得当前对象得states中statei位置的state对象
  var state=this.states[this.statei];
  //遍历当前图形的cells中每个cell
  for(var i=0;i<this.cells.length;i++){
    //如果i不等于orgi时(说明当前格不是参照格)
    if(i!=this.orgi){
      //就设置当前格的r等于orgCell的r+state对象中"r"+i属性的值
      this.cells[i].r=orgCell.r+state["r"+i];
      //就设置当前格的c等于orgCell的c+state对象中"c"+i属性的值
      this.cells[i].c=orgCell.c+state["c"+i];
    }
  }
}
//在Shape类型的原型对象中定义rotateL方法
Shape.prototype.rotateL=function(){
  this.statei--;//将statei-1
  //如果statei等于-1,就改回states的元素个数-1
  this.statei==-1&&(this.statei=this.states.length-1);
  //调用当前对象的rotate方法，旋转当前图形
  this.rotate();
}

function T(){
	var src=this.IMGS.T;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,4,src),
	],1,[
		new State(0,-1,0,0,0,1,1,0),
		new State(-1,0,0,0,1,0,0,-1),
		new State(0,1,0,0,0,-1,-1,0),
		new State(1,0,0,0,-1,0,0,1)
	]);
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function O(){
	var src=this.IMGS.O;
	Shape.call(this,[
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,4,src),
		new Cell(1,5,src),
	],1,[
		new State(0,-1,0,0,1,-1,1,0)
	]);
}
Object.setPrototypeOf(O.prototype,Shape.prototype);
function I(){
	var src=this.IMGS.I;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(0,6,src),
	],1,[
		new State(0,-1,0,0,0,1,0,2),
		new State(-1,0,0,0,1,0,2,0)
	]);
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
/*function T(){
	var src=this.IMGS.T;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,4,src),
	]);
}
Object.setPrototypeOf(T.protoytpe,Shape.prototype);
function T(){
	var src=this.IMGS.T;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,4,src),
	]);
}
Object.setPrototypeOf(T.protoytpe,Shape.prototype);
function T(){
	var src=this.IMGS.T;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,4,src),
	]);
}
Object.setPrototypeOf(T.protoytpe,Shape.prototype);
function T(){
	var src=this.IMGS.T;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,4,src),
	]);
}
Object.setPrototypeOf(T.protoytpe,Shape.prototype);*/