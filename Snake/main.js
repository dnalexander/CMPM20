use2D = true;

//Global vars
var tileSize = 20; 
var worldWidth = 800;
var worldHeight = 800;
var run;
var stop = false;
gInput.addBool(65, "left");
gInput.addBool(68, "right");
gInput.addBool(87, "up");
gInput.addBool(83, "down");
var sList = new List();
var sHead = new Sprite();
sHead.height = tileSize;
sHead.width = tileSize;
sHead.x = 400;
sHead.y = 400;
sHead.prevX = sHead.x;
sHead.prevY = sHead.y;
sHead.direction = "right";
sHead.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sHead.png");
function startGame() {	
	sHead.x = 400;
	sHead.y = 400;
	sHead.prevX = sHead.x;
	sHead.prevY = sHead.y;
	sHead.direction = "right";
    var length = 4;
    sList.push(sHead);
    for(var i=1; i<length; i++){
   		var snake = new Sprite();
   		snake.height = tileSize;
   		snake.width = tileSize;
   		snake.x = (sList.getAt(i-1).x-(tileSize+2));
   		snake.y = (sList.getAt(i-1).y);
   		snake.prevX = snake.x;
   		snake.prevY = snake.y;	
   		snake.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sBody.png");
   		sList.push(snake);
	}
	for(var j=0; j<sList.length; j++){
		world.addChild(sList.getAt(j));
	}
	run = setInterval(updateGame, 160);
}

function updateSnake(){
	for(var i=1; i<sList.length; i++){
		sList.getAt(i).prevX = sList.getAt(i).x;
		sList.getAt(i).prevY = sList.getAt(i).y;
		switch(sHead.direction){
		case "left":
			sList.getAt(i).x = (sList.getAt(i-1).prevX+2);
			sList.getAt(i).y = (sList.getAt(i-1).prevY);
			break;
		case "right":
			sList.getAt(i).x = (sList.getAt(i-1).prevX-2);
			sList.getAt(i).y = (sList.getAt(i-1).prevY);
			break;
		case "up":
		 sList.getAt(i).x = (sList.getAt(i-1).prevX);
		 sList.getAt(i).y = (sList.getAt(i-1).prevY+2);
			break;
		case "down":
			sList.getAt(i).x = (sList.getAt(i-1).prevX);
			sList.getAt(i).y = (sList.getAt(i-1).prevY-2);
			break;
		}		
	}
}

function checkSnake(Sprite1, Sprite2){
	//1st Sprite bounds
	var minX1 = Sprite1.x;
	var maxX1 = Sprite1.x + Sprite1.width;
	var minY1 = Sprite1.y;
	var maxY1 = Sprite1.y + Sprite1.height;
	
	//2nd Sprite bounds
	var minX2 = Sprite2.x;
	var maxX2 = Sprite2.x + Sprite2.width;
	var minY1 = Sprite2.y;
	var maxY2 = Sprite2.y + Sprite2.height;
	
	if(maxX1 >= minX2 && maxX1 <= maxX2 && maxXY1 >= minY1 && maxY2 <= minY2){
		return true;
	}else {
		return false;
	}
}

function updateGame(){
	if(sHead.x+tileSize >= worldWidth || sHead.x <= 0 || sHead.y+tileSize >= worldHeight || sHead.y <= 0){
		stop = true;
		clearInterval(run);
		var hold = sList.length;
		for(var i=0; i<hold; i++){
			world.removeChild(sList.getAt(i));			
		}
		for(var j=0; j<hold; j++){
			sList.pop(Sprite);
		}
		startGame();
	}
	if(gInput.left && (sHead.direction != "right")){
		sHead.direction = "left";
	}
	if(gInput.right && (sHead.direction != "left")){
		sHead.direction = "right";
	}
	if(gInput.up && (sHead.direction != "down")){
		sHead.direction = "up";
	}
	if(gInput.down && (sHead.direction != "up")){
		sHead.direction = "down";
	}
	sHead.prevX = sHead.x;
	sHead.prevY = sHead.y;
	switch(sHead.direction){
		case "left":
			sHead.x -= tileSize;
			break;
		case "right":
			sHead.x += tileSize;
			break;
		case "up":
			sHead.y -= tileSize;
			break;
		case "down":
			sHead.y += tileSize;
			break;
	}
	updateSnake();	
}

startGame();
