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

var food = new Sprite();
food.width = tileSize;
food.height = tileSize;
food.x;
food.y;
food.image = Textures.load("http://people.ucsc.edu/~donalexa/food.png");
world.addChild(food);

function startGame() {
	sHead.x = 400;
	sHead.y = 400;
	sHead.prevX = sHead.x;
	sHead.prevY = sHead.y;
	sHead.direction = "right";
	food.x = (Math.floor(Math.random()*(worldWidth/tileSize)))*tileSize;
	food.y = (Math.floor(Math.random()*(worldWidth/tileSize)))*tileSize;
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
	console.log(sList.tail);
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

function checkNom(x, y, List){	
	for(var i=1; i<List.length; i++){
		if(List.getAt(i).x == x && List.getAt(i).y == y){
			return true;
		}
	}
	return false;
}

function updateGame(){
	//Check for wall hit
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
	
	//Check for eaten
	if(sHead.x == food.x && sHead.y == food.y){
		/*var snake = new Sprite();
   		snake.height = tileSize;
   		snake.width = tileSize;
   		switch(sHead.direction){
			case "left":
   				snake.x = (sList.tail.x+(tileSize+2));
   				snake.y = (sList.tail.y);
   				break;
			case "right":
				snake.x = (sList.tail.x-(tileSize+2));
   				snake.y = (sList.tail.y);
				break;
			case "up":
				snake.x = (sList.tail.x);
   				snake.y = (sList.tail.y+(tileSize+2));
				break;
			case "down":
				snake.x = (sList.tail.x);
   				snake.y = (sList.tail.y-(tileSize+2));
				break;
		}
   		snake.prevX = snake.x;
   		snake.prevY = snake.y;	
   		snake.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sBody.png");
   		sList.push_back(snake);
   		world.addChild(sList.tail);*/
	}
	if(checkNom(sHead.x, sHead.y, sList)){
		console.log("SHIT NIGGA");
	}

	//Movement
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
