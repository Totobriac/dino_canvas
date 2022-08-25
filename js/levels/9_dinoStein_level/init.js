import { Sprite } from "./sprite.js";
import { Enemy } from "./enemy.js";
import { sound } from "./sound.js";

var items = new Image();
items.src = "./assets/9_dinoStein/items2.png";

var guard = new Image();
guard.src = "./assets/9_dinoStein/guard.png";

var officer = new Image();
officer.src = "./assets/9_dinoStein/officer.png";

var dog = new Image();
dog.src = "./assets/9_dinoStein/dog.png";

var boss1 = new Image();
boss1.src = "./assets/9_dinoStein/barnacle2.png";

var boss2 = new Image();
boss2.src = "./assets/9_dinoStein/FettGesicht.png";

var boss3 = new Image();
boss3.src = "./assets/9_dinoStein/uberZombi.png";

var painSound = new sound("/assets/9_dinoStein/sounds/nme_pain2.mp3");
var dogHitSound = new sound("/assets/9_dinoStein/sounds/dog_hit.mp3");

var achtungSound = new sound("/assets/9_dinoStein/sounds/achtung.mp3");
var alarmSound = new sound("/assets/9_dinoStein/sounds/guard_alarm.mp3");
var spionSound = new sound("/assets/9_dinoStein/sounds/spia.mp3");
var barkingSound = new sound("/assets/9_dinoStein/sounds/dog_barking.mp3");
var boss1Shout = new sound("/assets/9_dinoStein/sounds/ach_so.mp3");
var boss2Shout = new sound("/assets/9_dinoStein/sounds/erlauben_sie.mp3");
var boss3Shout = new sound("/assets/9_dinoStein/sounds/zombi_intro.mp3");


var enemyShootingSound = new sound("/assets/9_dinoStein/sounds/enemy_shooting2.mp3");
var bossShootingSound = new sound("/assets/9_dinoStein/sounds/boss_firing.mp3")
var dogBittingSound = new sound("/assets/9_dinoStein/sounds/dog_barking_2.mp3");

var mummySound = new sound("/assets/9_dinoStein/sounds/death_mami.mp3");
var lebenSound = new sound("/assets/9_dinoStein/sounds/death_mein_leben.mp3");
var dyingDogSound = new sound("./assets/9_dinoStein/sounds/dog_death.mp3");
var boss1Dies = new sound ("./assets/9_dinoStein/sounds/wenn_schon.mp3");
var boss2Dies = new sound("./assets/9_dinoStein/sounds/rosebund.mp3");
var boss3Dies = new sound("./assets/9_dinoStein/sounds/zombi_dead.mp3");

var floorData;

var tempCanvas = document.createElement('canvas');
var tempCtx = tempCanvas.getContext('2d');
tempCanvas.width = 576;
tempCanvas.height = 128;

var tempCanvas2 = document.createElement('canvas');
var tempCtx2 = tempCanvas2.getContext('2d');
tempCanvas2.width = 192;
tempCanvas2.height = 240;

var floorSprite = new Image();

floorSprite.onload = function () {
  tempCtx.drawImage(floorSprite, 0, 0);
  floorData = tempCtx.getImageData(0, 0, 576, 128);
}

floorSprite.src = "./assets/9_dinoStein/floor.png";


function drawMini(map) {
  for (let y = 0; y < map.mapY; y++) {
    for (let x = 0; x < map.mapX; x++) {
      var color;
      map.wall[y][x] != 0 ? color = "grey" : color = "rgb(235,203,152)";
      tempCtx2.fillStyle = color;
      var Xo = x * 6;
      var Yo = y * 6;
      tempCtx2.fillRect(Xo, Yo, 6, 6);
    }
  }
  return tempCanvas2
}

function doorsList(mapX, mapY,map) {
  var doors = [];
  for (let y = 0; y < mapY; y++) {
    for (let x = 0; x < mapX; x++) {
      if (map[y][x] == 24) {
        doors.push({
          x: x,
          y: y,
          status: 2,
          yOffset: 0
        });
      }
    }
  }
  return doors
}

function getSpritesList(mapX, mapY, mapSprites, player, ctx) {
  var sprites = [];
  var index = 0;
  for (let i = 0; i < mapY; i++) {
    for (let j = 0; j < mapX; j++) {
      if (mapSprites[i][j] != 0) {
        index++;
        sprites[index] = new Sprite((j * 64) + 32, (i * 64) + 32, eval(items), parseInt(mapSprites[i][j]), player, false, ctx);
      }
    }
  }  
  return sprites
}

function generateMonsters(map) {
  var index = map.spritesList.length - 1;
  for (let i = 0; i < map.mapY; i++) {
    for (let j = 0; j < map.mapX; j++) {
      if (map.monsters[i][j] != 0 && map.monsters[i][j] != 88) {
        var monster;
        var alarmSound;
        var hitSound;
        var shootSound;
        var dieSound;
        switch (map.monsters[i][j]) {
          case 1:
            monster = "guard";
            alarmSound = achtungSound;
            hitSound = painSound;
            shootSound = enemyShootingSound;
            dieSound = mummySound;
            break;
          case 2:
            monster = "officer";
            alarmSound = spionSound;
            hitSound = painSound;
            shootSound = enemyShootingSound;
            dieSound = lebenSound;
            break;
          case 3:
            monster = "dog";
            alarmSound = barkingSound;
            hitSound = dogHitSound;
            shootSound = dogBittingSound;
            dieSound = dyingDogSound;
            break;
          case 4:
            monster = "boss1";
            alarmSound = boss1Shout;
            hitSound = painSound;
            shootSound = bossShootingSound;
            dieSound = boss1Dies;
            break;
          case 5:
            monster = "boss2";
            alarmSound = boss2Shout;
            hitSound = painSound;
            shootSound = bossShootingSound;
            dieSound = boss2Dies;
            break;
          case 6:
            monster = "boss3";
            alarmSound = boss3Shout;
            hitSound = painSound;
            shootSound = bossShootingSound;
            dieSound = boss3Dies;
            break;
        }
        index++;
        map.spritesList[index] = new Enemy((j * 64) + 32, (i * 64) + 32, eval(monster), 0, map.player, false, map.ctx, map, monster, alarmSound, hitSound, shootSound, dieSound);
      }
    }
  }
}

export { floorData, drawMini, doorsList, getSpritesList, generateMonsters };
