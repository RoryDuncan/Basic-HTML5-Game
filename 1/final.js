var init = function() {
	console.log("Initializing.");


	/*********    SETTINGS    ************/


	var canvas = document.getElementById("output"),
			ctx = canvas.getContext("2d"),
 			W = window.screen.availWidth,
			H = window.screen.availHeight;
	canvas.height = 700;
	canvas.width = 1000;
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
	}; // End of drawscreen()


	// Globals for title screen
	var arrowPosition = 280,
		  helpText = "Press ENTER to select.",
		  flicker = 0;
	function titleScreen() {

		//This is the title, in which people will choose from seperate options.
		titleSetControls();
		//rendered screen

		ctx.fillStyle = "#181818";
		ctx.fillRect(0,0, canvas.width, canvas.height);
		ctx.font = "normal 14px PressStart2P";
		ctx.fillStyle = "#208cb0";

		ctx.drawImage(title_logo1, 320, 180);

		flicker += 1;
		if (flicker % 5 == 0) { ctx.fillStyle = "#8f8f8f"; flicker=0; }
		else { ctx.fillStyle = "#2040aa"; }
		ctx.fillText("█", arrowPosition, 376);
		ctx.fillStyle = "#2040aa";

		ctx.fillText("start", 300, 380);
		ctx.fillText("about", 400, 380);
		ctx.fillText("ctrls", 500, 380);
		ctx.fillText("----", 600, 380);
		ctx.fillStyle = "#8f8f8f";
		ctx.fillText(helpText, 350, 600);

	}; // end of titleScreen

	function menu_a_button() {
		if (arrowPosition == 380 || arrowPosition == 480) {
			helpText = "Press ENTER to select.";
			arrowPosition -= 100;
		}
	};

	function menu_d_button() {
		if (arrowPosition == 280 || arrowPosition == 380) {
			helpText = "Press ENTER to select.";
			arrowPosition += 100;
		}    
	};
	function menu_return_button() { 
		if (arrowPosition == 280) {
			$(document).unbind('keyup.a', menu_a_button);
			$(document).unbind('keyup.d', menu_d_button);
			$(document).unbind('keyup.left', menu_a_button);
			$(document).unbind('keyup.right', menu_d_button);
			$(document).unbind('keyup.return', menu_return_button);
			gameMode = 1;
		}
		else if (arrowPosition == 380) {
			helpText = "Not Implemented Yet.";
		}
		else if (arrowPosition == 480) {
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

	var map = new Object();
	map.height = 128;
	map.width = 128;
	var tiles = 0;
	Tile = function(number, xpos, ypos, indx) {
		tiles += 1;
		this.id = number;
		this.x = xpos;
		this.y = ypos;
		if (indx === 0 || indx === 1 || indx === 2 || indx === 3 || indx === 4 ) {
			this.image = indx;
		}
		else { this.image = ~~(Math.random() * 4); }
	};
	map.data = new Array();
	map.tileSize = 50;
	map.made = false;

	map.makeMap = function() {
		// y axis is spine, x axis is filled
		map.data = [];
		document.body.style.cursor = "";
		loadingText = "Loading Map Data";
		for (var y = 0; y <= map.height - 1; y += 1) {
			// X axis
			for (var x = 0; x <= map.width - 1; x += 1) {
				var data = new Tile(tiles, x * map.tileSize, y * map.tileSize);
				console.log(data);
				map.data.push(data);
				/* 
				I learned that 
				map.data[anything].push(stuff)
				is not allowed, while
				map.data.push(stuff) is.
				*/
			}
		}
		map.made = true;
		loadingText = "Map Data Finished.";
	};

	var loadingText = "Loading...",
	loadingColor = 0; //counter for loading screen effect

	function loadGame() {
		//loadGame = Function("");
		ctx.fillStyle = "#141414";
		ctx.fillRect(0,0, canvas.width, canvas.height);
		ctx.font = "normal 14px PressStart2P";
		ctx.fillStyle = "#8f8f8f";
		ctx.drawImage(title_logo1, 320, 180);

		//Render of loading Screen
		if (loadingColor <= 30) {
			loadingColor += 1;
			ctx.fillStyle = "#8f8f8f";
		}
		else {
			loadingColor = 0;
			ctx.fillStyle = "#292";
		}

		ctx.fillText(loadingText, 400, 400);

		if (map.made === false) {
			map.makeMap();
		} else {}

	}; //end of loadGame


	drawScreen();

}; // end of init()

document.addEventListener('DOMContentLoaded', init, false);