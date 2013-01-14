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

		$(document).bind('keyup.u', pan_up);
		$(document).bind('keyup.h', pan_left);
		$(document).bind('keyup.j', pan_down);
		$(document).bind('keyup.k', pan_right);

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
	function game_w_button() {};
	function game_a_button() {};
	function game_s_button() {};
	function game_d_button() {};
	function game_return_button() {};

	function pan_up() {
		//screen.moveToY-=50;
		pan( 0, -50);
	};
	function pan_left() {
		//screen.moveToX-=50;
		pan(-50, 0);
	};
	function pan_down() {
		//screen.moveToY+=50;
		pan(0, 50);
	};
	function pan_right() {
		//screen.moveToX+=50;
		pan(50, 0);
	};

	function pan(newX, newY) {

		if ( newY !== undefined ) {
			console.log("bam!");
			screen.moveToX = newX;
			screen.moveToY = newY;
			screen.x += screen.moveToX;
			screen.y += screen.moveToY;
			ctx.translate(screen.moveToX, screen.moveToY);
		}
		else {
			console.log("bing!");
			screen.x += screen.moveToX;
			screen.y += screen.moveToY;
			ctx.translate(screen.moveToX, screen.moveToY);
		}
			screen.moveToX = 0;
			screen.moveToY = 0;
	};


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
	map.tiles = 0, //the area of the map.
	Tile = function(number, xpos, ypos, indx) { //constructor
		this.id = number;
		//this.x = ~~(tiles%map.width); // Every 128 tiles, the x is incremented
		//this.y = ~~(number/128);		 // Divided by 128 to exhume the Y from the area, 
		this.x = xpos;
		this.y = ypos;
		if (indx) {
			this.image = indx;
		}
		else { this.image = ~~(Math.random() * 4); }
		map.tiles += 1;
	 };
	map.data = new Array();
	map.tileSize = 50;
	map.made = false;
	map.makeMap = function() {

		map.data = [];
		loadingText = "Loading Map Data";
		var myDate = new Date();
		for (var i=0, x = 0, y = 0; i < (map.height*map.width); i += 1, x+=1) {
			if (x === map.width) {
				x = 0;
				y+=1;
			}
			var data = new Tile(map.tiles, x, y);
			map.data.push(data);
		}
		var result = (new Date() - myDate);
		loadingText = (map.tiles + " tiles loaded in " + result + " milliseconds.");
		console.log(map.data);
		map.made = true;
		/*
		map.data.sort(function(a, b) {//Sorting of the array containing the map tiles. Sorts y, then x
    	if(a.y < b.y) { return -1; }
    	else if(a.y > b.y) { return 1; }
    	else if(a.x < b.x) { return -1; }
    	else if(a.x > b.x) { return 1; }
    	else if(a.x == b.x && a.y == b.y) { return 0; }
  	 });
		*/
		
	};
	map.draw = function() {
		loadingText = "Drawing Map..";
		
	};



	var player = new Object();
		player.x = 0;
		player.y = 0;
		player.isOnTile = 0;
		player.spawnTile = 0;
		player.set = false;

		player.spawn = function() {
			/*			Needs rewriting	*/
		};

		player.draw = function() {
			//ctx.drawImage(hero_img, map.data[player.isOnTile].x*50, map.data[player.isOnTile].y*50);
			//screen.move();

		};

	var screen = new Object();

		/****** NOTES **********
		the screen is 1050 wide, 750 high. the 50 is added to make a center tile possible
		
		The x to the left is now one less than the current position, the x to the right is one more
		the y above is +128 the current array position, the y under is -128

		************************/

		screen.center = 1200;
		screen.moveToX = 0;
		screen.moveToY = 0;
		screen.x = 0;			//keeps track of the screen position
		screen.y = 0;
		screen.selected = [];
		screen.select = function() {

			var center = screen.center;

			/*debug*/	//console.log("Center: "+center);

			var bottomRightCorner = (center+10)+(map.width*7);
			if ( bottomRightCorner < 0 ) { return console.log("Need to generate more tiles."); }

			///*debug*/	console.log("Bottom Right: "+bottomRightCorner);
			///*debug*/	console.log("Bottom Right X: "+map.data[bottomRightCorner].x);
			///*debug*/	console.log("Bottom Right Y: "+map.data[bottomRightCorner].y);
			var topLeftCorner = (center-10)-(map.width*7);

			if ( topLeftCorner < 0 ) { return console.log("Need to generate more tiles."); }
			///*debug*/console.log("Top Left: "+topLeftCorner);
			///*debug*/console.log("Top Left X: "+map.data[topLeftCorner].x);

			for (var i = topLeftCorner, xx = (map.data[bottomRightCorner].x - map.data[topLeftCorner].x)+1, counter = 0;  /*i < bottomRightCorner*/ counter < 315; i++, counter++) {
					if ( counter % (xx) === 0  && counter != 0) {
						//console.log("From " + i + " to " + (i+ ( 128 - xx ) ) );
						i+=(128 - (xx));
					 }
					var data = map.data[i];
					screen.selected.push(data);
					if (i >= (bottomRightCorner)) break;

				}
			screen.tilesLoaded = true;
			console.log(screen.selected);	
		};
		screen.tilesLoaded = false;
		screen.loadTiles = function() { };
		screen.move = function() { };
		screen.drawTiles = function() {
			SetScreenInitially();
			//console.log("Drawing Tiles");

			for (var i = 0, ii = screen.selected.length; i < ii; i++) {

				ctx.drawImage(grass3, screen.selected[i].x*map.tileSize, screen.selected[i].y*map.tileSize);
			}

		};
		var SetScreenInitially = function() {

				SetScreenInitially = Function("");	//	rewrite the function
				console.log("Set to " + screen.selected[0].x*-50 + ", " + screen.selected[0].y*-50);
				pan(screen.selected[0].x*-50, screen.selected[0].y*-50);

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
		console.log("drawn");
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

		ctx.fillText(loadingText, (350 - loadingText.length*3), 400);
		if (map.made === false) {
			map.makeMap();
			screen.select();
			//player.spawn();

		}

		if (screen.tilesLoaded === true) { gameMode = 2; }


	}; //end of loadGame

	function game() {
		ctx.fillStyle = bgColor;
		ctx.fillRect(screen.selected.length*(-50), screen.selected.length*(-50), (screen.selected.length*50)*2+100, (screen.selected.length*50)*2+100);
		ctx.fillStyle = lightText;
		ctx.fillText("Drawing...", 20, 20);

		//pan();
		screen.drawTiles();
	};

	drawScreen();

}; // end of init()

document.addEventListener('DOMContentLoaded', init, false);