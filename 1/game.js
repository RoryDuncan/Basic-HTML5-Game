var init = function() {
	console.log("Initializing.");




	/*********    SETTINGS    ************/


	var canvas = document.getElementById("output"),
			ctx = canvas.getContext("2d"),
 			W = window.screen.availWidth,
			H = window.screen.availHeight;
	canvas.height = 750;
	canvas.width = 1050;
	var gameMode = 0; //game modes: 0=title, 1 = loading, 2 = gameplay, 3 = game menu 
	console.log("Initialized.");





	/*********    Input Events    ************/


	var Mouse = { //make a globally available object with x,y attributes 
		x: 0,
		y: 0
	}
	canvas.onmousemove = function (event) {
		Mouse = {
			x: event.pageX - this.offsetLeft,
			y: event.pageY - this.offsetTop
		}
	};


	/******************** title ********************/

	function titleSetControls() {
		//  Controls
		titleSetControls = Function("");  //insures only runs once.
		$(document).bind('keyup.a', menu_a_button);
		$(document).bind('keyup.d', menu_d_button);
		$(document).bind('keyup.left', menu_a_button);
		$(document).bind('keyup.right', menu_d_button);
		$(document).bind('keyup.return', menu_return_button);

	 }; 
		function menu_a_button() {
			if (arrowPosition == 375 || arrowPosition == 475) {
			helpText = "Press ENTER to select.";
			arrowPosition -= 100;
			}
		 };

	function menu_d_button() {
			if (arrowPosition == 275 || arrowPosition == 375) {
			helpText = "Press ENTER to select.";
			arrowPosition += 100;
			}    
		 };
	function menu_return_button() { 
		if (arrowPosition == 275) {
			$(document).unbind('keyup.a', menu_a_button);
			$(document).unbind('keyup.d', menu_d_button);
			$(document).unbind('keyup.left', menu_a_button);
			$(document).unbind('keyup.right', menu_d_button);
			$(document).unbind('keyup.return', menu_return_button);
			gameMode = 1;
		}
		else if (arrowPosition == 375) {
			helpText = "Not Implemented Yet.";
		}
		else if (arrowPosition == 475) {
			helpText = "Not Implemented Yet.. either.";
		}
	};
	/******************** GAME ********************/

	function gameSetControls() {
		//  Controls
		gameSetControls = Function("");  //insures only runs once.
		$(document).bind('keydown.w', game_w_button);
		$(document).bind('keydown.s', game_s_button);
		$(document).bind('keydown.a', game_a_button);
		$(document).bind('keydown.d', game_d_button);
		$(document).bind('keydown.up', game_w_button);
		$(document).bind('keydown.down', game_s_button);
		$(document).bind('keydown.left', game_a_button);
		$(document).bind('keydown.right', game_d_button);
		$(document).bind('keyup.return', game_return_button);
	 };
	function game_w_button() {
		console.log("w");
		console.log(player.isOnTile);
		player.isOnTile -= 128;
		game();
	};
	function game_a_button() {
		console.log("a");
	 	player.isOnTile -= 1;
		game();
	};
	function game_s_button() {
		console.log("s");
		player.isOnTile += 128;
		game();
	};
	function game_d_button() {
		console.log("d");
		player.isOnTile += 1;
		game();
		};
	function game_return_button() {};



	/****** Images  ******************************/

	var imagesLoaded = 0,
			imageCount = 7,
			grass1 = new Image(),
			grass2 = new Image(),
			grass3 = new Image(),
			grass4 = new Image(),
			hero_img = new Image(),
			title_logo1 = new Image(),
			title_logo2 = new Image();

	grass1.src = "res/world/grass_1.png";
	grass2.src = "res/world/grass_2.png";
	grass3.src = "res/world/grass_3.png";
	grass4.src = "res/world/grass_4.png";
	hero_img.src = "res/heros/character1.png";
	title_logo1.src = "res/title5.png";
	title_logo2.src = "res/title4.png";
	grass1.addEventListener('load', imageLoad, false);
	grass2.addEventListener('load', imageLoad, false);
	grass3.addEventListener('load', imageLoad, false);
	grass4.addEventListener('load', imageLoad, false);
	hero_img.addEventListener('load', imageLoad, false);
	title_logo1.addEventListener('load', imageLoad, false);
	title_logo2.addEventListener('load', imageLoad, false);




	/****** Colors  ******************************/

	var bgColor = "#181818",
		lightText = "#8f8f8f",
		menuText = "#377778";




	/****** Objects  ******************************/

	var map = new Object();
	map.height = 128;
	map.width = 128;
	var tiles = 0, //the area of the map.
	Tile = function(number, xpos, indx) { //constructor
		this.id = number;
		this.x = ~~(tiles%map.width); // Every 128 tiles, the x is incremented
		this.y = ~~(number/128);		 // Divided by 128 to exhume the Y from the area, 
		if (indx === 0 || indx === 1 || indx === 2 || indx === 3 || indx === 4 ) {
			this.image = indx;
		}
		else { this.image = ~~(Math.random() * 4); }
		tiles += 1;
	 };
	map.data = new Array();
	map.tileSize = 50;
	map.made = false;
	map.makeMap = function() {
		map.made = true;
		map.data = [];
		document.body.style.cursor = "progress";
		loadingText = "Loading Map Data";

		for (var c = 0; c < (map.height*map.width); c += 1) {
			var data = new Tile(tiles, c * map.tileSize);
			map.data.push(data);
		}

		map.data.sort(function(a, b) {//Sorting of the array containing the map tiles. Sorts y, then x
    	if(a.y < b.y) { return -1; }
    	else if(a.y > b.y) { return 1; }
    	else if(a.x < b.x) { return -1; }
    	else if(a.x > b.x) { return 1; }
    	else if(a.x == b.x && a.y == b.y) { return 0; }
  	 });

		screen.center = map.data[player.isOnTile];
		loadingText = "Map Data Finished.";
		document.body.style.cursor = "default";
	};
	map.draw = function() {
		loadingText = "Drawing Map..";
		
	};



	var player = new Object();
		player.x = 0;
		player.y = 0;
		player.isOnTile = 0;
		player.set = false;
		player.spawn = function() {

			player.set = true;
			loadingText = "Creating Random Spawn Location...";
			randomTile = 60 + ~~( Math.random() * (map.height * map.width) / 2);// first get a random number within the map

			player.x = map.data[randomTile].x;								 									// use the random number as the id of a tile
				if (player.x <= 12 || player.x >= 117 ) {player.spawn(); return;}	// check to make sure player.x won't go below 0

			player.y = map.data[randomTile].y;
				if (player.y <= 9 || player.y >= 120 ) {player.spawn(); return;}

			player.isOnTile = map.data[randomTile].id;								 // each tile is an object with an x and a y, assign those.
			loadingText	= "Player spawn set.";
		};
		player.draw = function() {
			player.x = screen.selectAll[~~(screen.selectAll.length/2)].x*50;
			player.y =  screen.selectAll[~~(screen.selectAll.length/2)].y*50;
			ctx.drawImage(hero_img, player.x, player.y);

		};

	var screen = new Object();

		/****** NOTES **********
		the screen is 1050 wide, 750 high. the 50 is added to make a center tile possible
		
		The x to the left is now one less than the current position, the x to the right is one more
		the y above is +128 the current array position, the y under is -128

		************************/

		screen.center =  0;
		screen.selectAll = [];
		screen.loadTiles = function() {

			//function for grabbing the screen
			// the argument margin expands the area. Only needs to be called on X or y position update.
			console.log("Player on tile: " + player.isOnTile + " which converts to " + map.data[player.isOnTile].x +", "+map.data[player.isOnTile].y);
			console.log("The lowest possible at spawn being: " + (map.data[player.isOnTile].x - 10) + ", " + (map.data[(player.isOnTile)].x +10) + ", " + (map.data[player.isOnTile].y - 7) + ", " +( map.data[player.isOnTile].y + 7) + ". ");
			var topLeftCorner =  map.data[ player.isOnTile - 10 - (128 * 7 ) ];
			var botLeftCorner =  map.data[ player.isOnTile - 10 + (128 * 7 ) ];
			var topRightCorner =  map.data[ player.isOnTile + 10 - (128 * 7 ) ];
			var botRightCorner =  map.data[ player.isOnTile + 10 + ( 128 * 7 ) ];
			//console.log(map.data[check-5], map.data[check-1], map.data[check], map.data[check+1], map.data[check+5]);
			screen.selectAll = [];  // clears array
			//console.log(topLeftCorner, map.data[topLeftCorner.id+1]);

			for (col = topLeftCorner.y; col <= botLeftCorner.y; col+=1) {

				for (row=topLeftCorner.x; row <= topRightCorner.x; row +=1) {
					var currentTile = map.data[row + (col * 128)];
					screen.selectAll.push(currentTile);
				}

			}
			loadingText = "     Done.";
		};

		screen.move = function() {
			ctx.translate((screen.selectAll[0].x)*-50, (screen.selectAll[0].y)*-50);	//moves the screen to match the player position.
		};
		screen.drawTiles = function() {
			for (var i = 0; i < screen.selectAll.length; i+=1)
			{
				ctx.fillStyle=bgColor;
				ctx.fillRect(screen.selectAll[0].x, screen.selectAll[0].y, screen.selectAll[0].x+1050, screen.selectAll[0].y+750);
				//grass_tile = grass + screen.selectAll[i].image;
				if (screen.selectAll[i].image ===1) ctx.drawImage(grass2, screen.selectAll[i].x*50, screen.selectAll[i].y*50);
				else if (screen.selectAll[i].image ===2) ctx.drawImage(grass3, screen.selectAll[i].x*50, screen.selectAll[i].y*50);
				else if (screen.selectAll[i].image ===3) ctx.drawImage(grass2, screen.selectAll[i].x*50, screen.selectAll[i].y*50);
				else if (screen.selectAll[i].image ===4) ctx.drawImage(grass2, screen.selectAll[i].x*50, screen.selectAll[i].y*50);
				else  ctx.drawImage(grass3, screen.selectAll[i].x*50, screen.selectAll[i].y*50);
				//ctx.drawImage(grass1, i, i);
			}

		};


	/****** Content  ******************************/


	function imageLoad() {
		imagesLoaded += 1;

		//  a 'wait' for all images to load

		if (imagesLoaded === imageCount) {
			// shim layer with setTimeout fallback
			window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame   || 
				window.webkitRequestAnimationFrame     || 
				window.mozRequestAnimationFrame        || 
				window.oRequestAnimationFrame          || 
				window.msRequestAnimationFrame         || 
				function( callback ){
					window.setTimeout(callback, 1000 / 60);
				};
			})();
			(function animloop(){
				requestAnimFrame(animloop);
				drawScreen();
			})();
		 }
	 }; // end of imageLoad()


	function drawScreen() {
		if (gameMode === 0) titleScreen();
		if (gameMode === 1) loadGame();
		if (gameMode === 2) game();
	}; // End of drawscreen()


	// Globals for title screen
	var arrowPosition = 275,
		  helpText = "Press ENTER to select.",
		  flicker = 0;
	function titleScreen() {
		titleSetControls();

		//rendered screen

		ctx.fillStyle = bgColor;
		ctx.fillRect(0,0, canvas.width, canvas.height);
		ctx.font = "normal 14px PressStart2P";
		ctx.fillStyle = menuText;

		ctx.drawImage(title_logo1, 320, 180);

		flicker += 1;
		if (flicker % 80 == 0) {
			ctx.fillStyle = "#ccf";
			flicker=0;
		}
		else { ctx.fillStyle = lightText; }
		ctx.fillText("→", arrowPosition, 380);
		ctx.fillStyle = menuText;

		ctx.fillText("start", 300, 380);
		ctx.fillText("about", 400, 380);
		ctx.fillText("ctrls", 500, 380);
		ctx.fillText("----", 600, 380);
		ctx.fillStyle = lightText;
		ctx.fillText(helpText, 350, 600);

	}; // end of titleScreen




	var loadingText = "Loading...",
	loadingColor = 0; //counter for loading screen effect

	function loadGame() {
		//loadGame = Function("");
		ctx.fillStyle = bgColor;
		ctx.fillRect(0,0, canvas.width, canvas.height);
		ctx.font = "normal 14px PressStart2P";
		ctx.fillStyle = lightText;
		ctx.drawImage(title_logo1, 320, 180);

		//Render of loading Screen
		if (loadingColor <= 30) {
			loadingColor += 1;
			ctx.fillStyle = lightText;
		}
		else {
			loadingColor = 0;
			ctx.fillStyle = "#ccc";
		}

		ctx.fillText(loadingText, 350, 400);

		if (map.made === false) {
			map.makeMap();
			player.spawn();
			screen.loadTiles(0);
		}
		else gameMode = 2;

	}; //end of loadGame

	function game() {
		gameSetControls();
		ctx.fillStyle = bgColor;
		ctx.fillRect(0,0, canvas.width, canvas.height);
		ctx.font = "normal 14px PressStart2P";
		ctx.fillStyle = lightText;
		ctx.drawImage(title_logo1, 320, 180);
		screen.drawTiles();														//	draw background
		player.draw();																// draw player's character
		//ctx.drawImage(hero_img, 9, 9);
		//ctx.drawImage(hero_img, map.data[player.isOnTile].x, map.data[player.isOnTile].y);
		screen.move();																//	Adjust screen to player position


	};

	drawScreen();

}; // end of init()

document.addEventListener('DOMContentLoaded', init, false);