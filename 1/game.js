var init = function() {
	console.log("Initializing.");




	/*********    SETTINGS    ************/


	var canvas = document.getElementById("output"),
			ctx = canvas.getContext("2d"),
 			W = window.screenavailWidth,
			H = window.screenavailHeight;
	canvas.height = 750;
	canvas.width = 1050;
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
			if (Game.arrow == 375 || Game.arrow == 475) {
			Game.helpText = "Press ENTER to select.";
			Game.arrow -= 100;
			}
		 };

	function menu_d_button() {
			if (Game.arrow == 275 || Game.arrow == 375) {
			Game.helpText = "Press ENTER to select.";
			Game.arrow += 100;
			}    
		 };
	function menu_return_button() { 
		if (Game.arrow == 275) {
			$(document).unbind('keyup.a', menu_a_button);
			$(document).unbind('keyup.d', menu_d_button);
			$(document).unbind('keyup.left', menu_a_button);
			$(document).unbind('keyup.right', menu_d_button);
			$(document).unbind('keyup.return', menu_return_button);
			Game.mode = 1;
		}
		else if (Game.arrow == 375) {
			Game.helpText = "Not Implemented Yet.";
		}
		else if (Game.arrow == 475) {
			Game.helpText = "Not Implemented Yet.. either.";
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

		pan( 0, -50);
	};
	function pan_left() {
		
		pan(-50, 0);
	};
	function pan_down() {
		
		pan(0, 50);
	};
	function pan_right() {
		
		pan(50, 0);
	};
	function pan(newX, newY) {

		if ( typeof newY !== "undefined") {
			console.log("bam!");
			Screen.moveToX = newX;
			Screen.moveToY = newY;
			Screen.x += Screen.moveToX;
			Screen.y += Screen.moveToY;
			
			var a = 0;
			var move = function() {

				if ( a < 50 ) {
					a += 1;
					ctx.translate(Screen.moveToX/50, Screen.moveToY/50);
				}
				else if (a === 50) {
					window.clearInterval(panInterval);
					a = 0;
					Screen.moveToX = 0;
					Screen.moveToY = 0;
				}
			}
			var panInterval = window.setInterval(move, 1000/60);
				
			
		}
		else {

			/* manually setting Screen.moveToX/moveToY then calling pan(); will instantly move the Screen. */
			console.log("bing!");		
			Screen.x += Screen.moveToX;
			Screen.y += Screen.moveToY;

			ctx.translate(Screen.moveToX, Screen.moveToY);
			Screen.moveToX = 0;
			Screen.moveToY = 0;
		}


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








/****** Objects  
	█████        ████                        █  
	█           █        █            █                    █
	█           █        █████                    █
	█            █       █          ██       █       █
	█████       ██████      ████        ██
******************************/

/**/var Color = {};
	 	Color.background = "#181818",
		Color.infotext = "#8f8f8f",
		Color.menuText = "#377778";



/**/var Map = {};
	Map.height = 128;
	Map.width = 128;
	Map.tiles = 0, //the area of the Map.
	Tile = function(number, xpos, ypos, indx) { //constructor
		this.id = number; 
		this.x = xpos;
		this.y = ypos;
		if (indx) {
			this.image = indx;
		}
		else { this.image = ~~(Math.random() * 4); }
		Map.tiles += 1;
	 };
	Map.data = new Array();
	Map.tileSize = 50;
	Map.made = false;
	Map.makeMap = function() {

		Map.data = [];
		Game.loadingText = "Loading Map Data";
		var myDate = new Date();
		for (var i=0, x = 0, y = 0; i < (Map.height*Map.width); i += 1, x+=1) {
			if (x === Map.width) {
				x = 0;
				y+=1;
			}
			var data = new Tile(Map.tiles, x, y);
			Map.data.push(data);
		}
		var result = (new Date() - myDate);
		Game.loadingText = (Map.tiles + " tiles loaded in " + result + " milliseconds.");
		console.log(Map.data);
		Map.made = true;
		
	};
	Map.draw = function() {
		Game.loadingText = "Drawing Map..";
	};



/**/var Screen = {};

		Screen.center = 1200;
		Screen.moveToX = 0;
		Screen.moveToY = 0;
		Screen.x = 0;			//keeps track of the Screen position
		Screen.y = 0;
		Screen.selected = [];
		Screen.select = function() {

			var center = Screen.center;

			/*debug*/	//console.log("Center: "+center);

			var bottomRightCorner = (center+11)+(Map.width*8);
			if ( bottomRightCorner < 0 ) { return console.log("Need to generate more tiles."); }

			///*debug*/	console.log("Bottom Right: "+bottomRightCorner);
			///*debug*/	console.log("Bottom Right X: "+Map.data[bottomRightCorner].x);
			///*debug*/	console.log("Bottom Right Y: "+Map.data[bottomRightCorner].y);
			var topLeftCorner = (center-11)-(Map.width*8);

			if ( topLeftCorner < 0 ) { return console.log("Need to generate more tiles."); }
			///*debug*/console.log("Top Left: "+topLeftCorner);
			///*debug*/console.log("Top Left X: "+Map.data[topLeftCorner].x);

			for (var i = topLeftCorner, xx = (Map.data[bottomRightCorner].x - Map.data[topLeftCorner].x)+1, counter = 0;  /*i < bottomRightCorner*/ counter < 391; i++, counter++) {
					if ( counter % (xx) === 0  && counter != 0) {
						//console.log("From " + i + " to " + (i+ ( 128 - xx ) ) );
						i+=(128 - (xx));
					 }
					var data = Map.data[i];
					Screen.selected.push(data);
					if (i >= (bottomRightCorner)) break;

				}
			Screen.tilesLoaded = true;
			console.log(Screen.selected);	
		};
		Screen.tilesLoaded = false;
		Screen.loadTiles = function() { };
		Screen.move = function() { };
		Screen.drawTiles = function() {

			Screen.SetScreenInitially();

			for (var i = 0, ii = Screen.selected.length; i < ii; i++) {

				var grassRoll = Math.random();
				if (grassRoll > .35) ctx.drawImage(grass4, Screen.selected[i].x*Map.tileSize, Screen.selected[i].y*Map.tileSize);
				//if (grassRoll < .65) ctx.drawImage(grass3, Screen.selected[i].x*Map.tileSize, Screen.selected[i].y*Map.tileSize);
				else ctx.drawImage(grass4, Screen.selected[i].x*Map.tileSize, Screen.selected[i].y*Map.tileSize);
				
			}

		};
		Screen.SetScreenInitially = function() {

				Screen.SetScreenInitially = Function("");	//	rewrite the function
				//console.log("Set to " + Screen.selected[0].x*-50 + ", " + Screen.selected[0].y*-50);
				Screen.moveToX = Screen.selected[24].x*-50;
				Screen.moveToY =  Screen.selected[24].y*-50;
				pan();

			};
/**/var Player = {};
		Player.x = 0;
		Player.y = 0;
		Player.isOnTile = 0;
		Player.spawnTile = 0;
		Player.set = false;

		Player.spawn = function() {
			Player.SetScreenInitially = Function(""); //rewrite the function
			Player.x = Map.data[Screen.center].x;
			Player.y = Map.data[Screen.center].y;
			Player.isOnTile = Screen.center;
			Player.spawnTile = Screen.center;
			console.log(" ");
		};

		Player.draw = function() {
			ctx.drawImage(hero_img, Player.x*50, (Player.y*50)-10);

		};



/**/var Entity = {};
		Entity.all = [];
		Entity.add = function(entity) {
			Entity.all.push(entity);
		};



	/**/function Timer() {
		this.gameTime = 0;
  		this.maxStep = 0.05;
  		this.wallLastTimestamp = 0;
	 }

	/**/Timer.prototype.tick = function() {
		var wallCurrent = Date.now();
		var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
		this.lastTimestamp = wallCurrent;

		var gameDelta = Math.min(wallDelta, this.maxStep);
		this.gameTime += gameDelta;
		return gameDelta;
	};


/**/var Game = {};
		Game.mode = 0;
		Game.timer = new Timer();
		Game.drawScreen = function() {	/*		DrawScreen			*/

			//console.log("drawn");
			Game.checkState();
			if (Game.mode === 0) Game.titleScreen();
			if (Game.mode === 1) Game.load();
			if (Game.mode === 2) { Game.init();}
		 };
		Game.arrow = 275;
		Game.helpText = "Press ENTER to select.";
		Game.flicker = 0;
		Game.titleScreen = function() {

			titleSetControls();
			//rendered Screen
			ctx.fillStyle = Color.background;
			ctx.fillRect(-5000,-5000, canvas.width+10000, canvas.height+10000);
			ctx.font = "normal 14px PressStart2P";
			ctx.fillStyle = Color.menuText;

			ctx.drawImage(title_logo1, 320, 180);

			Game.flicker += 1;
			if (Game.flicker % 80 == 0) {
				ctx.fillStyle = "#ccf";
				Game.flicker=0;
			}
			else { ctx.fillStyle = Color.infotext; }
			ctx.fillText("→", Game.arrow, 380);
			ctx.fillStyle = Color.menuText;

			ctx.fillText("start", 300, 380);
			ctx.fillText("about", 400, 380);
			ctx.fillText("ctrls", 500, 380);
			ctx.fillText("----", 600, 380);
			ctx.fillStyle = Color.infotext;
			ctx.fillText(Game.helpText, 350, 600);

		 }; // end of titleScreen

		Game.loadingText = "Loading...";

		Game.load = function() {

			ctx.fillStyle = Color.background;
			ctx.fillRect(0,0, canvas.width, canvas.height);
			ctx.font = "normal 14px PressStart2P";
			ctx.fillStyle = Color.infotext;
			ctx.drawImage(title_logo1, 320, 180);
			//Render of loading Screen

			ctx.fillStyle = Color.infotext;
			ctx.fillText(Game.loadingText, (350 - Game.loadingText.length*3), 400);
			if (Map.made === false) {
				Map.makeMap();
				Screen.select();
				Player.spawn();
			}
			if (Screen.tilesLoaded === true) { Game.loadingText = "Drawing..."; Game.mode = 2; }
		 };
		Game.checkState = function() {
			Game.clockTick = this.timer.tick();
			// Other data items that need updating should be here.
		 };

		Game.init = function() {
			ctx.fillStyle = "#111112";
			ctx.fillRect(Screen.selected.length*(-50), Screen.selected.length*(-50), (Screen.selected.length*50)*2+100, (Screen.selected.length*50)*2+100);
			ctx.fillStyle = Color.infotext;
			Screen.drawTiles();
			Player.draw();
			Game.debug.grid();
			//ctx.fillText(Game.loadingText, Math.abs(Screen.x)+canvas.width - 130, Math.abs(Screen.y)+20);
			

		 };

		Game.debug = {};
		Game.debug.grid = function() {
			ctx.beginPath();
			
			for (var vert = 0, vertCap = 128; vert < vertCap; vert++) {		
				ctx.moveTo(vert*50,0)		
				ctx.lineTo(vert*50, 128*50);
			}
			ctx.lineWidth = 2;
			for (var hor = 0, horCap = 128; hor < horCap; hor++) {		
				ctx.moveTo(0,hor*50)		
				ctx.lineTo(128*50, hor*50);
			}
			ctx.strokeStyle = "#422";
			ctx.stroke();
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
				Game.drawScreen();
			}) ();
			
		 }
	 };

	Game.drawScreen();
}; // end of init()

document.addEventListener('DOMContentLoaded', init, false);