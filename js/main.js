var can1;
var can2;

var ctx1;
var ctx2;

var screenWidth=document.documentElement.clientWidth;
var screenHeight=document.documentElement.clientHeight;

var canWidth;
var canHeight;

var mx;//鼠标的X位置
var my;//鼠标的Y位置

var lastTime;//上一帧的时间
var deltaTime;//两帧之间的初始时间
var bgPic= new Image();

var ane;
var fruit;
var mom;
var baby;

var babyTail= [];
var babyEye=[];
var babyBody=[];

var momTail=[];
var momEye=[];
var momBodyOra=[];
var momBodyBlue=[];
var data;

var wave;
var halo;

var dust;
var dustPic=[];

var num=0;	



//图片预加载
function imgLoading(){
		imgPart("babyEye",2);
		imgPart("babyFade",20);
		imgPart("babyTail",8);
		imgPart("background",1);
		imgPart("bigEye",2);
		imgPart("bigSwim",8);
		imgPart("bigSwimBlue",8);
		imgPart("bigTail",8);
		imgPart("dust",7);
}
function imgPart(src,len,flag){
	for(var i=0;i<len;i++){
		var img=new Image();
		img.src="img/"+src+i+".png";
		img.onload=function(){
			num++;
			if(num==64){
				game();
			}
		}
	}	
}

window.onload=imgLoading;
function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameLoop();
}

function init(){
	//获取canvas  context
	can1=document.getElementById("canvas1");
	ctx1=can1.getContext("2d");
	can2=document.getElementById("canvas2");
	ctx2=can2.getContext("2d");
	if(screenWidth>=800){
		canWidth=can1.width;
		canHeight=can1.height;
	}else{
		can1.width=screenWidth;
		can1.height=screenHeight;
		can2.width=screenWidth;
		can2.height=screenHeight;
		canWidth=can1.width;
		canHeight=can1.height;		
	}
	//获取鼠标进入canvas1里面的值
	can1.addEventListener("touchstart",onMouseMove,false);
	bgPic.src="./img/background0.png";
	//构建海葵对象并初始化所有属性
	ane=new aneObj();
	ane.init();
	//构建果实的对象并初始化所有属性
	fruit=new fruitObj();
	fruit.init();
	//构建大鱼对象
	mom=new momObj();
	mom.init();
	//构建小鱼
	baby=new babyObj();
	baby.init();

	data=new dataObj();
	mx=canWidth/2;
	my=canHeight/2;

	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="./img/babyTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="./img/babyEye"+i+".png";
	}
	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="./img/babyFade"+i+".png";
	}
	for(var i=0;i<8;i++){
		momTail[i]=new Image();
		momTail[i].src="./img/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src="./img/bigEye"+i+".png";
	}	
	for(var i=0;i<8;i++){
		momBodyOra[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOra[i].src="./img/bigSwim"+i+".png";
		momBodyBlue[i].src="./img/bigSwimBlue"+i+".png";
	}
	ctx1.font="30px Verdana";
	ctx1.textAlign="center";//left,center,right	

	wave=new waveObj();
	wave.init();
	halo=new haloObj();
	halo.init();
	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="./img/dust"+i+".png";
	}
	dust=new dustObj();
	dust.init();
}
function gameLoop(){
	window.requestAnimationFrame(gameLoop);//frame per second=fps
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	//防止浏览器切换选项时间差太大果实变太大
	if(deltaTime>40) deltaTime=40; 
	// ctx2.clearRect(0,0,canWidth,canHeight);		
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMouseMove(e){
	document.addEventListener("touchmove",function(e){
		e.preventDefault();
	},false);
	if(!data.gameOver){
		if (e.touches[0]) {
			mx=e.touches[0].clientX==undefined?e.touches[0].pageX:e.touches[0].clientX;
			my=e.touches[0].clientY==undefined?e.touches[0].pageY:e.touches[0].clientY;
		}
	}	
}
