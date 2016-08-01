var aneObj=function(){
	//用二次贝塞尔曲线画出来回晃动
	//start point,control point,end point(sin)用正玄值求出
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.amp=[];
	this.alpha=0;//正玄函数的角度
}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*16+Math.random()*20;//[0,1)
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-250+Math.random()*50;
		this.amp[i]=Math.random()*50+50;
	}
}
aneObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0008;
	var l=Math.sin(this.alpha);//[-1,1]之间运动
	ctx2.save();
	ctx2.globalAlpha=0.6;
	ctx2.lineWidth=20;
	ctx2.lineCap="round";
	ctx2.strokeStyle="#3b154e";
	for(var i = 0;i<this.num;i++){
		//beginPath,moveTo,lineTo,closePath,stroke,lineWidth,lineCap线段样式
		//globalAlpha给绘制进来的物体给透明度
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i]+l*this.amp[i],this.heady[i]);
		ctx2.stroke();

	}
	ctx2.restore();
}