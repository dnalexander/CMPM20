use2D = true;

//Global vars
var tileSize = 16; 
gInput.addBool(65, "left");
gInput.addBool(68, "right");
gInput.addBool(87, "up");
gInput.addBool(83, "down");
var sList = new List();
var sHead = new Sprite();
sHead.height = tileSize;
sHead.width = tileSize;
sHead.x = 400;
sHead.y = 500;
sHead.direction = "right";
sHead.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sHead.png");
function initSnake() {
    var length = 4;
    sList.push(sHead);
    for(var i=1; i<length; i++){
   	var snake = new Sprite();
   	snake.height = tileSize;
   	snake.width = tileSize;
   	snake.x = (sList.getAt(i-1).x-18);
   	snake.y = (sList.getAt(i-1).y);
   	snake.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sBody.png");
   	sList.push(snake);
	}
	for(var j=0; j<sList.length; j++){
		world.addChild(sList.getAt(j));
	}
}

function updateSnake(){
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
	for(var i=0; i<sList.length; i++){
		
	}
}

initSnake();
updateSnake();
