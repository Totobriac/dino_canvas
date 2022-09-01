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

	if (wheelTurns < 20) {
		ctx.drawImage(titleSprite, 240, 0);
		ctx.drawImage(wheelSprite, wheelFrame * 700, 0, 700, 214, 250, 186, 700, 214);
	} else if (wheelTurns < 26) {
		ctx.drawImage(starringSprite, 240, 0);
	} else if (wheelTurns < 36) {
		ctx.drawImage(vannaSprite, 240, 0);
	} else {
		ctx.drawImage(backSprite, 240, 0);
		ctx.fillRect(800, 200, 30, 150)
	}

}

export { playWheelGame };