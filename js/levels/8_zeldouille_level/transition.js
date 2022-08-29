import { zelda, map, setMainMusic, removeDeath } from "./script.js";
import { mainMap } from "./maps.js";
import { monsterMayem } from "./monsters/ghouls.js";
import { Ganon } from "./monsters/ganon.js";
import { playSound } from "./music.js";
import { spawnZora, spawnMonsters } from "./overWorld.js";

var fairySprite = new Image();
fairySprite.src = "./assets/8_zeldouille/fairy2.png";

var hasGameStarted = false;
var tickCount = 0;
var fairyTickCount = 0;
var fairy = false;
var maxTickCount = 8;
var fairyAnim = 0;
var heartsAngle = [0, 40, 80, 120, 160, 200, 240, 280, 320];

function drawTransition(ctx) {
  if (hasGameStarted === false) {
    tickCount++;
    if (tickCount < 200) {
      var xOffset = tickCount * 3;
      ctx.fillStyle = "white";
      ctx.fillRect(8, 8, 600 - xOffset, 384);
      ctx.fillRect(600 + xOffset, 8, 600 - xOffset, 384);
    }
    else {
      hasGameStarted = true;
      tickCount = 0;
    }
  }

  if (zelda.isEnteringCave) {
    monsterMayem();
    tickCount++;
    if (tickCount < 100) {
      zelda.isMoving = true;
      zelda.y += 0.36;
      ctx.fillStyle = "rgb(116,116,116)";
      zelda.cave === 9 ? ctx.fillRect(200, 72, 32, 36) : ctx.fillRect(488, 232, 32, 36);
    }
    else if (tickCount >= 100 && tickCount < 126) {
      ctx.fillStyle = "black";
      ctx.fillRect(8, 8, 896, 384);
      map.actual = zelda.cave;
      zelda.x = 440;
      zelda.y = 324;
      if (map.actual === 10) {
        map.ganon = new Ganon(ctx);
      }
    }
    else if (tickCount >= 126 && tickCount < 166) {
      zelda.isMoving = true;
      zelda.y--;
    }
    else {
      zelda.isEnteringCave = false;
      zelda.isMoving = false;
      tickCount = 0;
    }
  }

  if (zelda.isExitingCave) {
    ctx.fillStyle = "rgb(116,116,116)";
    zelda.cave === 9 ? ctx.fillRect(200, 72, 32, 32) : ctx.fillRect(488, 232, 32, 36);
    tickCount++;
    if (tickCount < 26) {
      ctx.fillStyle = "black";
      ctx.fillRect(8, 8, 896, 384);
      zelda.cave === 9 ? map.actual = 3 : map.actual = 1;
      zelda.cave === 9 ? zelda.x = 200 : zelda.x = 488;
      zelda.cave === 9 ? zelda.y = 76 : zelda.y = 238;
    }
    else if (tickCount >= 26 && tickCount < 126) {
      zelda.isMoving = true;
      zelda.y -= 0.36;
    }
    else {
      zelda.cave === 9 ? zelda.x = 200 : zelda.x = 488;
      zelda.isMoving = false;
      zelda.isExitingCave = false;
      tickCount = 0;
      setMainMusic(1);
    }
  }

  if (zelda.isGrabingSword) {
    mainMap[map.actual].objects.splice(0, 1);
    tickCount++;
    if (tickCount > 76) {
      zelda.isGrabingSword = false;
      zelda.hasSword = true;
      tickCount = 0;
    }
  }

  if (fairy) {
    playSound(20);
    zelda.isHealing = true;
    if (fairyTickCount > maxTickCount) {
      fairyTickCount = 0;
      fairyAnim === 0 ? fairyAnim = 1 : fairyAnim = 0;
    } else {
      fairyTickCount++;
    }
    ctx.drawImage(fairySprite, 16 * fairyAnim, 0, 16, 32, 440, 100, 20, 40);

    for (let i = 0; i < heartsAngle.length; i++) {
      heartsAngle[i]+= 1.5;
      ctx.save();
      ctx.translate(440, 192);
      ctx.rotate(-Math.PI / 180 * heartsAngle[i]);
      ctx.translate(120, 120);
      ctx.rotate(Math.PI / 180 * heartsAngle[i]);
      ctx.drawImage(fairySprite, 32, 0, 28, 32, 0, 0, 28, 32);
      ctx.restore();
    }

    if (zelda.life === 8) {
      fairy = false;
      zelda.isDead = false;
      zelda.totalAnim = 0;
      map.actual === 10 ? playSound(10) : setMainMusic(1);
      removeDeath();
      resetMonsters(ctx);
    }
  }
}

function callFairy() {
  fairy = true;
}

function resetMonsters(ctx) {
  map.monsters = spawnMonsters(mainMap[map.actual], ctx);
  if (mainMap[map.actual].hasWater) map.zora = spawnZora(mainMap[map.actual].bluePrint, ctx);
}

export { drawTransition, callFairy }
