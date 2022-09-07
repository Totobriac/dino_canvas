import { Vanna } from "./vanna.js";
import { questionList } from "./questionList.js";
import { soundPlayer } from "./sounds.js";
import { start2 } from "./startLevel10.js";

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
var scaleDelta = 1;

var canPress = true;

var wheelTick = 0;
var wheelFrame = 0;
var maxTickCount = 8;

var wheelTurns = 0;
var vanna;
var isPlaying = true;

var solved = false;
var index = 0;
var questions;

var count = 0;
var ty = null;


window.addEventListener('keydown', function (e) {
	soundPlayer(4);
	solved = false;
	if (canPress && hasStarted) {
		lett = [];
		key = e.key;
		canPress = false;
		vanna.stopClap();
	}
	hasStarted = true;
})

var hasStarted = false;

function playWheelGame(ctx) {

	questions = questionList[index];

	if (!vanna) {
		vanna = new Vanna(272, 95, ctx);
		soundPlayer(3);
	}

	if (wheelTick > maxTickCount) {
		wheelTick = 0;
		wheelFrame < 2 ? wheelFrame++ : wheelFrame = 0;
		wheelTurns++;
	} else {
		wheelTick++;
	}

	if (wheelTurns < 24) {
		ctx.drawImage(titleSprite, 240, 0);
		ctx.drawImage(wheelSprite, wheelFrame * 700, 0, 700, 214, 250, 186, 700, 214);
	} else if (wheelTurns < 46) {
		ctx.drawImage(starringSprite, 240, 0);
	} else if (!hasStarted) {
		ctx.drawImage(vannaSprite, 240, 0);
		ctx.save();
		ctx.fillStyle = "white";
		ctx.font = "26px Dos";
		ctx.fillText("Pour participer,", 600, 244);
		ctx.fillText("utilisez votre clavier", 600, 270);

		if (wheelFrame === 1) ctx.fillText("APPUYEZ SUR UNE TOUCHE", 600, 340);
		ctx.restore();
	} else {
		ctx.drawImage(backSprite, 240, 0);

		index != 6 ? drawQuestion(ctx) : endAnimation(ctx), start2();

		flipCard(ctx);
		vanna.draw();

		drawTxt(ctx);
	}
}


function drawQuestion(ctx) {
	count = 0
	for (let i = 0; i < questions.lines.length; i++) {
		for (let j = 0; j < questions.lines[i].length; j++) {
			if (questions.lines[i][j] != "") {
				count++
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
	count === 0 ? isPlaying = false : isPlaying = true;
}

function flipCard(ctx) {
	var xOff;
	var yOff;
	var tempCanvas = document.createElement('canvas');
	var tempCtx = tempCanvas.getContext('2d');
	tempCanvas.width = 40;
	tempCanvas.height = 40;

	if (key) {
		ty = key.charCodeAt(0) - 97;
	}

	for (let i = 0; i < questions.lines.length; i++) {
		for (let j = 0; j < questions.lines[i].length; j++) {
			ty = String(ty);

			if (questions.lines[i][j] === ty) {

				if (!vanna.isMoving && !vanna.isClapping) {
					vanna.setGoTo(j * 47 + 290);
					soundPlayer(0);
				}
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
		if (!canPress && !vanna.isMoving && !vanna.isClapping) soundPlayer(1);
		vanna.isMoving && !solved ? canPress = false : canPress = true;
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
			le.scaleX = -100;
			questions.answers[le.y][le.x] = le.nb;
			if (vanna.isStanding) {
				if (isPlaying) {
					vanna.reset();
					canPress = true;
				} else {
					vanna.reset();
					vanna.clap();

					switchQuestion(ctx);

				}
			}
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

function drawTxt(ctx) {
	ctx.font = "30px Dos";
	var width = ctx.measureText(questions.question);
	var v = width.width
	var x = 250 + (655 - v) / 2;
	ctx.fillText(questions.question, x, 344);
}

function switchQuestion(ctx) {
	if (!solved) {
		index++
		if (index === 6) {
			vanna.exit();
		}
		solved = true;
		canPress = true;
		soundPlayer(2);
	}
}

var contact = [
	["", "", "", "2", "14", "13", "19", "0", "2", "19", ""],
	["", "", "", "", "", "", "25", "", "", "", "", "", ""],
	["21", "8", "13", "2", "4", "13", "19", "2", "0", "8", "11", "11", "24"],
	["", "", "", "", "22", "2", "14", "12", "", "", ""],
]

var offset = 0;

function endAnimation(ctx) {

	if (offset < 40) offset += 0.4;

	for (let i = 0; i < contact.length; i++) {
		for (let j = 0; j < contact[i].length; j++) {

			if (contact[i][j] != "") {
				var xOff;
				var yOff;
				if (contact[i][j] >= 13) {
					xOff = contact[i][j] - 13;
					yOff = 1;
				} else {
					xOff = contact[i][j];
					yOff = 0;
				}
				ctx.drawImage(letters, xOff * 40, yOff * 40 + 80, 40, 40, 290 + 47 * j + (40 - offset) / 2, 71 + 47 * i + (40 - offset) / 2, offset, offset)
			}
		}
	}
}


export { playWheelGame };
