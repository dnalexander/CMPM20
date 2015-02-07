use2D = true;
//Global vars
var tileSize = 20; 
var worldWidth = 800;
var worldHeight = 800;
var run;
var p1Score;
var p1Highest = 0;
var p1ScoreTxt = new TextBox();
p1ScoreTxt.x = 10;
p1ScoreTxt.y = 10;
world.addChild(p1ScoreTxt);
var p2Score;
var p2Highest = 0;
var p2ScoreTxt = new TextBox();
p2ScoreTxt.x = worldWidth-(10*tileSize);
p2ScoreTxt.y = 10;
world.addChild(p2ScoreTxt);

//Input bools : Player1 controls are WASD
gInput.addBool(65, "p1Left");
gInput.addBool(68, "p1Right");
gInput.addBool(87, "p1Up");
gInput.addBool(83, "p1Down");

//P2 controls are Arrow Keys
gInput.addBool(37, "p2Left");
gInput.addBool(39, "p2Right");
gInput.addBool(38, "p2Up");
gInput.addBool(40, "p2Down");

//Create snake 1 vars
var s1List = new List();
var s1Head = new Sprite();
s1Head.height = tileSize;
s1Head.width = tileSize;
s1Head.x = 400;
s1Head.y = 100;
s1Head.prevX = s1Head.x;
s1Head.prevY = s1Head.y;
s1Head.direction = "right";
s1Head.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sHead.png");

//Create snake 2 vars
var s2List = new List();
var s2Head = new Sprite();
s2Head.height = tileSize;
s2Head.width = tileSize;
s2Head.x = 400;
s2Head.y = 700;
s2Head.prevX = s2Head.x;
s2Head.prevY = s2Head.y;
s2Head.direction = "left";
s2Head.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/food.png");

//Create food
var food = new Sprite();
food.width = tileSize;
food.height = tileSize;
food.x;
food.y;
food.image = Textures.load("http://people.ucsc.edu/~donalexa/food.png");
world.addChild(food);

function startGame() {
	//Set object vars
	s1Head.x = 400;
	s1Head.y = 100;
	s1Head.prevX = s1Head.x;
	s1Head.prevY = s1Head.y;
	s1Head.direction = "right";
	s2Head.x = 400;
	s2Head.y = 700;
	s2Head.prevX = s2Head.x;
	s2Head.prevY = s2Head.y;
	s2Head.direction = "left";
	food.x = 400;
	food.y = 400;
	p1Score = 0;
	p2Score = 0;
    var length = 4;
    
    //Begin snake creation
    s1List.push(s1Head);
    s2List.push(s2Head);
    for(var i=1; i<length; i++){
   		var snake = new Sprite();
   		snake.height = tileSize;
   		snake.width = tileSize;
   		snake.x = (s1List.getAt(i-1).x-(tileSize+2));
   		snake.y = (s1List.getAt(i-1).y);
   		snake.prevX = snake.x;
   		snake.prevY = snake.y;
   		snake.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sBody.png");
   		s1List.push(snake);
	}
	for(var k=1; k<length; k++){
   		var snake = new Sprite();
   		snake.height = tileSize;
   		snake.width = tileSize;
   		snake.x = (s2List.getAt(k-1).x+(tileSize+2));
   		snake.y = (s2List.getAt(k-1).y);
   		snake.prevX = snake.x;
   		snake.prevY = snake.y;	
   		snake.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/food.png");
   		s2List.push(snake);
	}
	
	//Populate
	for(var j=0; j<length; j++){
		world.addChild(s1List.getAt(j));
		world.addChild(s2List.getAt(j));
	}
	
	//Go
	run = setInterval(updateGame, 160);
}

function updateSnake(List){
	//Move each snake segment based on where the one ahead of it used to be
	for(var i=1; i<List.length; i++){
		List.getAt(i).prevX = List.getAt(i).x;
		List.getAt(i).prevY = List.getAt(i).y;
		switch(List.getAt(0).direction){
		case "left":
			List.getAt(i).x = (List.getAt(i-1).prevX+2);
			List.getAt(i).y = (List.getAt(i-1).prevY);
			break;
		case "right":
			List.getAt(i).x = (List.getAt(i-1).prevX-2);
			List.getAt(i).y = (List.getAt(i-1).prevY);
			break;
		case "up":
		 	List.getAt(i).x = (List.getAt(i-1).prevX);
		 	List.getAt(i).y = (List.getAt(i-1).prevY+2);
			break;
		case "down":
			List.getAt(i).x = (List.getAt(i-1).prevX);
			List.getAt(i).y = (List.getAt(i-1).prevY-2);
			break;
		}		
	}
}


function checkNom(List){
	for(var i=1; i<List.length; i++){
		if(List.getAt(0).x == List.getAt(i).x && List.getAt(0).y == List.getAt(i).y){
			return true;
		}
	}
	return false;
}

function checkDinner(List){
	if(List.getAt(0).x == food.x && List.getAt(0).y == food.y){
		var snake = new Sprite();
   		snake.height = tileSize;
   		snake.width = tileSize;
   		switch(List.getAt(0).direction){
			case "left":
   				snake.x = (List.getAt(List.length-1).x+(tileSize+2));
   				snake.y = (List.getAt(List.length-1).y);
   				break;
			case "right":
				snake.x = (List.getAt(List.length-1).x-(tileSize+2));
				snake.y = (List.getAt(List.length-1).y);
				break;
			case "up":
				snake.x = (List.getAt(List.length-1).x);
   				snake.y = (List.getAt(List.length-1).y+(tileSize+2));
				break;
			case "down":
				snake.x = (List.getAt(List.length-1).x);
   				snake.y = (List.getAt(List.length-1).y-(tileSize+2));
				break;
		}
   		snake.prevX = snake.x;
   		snake.prevY = snake.y;
   		if(List == s1List){
   			snake.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/sBody.png");
   			p1Score++;
   		}
   		if(List == s2List){
   			snake.image = Textures.load("http://people.ucsc.edu/~tmcqueen/Sprites/food.png");
   			p2Score++;
   		}
   		List.push_back(snake);
   		world.addChild(List.getAt(List.length-1));
   		food.x = (Math.floor(Math.random()*(worldWidth/tileSize)))*tileSize;
   		food.y = (Math.floor(Math.random()*(worldWidth/tileSize)))*tileSize;
	}
}

function restart(){
	clearInterval(run);
		var hold1 = s1List.length;
		var hold2 = s2List.length;
		for(var i=0; i<hold1; i++){
			world.removeChild(s1List.getAt(i));			
		}
		for(var i=0; i<hold2; i++){
			world.removeChild(s2List.getAt(i));
		}
		for(var j=0; j<hold1; j++){
			s1List.pop(Sprite);
		}
		for(var j=0; j<hold2; j++){
			s2List.pop(Sprite);
		}
		if(p1Score > p1Highest) p1Highest = p1Score;
		if(p2Score > p2Highest) p2Highest = p1Score;
		startGame();
}

function updateGame(){
	//Check for wall hit, re-init game
	if(s1Head.x >= worldWidth || s1Head.x <= 0 || s1Head.y >= worldHeight || s1Head.y <= 0
		|| s2Head.x >= worldWidth || s2Head.x <= 0 || s2Head.y >= worldHeight || s2Head.y <=0){
		restart();
	}
	
	//Check for dinner, grow snake properly
	checkDinner(s1List);
	checkDinner(s2List);
		
	//Check for self-dinner, re-init game
	if(checkNom(s1List) || checkNom(s2List)){
		restart();
	}

	//Movement (Lines 215-273)
	if(gInput.p1Left && (s1Head.direction != "right")){
		s1Head.direction = "left";
	}
	if(gInput.p1Right && (s1Head.direction != "left")){
		s1Head.direction = "right";
	}
	if(gInput.p1Up && (s1Head.direction != "down")){
		s1Head.direction = "up";
	}
	if(gInput.p1Down && (s1Head.direction != "up")){
		s1Head.direction = "down";
	}
	if(gInput.p2Left && (s2Head.direction != "right")){
		s2Head.direction = "left";
	}
	if(gInput.p2Right && (s2Head.direction != "left")){
		s2Head.direction = "right";
	}
	if(gInput.p2Up && (s2Head.direction != "down")){
		s2Head.direction = "up";
	}
	if(gInput.p2Down && (s2Head.direction != "up")){
		s2Head.direction = "down";
	}
	s1Head.prevX = s1Head.x;
	s1Head.prevY = s1Head.y;
	s2Head.prevX = s2Head.x;
	s2Head.prevY = s2Head.y;
	switch(s1Head.direction){
		case "left":
			s1Head.x -= tileSize;
			break;
		case "right":
			s1Head.x += tileSize;
			break;
		case "up":
			s1Head.y -= tileSize;
			break;
		case "down":
			s1Head.y += tileSize;
			break;
	}
	switch(s2Head.direction){
		case "left":
			s2Head.x -= tileSize;
			break;
		case "right":
			s2Head.x += tileSize;
			break;
		case "up":
			s2Head.y -= tileSize;
			break;
		case "down":
			s2Head.y += tileSize;
			break;
	}
	updateSnake(s1List);
	updateSnake(s2List);
	p1ScoreTxt.text = "P1 Score: "+p1Score+"\nP1 Highest Score: "+p1Highest;
	p2ScoreTxt.text = "P2 Score: "+p2Score+"\nP2 Highest Score: "+p2Highest;
}

startGame();
