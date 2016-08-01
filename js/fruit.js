var fruitObj=function(){
	this.alive=[];//bool
	this.x=[];//果实的x坐标
	this.y=[];//果实的y坐标
	this.l=[];//果实的大少
	this.spd=[];//果实往上飘的速度和增长速度
	this.fruitType=[];//果实的类型
	this.orange=new Image();
	this.blue=new Image();
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.aneNo=[];
		this.l[i]=0;
		this.aneNo[i]=0;
		//让每个果实速度都不一样
		this.spd[i]=Math.random()*0.017+0.003//[0.003,0.02)
		this.fruitType[i]="";
	}
	this.orange.src="./img/fruit.png";
	this.blue.src="./img/blue.png"
}
fruitObj.prototype.draw=function(){
for(var i=0;i<this.num;i++){
	//画果实，找到海葵，然后向上飘
	//最大宽度高度为10
 if(this.alive[i]){	
 		if(this.fruitType[i]=="blue"){
 			var pic=this.blue;
 		}else{
 			var pic=this.orange;
 		}
		if(this.l[i]<=14){
			var NO=this.aneNo[i];
			this.x[i]=ane.headx[NO];
			this.y[i]=ane.heady[NO];
			this.l[i]+=this.spd[i]*deltaTime;//随时间变化而变化每两帧变化一次比较平滑
			// ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
		}else{
			this.y[i]-=this.spd[i]*7*deltaTime;
			// ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

		}
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
		if(this.y[i]<10){
			this.alive[i]=false;
		}
	}
  }
}

fruitObj.prototype.born=function(i){
	//找到对应海葵的ID
	this.aneNo[i]=Math.floor(Math.random()*ane.num);
	 this.l[i]=0;
	 this.alive[i]=true;
	 var ran=Math.random();
	 if(ran<0.2){
	 	this.fruitType[i]="blue";//orange,blue;
	 }else{
	 	this.fruitType[i]="orange";
	 }
	 
}
fruitObj.prototype.dead=function(i){
	this.alive[i]=false; 
}
//监视屏幕上有多少个果实
function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]) num++;
	}
	if(num<15){
		//send fruit
		sendFruit();
		return;
	}
}
//发出果实
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}
