//判断大鱼和果实的距离，
function momFruitsCollision(){
	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive[i]){
				//calculate length
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l<900){
					//fruit has eaten;
					fruit.dead(i);
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount>7){
						mom.momBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue"){
						data.double=2;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}	
}
//mom baby collision
function momBabyCollision(){
	if(data.fruitNum>0&&!data.gameOver){
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			//baby recover
			baby.babyBodyCount=0;
			//data 当喂了小鱼要归零
			mom.momBodyCount=0;
			//计算score的更新
			data.addScore();
			//draw halo
			halo.born(baby.x,baby.y);
		}
	}	
}