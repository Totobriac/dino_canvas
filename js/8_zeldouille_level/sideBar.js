import { map, zelda } from "./script.js";

var itemsSprite = new Image();
itemsSprite.src = "../assets/zeldouille/heart_key.png";

var swordSprite = new Image();
swordSprite.src = "../assets/zeldouille/sword.png";

class SideBar {
  constructor(ctx) {
    this.x = 912;
    this.y = 8;
    this.width = 280;
    this.height = canvas.height - 16;
    this.backColor = "black";
    this.mapColor = "rgb(116,116,116)";
    this.mapOffset = 24;
    this.mapHeight = 120;
    this.ctx = ctx;
    this.hearts = [0, 0, 0, 0];
  }
  draw() {
    this.ctx.fillStyle = this.backColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.fillStyle = this.mapColor;
    this.ctx.fillRect(this.x + this.mapOffset,
      this.height - this.mapHeight - this.mapOffset + 8,
      this.width - this.mapOffset * 2,
      this.mapHeight);

    this.ctx.font = "bold 30px pixel";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText("-LIFE-", 1052, 50);

    var fullHeart = Math.floor(zelda.life / 2);
    var halfHeart = zelda.life - fullHeart * 2;
    var emptyHeart = 4 - fullHeart - halfHeart;
    if (halfHeart === 1) {
      this.hearts.fill(2, 4 - emptyHeart);
      this.hearts.splice(fullHeart, 1, 1)
    } else {
      this.hearts.fill(2, 4 - emptyHeart);
    }

    for (let i = 0; i < this.hearts.length; i++) {
      this.ctx.drawImage(itemsSprite, 28 * this.hearts[i], 0, 28, 32, 990 + i * 31, 80, 28, 32)
    }

    this.ctx.fillStyle = "green";
    var line = Math.floor(map.actual / 3);
    var column = map.actual - line * 3;

    this.ctx.fillRect(this.x + this.mapOffset + (column * 77) + 38,
      this.height - this.mapHeight - this.mapOffset + 28 + (line * 40),
      10,
      10);

    this.ctx.fillStyle = "rgb(51, 51, 153)";
    this.ctx.fillRect(1100, 128, 67, 100);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(1108, 136, 51, 84);

    this.ctx.fillRect(1100, 128, 4, 4);
    this.ctx.fillRect(1163, 128, 4, 4);
    this.ctx.fillRect(1100, 224, 4, 4);
    this.ctx.fillRect(1163, 224, 4, 4);
    this.ctx.fillRect(1122, 118, 22, 22);

    this.ctx.font = "30px pixel";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("A", 1135, 140);


    this.ctx.fillStyle = "rgb(51, 51, 153)";
    this.ctx.fillRect(1020, 128, 67, 100);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(1028, 136, 51, 84);

    this.ctx.fillRect(1020, 128, 4, 4);
    this.ctx.fillRect(1083, 128, 4, 4);
    this.ctx.fillRect(1020, 224, 4, 4);
    this.ctx.fillRect(1083, 224, 4, 4);
    this.ctx.fillRect(1042, 118, 22, 22);

    this.ctx.font = "30px pixel";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("B", 1054, 140);

    this.ctx.drawImage(itemsSprite, 84, 0, 32, 32, 930, 190, 32, 32);
    this.ctx.font = "32px pixel";
    this.ctx.fillStyle = "white";

    var key;
    zelda.hasKey === true ? key = 1 : key = 0;

    this.ctx.fillText("X" + key, 990, 220)

    if (zelda.hasSword) {
      this.ctx.drawImage(swordSprite, 96, 0, 48, 48, 1104, 145, 64, 64);
    }
  }
}

export { SideBar };
