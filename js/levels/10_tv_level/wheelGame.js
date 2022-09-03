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

window.addEventListener('keydown', function (e) {
	key = e.key;
})

var questions =
{
	lines: [["", "", "", "", "", "", "", "", "", "", ""],
	["", "", "21", "8", "13", "2", "4", "13", "19", "", ""],
	["", "", "", "2", "0", "8", "11", "11", "24", "", ""],
	["", "", "", "", "", "", "", "", "", "", ""]
	]
}


var wheelTick = 0;
var wheelFrame = 0;
var maxTickCount = 8;

var wheelTurns = 0;

function playWheelGame(ctx) {

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

				ctx.drawImage(letters, xOff * 40, yOff * 40, 40, 40, 337 + 47 * j, 71 + 47 * i, 40, 40);
			}
		}
	}
}

function flipCard(ctx) {

	var xOff = 2;
	var yOff = 0;

	var tempCanvas = document.createElement('canvas');
	var tempCtx = tempCanvas.getContext('2d');
	tempCanvas.width = 40;
	tempCanvas.height = 40;
	tempCtx.drawImage(letters, xOff * 40, yOff * 40, 40, 40, 0, 0, 40, 40);
	var data = tempCanvas.toDataURL();
	var letter = new Image();
	letter.src = data;

	if (key) {
		var ty = key.charCodeAt(0) - 97;
	}

	for (let i = 0; i < questions.lines.length; i++) {
		for (let j = 0; j < questions.lines[i].length; j++) {
			if (questions.lines[i][j] === String(ty)) {
				questions.lines[i][j] = "";
			}
		}
	}

}

export { playWheelGame };