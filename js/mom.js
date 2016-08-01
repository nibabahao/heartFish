var momObj=function(){
	this.x;
	this.y;
	this.angle;



	this.momTailTimer=0;
	this.momTailCount=0;
	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momBodyCount=0;

}
momObj.prototype.init=function(){
	this.x=canWidth/2;
	this.y=canHeight/2;
	this.angle=0;

}
momObj.prototype.draw=function(){
	//lerp x,y 让鱼跟着鼠标走，以每次0.9的速率
	this.x=lerpDistance(mx,this.x,0.98);
	this.y=lerpDistance(my,this.y,0.98);	

	//delta angle每帧计算角度差
	//Math.atan2(y,x);反正切计算
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;//lerpAngle返回来的值是-PI到PI的值

	//lerp angle让大鱼角度一直向于鼠标的角度
	this.angle=lerpAngle(beta,this.angle,0.6);

	//tail
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}
	//eye
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount==0){
			this.momEyeInterval=Math.random()*1500+200;
		}else{
			this.momEyeInterval=200;
		}
	}
	ctx1.save();
	//把原点移到canvas中间
	ctx1.translate(this.x,this.y);
	//把画布旋转到当前角度查
	ctx1.rotate(this.angle);
	var momTailCount=this.momTailCount;
	//鱼的眼睛,鱼的身体为原点 	//先画尾巴再画其他顺序覆盖问题
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width/2+30,-momTail[momTailCount].height/2);	
	var momBodyCount=this.momBodyCount;
	if(data.double==1){
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width/2,-momBodyOra[momBodyCount].height/2);
	}//ora如果是橙色就变橙色否则用蓝色
	else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width/2,-momBodyBlue[momBodyCount].height/2);
	}
	// ctx1.drawImage(this.bigBody,-this.bigBody.width/2,-this.bigBody.height/2);	
	var momEyeCount=this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width/2,-momEye[momEyeCount].height/2);
	ctx1.restore();
}