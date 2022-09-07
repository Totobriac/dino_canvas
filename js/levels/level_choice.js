import { game } from "../script.js";

var choice = new Image();
choice.src = "../assets/lvl_choice.png";

var levels = [];
var selectedLevel;

window.addEventListener('mousedown', function() {
	if (selectedLevel) game.switchLevel(selectedLevel);
});

class Level {
	constructor(level, sprite, ctx) {
		this.column;
		this.line;
		this.level = level;
		this.color = "rgb(230, 230, 230)";
		this.sprite = sprite;
		this.ctx = ctx;
		this.x;
		this.y;
		this.setXY();
	}
	draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.column * 200 + 20, this.line * 200 + 40, 160, 120);
		this.ctx.drawImage(this.sprite, this.column * 160, this.line * 120, 160, 120, this.column * 200 + 20, this.line * 200 + 40, 160, 120)
	}
	setXY() {
		this.line = Math.floor(this.level / 6);
		this.column = this.level - this.line * 6;
		this.x = this.column * 200 + 20;
		this.y = this.line * 200 + 40;
	}
}

function chooseLevel(ctx) {

	var level = parseInt(localStorage.getItem("level"));

	if (!level) {
		game.switchLevel(0)
	} else {

		if (!levels.length) {
			for (let i = 0; i < level; i++) {
				levels.push(new Level(i, choice, ctx))
			}
		}

		levels.forEach(lvl => {
			lvl.draw();
		});

		checkHoveredLvl();
		console.log(selectedLevel);
	}
}

function checkHoveredLvl() {
	var mX = game.mouseMovePosition.x;
	var mY = game.mouseMovePosition.y;

	levels.forEach(lvl => {
		
		if(!collision(mX, mY, lvl.x, lvl.y, 160, 120)) {
			lvl.color = "rgb(230, 230, 230)"
		} else {
			lvl.color = "white";
			selectedLevel = lvl.level;
		}
	});
}

function collision(mX, mY, lvlX, lvlY, lvlW, lvlH) {
	if (mX < lvlX || mX > lvlX + lvlW || mY < lvlY || mY > lvlY + lvlH) {
		return false
	} else {
		return true;
	}
}

export { chooseLevel };