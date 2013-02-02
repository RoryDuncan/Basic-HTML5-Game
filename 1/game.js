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

		$(document).bind('keyup.u', pan_down);
		$(document).bind('keyup.h', pan_right);
		$(document).bind('keyup.j', pan_up);
		$(document).bind('keyup.k', pan_left);

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

		if (Battle.controlsSet === true) {
				$(document).unbind('keypress.w', Battle.controls.w);
				$(document).unbind('keypress.s', Battle.controls.s);
				$(document).unbind('keypress.a', Battle.controls.a);
				$(document).unbind('keypress.d', Battle.controls.d);
				$(document).unbind('keyup.return', Battle.controls.rtrn);
				Battle.controlsSet = false;
		 }

		if (Game.controlsSet === false) {
				$(document).bind('keyup.w', game_w_button);
				$(document).bind('keyup.s', game_s_button);
				$(document).bind('keyup.a', game_a_button);
				$(document).bind('keyup.d', game_d_button);
				$(document).bind('keyup.up', game_w_button);
				$(document).bind('keyup.down', game_s_button);
				$(document).bind('keyup.left', game_a_button);
				$(document).bind('keyup.right', game_d_button);
				$(document).bind('keyup.return', game_return_button);
				$(document).bind('keyup.space', game_space_button);
				Game.controlsSet = true;
			}
	 };
	function game_w_button() {
		if ( Player.checkBounderies() === true || Player.checkBounderies() === "AllowUp" ) {

			Player.animState = 9;
			var interval = 25, //ms
				calls = 0,
				limit = 1;
			function moveChar() {
				if (calls < limit) {
					if (calls % (1/interval)*2 === 0) {
						if (Player.animState === 11) {Player.animState = 9;}
						else Player.animState+=1;
					 }
					calls += 1/interval;
					Player.y -= 1/interval;
					requestAnimationFrame(moveChar);
					//moveChar();
				}
				else return;

			 };
			pan_down();
			moveChar();
			Screen.center -= 128;
			Screen.select();
			Battle.step();
		}
		else { }
	};
	function game_a_button() {
		if ( Player.checkBounderies() === true || Player.checkBounderies() === "AllowLeft"  ) {
			Player.animState = 3;
			var interval = 25, //ms
				calls = 0,
				limit = 1;
			function moveChar() {
				if (calls < limit) {
					if (calls % (1/interval)*2 === 0) {
						if (Player.animState === 5) {Player.animState = 3;}
						else Player.animState+=1;
					 }
					calls += 1/interval;
					Player.x -= 1/interval;
					requestAnimationFrame(moveChar);
					//moveChar();
				}
				else return;
			 };
			pan_right();
			moveChar();
			Player.animState = 3;
			Screen.center -= 1;
			Screen.select();
			Battle.step();
		 }
		else { };
	};
	function game_s_button() {
		if ( Player.checkBounderies() === true || Player.checkBounderies() === "AllowDown"  ) {
			Player.animState = 0;
			var interval = 25, //ms
				calls = 0,
				limit = 1;
			function moveChar() {
				if (calls < limit) {
					if (calls % (1/interval)*2 === 0) {
							if (Player.animState === 2) {Player.animState = 0;}
							else Player.animState+=1;
					 }
					calls += 1/interval;
					Player.y += 1/interval;
					requestAnimationFrame(moveChar);
						//moveChar();
				}
				else return;

			 };
			pan_up();
			moveChar();
			Player.animState = 0;
			Screen.center += 128;
			Screen.select();
			Battle.step();
		 }
		else { };
	};
	function game_d_button() {
		if ( Player.checkBounderies() === true|| Player.checkBounderies() === "AllowRight" ) {
			Player.animState = 6;
			var interval = 25, //ms
				calls = 0,
				limit = 1;
			function moveChar() {
				if (calls < limit) {
					if (calls % (1/interval)*2 === 0) {
							if (Player.animState === 8) {Player.animState = 6;}
							else Player.animState+=1;
					 }
					calls += 1/interval;
					Player.x += 1/interval;
					requestAnimationFrame(moveChar);
					//moveChar();
				}
				else return;

			 };
			pan_left();
			moveChar();
			Player.animState = 6;
			Screen.center += 1;
			Screen.select();
			Battle.step();
		 }
		else { };

	};
	function game_return_button() {};
	function game_space_button() {
		Battle.start();
	};

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
			Screen.moveToX = newX;
			Screen.moveToY = newY;
			Screen.x += Screen.moveToX;
			Screen.y += Screen.moveToY;

		var interval = 50, //ms
		calls = 0,
		limit = 1;
		function moveCam() {
			if (calls < limit) {
					calls += 1/interval;
					ctx.translate(Screen.moveToX/interval, Screen.moveToY/interval);
					requestAnimationFrame(moveCam);
			 }
			else return;
		 };
		moveCam();
			
		}
		else {

			/* manually setting Screen.moveToX/moveToY then calling pan(); will instantly move the Screen. */
			Screen.x += Screen.moveToX;
			Screen.y += Screen.moveToY;

			ctx.translate(Screen.moveToX, Screen.moveToY);
			Screen.moveToX = 0;
			Screen.moveToY = 0;
		}


	};


	/****** Images  ******************************/

	var imagesLoaded = 0,
			imageCount = 8,
			grass1 = new Image(),
			boulderWall = new Image(),
			boulderWall2 = new Image(),
			grass4 = new Image(),
			tree = new Image(),
			hero_img = new Image(),
			title_logo1 = new Image(),
			creature1 = new Image();


	grass1.src = "res/world/grass_1.png";
	boulderWall.src = "res/world/boulderwall.png";
	boulderWall2.src = "res/world/Vertboulderwall.png";
	grass4.src = "res/world/grass_4.png";
	tree.src = "res/world/tree_2.png";
	hero_img.src = "res/heros/c1_spritesheet.png";
	title_logo1.src = "res/title5.png";
	creature1.src = "res/world/dog2.png";


	grass1.addEventListener('load', imageLoad, false);
	boulderWall.addEventListener('load', imageLoad, false);
	boulderWall2.addEventListener('load', imageLoad, false);
	grass4.addEventListener('load', imageLoad, false);
	tree.addEventListener('load', imageLoad, false);
	hero_img.addEventListener('load', imageLoad, false);
	title_logo1.addEventListener('load', imageLoad, false);
	creature1.addEventListener('load', imageLoad, false);









/****** Objects  
███████████████████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████████████████

******************************/

/**/var Color = {};
	 	Color.background = "#181818",
		Color.infotext = "#8f8f8f",
		Color.menuText = "#377778";



/**/var Map = {};
	Map.height = 128;
	Map.width = 128;
	Map.tiles = 0, //the area of the Map.
	Tile = function(number, xpos, ypos) { //constructor
		this.id = number; 
		this.x = xpos;
		this.y = ypos;
		var random = Math.random()*10;
		if (random < .14) this.image = 4;					//15%
		else if (random > .14 && random < .15 ) this.image =2;	//1%
		else if (random > .15 && random < .3) this.image = 3;	//35%
		else if (random > .3 && random < 1) this.image = 1;		//70%
		Map.tiles += 1;
	 };
	Map.data = [];
	Map.edge = [];
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
		Map.made = true;
		
	};
	Map.draw = function() {
		Game.loadingText = "Drawing Map..";
	};



/**/var Screen = {};

		Screen.center = 1200+(128*10);
		Screen.moveToX = 0;
		Screen.moveToY = 0;
		Screen.x = 0;			//keeps track of the Screen position
		Screen.y = 0;
		Screen.selected = [];
		Screen.loadMargin = 3;
		Screen.dimensions = {};
		Screen.dimensions.row = 0;
		Screen.dimensions.col = 0;
		Screen.overlay = 0;
		Screen.select = function() {
			/*			This program selects the tiles to be loaded, and displayed.			*/
			/*			The tile shown is determined by	Map.data[]							*/
			Screen.selected.length = 0;

			var center = Screen.center;

			var rowLength =  1 + (11*2) + (Screen.loadMargin*2);

			Screen.dimensions.row =  rowLength;

			var columnLength = 1 + (8*2) + (Screen.loadMargin*2);

			Screen.dimensions.col = columnLength;

			///*debug*/ console.log((rowLength*columnLength)/2);
			Screen.area = rowLength*columnLength;

			///*debug*/	console.log("Center: "+center);

			var bottomRightCorner = (center+(11+Screen.loadMargin))+(Map.width*(8+Screen.loadMargin));
			if ( bottomRightCorner > 128*128 ) {
				do {
					console.log("Need to generate more tiles.");
					bottomRightCorner-=128;
				 }
				while (bottomRightCorner > 128*128 ) 
			 }

			///*debug*/	console.log("Bottom Right: "+bottomRightCorner);
			///*debug*/	console.log("Bottom Right X: "+Map.data[bottomRightCorner].x);
			///*debug*/	console.log("Bottom Right Y: "+Map.data[bottomRightCorner].y);
			var topLeftCorner = (center-(11+Screen.loadMargin))-(Map.width*(8+Screen.loadMargin));


			if ( topLeftCorner < 0 ) {
				do {
					console.log("Need to generate more tiles.");
					topLeftCorner+=128;
				 }
				while (topLeftCorner < 0 ) 
			 }
			///*debug*/console.log("Top Left: "+topLeftCorner);
			///*debug*/console.log("Top Left X: "+Map.data[topLeftCorner].x);

			for (var i = topLeftCorner, xx = (Map.data[bottomRightCorner].x - Map.data[topLeftCorner].x), counter = 0;  /*i < bottomRightCorner*/ counter < (rowLength*columnLength); i++, counter++) {
					if ( counter % (xx) === 0  && counter != 0) {
						//console.log("From " + i + " to " + (i+ ( 128 - xx ) ) );
						i+=(128 - (xx));
					 }
					var data = Map.data[i];
					Screen.selected.push(data);
					if (i === Screen.center) { }
					if (i === bottomRightCorner - (128 - xx) ) break;

				}
				var centerVal = Screen.selected.length;
				//console.log(Screen.selected.length);
				//console.log("----X:   screen center: " + Map.data[Screen.center].x + " vs centerVal: " + Map.data[centerVal].x + "." );
				//console.log("----Y:   screen center: " + Map.data[Screen.center].y + " vs centerVal: " + Map.data[centerVal].y + "." );
			Screen.tilesLoaded = true;
			//console.log(Screen.selected);	
		 };
		Screen.tilesLoaded = false;
		Screen.loadTiles = function() { };
		Screen.drawTiles = function() {
			Screen.SetScreenInitially();

			for (var i = 0, ii = Screen.selected.length; i < ii; i++) {

				ctx.fillStyle = "#337";
				if (Screen.selected[i].x === 13 || Screen.selected[i].x === 113) {
					ctx.drawImage(grass4, ( (Screen.selected[i].x)*Map.tileSize), ((Screen.selected[i].y)*Map.tileSize) );
					ctx.drawImage(boulderWall2, 0,0, 50,50, ( (Screen.selected[i].x)*Map.tileSize), ((Screen.selected[i].y)*Map.tileSize),50,50 );
					//ctx.drawImage(tree1, ( (Screen.selected[i].x+1)*Map.tileSize), ((Screen.selected[i].y)*Map.tileSize) );
					//ctx.fillRect( Screen.selected[i].x*Map.tileSize, Screen.selected[i].y*Map.tileSize, 50, 50);
				}
				else if (Screen.selected[i].y === 13 || Screen.selected[i].y === 118) {
					ctx.drawImage(grass4, ( (Screen.selected[i].x)*Map.tileSize), ((Screen.selected[i].y)*Map.tileSize) );
					ctx.drawImage(boulderWall, 0,0, 50,50, ( (Screen.selected[i].x)*Map.tileSize), ((Screen.selected[i].y)*Map.tileSize),50,50 );
				}
				/*
					else if (Screen.selected[i].x < 13 || Screen.selected[i].x > 113) {
					ctx.drawImage(grass4, ( (Screen.selected[i].x)*Map.tileSize), ((Screen.selected[i].y)*Map.tileSize) );
				 }
				else if (Screen.selected[i].y < 13 && Screen.selected[i].y > 11 && Screen.selected[i].x %2 ===0 || Screen.selected[i].y > 118) {
					ctx.drawImage(grass4, ( (Screen.selected[i].x)*Map.tileSize), ((Screen.selected[i].y)*Map.tileSize) );
					ctx.drawImage(boulderWall, ( (Screen.selected[i].x)*Map.tileSize), ((Screen.selected[i].y)*Map.tileSize) );
				 }
				*/
				//else if (Screen.selected[i].image === 1) ctx.drawImage(tree1, (Screen.selected[i].x)*Map.tileSize, (Screen.selected[i].y-1)*Map.tileSize);
				else if (Screen.selected[i].image === 2) ctx.drawImage(grass1, Screen.selected[i].x*Map.tileSize, Screen.selected[i].y*Map.tileSize);
				else ctx.drawImage(grass4, Screen.selected[i].x*Map.tileSize, Screen.selected[i].y*Map.tileSize);
				
			 }


		};
		Screen.drawMiddle = function() {
			for (var i = 0, ii = Screen.selected.length; i < ii; i++) {
													//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

				if (Screen.selected[i].image === 1) ctx.drawImage(tree, 50, 100, 50, 50, ((Screen.selected[i].x)*Map.tileSize), ((Screen.selected[i].y)*Map.tileSize), 50, 50);
				else continue;
			}
		};
		Screen.drawForeground = function() {
			for (var i = 0, ii = Screen.selected.length; i < ii; i++) {
												//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
					var chance = Math.random();
					var scaleJitter = 1;
					if (chance < .08) { scaleJitter = 1 + Math.random()*.02;}
				if (Screen.selected[i].image === 1) ctx.drawImage(tree, 0, 0, 150, 100, (Screen.selected[i].x-1)*Map.tileSize, (Screen.selected[i].y-2)*Map.tileSize, 150*scaleJitter, 100*scaleJitter);
			}
		};
		Screen.SetScreenInitially = function() {

				Screen.SetScreenInitially = Function("");	//	rewrite the function
				//console.log("Set to " + Screen.selected[0].x*-50 + ", " + Screen.selected[0].y*-50);


				Screen.moveToX = 1050/2;
				Screen.moveToY =  750/2;	
				pan();

				Screen.moveToX = (Map.data[Screen.center].x*-50);
				Screen.moveToY =  (Map.data[Screen.center].y*-50);	

				pan();

			};
/**/var Player = {};
		Player.x = 0;
		Player.y = 0;
		Player.isOnTile = 0;
		Player.spawnTile = 0;
		Player.champion = null;
		Player.make = function() {
			Player.make = Function("");
			playername = window.prompt("What is your name, Adventurer?");
			Player.champion = new Battle.Hero(playername);
		 };
		Player.animState = 0;

		Player.spawn = function() {
			Player.SetScreenInitially = Function(""); //rewrite the function
			Player.x = Map.data[Screen.center].x;
			Player.y = Map.data[Screen.center].y;
			Player.spawnTile = Screen.center;
		};

		Player.draw = function() {
		//	drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
		//console.log(Player.x, Player.y);
			ctx.drawImage(hero_img, Player.animState*50, 0, 50, 60, Player.x*50, (Player.y*50), 37, 45);

		};
		Player.checkBounderies = function() {

			if ((~~Player.x === 14)) {			return "AllowRight";}
			else if ((~~Player.x) === 113) {	return "AllowLeft";}
			else if ((~~Player.y) === 13) {		return "AllowDown";}
			else if ((~~Player.y) === 113) {	return "AllowUp";}
			else {return true;}

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

/**/var Battle = {};
		Battle.controlsSet = false;
		Battle.setControls = function() {

			if (Battle.controlsSet === false) {
				$(document).unbind('keyup.w', game_w_button);
				$(document).unbind('keyup.s', game_s_button);
				$(document).unbind('keyup.a', game_a_button);
				$(document).unbind('keyup.d', game_d_button);
				$(document).unbind('keyup.up', game_w_button);
				$(document).unbind('keyup.down', game_s_button);
				$(document).unbind('keyup.left', game_a_button);
				$(document).unbind('keyup.right', game_d_button);
				$(document).unbind('keyup.return', game_return_button);
				$(document).unbind('keyup.space', game_space_button);
				Game.controlsSet = false;


				$(document).bind('keypress.w', Battle.controls.w);
				$(document).bind('keypress.s', Battle.controls.s);
				$(document).bind('keypress.a', Battle.controls.a);
				$(document).bind('keypress.d', Battle.controls.d);
				$(document).bind('keyup.return', Battle.controls.rtrn);
				Battle.controlsSet = true;
			}
		}
		Battle.controls = {};
			Battle.controls.w = function(){
				Game.arrow-=20;
				if (Game.arrow < 550) { Game.arrow +=60;}
			 };
			Battle.controls.a = function(){
				Game.arrow-=20;
				if (Game.arrow < 550) { Game.arrow +=60;}
			 };
			Battle.controls.s = function(){
				Game.arrow+=20;
				if (Game.arrow > 590) { Game.arrow -=60;}

			 };
			Battle.controls.d = function(){
				Game.arrow+=20;
				if (Game.arrow > 590) { Game.arrow -=60;}
			};
			Battle.controls.rtrn = function(){
				if (Game.arrow === 550) {		console.log("Attack!");Battle.abilities.attack();}
				else if (Game.arrow === 570) {	console.log("Defend!");Battle.abilities.defend();}
				else if (Game.arrow === 590) {	console.log("Heal!"); Battle.abilities.heal();}
			};
		Battle.hero = {}; 
		Battle.enemy = {};
		Battle.enemy.recycle = function() {

			this.maxhp = (10+Player.champion.stats.level) + ~~( (Math.random()*10) + Player.champion.stats.level*1.2);
			this.hp = 0;
			this.damage = ~~(3 + Math.random()*Player.champion.stats.level);
			this.speed = ~~(Math.random()*20) + Player.champion.stats.level;
			this.hp += this.maxhp;

		 };
		Battle.hero.list = [];
		Battle.Hero = function(characterName) {
			this.name = characterName;
			this.stats = {

				level : 1,
				str : 5,
				int : 5,
				agi : 5,
				xp : 0,
				maxhp :  1,
				hp : 0,
				speed : 5,
				xp2lvl: 30
			 };
			this.stats.maxhp = ~~(13 + ( (.75 * this.stats.str) + (this.stats.int / 4) ));
			this.stats.hp = this.stats.maxhp;
			this.stats.speed += this.stats.agi/2;
			data = this;
			Battle.hero.list.push(data);


		 };
		Battle.hero.levelup = function() {
			var player = Player.champion.stats;
			player.xp = 0;
			Player.hp = player.maxhp;
			var statFocus = prompt("You leveled up! \n What stat would you like to increase? \n" + "str: " + player.str + " | int: " + player.int + "| agi: " + player.agi , " str, int, or agi");
			if (statFocus === "str") player.str +=2;
			else if (statFocus === "int") player.int +=2;
			else if (statFocus === "agi") player.agi +=2;
			player.str +=1;
			player.int +=1;
			player.agi +=1;
			Battle.exit();
		};
		var worldX, worldY;
		Battle.start = function() {
			worldX = Screen.x;
			worldY = Screen.y;
			console.log(Screen.x, Screen.y);
			Screen.moveToX = (Screen.x)*-1;
			Screen.moveToY = (Screen.y)*-1;
			pan();
			Game.mode = 3;
			Battle.setControls();
			Game.arrow = ( (canvas.height - 300 ) + 100);

			Battle.enemy.recycle();

		 };
		Battle.end = function() {

			Player.champion.stats.xp += ~~(Battle.enemy.maxhp / Player.champion.stats.level);
			Player.champion.stats.xp += ~~(Player.champion.stats.int/3);
			if (Player.champion.stats.xp >= Player.champion.stats.xp2lvl)
			 {
			 	console.log("Level up!");
				Battle.hero.levelup();
			 }
			else Battle.exit();


		};
		Battle.exit = function() {
			Game.mode = 2;
			Battle.stepCount = 100;
			console.log(worldX, worldY);
			Screen.moveToX = worldX*0.5;
			Screen.moveToY = worldY*0.5;
			gameSetControls();
			pan();

		};
		Battle.scale = 1.2;
		Battle.skew = 1.5;
		Battle.background = function() {

			var ground = ctx.createLinearGradient(0, 50*8, 0, canvas.height);
      			ground.addColorStop(0, '#0d2b09');
      			ground.addColorStop(.15, '#201708');
      			ground.addColorStop(.8, '#201708');
      			ground.addColorStop(.8, '#2a2825')
      			ground.addColorStop(1, '#2a2825');
			ctx.fillStyle= ground;
			ctx.fillRect(0, 50*8, canvas.width, canvas.height);

			for (var i = 0, ii = (canvas.width/50); i < ii; i+=1) {
				ctx.drawImage(grass4, 0, 0, 50, 50, (50*Battle.scale)*i, 50*8, (50*Battle.scale), 50*Battle.scale/2);
				//ctx.drawImage(grass4, 0, 0, 50, 50, (50*Battle.scale)*i, 50*7.4, (50*Battle.scale), 50*Battle.scale/2);
			 }


		 };
		Battle.scene = function() {

			if ( ~~(Game.timer.gameTime) % 4 === 0) {ctx.fillStyle = "#6b8cab";}
			else ctx.fillStyle = "#65839f";
			ctx.fillRect(0,0, canvas.width, canvas.height);
			Battle.background();
			ctx.drawImage(title_logo1, 330, canvas.height-200);
			Battle.menu.UI();
			ctx.drawImage(creature1, canvas.width - 250 + Math.random()*5, ( 50*7 + Math.random()*5), (50+(Player.champion.stats.level*0.2)*Battle.scale ), 60+(Player.champion.stats.level*0.2)*Battle.scale  );
			ctx.drawImage(hero_img, 8*50, 0, 50, 60, 150, 50*7+Math.random()*2, 50*Battle.scale, 60*Battle.scale);
			//console.log("Battle Frame ");

		 };
		Battle.menu = {};
		Battle.abilities = {};
		Battle.abilities.heal = function() {
			Player.champion.stats.hp += 1 + ~~(Player.champion.stats.int*0.7);	// heal math
			var healAmount = 1 + ~~(Player.champion.stats.int*0.7);
			console.log(Player.champion.name + " healed for  " + healAmount + " health.");

			if (Player.champion.stats.hp > Player.champion.stats.maxhp) { 		// adjust for excess
			 	Player.champion.stats.hp = Player.champion.stats.maxhp;
			}

			Game.arrow = 550;													//reset 'pointer'	
			Battle.checkState();	
			Battle.enemy.attack();	

		 };
		Battle.abilities.attack = function() {
			Battle.enemy.hp -= 1 + ~~(Player.champion.stats.str*0.5) + ~~(Player.champion.stats.agi*0.5);
			var damageDealt = 1 + ~~(Player.champion.stats.str*0.5) + ~~(Player.champion.stats.agi*0.5);
			console.log(Player.champion.name + " dealt " + damageDealt + " damage.");
			Battle.checkState();
			Battle.enemy.attack();
		 };
		Battle.abilities.defend = function() {};
		Battle.enemy.attack = function() {
			Player.champion.stats.hp -= Battle.enemy.damage;
			console.log(" The enemy dealt " + Battle.enemy.damage + " to " + Player.champion.name);
			Battle.checkState();
		};
		Battle.checkState = function() {
			if (Battle.enemy.hp <= 0) {
				Battle.end();
			}
			else if (Player.champion.stats.hp <= 0 ) Game.mode = 4;
		};
		Battle.menu.UI = function() {
		

			var relPos =  canvas.height-300;

			ctx.fillStyle = " #0a8";
			ctx.font = "normal 60px PressStart2P";
			ctx.fillText(Player.champion.stats.hp + "/" + Player.champion.stats.maxhp + " ", 40, 50*8+7);
			ctx.fillStyle = " #933";
			ctx.font = "normal 40px PressStart2P";
			ctx.fillText(Battle.enemy.hp + "/" + Battle.enemy.maxhp + " ", canvas.width-300, 50*8);

			ctx.fillStyle="#bbb";
			ctx.font = "normal 40px PressStart2P";
			ctx.fillText( Player.champion.name, 20, 50*7 );
			
			ctx.font = "normal 20px PressStart2P";
			ctx.fillStyle = Color.infotext;
			ctx.fillText("Attack", 110, relPos+100);
			ctx.fillText("Defend", 110, relPos+120);
			ctx.fillText("Heal", 110, relPos+140);
			Battle.menu.selector();

		};
		Battle.menu.selector = function() {
			ctx.fillStyle = Color.infotext;
			ctx.fillText("→", 80, Game.arrow);
		 }
		Battle.stepCount = 100;
		Battle.step = function() {
			Player.champion.stats.hp+=1;
			Battle.stepCount-=Math.random()*20;
			if (Battle.stepCount <= 0) {
				Battle.stepCount = 100;
				Battle.start();
			 }
		 };


/**/var Game = {};
		Game.controlsSet = false;
		Game.mode = 0;
		Game.timer = new Timer();
		Game.drawScreen = function() {	/*		DrawScreen			*/

			
			Game.checkState();
			if (Game.mode === 0) { Game.titleScreen(); console.log("frame");}
			if (Game.mode === 1) {Game.load(); console.log("frame");}
			if (Game.mode === 2) {gameSetControls(); Game.init();  Player.make();  console.log("frame");}
			if (Game.mode === 3) {Battle.scene(); /*console.log("Battle frame");*/}
			if (Game.mode === 4) {Game.over();}
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


			ctx.fillStyle = "#254027";
			ctx.fillRect(Screen.selected.length*(-50), Screen.selected.length*(-50), (Screen.selected.length*50)*2+100, (Screen.selected.length*50)*2+100);
			//ctx.drawImage(skybox, Screen.selected.length*(-50), Screen.selected.length*(-50), (Screen.selected.length*50)*3+100, (Screen.selected.length*50)*3+100);
			ctx.fillStyle = Color.infotext;
			Screen.drawTiles();
			//Game.debug.grid();
			Screen.drawMiddle();
			Player.draw();
			Screen.drawForeground();
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
			ctx.strokeStyle = "#111";
			ctx.stroke();
		};
		Game.over = function() {
			ctx.fillStyle=Color.background;
			ctx.fillRect(0,0, canvas.width, canvas.height);
			ctx.drawImage(title_logo1, 320, 180);
			ctx.fillStyle = "#833";
			ctx.font = "normal 60px PressStart2P";
			ctx.fillText("Game Over", 220, 400);
			ctx.font = "normal 10px PressStart2P";
			ctx.fillStyle = Color.infotext;
			ctx.fillText("Maybe if you hadn't named yourself " + Player.champion.name + " you would've done better.", 120, 480);

		}






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
			} )();
			(function animloop(){
				requestAnimFrame(animloop);
				Game.drawScreen();
			}) ();
			
		 }
	 };

	Game.drawScreen();
}; // end of init()

document.addEventListener('DOMContentLoaded', init, false);