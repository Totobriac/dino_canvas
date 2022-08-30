var mapBack = new Image();
mapBack.src = "./assets/9_dinoStein/mapBack.png";

var tableTop = new Image();
tableTop.src = "./assets/9_dinoStein/tableTop.png";

var metalTop = new Image();
metalTop.src = "./assets/9_dinoStein/metalTop2.png";

var weaponIcon = new Image();
weaponIcon.src = "./assets/9_dinoStein/weaponHud.png";

var weaponBorder = new Image();
weaponBorder.src = "./assets/9_dinoStein/weaponBorder.png";

var numbers = new Image();
numbers.src = "./assets/9_dinoStein/numbers.png";

var blackback = new Image();
blackback.src = "./assets/9_dinoStein/black2.png";

var keys = new Image();
keys.src = "./assets/9_dinoStein/keys.png";

var red = new Image();
red.src = "./assets/9_dinoStein/redDot.png";

class Hud {
  constructor(ctx, player, map) {
    this.ctx = ctx;
    this.player = player;
    this.map = map;
    this.soundAngle = 310;
    this.oldWeapon = 0;
    this.wOffset = 0;
    this.lifeGlitch = 0;
    this.oldLife = 100;
  }
  draw(sprites, miniMap) {
    this.ctx.drawImage(tableTop, 0, 0);
    this.ctx.drawImage(metalTop, 900, 0);

    this.drawMinimap(this.map.spritesList, miniMap);
    this.drawWeaponIcon();
    this.drawLifeMeter();
  }
  drawMinimap(sprites, miniMap) {

    this.ctx.save();
    this.ctx.translate(150, 200);
    this.ctx.rotate(3 * Math.PI / 2 - this.player.angle);

    var playerX = Math.floor(this.player.x / 64 * 6);
    var playerY = Math.floor(this.player.y / 64 * 6);

    this.ctx.drawImage(mapBack, -20 - playerX, -26 - playerY);

    this.ctx.drawImage(miniMap, 0 - playerX, 0 - playerY)

    for (let y = 0; y < this.map.mapY; y++) {
      for (let x = 0; x < this.map.mapX; x++) {
        var color;
        if (this.map.wall[y][x] == 24) {
          var index = this.map.getDoor(x, y);
          this.map.doors[index].status != 0 ? color = "yellow" : color = "rgb(235,203,152)";
          this.ctx.fillStyle = color;
          var Xo = x * 6;
          var Yo = y * 6;
          this.ctx.fillRect(Xo - playerX, Yo - playerY, 6, 6);
        }
      }
    }

    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i] && (sprites[i].type === "enemy"  || sprites[i].type === "boss") && sprites[i].life > 0 ) {
        var X = Math.floor(sprites[i].x / 64);
        var Y = Math.floor(sprites[i].y / 64);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(X * 6 - playerX, Y * 6 - playerY, 4, 4);
      }
    }
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(-2, -2, 4, 4);

    this.ctx.restore();

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 4, 400);
    this.ctx.fillRect(296, 0, 4, 400);
    this.ctx.fillRect(0, 0, 300, 4);
    this.ctx.fillRect(0, 396, 300, 4);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(900, 0, 4, 400);
    this.ctx.fillRect(1196, 0, 4, 400);
    this.ctx.fillRect(900, 0, 300, 4);
    this.ctx.fillRect(900, 396, 300, 4);
  }
  drawWeaponIcon() {
    var diff = this.player.chosenWeapon * 48;

    if (this.wOffset > diff) {
      this.wOffset -= 2;
    } else if (this.wOffset < diff) {
      this.wOffset += 2;
    }

    this.ctx.drawImage(weaponIcon, this.wOffset, 0, 48, 24, 978, 250, 144, 72);

    this.ctx.drawImage(weaponBorder, 967, 247);

    this.ctx.drawImage(red, 969 + this.player.chosenWeapon * 40, 340);
    this.ctx.drawImage(keys,
      0,
      0,
      41 + this.player.discoWeapon * 40,
      40,
      969,
      340,
      41 + this.player.discoWeapon * 40,
      40);


  }
  drawLifeMeter() {
    var digits = this.player.life.toString().split('');
    var numbs = digits.map(Number);
    if (numbs.length < 3) numbs.unshift(0);

    if (this.player.life != this.oldLife) {
      this.lifeGlitch++;
      if (this.lifeGlitch > 7) {
        this.oldLife = this.player.life;
        this.lifeGlitch = 0
      }
    }

    var yOffset = -120;
    var xOffset = 30;

    this.ctx.font = "48px wolf";
    this.ctx.fillStyle = "rgb(0,0,164)";
    this.ctx.fillText('Life:', 930, 130);

    this.ctx.drawImage(blackback, 966 + xOffset, 192 + yOffset);
    this.ctx.drawImage(blackback, 1019 + xOffset, 192 + yOffset);
    this.ctx.drawImage(blackback, 1072 + xOffset, 192 + yOffset);

    if (this.lifeGlitch % 2 === 0) {
      this.ctx.drawImage(numbers, numbs[0] * 41, 0, 41, 66, 979 + xOffset, 200 + yOffset, 41, 66);
      this.ctx.drawImage(numbers, numbs[2] * 41, 0, 41, 66, 1085 + xOffset, 200 + yOffset, 41, 66);
    }

    if (this.lifeGlitch % 3 === 0) {
      this.ctx.drawImage(numbers, numbs[1] * 41, 0, 41, 66, 1032 + xOffset, 200 + yOffset, 41, 66);
    }

  }
}

export { Hud };
