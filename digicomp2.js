var SHOW_DEBUG_INFO = true;
var USE_AUDIO_EFFECTS = true;
var lastCollisionSoundTime = 0;
var COLLISION_SOUND_COOLDOWN_MS = 60;
var MIN_COLLISION_SOUND_SPEED = 80;
var collisionSound = null;
var holeCollisionGroup;
var returnHoleCollisionGroup;
var ballCollisionGroup;
var ballmotionCollisionGroup;
var flippableCollisionGroup;
var terrainCollisionGroup;
var triggerCollisionGroup;
var ff = [];
var poi = [];
var balls = [];
var trigger;
var triggerOptical;
var crescent;
var scr;
var button;
var rightnow = new Date().getTime();
var style = { font: "15px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 20, align: "center" };
var style2 = { font: "14px Arial", fill: "#000000", wordWrap: false, wordWrapWidth: 40, align: "center" };
var ANGLE_EPSILON = 2;
var VELOCITY_EPSILON = 0.5;
var MIN_SLOW_MOTION = 0.05;
var MAX_SLOW_MOTION = 2;
var BASE_GAME_WIDTH = 410;
var BASE_GAME_HEIGHT = 839;
var autoResizeToWindow = false;

function getSimContainer() {
	return document.getElementById('sim');
}

function setGameWindowSize(width, height) {
	var gameEngine = getSimContainer();
	if (!gameEngine) {
		return;
	}
	var w = Math.max(320, Math.floor(Number(width) || BASE_GAME_WIDTH));
	var h = Math.max(480, Math.floor(Number(height) || BASE_GAME_HEIGHT));
	gameEngine.style.width = w + 'px';
	gameEngine.style.height = h + 'px';
	if (game && game.scale) {
		game.scale.refresh();
	}
}

function fitGameToWindow() {
	setGameWindowSize(window.innerWidth, window.innerHeight);
}

function setAutoResizeToWindow(enabled) {
	autoResizeToWindow = !!enabled;
	if (autoResizeToWindow) {
		fitGameToWindow();
	}
}

window.Digicomp2 = window.Digicomp2 || {};
window.Digicomp2.resize = setGameWindowSize;
window.Digicomp2.fit = fitGameToWindow;
window.Digicomp2.autoResize = setAutoResizeToWindow;

if (window.location.protocol === 'file:') {
	window.addEventListener('DOMContentLoaded', function () {
		document.body.innerHTML = '<div style="font-family:Arial,sans-serif;padding:24px;line-height:1.5;max-width:700px;">'
			+ '<h2 style="margin-top:0;">Execution bloquee en mode file://</h2>'
			+ '<p>Ce jeu Phaser charge des assets via XHR (audio/json), et le navigateur bloque ces requetes en local direct.</p>'
			+ '<p>Lance un serveur HTTP local, puis ouvre: <strong>http://localhost:8080/Digicomp%202.html</strong></p>'
			+ '<p>Utilise le script <strong>start-server.ps1</strong> a la racine du projet.</p>'
			+ '</div>';
	});
	throw new Error('Open this project via HTTP (localhost), not via file://');
}

var game = new Phaser.Game(BASE_GAME_WIDTH, BASE_GAME_HEIGHT, Phaser.AUTO, 'sim', { // 800, 885
	preload: preload,
	create: create,
	update: update
});
function changeRes() {
	fitGameToWindow();
}

function preload() {
	game.load.image('background', 'assets/images/bwbkgrd.svg');
	game.load.image('bluebar', 'assets/images/bluebar.png');
	game.load.image('ball', 'assets/images/blackball.png');
	game.load.image('crescent', 'assets/images/crescent1.svg');
	game.load.image('redpointer', 'assets/images/redpointer.svg');
	game.load.audio('colission', 'assets/audio/colission.wav');
	game.load.image('trigger', 'assets/images/trigger.svg');
	game.load.image('lever', 'assets/images/redtrigger.svg');
	game.load.image('ff1', 'assets/images/ff01.svg');
	game.load.image('ffa', 'assets/images/ff02.svg');
	game.load.image('ffb', 'assets/images/ff03.svg');
	game.load.image('ff4', 'assets/images/ff04.svg');
	game.load.physics('shapes', 'assets/json/shapes.json');
	game.load.physics('redpointershapes', 'assets/json/redpointer.json');
	game.load.physics('ff1shapes', 'assets/json/ff1.json');
	game.load.spritesheet('button', 'assets/images/button_sprite_sheet.svg', 125.3333333333333, 40.89866);
	game.load.image('screen', 'assets/images/screen.svg');
	game.load.spritesheet('key1', 'assets/images/press_sprite_sheet2.svg', 62.66666666666667, 40.80739);
/*
	game.load.audio('move', ['move.mp3']);
	game.load.audio('click', ['click.mp3']);
	game.load.audio('balldrop', ['balldrop.mp3']);
	game.load.audio('ballroll', ['ballroll.mp3']);
	game.load.audio('ballstop', ['ballstop.mp3']);
	game.load.audio('ballrotate', ['ballrotate.mp3']);
	*/
}

function create() {
	var background = game.add.sprite(0, 0, 'background');
	game.stage.backgroundColor = 'rgb(255, 255, 255)'; //background color
	background.height = 839;
	background.width = 410;

    game.forceSingleUpdate = false;
    game.time.slowMotion = 1/5;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignVertically = true;
	game.scale.pageAlignHorizontally = true;
	setGameWindowSize(BASE_GAME_WIDTH, BASE_GAME_HEIGHT);
	game.scale.refresh();
	window.addEventListener('resize', function () {
		if (autoResizeToWindow) {
			fitGameToWindow();
		}
	});

	setupPhysicsEnvironment();
	setupAudioEffects();
	setupCollisionGroups();
	var platforms = [[179, 49, 330, 2, 9], [261, 104, 198, 2, -4], [275, 707, 42, 2, 13], [330, 739, 35, 2, 6], [270, 739, 100, 2, -6], [368, 746, 76, 2, 92], [195, 768, 50, 2, 90], [228, 767, 45 , 2, 90], [342, 763, 30, 2, 90], [392, 748, 109, 2, 90], [352, 703, 30, 2, 20], [203, 814, 377, 2, -5], [12, 805, 38, 2, 90], [59, 541, 284, 2, 90], [95, 726, 200, 2, 8], [156, 660, 90, 2, 90], [216, 500, 129, 2, 90], [358, 457, 300, 2, 90], [222, 668, 80, 2, 50], [128, 315, 67, 2, 14], [139, 263, 43, 2, 14], [107, 370, 109, 2, 8], [112, 219, 75, 2, 81.5], [196, 199, 60, 2, 80], [92, 273, 80, 2, 90], [149, 139, 50, 2, 9], [129, 139, 25, 2, -6], [122, 179, 35, 2, 6], [178, 165, 25, 2, 4], [195, 246, 85, 2, 4], [195, 302, 85, 2, 4], [195, 358, 85, 2, 4], [195, 415, 85, 2, 4], [242, 639, 110, 2, 5], [329, 50, 75, 2, 11], [0, 830, 830, 2, 0], [0, 0, 830, 2, 0], [0, 0, 1650, 2, 90], [410, 0, 1650, 2, 90], [158, 165, 10, 2, -4], [165, 246, 25, 2, -4], [87, 125, 20, 2, 60], [68, 280, 50, 2, 68], [58, 330, 30, 2, 45], [73, 220, 10, 2, -30], [18, 209, 30, 2, 30], [18, 259, 30, 2, 30], [18, 319, 30, 2, 30], [18, 379, 30, 2, 30], [18, 429, 30, 2, 30], [18, 489, 30, 2, 30], [18, 539, 30, 2, 30], [18, 599, 30, 2, 30], [18, 649, 30, 2, 30], [48, 410, 30, 2, -30], [48, 460, 30, 2, -30], [48, 510, 30, 2, -30], [48, 570, 30, 2, -30], [48, 620, 30, 2, -30], [48, 670, 30, 2, -30], [18, 700, 30, 2, 66], [350, 260, 40, 2, -40], [340, 340, 25, 2, -30], [340, 394, 25, 2, -30], [340, 448, 30, 2, -30], [340, 504, 30, 2, -30], [340, 558, 30, 2, -30], [340, 612, 30, 2, -30], [230, 470, 25, 2, 30], [230, 522, 25, 2, 30], [230, 572, 25, 2, 30], [335, 632, 30, 2, 90], [245, 147, 30, 2, -60], [275, 177, 30, 2, -60], [285, 227, 70, 2, -75], [285, 282, 30, 2, 5], [285, 339, 30, 2, 5], [280, 394, 30, 2, 5], [285, 449, 30, 2, 5], [285, 507, 30, 2, 5], [285, 561, 30, 2, 5], [285, 615, 30, 2, 5], [295, 312, 40, 2, -5], [295, 367, 35, 2, -5], [295, 424, 35, 2, -5], [295, 480, 35, 2, -5], [295, 534, 35, 2, -5], [295, 588, 35, 2, -5], [230, 615, 35, 2, -5], [190, 675, 30, 2, -30], [168, 652, 30, 2, 30], [168, 702, 30, 2, 30], [185, 260, 20, 2, 90], [185, 310, 20, 2, 90], [190, 365, 20, 2, 90]];
	var i = 0;
	while (i < 95) {
		var p = createPlatform(game, ...platforms[i]);
		i++;
	}
	var balls = [[150, 15, 11], [140, 15, 10], [130, 15, 9], [120, 15, 8], [110, 15, 7], [100, 15, 6], [90, 15, 5], [80, 15, 4], [70, 15, 3], [60, 15, 2], [50, 15, 1]];
	var i = 0;
	while (i < 11) {
		var p = setupBall(...balls[i]);
		i++;
	}
	var holes = [[170, 154, 1], [263, 225, 2], [163, 235, 0], [168, 290, 0], [168, 344, 0], [168, 405, 0]];
	var i = 0;
	while (i < 6) {
		var p = setupHole(...holes[i]);
		i++;
	}
	var ffs = [[102, 152, 1], [88, 186, 2], [155, 195, 3], [330, 680, 4], [50, 235, 5, 1], [40, 285, 6, 1], [40, 340, 7, 1], [172, 230, 8, 2], [175, 285, 9, 2], [176, 335, 10, 2], [181, 392, 11, 2], [240, 200, 12, 1, 1], [258, 270, 13, 3, 1], [258, 326, 14, 3, 1], [258, 380, 15, 3, 1], [260, 437, 16, 3, 1], [262, 494, 17, 3, 1], [262, 548, 18, 3, 1], [262, 598, 19, 3, 1]];
	var i = 0;
	while (i < 19) {
		var p = setupFF1(game, ...ffs[i]);
		i++;
	}
	setupCrescent();
	setupTrigger();
	var pointers = [[128, 132, 1], [188, 157, 2], [223, 187, 3], [313, 298, 4], [313, 357, 5], [313, 417, 6], [313, 467, 7], [313, 527, 8], [313, 582, 9], [200, 632, 10], [315, 732, 11], [313, 662, 12, 1]];
	var i = 0;
	while (i < 12) {
		var p = setupPointers(game, ...pointers[i]);
		i++;
	}
	setupReturn();

    button = game.add.button(game.world.centerX - 138, 515, 'button', initFunc, this, 2, 1, 0);
	var label = game.add.text(Math.floor(button.x + button.width / 2), Math.floor(button.y + button.height / 2), "INITIALIZE", style);
    label.anchor.set(0.5);

    button = game.add.button(game.world.centerX - 138, 473, 'key1', speedP, this, 2, 1, 0);
	var label = game.add.text(Math.floor(button.x + button.width / 2), Math.floor(button.y + button.height / 2), "SPEED+", style);
    label.anchor.set(0.5);

	scr = game.add.sprite(game.world.centerX - 138, 431, 'screen');
	scr.height = 40.89866;
	scr.width = 125.3333333333333;
	scr.label = game.add.text(Math.floor(scr.x + scr.width / 6), Math.floor(scr.y + scr.height / 3), 'SPEED: ' + Math.round(this.time.slowMotion * 1000) / 1000, style2);

    button = game.add.button(game.world.centerX - 75.5, 473, 'key1', speedM, this, 2, 1, 0);
	var label = game.add.text(Math.floor(button.x + button.width / 2), Math.floor(button.y + button.height / 2), "SPEED-", style);
    label.anchor.set(0.5);
}

function setupAudioEffects() {
	collisionSound = game.add.audio('colission', 0.25, false);

	// Some browsers keep WebAudio locked until a user gesture.
	game.input.onDown.addOnce(function () {
		if (game.sound && game.sound.context && typeof game.sound.context.resume === 'function') {
			game.sound.context.resume();
		}
	});
}

function initFunc() {
	for (var k = 12; k < 20; k++) {
		resetFFA(k);
	}
	for (var k = 1; k < 12; k++) {
		resetFFA(k, 1);
	}
	resetT(12, 0);
	for (var k = 1; k < 12; k++) {
		resetT(k, 1);
	}
	for (var k = 1; k < 12; k++) {
		resetBalls(k);
	}
}

function speedM() {
	if (game.time.slowMotion <= 0.1) {
		game.time.slowMotion /= 0.5;
	} else {
		game.time.slowMotion += 0.1;
	}
	game.time.slowMotion = Phaser.Math.clamp(game.time.slowMotion, MIN_SLOW_MOTION, MAX_SLOW_MOTION);
	game.world.remove(scr.label);
	scr.label = game.add.text(Math.floor(scr.x + scr.width / 6), Math.floor(scr.y + scr.height / 3), 'SPEED: ' + Math.round(this.time.slowMotion * 10000) / 10000, style2);
}

function speedP() {
	if (game.time.slowMotion <= 0.1) {
		game.time.slowMotion *= 0.5;
	} else {
		game.time.slowMotion -= 0.1;
	}
	game.time.slowMotion = Phaser.Math.clamp(game.time.slowMotion, MIN_SLOW_MOTION, MAX_SLOW_MOTION);
	game.world.remove(scr.label);
	scr.label = game.add.text(Math.floor(scr.x + scr.width / 6), Math.floor(scr.y + scr.height / 3), 'SPEED: ' + Math.round(this.time.slowMotion * 10000) / 10000, style2);
}

function isNear(value, target, epsilon) {
	return Math.abs(value - target) <= epsilon;
}

function isBetween(value, min, max) {
	return value > min && value < max;
}

function setupPhysicsEnvironment() {
	game.physics.startSystem(Phaser.Physics.P2JS); //this will start the powerful p2 physics system
	game.physics.p2.setImpactEvents(true);

	game.physics.p2.gravity.y = 600; // 2400 creates an almost realistic gravity 

	game.physics.p2.world.defaultContactMaterial.friction = 0.2;

	game.physics.p2.world.defaultContactMaterial.restitution = 0.0;

	game.physics.p2.world.defaultContactMaterial.relaxation = 10000;

}

function getBodySpeed(body) {
	if (!body || !body.velocity) {
		return 0;
	}
	var vx = Number(body.velocity.x) || 0;
	var vy = Number(body.velocity.y) || 0;
	return Math.sqrt(vx * vx + vy * vy);
}

function handleBallContact(ballBody, otherBody) {
	if (!USE_AUDIO_EFFECTS || !ballBody || !otherBody) {
		return;
	}

	var vax = Number(ballBody.velocity && ballBody.velocity.x) || 0;
	var vay = Number(ballBody.velocity && ballBody.velocity.y) || 0;
	var vbx = Number(otherBody.velocity && otherBody.velocity.x) || 0;
	var vby = Number(otherBody.velocity && otherBody.velocity.y) || 0;
	var dvx = vax - vbx;
	var dvy = vay - vby;
	var relativeSpeed = Math.sqrt(dvx * dvx + dvy * dvy);
	if (relativeSpeed < MIN_COLLISION_SOUND_SPEED) {
		return;
	}

	var now = game.time.now;
	if (now - lastCollisionSoundTime < COLLISION_SOUND_COOLDOWN_MS) {
		return;
	}
	lastCollisionSoundTime = now;

	if (collisionSound) {
		collisionSound.play();
		return;
	}
	game.sound.play('colission', 0.25, false);
}

function setupCollisionGroups() {
	holeCollisionGroup = game.physics.p2.createCollisionGroup();
	returnHoleCollisionGroup = game.physics.p2.createCollisionGroup();
	ballCollisionGroup = game.physics.p2.createCollisionGroup();
	ballmotionCollisionGroup = game.physics.p2.createCollisionGroup();
	flippableCollisionGroup = game.physics.p2.createCollisionGroup();
	terrainCollisionGroup = game.physics.p2.createCollisionGroup();
	triggerCollisionGroup = game.physics.p2.createCollisionGroup();
}

function setupFF1(game, x, y, num, type, pos) {
	if (type == null) {
		type = 0;
	}
	if (pos == null) {
		pos = 0;
	}
	if (type == 0) {
		ff[num] = game.add.sprite(x, y, 'ff1');
		ff[num].height = 30;
		ff[num].width = 40;
	} else if (type == 1) {
	    ff[num] = game.add.sprite(x, y, 'ffa');
		ff[num].height = 30;
		ff[num].width = 35;
	} else if (type == 2) {
	    ff[num] = game.add.sprite(x, y, 'ff4');
		ff[num].height = 30;
		ff[num].width = 45;
	} else if (type ==3){
		ff[num] = game.add.sprite(x,y,'ffb');
		ff[num].height=50;
		ff[num].width=45;
	} else {
		ff[num] = game.add.sprite(x, y, 'ffb');
		ff[num].height = 30;
		ff[num].width = 45;
	}
	game.physics.p2.enable(ff[num], false);
	ff[num].body.kinematic = true;
	ff[num].lastfliptime = new Date().getTime();
	ff[num].flipLeft = false;
	ff[num].flipRight = false;
	if (pos == 1) {
		ff[num].body.angle = -45;
	} else {
		ff[num].body.angle = 45;
	}
	ff[num].inputEnabled = true;
	ff[num].events.onInputDown.add(ff1click, this);
	if (type != 2) {
		ff[num].body.clearShapes();
		ff[num].body.loadPolygon('ff1shapes', 'ff1');
		ff[num].body.setCollisionGroup(flippableCollisionGroup);
		ff[num].body.collides([ballCollisionGroup]);
	} else {
		ff[num].body.clearShapes();
		ff[num].body.addRectangle(3, 25, 0, 0, 0)
		ff[num].body.setCollisionGroup(terrainCollisionGroup);
		ff[num].body.collides([ballCollisionGroup]);
	}
	return ff[num];
}


function setupHole(x, y, type) {
	if (type == null) {
		type = 0;
	}
	var hole = game.add.sprite(x, y, 'ball');
	hole.height = 18;
	hole.width = 18;
	game.physics.p2.enable(hole);
	hole.body.kinematic = true;
	hole.body.clearShapes(); // Get rid of the default sprite rectangle shape
	hole.body.addCircle(6);
	hole.body.setCollisionGroup(holeCollisionGroup);
	hole.body.collides([ballCollisionGroup]);
	hole.type = type;
}

function setupReturn() {
	var returnHole = game.add.sprite(30, 810, 'ball');
	returnHole.height = 24;
	returnHole.width = 24;
	game.physics.p2.enable(returnHole);
	returnHole.body.kinematic = true;
	returnHole.body.clearShapes(); // Get rid of the default sprite rectangle shape
	returnHole.body.addCircle(6);
	returnHole.body.setCollisionGroup(returnHoleCollisionGroup);
	returnHole.body.collides([ballCollisionGroup]);
}

function setupBall(x, y, num, radius) {
	if (x == null) x = 200; // 200 for top ramp
	if (radius == null) radius = 8;

	balls[num] = game.add.sprite(x, y, 'ball');

	balls[num].width = radius * 2;
	balls[num].height = radius * 2;

	game.physics.p2.enable(balls[num]);

	balls[num].body.clearShapes(); // Get rid of the default sprite rectangle shape
	balls[num].body.addCircle(radius); // Add a circle shape
	balls[num].body.setZeroDamping();
	balls[num].body.allowSleep = false;
	balls[num].inputEnabled = true;
	balls[num].events.onInputDown.add(ballclick, this);

	balls[num].body.setCollisionGroup(ballCollisionGroup);
	balls[num].body.collides([ballCollisionGroup, terrainCollisionGroup]);
	balls[num].body.onBeginContact.add(function (otherBody) {
		handleBallContact(this, otherBody);
	}, balls[num].body);

	balls[num].body.collides(holeCollisionGroup, fallInHole, balls[num]);
	balls[num].body.collides(returnHoleCollisionGroup, returnHole, balls[num]);
	balls[num].body.collides(flippableCollisionGroup, triggerAFlip, balls[num]);
	balls[num].body.collides(triggerCollisionGroup, triggerclick, balls[num]);
}

function resetFFA(k, type) {
	setTimeout( function() { 
		if (type == null) {
			type = 0;
		}
		if (type == 0) {
			if (isNear(ff[k].body.angle, 45, ANGLE_EPSILON)) {
				ff1click(ff[k]);
				//playsound
			}
		} else {
			if (isNear(ff[k].body.angle, -45, ANGLE_EPSILON)) {
				ff1click(ff[k]);
				//playsound
			}
		}
	}, k*25);
} 

function resetBalls(k) {
	setTimeout( function() { 
		ballclick(balls[k]);	
		//playsound
	}, k*300);
} 

function resetT(k, type) {
	setTimeout( function() { 
		if (type == null) {
			type = 0;
		}
		if (type == 0) {
			if (isNear(poi[k].body.angle, -55, ANGLE_EPSILON)) {
				pointerclick(poi[k]);
				//playsound
			}
		} else if (type == 1) {
			if (isNear(poi[k].body.angle, 55, ANGLE_EPSILON)) {
				pointerclick(poi[k]);
				//playsound
			}
		} else {
			pointerclick(poi[k]);				
		}
	}, k*25);
} 

function fallInHole(ball, hole) {
	ball.x = -40;
	ball.y = -40;
	ball.inertia = 0;
	if (hole.sprite.type == 1) {
		for (var k = 12; k < 20; k++) {
			resetFFA(k);
		}
	}
	if (hole.sprite.type == 2) {
		for (var k = 4; k < 10; k++) {
			resetT(k, 2);
		}
	}
	//playsound
	setTimeout(function() {
	ball.x = 215;
	ball.y = 650;
	ball.inertia = 2;
	ball.velocity.x = 1;
	ball.velocity.y = -1;
	//playsound
	}, 1500);
}

function returnHole(ball, hole) {
	ball.x = -40;
	ball.y = -40;
	ball.inertia = 0;
	//playsound
	setTimeout(function() {
	ball.x = 50;
	ball.y = 15;
	ball.inertia = 2;
	ball.velocity.x = 1;
	ball.velocity.y = -1;
	//playsound
	}, 3500);
}

function ballclick(ball, hole) {
	ball.body.x = -40;
	ball.body.y = -40;
	ball.body.inertia = 0;
	//playsound
	setTimeout(function() {
	ball.body.x = 50;
	ball.body.y = 15;
	ball.body.inertia = 2;
	ball.body.velocity.x = 1;
	ball.body.velocity.y = -1;
	//playsound
	}, 3500);
}

function ffRotate(flippable) {
	if (isBetween(flippable.angle, -46, 0)) {
		while (flippable.angle < 46) {
			//playsoundloop
			if (isNear(flippable.angle, -45, ANGLE_EPSILON)) {
				flippable.angle = -45;
				flippable.rotateRight(0);
				//stopsoundloop
				//playsound
				break;
			} 
		}
	 } else {
		while (flippable.angle > -46) {
			//playsoundloop
			if (isNear(flippable.angle, 45, ANGLE_EPSILON)) {
				flippable.angle = 45;
				flippable.body.rotateLeft(0);
				//stopsoundloop
				//playsound
				break;
			} 
		}
	}
}

function ballIsSlow(ball){
	return (Math.abs(ball.velocity.x) <= VELOCITY_EPSILON && Math.abs(ball.velocity.y) <= VELOCITY_EPSILON);
}

function triggerAFlip(ball, ff0) {
	var t = setInterval(function() {
		if (Math.abs(ball.velocity.x) < VELOCITY_EPSILON) {
			ball.velocity.x = 0;
		}
		if (Math.abs(ball.velocity.y) < VELOCITY_EPSILON) {
			ball.velocity.y = 0;
		}
		if (Phaser.Point.distance(ball, ff0) > 30) {
			clearInterval(t);
		}
		if (ballIsSlow(ball)) {
			var rightnow = new Date().getTime()
			clearInterval(t);
			var fff = ff0.sprite;
			if ((((fff.lastfliptime + 1000) < rightnow) ||  (fff.lastfliptime === undefined)) && fff.lastfliptime !== rightnow) {
				ff1click(fff);
			}
		}
	}, 10);
}


function setupTrigger() {
	triggerOptical = game.add.sprite(255, 760, 'lever');
	triggerOptical.height = 8;
	triggerOptical.width = 120; 
	game.physics.p2.enable(triggerOptical, false);
	triggerOptical.body.kinematic = true;
	triggerOptical.inputEnabled = true;
	triggerOptical.body.angle=0;
	triggerOptical.anchor.setTo(0.05, 0.5);
	triggerOptical.events.onInputDown.add(triggerclick, this);
	trigger = game.add.sprite(320, 760, 'trigger');
	trigger.height = 25;
	trigger.width = 80;
	game.physics.p2.enable(trigger, false);
	trigger.body.kinematic = true;
	trigger.visible = false;
	trigger.body.angle=0;
	trigger.body.setCollisionGroup(triggerCollisionGroup);
	trigger.body.collides([ballCollisionGroup]);

}


function setupCrescent() {
	crescent = game.add.sprite(365, 75, 'crescent');
	crescent.height = 36;
	crescent.width = 36;
	game.physics.p2.enable(crescent, false);
	crescent.body.clearShapes();
	crescent.body.loadPolygon('shapes', 'crescent');

	crescent.body.kinematic = true;
	crescent.inputEnabled = true;
	crescent.events.onInputDown.add(crescentclick, this);
	crescent.body.angle = 33;
	crescent.body.setCollisionGroup(terrainCollisionGroup);
	crescent.body.collides([ballCollisionGroup]);
}

function setupPointers(game, x, y, num, pos) {
	if (pos == null) {
		pos = 0
	}
	poi[num] = game.add.sprite(x, y, 'redpointer');
	poi[num].height = 45;
	poi[num].width = 8;

	game.physics.p2.enable(poi[num], true);
	if (pos == 1) {
		poi[num].body.angle = 55;
	} else {
		poi[num].body.angle = -55; // 55
	}
	poi[num].body.kinematic = true;
	poi[num].inputEnabled = true;
	poi[num].lastfliptime = new Date().getTime();
	poi[num].flipLeft = false;
	poi[num].flipRight = false;
	poi[num].body.clearShapes();
	poi[num].body.loadPolygon('redpointershapes', 'redpointer');
	poi[num].events.onInputDown.add(pointerclick, this);
	poi[num].body.setCollisionGroup(terrainCollisionGroup);
	poi[num].body.collides([ballCollisionGroup]);
	return poi[num];
}

function ffaclick(ffa, pointer) {
	ffa.body.angle = ffa.body.angle * -1;
}

function ffaflip(ffa, pointer) {
	ffa.body.angle = ffa.body.angle * -1;
}

function ffbclick(ffb, pointer) {
	ffb.body.angle = ffb.body.angle * -1;
}

function ff1click(ff0, pointer) {
	var rightnow = new Date().getTime()
		if (isNear(ff0.body.angle, 45, ANGLE_EPSILON) && ff0.flipLeft === false) {
			ff0.flipLeft = true;
		} else if (isNear(ff0.body.angle, -45, ANGLE_EPSILON) && ff0.flipRight === false) {
			ff0.flipRight = true;
		}
		var t = setInterval(function() {
		if (ff0.flipLeft === true) {
			ff0.flipRight = false;
			ff0.body.rotateLeft(35);
			//playsoundloop
			if (isNear(ff0.body.angle, -45, ANGLE_EPSILON)) {
				ff0.flipLeft = false;
				ff0.body.rotateLeft(0);
				ff0.body.angle = -45;
				ff0.lastfliptime = new Date().getTime();
				clearInterval(t);
			} 
		} else if (ff0.flipRight === true) {
			ff0.flipLeft = false;
			ff0.body.rotateRight(35);
			//playsoundloop
			if (isNear(ff0.body.angle, 45, ANGLE_EPSILON)) {
				ff0.flipRight = false;
				ff0.body.rotateRight(0);
				ff0.body.angle = 45;
				ff0.lastfliptime = new Date().getTime();
				clearInterval(t);
			} 
		} else {
			clearInterval(t);
		}
	}, 10);
}




function pointerclick(pointer, pointer2) {
		if (isNear(pointer.body.angle, 55, ANGLE_EPSILON) && pointer.flipLeft === false) {
			pointer.flipLeft = true;
		} else if (isNear(pointer.body.angle, -55, ANGLE_EPSILON) && pointer.flipRight === false) {
			pointer.flipRight = true;
		}
		var t = setInterval(function() {
		if (pointer.flipLeft === true) {
			pointer.flipRight = false;
			pointer.body.rotateLeft(35);
			//playsoundloop
			if (isNear(pointer.body.angle, -55, ANGLE_EPSILON)) {
				pointer.flipLeft = false;
				pointer.body.rotateLeft(0);
				pointer.body.angle = -55;
				pointer.lastfliptime = new Date().getTime();
				clearInterval(t);
				//stopsoundloop
			} 
		} else if (pointer.flipRight === true) {
			pointer.flipLeft = false;
			pointer.body.rotateRight(35);
			//playsoundloop
			if (isNear(pointer.body.angle, 55, ANGLE_EPSILON)) {
				pointer.flipRight = false;
				pointer.body.rotateRight(0);
				pointer.body.angle = 55;
				pointer.lastfliptime = new Date().getTime();
				clearInterval(t);
				//stopsoundloop
			} 
		} else {
			clearInterval(t);
		}
	}, 10);
}


function crescentclick() {
	//playsound
	crescent.body.rotateLeft(15);
	trigger.body.setCollisionGroup(triggerCollisionGroup);
	trigger.body.collides([ballCollisionGroup]);
}

function triggerclick() {
	trigger.body.clearCollision();
	triggerOptical.body.clearCollision();
	setTimeout(crescentclick, 500);
	triggerOptical.body.rotateRight(25);
	var t = setInterval(function() {
		if (triggerOptical.body.angle > 10) {
			triggerOptical.body.rotateLeft(25);
			//playsound
		}
		if (triggerOptical.body.angle <= 0) {
			triggerOptical.body.rotateLeft(0);
			triggerOptical.body.angle = 0;
			clearInterval(t);
			//playsound
		}	
	}, 10);
}

function createPlatform(game, x, y, width, height, angle) {
	var bluebar = game.add.sprite(x, y, 'bluebar');
	bluebar.width = width;
	bluebar.height = height;
	bluebar.angle = angle;

	game.physics.p2.enable(bluebar);
	bluebar.body.clearShapes();
	bluebar.body.addLine(width);
	bluebar.body.angle = angle;
	bluebar.body.kinematic = true;
	bluebar.body.setCollisionGroup(terrainCollisionGroup);
	bluebar.body.collides([ballCollisionGroup]);
	bluebar.visible = false;
}

function update() {
	if (crescent.body.angle < -40) {
		crescent.body.rotateRight(25);
		}
	if (crescent.body.angle > 30) {
		crescent.body.rotateRight(0);
		crescent.body.angle = 30;
		//playsound
	}
}
