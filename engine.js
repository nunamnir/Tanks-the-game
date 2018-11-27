// музыка
function playSound(string) {	
  switch(string) {
  	case "introMusic":
			// introMusic = new Audio();
			// introMusic.src = "";
			// introMusic.volume = 1.0;
			// introMusic.play();
			break;
  	case "startMusic":
			startMusic = new Audio();
			startMusic.src = "sound/intro.mp3";
			startMusic.volume = 1.0;
			startMusic.play();
			break;
		
		// tank
  	case "tankHit":
			tankHit = new Audio();
			tankHit.src = "sound/hit-" + getRandom(1, 2) + ".wav";
			tankHit.volume = 1.0;
			tankHit.play();
			break;
  	case "tankMove":
			tankMove = new Audio();
			tankMove.src = "sound/tank-move.wav";
			tankMove.volume = 0.3;
			tankMove.play();
			break;
  	case "cannonShot":
			cannonShot = new Audio();
			cannonShot.src = "sound/shot.wav";
			cannonShot.volume = 0.5;
			cannonShot.play();
			break;
  	case "outShot":
			outShot = new Audio();
			outShot.src = "sound/outshot.wav";
			outShot.volume = 1.0;
			outShot.play();
			break;
  	case "armWall":
			armWall = new Audio();
			armWall.src = "sound/arm-wall.wav";
			armWall.volume = 1.0;
			armWall.play();
			break;
  	case "simpleWall":
			simpleWall = new Audio();
			simpleWall.src = "sound/wall.wav";
			simpleWall.volume = 1.0;
			simpleWall.play();
			break;
  	case "tankDestroy":
			tankDestroy = new Audio();
			tankDestroy.src = "sound/tank-destroyed.wav";
			tankDestroy.volume = 1.0;
			tankDestroy.play();
			break;

		// base
  	case "tankSpawn":
			tankSpawn = new Audio();
			tankSpawn.src = "sound/spawn.wav";
			tankSpawn.volume = 0.4;
			tankSpawn.play();
			break;
  	case "baseDestroy":
			baseDestroy = new Audio();
			baseDestroy.src = "sound/base-destroyed.wav";
			baseDestroy.volume = 1.0;
			baseDestroy.play();
			break;
  	case "victory":
			victoryMusic = new Audio();
			victoryMusic.src = "sound/victory.wav";
			victoryMusic.volume = 1.0;
			victoryMusic.play();
			break;
  	case "loose":
			looseMusic = new Audio();
			looseMusic.src = "sound/loose.wav";
			looseMusic.volume = 1.0;
			looseMusic.play();
			break;

    default: return;
  }
};

function setScenario(string) {
	switch(string) {
		case "start_scenario":
			console.log("Сценарий приветствия запущен");
			startScene();
			break;
		case "game_scenario":
			console.log("Сценарий игры запущен");
			gameScene();
			break;
		case "result_scenario":
			console.log("Сценарий статистики запущен");
			resultScene();
			break;
		default:
			alert("Я не знаю такого сценария");
			break;
	}
};

function getRandom (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomZero (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

var cellSize = 50;
var result;

var enemyShell1 = {
	dir: 0,
	x: 0,
	y: 0
};

var enemyTank1 = {
	canMove: true,
	canFire: true,
	moveTime: null,
	turnTime: null,
	shotTime: null,
	shotDur: null,
	dir: 0,
	x: 0,
	y: 0,

	setSpawn: function() {
		playSound("tankSpawn");
		this.removeAction();
		this.dir = 2;
		this.x = getRandomZero(0, 4);
		this.y = 0;
		this.spawnAnimat();

		$("<div>", {
	  	id: "enemy-tank1"
		}).appendTo("#board");

		$("#enemy-tank1").attr("style", "");
		$("#enemy-tank1").removeClass();
		$("#enemy-tank1").addClass("muzzle-dir-" + this.dir);
		$("#enemy-tank1").css("top", (this.y * cellSize) + "px");
		$("#enemy-tank1").css("left", (this.x * cellSize) + "px");
		this.getAction();
	},

	spawnAnimat: function() {
		$("<div>", {
	  	class: "t1_spawn-1"
		}).appendTo("#board");
		$(".t1_spawn-1").css("top", (enemyTank1.y * cellSize) + "px");
		$(".t1_spawn-1").css("left", (enemyTank1.x * cellSize) + "px");

		setTimeout(function() {
			$(".t1_spawn-1").remove();
			$("<div>", {
		  	class: "t1_spawn-2"
			}).appendTo("#board");
			$(".t1_spawn-2").css("top", (enemyTank1.y * cellSize) + "px");
			$(".t1_spawn-2").css("left", (enemyTank1.x * cellSize) + "px");
		}, 200);

		setTimeout(function() {
			$(".t1_spawn-2").remove();
		}, 400);
	},

	getAction: function() {
		this.shotTime = setInterval(function() {
			enemyTank1.makeShot();
		}, 1000);
		this.turnTime = setInterval(function() {
			enemyTank1.makeTurn();
		}, 2000);
		this.moveTime = setInterval(function() {
  		enemyTank1.makeMove();
		}, 700);
	},

	removeAction: function() {
		clearInterval(this.shotTime);
		clearInterval(this.turnTime);
		clearInterval(this.moveTime);
	},

	makeTurn: function() {
		this.dir = getRandom(0,3);
		$("#enemy-tank1").removeClass();
		$("#enemy-tank1").addClass("muzzle-dir-" + this.dir);
	},

	makeMove: function() {
		if(this.y == 0 && this.dir == 0) {
			this.dir = 2;
			$("#enemy-tank1").removeClass();
			$("#enemy-tank1").addClass("muzzle-dir-" + this.dir);
		}
		if(this.y == 9 && this.dir == 2) {
			this.dir = 0;
			$("#enemy-tank1").removeClass();
			$("#enemy-tank1").addClass("muzzle-dir-" + this.dir);
		}
		if(this.x == 0 && this.dir == 3) {
			this.dir = 1;
			$("#enemy-tank1").removeClass();
			$("#enemy-tank1").addClass("muzzle-dir-" + this.dir);
		}
		if(this.x == 9 && this.dir == 1) {
			this.dir= 3;
			$("#enemy-tank1").removeClass();
			$("#enemy-tank1").addClass("muzzle-dir-" + this.dir);
		}
		switch(this.dir) {
			case 0:
				if(
					this.y !== 0
					&& world[this.y-1]
					&& world[this.y-1][this.x] !== 1
					&& world[this.y-1][this.x] !== 2 
					&& world[this.y-1][this.x] !== 3
					&& world[this.y-1][this.x] !== 8
					&& world[this.y-1][this.x] !== 9
					&& (this.y-1 !== playerTank.y || this.x !== playerTank.x)
					&& (this.y-1 !== enemyTank2.y || this.x !== enemyTank2.x)
					) this.y--;
				$("#enemy-tank1").css("top", this.y * cellSize + "px");
				break;
			case 1:
				if(
					this.x !== 9
					&& world[this.y][this.x+1] !== 1
					&& world[this.y][this.x+1] !== 2 
					&& world[this.y][this.x+1] !== 3
					&& world[this.y][this.x+1] !== 8 
					&& world[this.y][this.x+1] !== 9
					&& (this.y !== playerTank.y || this.x+1 !== playerTank.x)
					&& (this.y !== enemyTank2.y || this.x+1 !== enemyTank2.x)
					) this.x++;
				$("#enemy-tank1").css("left", this.x * cellSize + "px");
				break;
			case 2:
				if(
					this.y !== 9
					&& world[this.y+1]
					&& world[this.y+1][this.x] !== 1 
					&& world[this.y+1][this.x] !== 2 
					&& world[this.y+1][this.x] !== 3
					&& world[this.y+1][this.x] !== 8
					&& world[this.y+1][this.x] !== 9
					&& (this.y+1 !== playerTank.y || this.x !== playerTank.x)
					&& (this.y+1 !== enemyTank2.y || this.x !== enemyTank2.x)
					) this.y++;
				$("#enemy-tank1").css("top", this.y * cellSize + "px");
				break;
			case 3:
				if(
					this.x !== 0 
					&& world[this.y][this.x-1] !== 1 
					&& world[this.y][this.x-1] !== 2 
					&& world[this.y][this.x-1] !== 3
					&& world[this.y][this.x-1] !== 8
					&& world[this.y][this.x-1] !== 9
					&& (this.y !== playerTank.y || this.x-1 !== playerTank.x)
					&& (this.y !== enemyTank2.y || this.x-1 !== enemyTank2.x)
					) this.x--;
				$("#enemy-tank1").css("left", this.x * cellSize + "px");
				break;
		}
	},

	makeShot: function() {		
		if(this.canFire) {
			playSound("cannonShot");
			this.canFire = false;
			$("<div>", {
		  	id: "enemy-shell1"
			}).appendTo("#board");
			enemyShell1.dir = this.dir;
			enemyShell1.x = this.x;
			enemyShell1.y = this.y;
			$("#enemy-shell1").addClass("muzzle-dir-" + this.dir);
			$("#enemy-shell1").css("top", (enemyShell1.y * cellSize) + "px");
			$("#enemy-shell1").css("left", (enemyShell1.x * cellSize) + "px");
			this.shotDur = setInterval(this.shotFly, 200);
		} else return;
	},

	shotFly: function() {
		enemyTank1.shellCollision();
		switch(enemyShell1.dir) {
			case 0:
				enemyShell1.y--;
				$("#enemy-shell1").css("top", (enemyShell1.y * cellSize) + "px");
				break;
			case 1:
				enemyShell1.x++;
				$("#enemy-shell1").css("left", (enemyShell1.x * cellSize) + "px");
				break;
			case 2:
				enemyShell1.y++;
				$("#enemy-shell1").css("top", (enemyShell1.y * cellSize) + "px");
				break;
			case 3:
				enemyShell1.x--;
				$("#enemy-shell1").css("left", (enemyShell1.x * cellSize) + "px");
				break;
		}
	},

	shellCollision: function() {
		// проверка нахождения внутри зоны
		if(enemyShell1.y < 0) {
			playSound("outShot");
			$("#enemy-shell1").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// проверка нахождения внутри зоны
		if(enemyShell1.y > 9) {
			playSound("outShot");
			$("#enemy-shell1").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// проверка нахождения внутри зоны
		if(enemyShell1.x < 0) {
			playSound("outShot");
			$("#enemy-shell1").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// проверка нахождения внутри зоны
		if(enemyShell1.x > 9) {
			playSound("outShot"); 
			$("#enemy-shell1").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}

		// бронированная стена
		if(world[enemyShell1.y] && world[enemyShell1.y][enemyShell1.x] == 1) {
			$("#enemy-shell1").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			playSound("armWall");
		}
		// обычная стена
		if(world[enemyShell1.y] && world[enemyShell1.y][enemyShell1.x] == 2) { 
			var slotSelector = "#row-" + enemyShell1.y + "-col-" + enemyShell1.x;
			$(slotSelector).removeClass();
			$(slotSelector).addClass("slot-type-0");
			world[enemyShell1.y][enemyShell1.x] = 0;
			$("#enemy-shell1").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			playSound("simpleWall");
		}
		// участок воды
		if(world[enemyShell1.y] && world[enemyShell1.y][enemyShell1.x] == 3) {
			return;
		}
		// участок леса
		if(world[enemyShell1.y] && world[enemyShell1.y][enemyShell1.x] == 4) {
			return;
		}

		// вражеский танк
		if(enemyShell1.y === playerTank.y && enemyShell1.x === playerTank.x) {
			$("#player-tank").remove();
			$("#enemy-shell1").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			playSound("tankHit");
			setTimeout(function() {
	  		playSound("tankDestroy");
	  	}, 200);
			gameOver();
			setTimeout(function() {
	  		playSound("loose");
	  		setScenario("result_scenario");
	  	}, 800);
	  	result = "YouLoose";
	  	
		}
		// вражеский флаг
		if(world[enemyShell1.y] && world[enemyShell1.y][enemyShell1.x] == 8) {			
			var slotSelector = "#row-" + enemyShell1.y + "-col-" + enemyShell1.x;
			$(slotSelector).removeClass();
			$(slotSelector).addClass("slot-type-7");
			world[enemyShell1.y][enemyShell1.x] = 7;
			$("#enemy-shell1").remove();
			clearInterval(this.shotDur);
			console.log("Ваша база уничтожена");
			this.canFire = true;
			gameOver();			
			playSound("baseDestroy");
			setTimeout(function() {
	  		playSound("loose");
	  		setScenario("result_scenario");
	  	}, 800);
	  	result = "YouLoose";
		}
	}
};

var enemyShell2 = {
	dir: 0,
	x: 0,
	y: 0
};

var enemyTank2 = {
	canMove: true,
	canFire: true,
	moveTime: null,
	turnTime: null,
	shotTime: null,
	shotDur: null,
	dir: 2,
	x: 0,
	y: 0,

	setSpawn: function() {
		playSound("tankSpawn");
		this.removeAction();
		this.dir = 2;
		this.x = getRandomZero(5, 9);
		this.y = 0;
		this.spawnAnimat();

		$("<div>", {
	  	id: "enemy-tank2"
		}).appendTo("#board");

		$("#enemy-tank2").attr("style", "");
		$("#enemy-tank2").removeClass();
		$("#enemy-tank2").addClass("muzzle-dir-" + this.dir);
		$("#enemy-tank2").css("top", (this.y * cellSize) + "px");
		$("#enemy-tank2").css("left", (this.x * cellSize) + "px");
		this.getAction();
	},

	spawnAnimat: function() {
		$("<div>", {
	  	class: "t2_spawn-1"
		}).appendTo("#board");
		$(".t2_spawn-1").css("top", (enemyTank2.y * cellSize) + "px");
		$(".t2_spawn-1").css("left", (enemyTank2.x * cellSize) + "px");

		setTimeout(function() {
			$(".t2_spawn-1").remove();
			$("<div>", {
		  	class: "t2_spawn-2"
			}).appendTo("#board");
			$(".t2_spawn-2").css("top", (enemyTank2.y * cellSize) + "px");
			$(".t2_spawn-2").css("left", (enemyTank2.x * cellSize) + "px");
		}, 200);

		setTimeout(function() {
			$(".t2_spawn-2").remove();
		}, 400);
	},

	getAction: function() {
		this.shotTime = setInterval(function() {
			enemyTank2.makeShot();
		}, 1000);
		this.turnTime = setInterval(function() {
			enemyTank2.makeTurn();
		}, 3000);
		this.moveTime = setInterval(function() {
  		enemyTank2.makeMove();
		}, 700);
	},

	removeAction: function() {
		clearInterval(this.shotTime);
		clearInterval(this.turnTime);
		clearInterval(this.moveTime);
	},

	makeTurn: function() {
		this.dir = getRandom(0,3);
		$("#enemy-tank2").removeClass();
		$("#enemy-tank2").addClass("muzzle-dir-" + this.dir);
	},

	makeMove: function() {
		if(this.y == 0 && this.dir == 0) {
			this.dir = 2;
			$("#enemy-tank2").removeClass();
			$("#enemy-tank2").addClass("muzzle-dir-" + this.dir);
		}
		if(this.y == 9 && this.dir == 2) {
			this.dir = 0;
			$("#enemy-tank2").removeClass();
			$("#enemy-tank2").addClass("muzzle-dir-" + this.dir);
		}
		if(this.x == 0 && this.dir == 3) {
			this.dir = 1;
			$("#enemy-tank2").removeClass();
			$("#enemy-tank2").addClass("muzzle-dir-" + this.dir);
		}
		if(this.x == 9 && this.dir == 1) {
			this.dir= 3;
			$("#enemy-tank2").removeClass();
			$("#enemy-tank2").addClass("muzzle-dir-" + this.dir);
		}
		switch(this.dir) {
			case 0:
				if(
					this.y !== 0 
					&& world[this.y-1]
					&& world[this.y-1][this.x] !== 1 
					&& world[this.y-1][this.x] !== 2 
					&& world[this.y-1][this.x] !== 3
					&& world[this.y-1][this.x] !== 8
					&& world[this.y-1][this.x] !== 9
					&& (this.y-1 !== playerTank.y || this.x !== playerTank.x)
					&& (this.y-1 !== enemyTank1.y || this.x !== enemyTank1.x)
					) this.y--;
				$("#enemy-tank2").css("top", this.y * cellSize + "px");
				break;
			case 1:
				if(
					this.x !== 9
					&& world[this.y][this.x+1] !== 1 
					&& world[this.y][this.x+1] !== 2 
					&& world[this.y][this.x+1] !== 3
					&& world[this.y][this.x+1] !== 8 
					&& world[this.y][this.x+1] !== 9
					&& (this.y !== playerTank.y || this.x+1 !== playerTank.x)
					&& (this.y !== enemyTank1.y || this.x+1 !== enemyTank1.x)
					) this.x++;
				$("#enemy-tank2").css("left", this.x * cellSize + "px");
				break;
			case 2:
				if(
					this.y !== 9
					&& world[this.y+1]
					&& world[this.y+1][this.x] !== 1 
					&& world[this.y+1][this.x] !== 2 
					&& world[this.y+1][this.x] !== 3
					&& world[this.y+1][this.x] !== 8
					&& world[this.y+1][this.x] !== 9
					&& (this.y+1 !== playerTank.y || this.x !== playerTank.x)
					&& (this.y+1 !== enemyTank1.y || this.x !== enemyTank1.x)
					) this.y++;
				$("#enemy-tank2").css("top", this.y * cellSize + "px");
				break;
			case 3:
				if(
					this.x !== 0 
					&& world[this.y][this.x-1] !== 1 
					&& world[this.y][this.x-1] !== 2
					&& world[this.y][this.x-1] !== 3
					&& world[this.y][this.x-1] !== 8
					&& world[this.y][this.x-1] !== 9
					&& (this.y !== playerTank.y || this.x-1 !== playerTank.x)
					&& (this.y !== enemyTank1.y || this.x-1 !== enemyTank1.x)
					) this.x--;
				$("#enemy-tank2").css("left", this.x * cellSize + "px");
				break;
		}
	},

	makeShot: function() {
		if(this.canFire) {
			playSound("cannonShot");
			this.canFire = false;
			$("<div>", {
		  	id: "enemy-shell2"
			}).appendTo("#board");
			enemyShell2.dir = this.dir;
			enemyShell2.x = this.x;
			enemyShell2.y = this.y;
			$("#enemy-shell2").addClass("muzzle-dir-" + this.dir);
			$("#enemy-shell2").css("top", (enemyShell2.y * cellSize) + "px");
			$("#enemy-shell2").css("left", (enemyShell2.x * cellSize) + "px");
			this.shotDur = setInterval(this.shotFly, 200);			
		} else return;
	},

	shotFly: function() {
		enemyTank2.shellCollision();
		switch(enemyShell2.dir) {
			case 0:
				enemyShell2.y--;
				$("#enemy-shell2").css("top", (enemyShell2.y * cellSize) + "px");
				break;
			case 1:
				enemyShell2.x++;
				$("#enemy-shell2").css("left", (enemyShell2.x * cellSize) + "px");
				break;
			case 2:
				enemyShell2.y++;
				$("#enemy-shell2").css("top", (enemyShell2.y * cellSize) + "px");
				break;
			case 3:
				enemyShell2.x--;
				$("#enemy-shell2").css("left", (enemyShell2.x * cellSize) + "px");
				break;
		}
	},

	shellCollision: function() {
		// проверка нахождения внутри зоны
		if(enemyShell2.y < 0) {
			playSound("outShot");
			$("#enemy-shell2").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// проверка нахождения внутри зоны
		if(enemyShell2.y > 9) { 
			playSound("outShot");
			$("#enemy-shell2").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// проверка нахождения внутри зоны
		if(enemyShell2.x < 0) { 
			playSound("outShot");
			$("#enemy-shell2").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// проверка нахождения внутри зоны
		if(enemyShell2.x > 9) { 
			playSound("outShot");
			$("#enemy-shell2").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}

		// бронированная стена
		if(world[enemyShell2.y] && world[enemyShell2.y][enemyShell2.x] == 1) {
			$("#enemy-shell2").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			playSound("armWall");
		}
		// обычная стена
		if(world[enemyShell2.y] && world[enemyShell2.y][enemyShell2.x] == 2) { 
			var slotSelector = "#row-" + enemyShell2.y + "-col-" + enemyShell2.x;
			$(slotSelector).removeClass();
			$(slotSelector).addClass("slot-type-0");
			world[enemyShell2.y][enemyShell2.x] = 0;
			$("#enemy-shell2").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			playSound("simpleWall");
		}
		// участок воды
		if(world[enemyShell2.y] && world[enemyShell2.y][enemyShell2.x] == 3) {
			return;
		}
		// участок леса
		if(world[enemyShell2.y] && world[enemyShell2.y][enemyShell2.x] == 4) {
			return;
		}
		// вражеский танк
		if(enemyShell2.y === playerTank.y && enemyShell2.x === playerTank.x) {
			$("#player-tank").remove();
			$("#enemy-shell2").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			playSound("tankHit");
			setTimeout(function() {
	  		playSound("tankDestroy");
	  	}, 200);
			gameOver();
			setTimeout(function() {
	  		playSound("loose");
	  		setScenario("result_scenario");
	  	}, 800);
	  	result = "YouLoose";
		}
		// вражеский флаг
		if(world[enemyShell2.y] && world[enemyShell2.y][enemyShell2.x] == 8) {
			var slotSelector = "#row-" + enemyShell2.y + "-col-" + enemyShell2.x;
			$(slotSelector).removeClass();
			$(slotSelector).addClass("slot-type-7");
			world[enemyShell2.y][enemyShell2.x] = 7;
			$("#enemy-shell2").remove();
			clearInterval(this.shotDur);
			console.log("Ваша база уничтожена");
			this.canFire = true;
			gameOver();
			setTimeout(function() {
	  		playSound("loose");
	  		setScenario("result_scenario");
	  	}, 800);
			playSound("baseDestroy");
			result = "YouLoose";
		}
	}
};

// Player settings
var playerShell = {
	dir: 0,
	x: 0,
	y: 0
};

var playerTank = {
	canMove: true,
	canFire: true,
	shotDur: null,
	dir: 0,
	x: 0,
	y: 0,

	setSpawn: function() {
		playSound("tankSpawn");
		this.dir = 0;
		this.x = 4;
		this.y = 9;
		this.spawnAnimat();

		$("<div>", {
	  	id: "player-tank"
		}).appendTo("#board");

		$("#player-tank").attr("style", "");
		$("#player-tank").removeClass();
		$("#player-tank").addClass("muzzle-dir-0");
		$("#player-tank").css("top", (this.y * cellSize) + "px");
		$("#player-tank").css("left", (this.x * cellSize) + "px");
	},

	spawnAnimat: function() {
		$("<div>", {
	  	class: "my_spawn-1"
		}).appendTo("#board");
		$(".my_spawn-1").css("top", (playerTank.y * cellSize) + "px");
		$(".my_spawn-1").css("left", (playerTank.x * cellSize) + "px");

		setTimeout(function() {
			$(".my_spawn-1").remove();
			$("<div>", {
		  	class: "my_spawn-2"
			}).appendTo("#board");
			$(".my_spawn-2").css("top", (playerTank.y * cellSize) + "px");
			$(".my_spawn-2").css("left", (playerTank.x * cellSize) + "px");
		}, 200);

		setTimeout(function() {
			$(".my_spawn-2").remove();
		}, 400);
	},

	// controlls
	moveUp: function() {
		if(this.dir !== 0) {
			this.dir = 0;
			$("#player-tank").removeClass();
			$("#player-tank").addClass("muzzle-dir-" + this.dir);
		} else {
			this.dir = 0;
			$("#player-tank").removeClass();
			$("#player-tank").addClass("muzzle-dir-" + this.dir);
			if(
				this.y !== 0  // проверка нахождения внутри поля
				&& world[this.y-1]
				&& world[this.y-1][this.x] !== 1 // проверка нет ли на пути стены
				&& world[this.y-1][this.x] !== 2 // проверка нет ли на пути бронированой стены
				&& world[this.y-1][this.x] !== 3 // проверка нет ли на пути воды
				&& world[this.y-1][this.x] !== 8 // проверка нет ли на пути базы
				&& world[this.y-1][this.x] !== 9 // проверка нет ли на пути вражеской базы
				&& (this.y-1 !== enemyTank1.y || this.x !== enemyTank1.x)
				&& (this.y-1 !== enemyTank2.y || this.x !== enemyTank2.x)
				) {
				playSound("tankMove");
				this.y--;
				}
			$("#player-tank").css("top", (this.y * cellSize) + "px");
		}
	},

	moveRight: function() {
		if(this.dir !== 1) {
			this.dir = 1;
			$("#player-tank").removeClass();
			$("#player-tank").addClass("muzzle-dir-" + this.dir);
		} else {
			this.dir = 1;
			$("#player-tank").removeClass();
			$("#player-tank").addClass("muzzle-dir-" + this.dir);
			if( 
				this.x !== 9	// проверка нахождения внутри поля
				&& world[this.y][this.x+1] !== 1 // проверка нет ли на пути брони
				&& world[this.y][this.x+1] !== 2 // проверка нет ли на пути стены
				&& world[this.y][this.x+1] !== 3 // проверка нет ли на пути воды
				&& world[this.y][this.x+1] !== 8 // проверка нет ли на пути базы
				&& world[this.y][this.x+1] !== 9 // проверка нет ли на пути вражеской базы
				&& (this.y !== enemyTank1.y || this.x+1 !== enemyTank1.x)
				&& (this.y !== enemyTank2.y || this.x+1 !== enemyTank2.x)
				) {
				playSound("tankMove");
				this.x++;
				}
			$("#player-tank").css("left", (this.x * cellSize) + "px");
		}
	},

	moveDown: function() {
		if(this.dir !== 2) {
			this.dir = 2;
			$("#player-tank").removeClass();
			$("#player-tank").addClass("muzzle-dir-" + this.dir);			
		} else {
			this.dir = 2;
			$("#player-tank").removeClass();
			$("#player-tank").addClass("muzzle-dir-" + this.dir);
			if(
				this.y !== 9 // проверка нахождения внутри поля
				&& world[this.y+1]
				&& world[this.y+1][this.x] !== 1 // проверка нет ли на пути брони
				&& world[this.y+1][this.x] !== 2 // проверка нет ли на пути стены
				&& world[this.y+1][this.x] !== 3 // проверка нет ли на пути воды
				&& world[this.y+1][this.x] !== 8 // проверка нет ли на пути базы
				&& world[this.y+1][this.x] !== 9 // проверка нет ли на пути вражеской базы
				&& (this.y+1 !== enemyTank1.y || this.x !== enemyTank1.x)
				&& (this.y+1 !== enemyTank2.y || this.x !== enemyTank2.x)
				) {
				playSound("tankMove");
				this.y++;
				}
			$("#player-tank").css("top", (this.y * cellSize) + "px");
		}
	},

	moveLeft: function() {
		if(this.dir !== 3) {
			this.dir = 3;
			$("#player-tank").removeClass();
			$("#player-tank").addClass("muzzle-dir-" + this.dir);			
		} else {
			this.dir = 3;
			$("#player-tank").removeClass();
			$("#player-tank").addClass("muzzle-dir-" + this.dir);
			if(
				this.x !== 0
				&& world[this.y][this.x-1] !== 1 // проверка нет ли на пути стены
				&& world[this.y][this.x-1] !== 2 // проверка нет ли на пути бронированной стены
				&& world[this.y][this.x-1] !== 3 // проверка нет ли на пути воды
				&& world[this.y][this.x-1] !== 8 // проверка нет ли на пути базы
				&& world[this.y][this.x-1] !== 9 // проверка нет ли на пути вражеской базы
				&& (this.y !== enemyTank1.y || this.x-1 !== enemyTank1.x)
				&& (this.y !== enemyTank2.y || this.x-1 !== enemyTank2.x)
				) {
				playSound("tankMove");
				this.x--;
				}
			$("#player-tank").css("left", (this.x * cellSize) + "px");
		}
	},

	cannonFire: function() {
		if(this.canFire) {
			playSound("cannonShot");
			this.canFire = false;
			$("<div>", {
		  	id: "player-shell"
			}).appendTo("#board");
			playerShell.dir = this.dir;
			playerShell.x = this.x;
			playerShell.y = this.y;
			$("#player-shell").addClass("muzzle-dir-" + this.dir);
			$("#player-shell").css("top", (playerShell.y * cellSize) + "px");
			$("#player-shell").css("left", (playerShell.x * cellSize) + "px");
			this.shotDur = setInterval(this.playerShot, 200);		
		} else return;
	},

	playerShot: function() {
		playerTank.shellCollision();
		switch(playerShell.dir) {
			case 0:
				playerShell.y--;
				$("#player-shell").css("top", (playerShell.y * cellSize) + "px");
				break;
			case 1:
				playerShell.x++;
				$("#player-shell").css("left", (playerShell.x * cellSize) + "px");
				break;
			case 2:
				playerShell.y++;
				$("#player-shell").css("top", (playerShell.y * cellSize) + "px");
				break;
			case 3:
				playerShell.x--;
				$("#player-shell").css("left", (playerShell.x * cellSize) + "px");
				break;
		}
	},

	shellCollision: function() {
		// проверка нахождения внутри зоны
		if(playerShell.y < 0) { 
			playSound("outShot");
			$("#player-shell").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// проверка нахождения внутри зоны
		if(playerShell.y > 9) {
			playSound("outShot"); 
			$("#player-shell").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// проверка нахождения внутри зоны
		if(playerShell.x < 0) {
			playSound("outShot");
			$("#player-shell").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// проверка нахождения внутри зоны
		if(playerShell.x > 9) {
			playSound("outShot");
			$("#player-shell").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
		}
		// бронированная стена
		if(world[playerShell.y] && world[playerShell.y][playerShell.x] == 1) {
			$("#player-shell").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			playSound("armWall");
		}
		// обычная стена
		if(world[playerShell.y] && world[playerShell.y][playerShell.x] == 2) { 
			var slotSelector = "#row-" + playerShell.y + "-col-" + playerShell.x;
			$(slotSelector).removeClass();
			$(slotSelector).addClass("slot-type-0");
			world[playerShell.y][playerShell.x] = 0;
			$("#player-shell").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			playSound("simpleWall");
		}
		// участок воды
		if(world[playerShell.y] && world[playerShell.y][playerShell.x] == 3) {
			return;
		}
		// участок леса
		if(world[playerShell.y] && world[playerShell.y][playerShell.x] == 4) {
			return;
		}
		// вражеский флаг
		if(world[playerShell.y] && world[playerShell.y][playerShell.x] == 9) {
			var slotSelector = "#row-" + playerShell.y + "-col-" + playerShell.x;
			$(slotSelector).removeClass();
			$(slotSelector).addClass("slot-type-6");
			world[playerShell.y][playerShell.x] = 6;
			$("#player-shell").remove();
			clearInterval(this.shotDur);
			console.log("Вражеский флаг уничтожен");
			this.canFire = true;
			gameOver();
			playSound("baseDestroy");
			setTimeout(function() {
	  		playSound("victory");
	  		setScenario("result_scenario");
	  	}, 800);
	  	result = "YouWin";
		}

		// вражеский танк
		if(playerShell.y === enemyTank1.y && playerShell.x === enemyTank1.x) {
			$("#enemy-tank1").remove();
			$("#player-shell").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			enemyTank1.setSpawn();
			playSound("tankHit");
			setTimeout(function() {
	  		playSound("tankDestroy");
	  	}, 200);
		}
		// вражеский танк
		if(playerShell.y === enemyTank2.y && playerShell.x === enemyTank2.x) {
			$("#enemy-tank2").remove();
			$("#player-shell").remove();
			clearInterval(this.shotDur);
			this.canFire = true;
			enemyTank2.setSpawn();
			playSound("tankHit");
			setTimeout(function() {
	  		playSound("tankDestroy");
	  	}, 200);
		}
	}
};

var world = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,1,0,2,9,0,2,0,1,0],
	[4,3,0,2,1,1,2,0,3,4],
	[4,3,0,0,0,0,0,0,3,4],
	[0,0,0,4,4,4,4,0,0,0],
	[0,0,0,4,4,4,4,0,0,0],
	[4,3,0,0,0,0,0,0,3,4],
	[4,3,0,2,1,1,2,0,3,4],
	[0,1,0,2,0,8,2,0,1,0],
	[0,0,0,0,0,0,0,0,0,0],
];

function drawWorld() {
	$.each(world, function(row_index, col) {
		$.each(col, function(col_index, value) {			
			var selectorId = "#row-" + row_index + "-col-" + col_index;
			$(selectorId).removeClass();
			$(selectorId).addClass("slot-type-" + value);
		});
	});
};

document.onkeydown = function(event) {
	// console.log(event);
	if(playerTank.canMove) {
		playerTank.canMove = false;
		setTimeout(function() {
			playerTank.canMove = true;
		}, 300);
		switch(event.code) {
			case "ArrowUp": 
				playerTank.moveUp();
				break;
			case "ArrowLeft": 
				playerTank.moveLeft();
				break;
			case "ArrowRight": 
				playerTank.moveRight(); 
				break;
			case "ArrowDown": 
				playerTank.moveDown();
				break;
			case "Space":
				playerTank.cannonFire();
				break;
		}
	} else return;
};

function gameInit() {
	playerTank.setSpawn();
	enemyTank1.setSpawn();
	enemyTank2.setSpawn();
};

function gameOver() {
	document.onkeydown = null;
	enemyTank1.removeAction();
	enemyTank2.removeAction();
};

// Фаза 1
function startScene() {
	// playSound();
	$("#start-scene").css("display", "flex");
	$("#game-scene").css("display", "none");
	$("#result-scene").css("display", "none");
	$(document).on("keydown", startEnter);

	var showInterval;
	switchState();

	function hideShow() {
  	$("#press-start").toggleClass("blink");
	};

	function switchState() {
    showInterval = setInterval(function() {
  		hideShow();
		}, 500);
	};

	function startEnter(event) {
		// console.log(event);
		if(event.key == "Enter") {
			$(document).off("keydown", startEnter);
			clearInterval(showInterval);
			setScenario("game_scenario");
			playSound("startMusic");
		}
	}
};

// Фаза 2
function gameScene() {
	// playSound();
	$("#game-scene").css("display", "flex");
	$("#start-scene").css("display", "none");	
	// $("#result-scene").css("display", "none");

	gameInit();
	drawWorld();
};

// Фаза 3
function resultScene() {
	var gameResult;
	// playSound();
	$("#start-scene").css("display", "none");
	$("#game-scene").css("display", "flex");
	$("#result-box").css("display", "flex");

	displayResult();

	function displayResult() {
		switch(result) {
			case "YouWin":
				gameResult = "Победа";
				$("#result").css("color", "#0066ff");
				$("#result").html(gameResult);
				break;
			case "YouLoose":
				gameResult = "Поражение";
				$("#result").css("color", "#ff0000");
				$("#result").html(gameResult);
				break;
		}
	};
};

window.onload = function() {
	setScenario("start_scenario");
	// setScenario("game_scenario");
	// setScenario("result_scenario");
};

