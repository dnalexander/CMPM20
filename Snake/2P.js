use2D = true;

//Global vars
var tileSize = 25;

//P1 controls are WASD
gInput.addBool(65, "p1Left");
gInput.addBool(68, "p1Right");
gInput.addBool(87, "p1Up");
gInput.addBool(83, "p1Down");

//P2 controls are Arrow Keys
gInput.addBool(37, "p2Left");
gInput.addBool(39, "p2Right");
gInput.addBool(38, "p2Up");
gInput.addBool(40, "p2Down");


var P1 = new Sprite();
P1.height = tileSize;
P1.width = tileSize;
P1.x = 100;
P1.y = 100;
P1.direction = "right";
P1.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sHead.png");
world.addChild(P1);

var P2 = new Sprite();
P2.height = tileSize;
P2.width = tileSize;
P2.x = 700;
P2.y = 700;
P2.direction = "left";
P2.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/food.png");
world.addChild(P2);

var food = new Sprite();
food.height = tileSize;
food.width = tileSize;
food.x = 400;
food.y = 400;
food.image = Textures.load("http://people.ucsc.edu/~donalexa/food.png");
world.addChild(food);

function moveSnake(Sprite, dir){
	switch(dir){
		case "left":
			Sprite.x -= tileSize;
			break;
		case "right":
			Sprite.x += tileSize;
			break;
		case "up":
			Sprite.y -= tileSize;
			break;
		case "down":
			Sprite.y += tileSize;
			break;
	}
}

function updateGame(){
	//P1 Inputs
	if(gInput.p1Left && (P1.direction != "right")){
		P1.direction = "left";
	}
	if(gInput.p1Right && (P1.direction != "left")){
		P1.direction = "right";
	}
	if(gInput.p1Up && (P1.direction != "down")){
		P1.direction = "up";
	}
	if(gInput.p1Down && (P1.direction != "up")){
		P1.direction = "down";
	}
	//P2 Inputs
	if(gInput.p2Left && (P2.direction != "right")){
		P2.direction = "left";
	}
	if(gInput.p2Right && (P2.direction != "left")){
		P2.direction = "right";
	}
	if(gInput.p2Up && (P2.direction != "down")){
		P2.direction = "up";
	}
	if(gInput.p2Down && (P2.direction != "up")){
		P2.direction = "down";
	}
	switch(P1.direction){
		case "left":
			moveSnake(P1, "left");
			break;
		case "right":
			moveSnake(P1, "right");
			break;
		case "up":
			moveSnake(P1, "up");
			break;
		case "down":
			moveSnake(P1, "down");
			break;
	}
	switch(P2.direction){
		case "left":
			moveSnake(P2, "left");
			break;
		case "right":
			moveSnake(P2, "right");
			break;
		case "up":
			moveSnake(P2, "up");
			break;
		case "down":
			moveSnake(P2, "down");
			break;
	}
}

setInterval(updateGame, 160);
