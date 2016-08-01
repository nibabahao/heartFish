var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	this.babyBody=new Image();

	this.babyTailTimer=0;
	this.babyTailCount=0;

	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;

	this.babyBodyTimer=0;
	this.babyBodyCount=0;
}
babyObj.prototype.init=function(){
	this.x=canWidth/2-50;
	this.y=canHeight/2+50;
	this.angle=0;
	this.babyBody.src="./img/babyFade0.png";
}

babyObj.prototype.draw=function(){
	//ctx1
	//lerp x,y
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);
	//lerp angle
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;//-PI,PI

	//lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6);
	//baby tail count
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		// 只会出现0到7之间
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;
	}
	//baby eye
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;

		if(this.babyEyeCount==0){
			this.babyEyeInterval=Math.random()*1500+2000;
		}else{
			this.babyEyeInterval=200;
		}
	}
	//baby body
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount=this.babyBodyCount+1;
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			//game over
			data.gameOver=true;
		}
	}
	//ctx1
	ctx1.save();
	//translate()
	ctx1.translate(this.x,this.y);
	//先画尾巴再画其他顺序覆盖问题
	//旋转角度
	ctx1.rotate(this.angle);
	//临时变量
	var babyTailCount=this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width/2+23,-babyTail[babyTailCount].height/2);
	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width/2,-babyBody[babyBodyCount].height/2);
	var babyEyeCount=this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width/2,-babyEye[babyEyeCount].height/2);
	ctx1.restore();
}