import { Vanna } from "./vanna.js";

var titleSprite = new Image();
titleSprite.src = "./assets/10_tv/title.png";

var wheelSprite = new Image();
wheelSprite.src = "./assets/10_tv/wheel.png";

var starringSprite = new Image();
starringSprite.src = "./assets/10_tv/starring.png";

var vannaSprite = new Image();
vannaSprite.src = "./assets/10_tv/vanna.png";

var backSprite = new Image();
backSprite.src = "./assets/10_tv/back.png";

var letters = new Image();
letters.src = "./assets/10_tv/letters.png";

var maskedL = new Image();
maskedL.src = "./assets/10_tv/maskedL.png";

var key;
var letter = new Image();
var lett = [];

var scaleDirection = -1;
var scaleDelta = 0.5;

var canPress = true;


window.addEventListener('keydown', function (e) {
	if (canPress) {
		lett = [];
		key = e.key;
		canPress = false;
	}	
})

var questions =
{
	lines: [
		["", "", "", "", "1", "1", "1", "", "", "", ""],
		["", "", "21", "8", "13", "2", "4", "13", "19", "", ""],
		["", "", "", "2", "0", "8", "11", "11", "24", "", ""],
		["", "", "", "", "1O", "25", "", "", "", "", ""]
	],
	answers: [
		["", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", ""]
	]
}


var wheelTick = 0;
var wheelFrame = 0;
var maxTickCount = 8;

var wheelTurns = 0;
var vanna;

function playWheelGame(ctx) {
	
	if (!vanna) vanna = new Vanna(272, 95, ctx);

	if (wheelTick > maxTickCount) {
		wheelTick = 0;
		wheelFrame < 2 ? wheelFrame++ : wheelFrame = 0;
		wheelTurns++;
	} else {
		wheelTick++;
	}

	if (wheelTurns < 2) {   // 20
		ctx.drawImage(titleSprite, 240, 0);
		ctx.drawImage(wheelSprite, wheelFrame * 700, 0, 700, 214, 250, 186, 700, 214);
	} else if (wheelTurns < 6) {   // 26
		ctx.drawImage(starringSprite, 240, 0);
	} else if (wheelTurns < 8) {    // 36
		ctx.drawImage(vannaSprite, 240, 0);
	} else {
		ctx.drawImage(backSprite, 240, 0);

		drawQuestion(ctx);
		flipCard(ctx);
		vanna.draw();
	}
}

function drawQuestion(ctx) {
	for (let i = 0; i < questions.lines.length; i++) {
		for (let j = 0; j < questions.lines[i].length; j++) {
			if (questions.lines[i][j] != "") {
				var xOff;
				var yOff;
				if (questions.lines[i][j] >= 13) {
					xOff = questions.lines[i][j] - 13;
					yOff = 1;
				} else {
					xOff = questions.lines[i][j];
					yOff = 0;
				}
				ctx.drawImage(maskedL, 337 + 47 * j, 71 + 47 * i);
			}
			if (questions.answers[i][j] != "") {
				var xOff;
				var yOff;
				if (questions.answers[i][j] >= 13) {
					xOff = questions.answers[i][j] - 13;
					yOff = 1;
				} else {
					xOff = questions.answers[i][j];
					yOff = 0;
				}
				ctx.drawImage(letters, xOff * 40, yOff * 40 + 80, 40, 40, 337 + 47 * j, 71 + 47 * i, 40, 40)
			}
		}
	}
}

function flipCard(ctx) {
	var xOff;
	var yOff;
	var tempCanvas = document.createElement('canvas');
	var tempCtx = tempCanvas.getContext('2d');
	tempCanvas.width = 40;
	tempCanvas.height = 40;

	if (key) {
		var ty = key.charCodeAt(0) - 97;
	}

	for (let i = 0; i < questions.lines.length; i++) {
		for (let j = 0; j < questions.lines[i].length; j++) {
			ty = String(ty);

			if (questions.lines[i][j] === ty) {

				if (!vanna.isMoving) vanna.setGoTo(j * 47 + 290);
				if (ty >= 13) {
					xOff = ty - 13;
					yOff = 1;
				} else {
					xOff = ty;
					yOff = 0;
				}

				tempCtx.drawImage(letters, xOff * 40, yOff * 40, 40, 40, 0, 0, 40, 40);
				var data = tempCanvas.toDataURL();
				letter.src = data;
				lett.push({ x: j, y: i, nb: ty, scaleX: 100 })
			}
		}
	}
	
	if (vanna.goTo === 0 && vanna.isMoving) {
		animate(lett, ctx);
	} else {
		canPress = true;
	}
}


function animate(lett, ctx) {

	if (vanna.rowToFlip === undefined) vanna.setToFlip(lett[0].y);

	lett.forEach((le, i) => {

		questions.lines[le.y][le.x] = "";

		draw(337 + 47 * le.x, 71 + 47 * le.y, le.scaleX / 100, ctx);

		le.scaleX += scaleDirection * scaleDelta;
		if (le.scaleX > -100) {
			scaleDirection *= 1;
			le.scaleX += scaleDirection * scaleDelta;
		} else {
			questions.answers[le.y][le.x] = le.nb;
			if(vanna.isStanding) vanna.reset(), canPress = true;
		}

	});

}

function draw(x, y, scaleX, ctx) {

	ctx.save();
	ctx.translate(x + 20, y + 20);
	ctx.scale(scaleX, 1);
	if (scaleX >= 0) {
		ctx.drawImage(maskedL, -letter.width / 2, -letter.height / 2);
	} else {
		ctx.drawImage(letter, -maskedL.width / 2, -maskedL.height / 2);
	}
	ctx.restore();
}



export { playWheelGame };