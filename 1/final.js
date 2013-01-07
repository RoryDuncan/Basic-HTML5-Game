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

	/****** Images  ******************************/

	var imagesLoaded = 0,
			imageCount = 5,
			grass1 = new Image(),
			grass2 = new Image(),
			grass3 = new Image(),
			hero_img = new Image(),
			title_logo1 = new Image(),
			title_logo2 = new Image();

	grass1.src = "res/world/grass_1.png";
	grass2.src = "res/world/grass_2.png";
	grass3.src = "res/world/grass_3.png";
	hero_img.src = "res/heros/character1.png";
	title_logo1.src = "res/title5.png";
	title_logo2.src = "res/title4.png";
	grass1.addEventListener('load', imageLoad, false);
	grass2.addEventListener('load', imageLoad, false);
	grass3.addEventListener('load', imageLoad, false);
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
	Tile = function(number, xpos, indx) {
		this.id = number;
		this.x = ~~(tiles%map.width) * map.tileSize; // Every 128 tiles, the x is incremented
		this.y = ~~(number/128) * map.tileSize;		 // Divided by 128 to exhume the Y from the area, 
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
		map.data = [];
		document.body.style.cursor = "progress";
		loadingText = "Loading Map Data";

		for (var c = 0; c < (map.height*map.width); c += 1) {
			var data = new Tile(tiles, c * map.tileSize);
			//console.log(data);
			map.data.push(data);
		}
		map.made = true;
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
		player.spawn = function() {
			loadingText = "Creating Random Spawn Location...";
			player.spawn = Function("");									 // this function Only needs to be ran once
			randomTile = ~~( Math.random() * (map.height * map.width) / 2 ); // first get a random number within the map
			player.x = map.data[randomTile].x;								 // use the random number as the id of a tile
			player.y = map.data[randomTile].y;
			player.isOnTile = map.data[randomTile].id;								 // each tile is an object with an x and a y, assign those.
			console.log( "Player will spawn at the tile at " + (player.x/50) + ", " + (player.y/50) + ".");
			console.log(player.isOnTile);
			loadingText	= "Player spawn set.";
		};

	var screen = new Object();
		/* screen.location may need to be changed, since it will be referred to often. */
		screen.location = (map.made === true) ? map.data[player.isOnTile].id : 0; 


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
		if (gameMode === 2) console.log("game mode 3!");
	}; // End of drawscreen()


	// Globals for title screen
	var arrowPosition = 275,
		  helpText = "Press ENTER to select.",
		  flicker = 0;
	function titleScreen() {

		//This is the title, in which people will choose from seperate options.
		titleSetControls();
		//rendered screen

		ctx.fillStyle = bgColor;
		ctx.fillRect(0,0, canvas.width, canvas.height);
		ctx.font = "normal 14px PressStart2P";
		ctx.fillStyle = menuText;

		ctx.drawImage(title_logo1, 320, 180);

		flicker += 1;
		if (flicker % 15 == 0) {
			ctx.fillStyle = bgColor;
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

	function titleSetControls() {
		//  Controls
		titleSetControls = Function("");  //insures only runs once.
		$(document).bind('keyup.a', menu_a_button);
		$(document).bind('keyup.d', menu_d_button);
		$(document).bind('keyup.left', menu_a_button);
		$(document).bind('keyup.right', menu_d_button);
		$(document).bind('keyup.return', menu_return_button);

	}; //end of titleSetControls



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
		}
		player.spawn();
		

	}; //end of loadGame


	drawScreen();

}; // end of init()

document.addEventListener('DOMContentLoaded', init, false);