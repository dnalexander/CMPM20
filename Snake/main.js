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
sHead.prevX = sHead.x;
sHead.prevY = sHead.y;
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
   	snake.prevX = snake.x;
   	snake.prevY = snake.y;	
   	snake.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sBody.png");
   	sList.push(snake);
	}
	for(var j=0; j<sList.length; j++){
		world.addChild(sList.getAt(j));
	}
}

function updateSnake(){
	if(gInput.left && !gInput.right && !gInput.up && !gInput.down && (sHead.direction != "right")){
		sHead.direction = "left";
	}
	if(!gInput.left && gInput.right && !gInput.up && !gInput.down && (sHead.direction != "left")){
		sHead.direction = "right";
	}
	if(!gInput.left && !gInput.right && gInput.up && !gInput.down && (sHead.direction != "down")){
		sHead.direction = "up";
	}
	if(!gInput.left && !gInput.right && !gInput.up && gInput.down && (sHead.direction != "up")){
		sHead.direction = "down";
	}
	switch(sHead.direction){
		case "left":
			sHead.prevX -= tileSize;
			sHead.x -= tileSize;
			break;
		case "right":
			sHead.prevX += tileSize;
			sHead.x += tileSize;
			break;
		case "up":
			sHead.prevY -= tileSize;
			sHead.y -= tileSize;
			break;
		case "down":
			sHead.prevY += tileSize;
			sHead.y += tileSize;			
			break;			
	}
	/*console.log("left = "+gInput.left);
	console.log("right = "+gInput.right);
	console.log("up = "+gInput.up);
	console.log("down = "+gInput.down);*/
	for(var i=1; i<sList.length; i++){
		switch(sHead.direction){
		case "left":
			//sList.getAt(i).x = (sList.getAt(i-1).x+18);
			//sList.getAt(i).y = (sList.getAt(i-1).y)
			sList.getAt(i).x = (sList.getAt(i-1).prevX+18);
			sList.getAt(i).y = (sList.getAt(i-1).prevY);
			break;
		case "right":
			//sList.getAt(i).x = (sList.getAt(i-1).x-18);
			//sList.getAt(i).y = (sList.getAt(i-1).y)
			sList.getAt(i).x = (sList.getAt(i-1).prevX-18);
			sList.getAt(i).y = (sList.getAt(i-1).prevY);
			break;
		case "up":
			//sList.getAt(i).x = (sList.getAt(i-1).x);
			//sList.getAt(i).y = (sList.getAt(i-1).y+18)
			sList.getAt(i).x = (sList.getAt(i-1).prevX);
			sList.getAt(i).y = (sList.getAt(i-1).prevY+18);
			break;
		case "down":
			//sList.getAt(i).x = (sList.getAt(i-1).x);
			//sList.getAt(i).y = (sList.getAt(i-1).y-18)
			sList.getAt(i).x = (sList.getAt(i-1).prevX);
			sList.getAt(i).y = (sList.getAt(i-1).prevY-18);
			break;			
		}
	}
}

initSnake();
setInterval(updateSnake, 160);
//setInterval(updateSnake, 1000);
