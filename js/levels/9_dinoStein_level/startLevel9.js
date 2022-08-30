import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Map } from "./map.js";
import { RayCaster } from "./rayCaster.js";
import { drawSprites } from "./sprite.js";
import { Hud } from "./hud.js";
import { Weapon } from "./weapons.js";
import { drawMini, generateMonsters } from "./init.js";
import { SoundPlayer } from "./sound.js";

var circleD = 0;
var start = false;

var map;
var player;
var controls;
var rayCaster;
var hud;
var soundPlayer;
var miniMap;
var weapon;

var arrowsKeys = new Image();
arrowsKeys.src = "./assets/8_zeldouille/arrows.png";

window.addEventListener('keydown', function(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft" ||
    e.key === "ArrowUp" || e.key === "ArrowDown") {
    startGame();
  }
})


export function startLevel(game, ctx) {

  ctx.globalAlpha = 1;

  if (circleD < 60 && !start) circleD += 0.5;
  if (circleD >= 0.5 && start) circleD -= 0.5;
  if (circleD === 0 && start) game.start = true;

  ctx.drawImage(arrowsKeys, 544, 150, 176 * 0.65, 124 * 0.65);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(602, 203, circleD, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  if (!game.loadedLevel[9]) {

    map = new Map(ctx);

    miniMap = drawMini(map);

    player = new Player(1000, 1365, map, ctx);
    controls = new Controls(player, map);
    rayCaster = new RayCaster(player, map, ctx);
    hud = new Hud(ctx, player, map);
    soundPlayer = new SoundPlayer();

    Map.prototype.player = player;
    map.initSprites();

    generateMonsters(map);
    weapon = new Weapon(ctx, player, map);

    game.loadedLevel[9] = true;
  }

  if (game.start) {
    soundPlayer.mainTheme();
    hud.draw(map.spritesList, miniMap);
    map.update();
    rayCaster.draw();
    drawSprites(map);
    player.update();
    weapon.draw();
  }
}

function startGame() {
  start = true;
};

export { player, map, soundPlayer };
