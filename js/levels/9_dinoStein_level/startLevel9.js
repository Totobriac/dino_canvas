import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Map } from "./map.js";
import { RayCaster } from "./rayCaster.js";
import { drawSprites } from "./sprite.js";
import { Hud } from "./hud.js";
import { Weapon } from "./weapons.js";
import { drawMini, generateMonsters } from "./init.js";
import { SoundPlayer } from "./sound.js";


var map;
var player;
var controls;
var rayCaster;
var hud;
var soundPlayer;
var miniMap;
var weapon;


export function startLevel(game, ctx) {

  ctx.globalAlpha = 1;
  
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

  soundPlayer.mainTheme();  
  ctx.beginPath();
  ctx.moveTo(600, 0);
  ctx.lineTo(600, 400)
  ctx.stroke();
  hud.draw(map.spritesList, miniMap);
  map.update();
  rayCaster.draw();
  drawSprites(map);
  player.update();
  weapon.draw();
}

export { player, map, soundPlayer };
