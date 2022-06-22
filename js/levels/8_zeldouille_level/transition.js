import { zelda, map } from "./script.js";
import { mainMap } from "./maps.js";
import { monsterMayem } from "./monsters/ghouls.js";
import { Gannon } from "./monsters/gannon.js";

var hasGameStarted = false;
var tickCount = 0;

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

  if (zelda.isEnteringCave === true) {
    monsterMayem();
    tickCount++;
    if (tickCount < 100) {
      zelda.isMoving = true;
      zelda.y += 0.32;
      ctx.fillStyle = "rgb(116,116,116)";
      zelda.cave === 9 ? ctx.fillRect(200, 72, 32, 32) : ctx.fillRect(488, 232, 32, 32);
    }
    else if (tickCount >= 100 && tickCount < 126) {
      ctx.fillStyle = "black";
      ctx.fillRect(8, 8, 896, 384);
      map.actual = zelda.cave;
      zelda.x = 440;
      zelda.y = 324;
      if (map.actual === 10) {
        map.gannon = new Gannon(ctx);
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
    zelda.cave === 9 ? ctx.fillRect(200, 72, 32, 32) : ctx.fillRect(488, 232, 32, 32);
    tickCount++;
    if (tickCount < 26) {
      ctx.fillStyle = "black";
      ctx.fillRect(8, 8, 896, 384);
      zelda.cave === 9 ? map.actual = 3 : map.actual = 1;
      zelda.cave === 9 ? zelda.x = 200 : zelda.x = 488;
      zelda.cave === 9 ? zelda.y = 72 : zelda.y = 232;
    }
    else if (tickCount >= 26 && tickCount < 126) {
      zelda.isMoving = true;
      zelda.y -= 0.32;
    }
    else {
      zelda.cave === 9 ? zelda.x = 200 : zelda.x = 488;
      zelda.isMoving = false;
      zelda.isExitingCave = false;
      tickCount = 0;
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
}

export { drawTransition }
