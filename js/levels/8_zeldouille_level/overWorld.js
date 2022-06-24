import { mainMap } from "./maps.js";
import { getObstaclesList, getTile } from "./functions.js";
import { map } from "./script.js";
import { displayItemsPng } from "./itemsPng.js";
import { Octorok } from "./monsters/octorok.js";
import { Moblin } from "./monsters/moblin.js";
import { Zora } from "./monsters/zora.js";
import { Lynel } from "./monsters/lynel.js";
import { playSound } from "./music.js";


var tiles = new Image();
tiles.src = "../assets/8_zeldouille/sprites.png";

var gannonCave = new Image();
gannonCave.src = "../assets/8_zeldouille/gannon_cave.png";

var mansionSprite = new Image();
mansionSprite.src = "../assets/8_zeldouille/mansion.png";

function drawTiles(ctx) {

  if (map.actual === 10) {
    map.ganon.life > 0 ? playSound(10) : playSound(13);
    ctx.fillStyle = "black";
    ctx.fillRect(8, 8, 896, 384);
    ctx.drawImage(gannonCave, 0, 0, 256, 176, 200, 40, 512, 352);
    map.obstacles = getObstaclesList(mainMap[10]);
  } else {
    map.obstacles = getObstaclesList(mainMap[map.actual]);

    map.upDown === 8 ? map.xOffset += map.direction : map.yOffset += map.direction;

    map.actual != 9 ? ctx.fillStyle = "rgb(116,116,116)" : ctx.fillStyle = "black";

    ctx.fillRect(8, 8, 896, 384);

    for (let i = 0; i < map.mapTiles; i++) {
      var selectedTile = getTile(mainMap[map.actual].bluePrint[i]);
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
        Math.floor(column * 32 + 8 + map.xOffset), Math.floor(line * 32 + 8 + map.yOffset), 32, 32);
      if (map.actual === 2) ctx.drawImage(mansionSprite, 0, 0, 178, 200, 600 + map.xOffset, -28 + map.yOffset, 178, 200)

      if (map.newMap != undefined) {
        var selectedTile = getTile(mainMap[map.newMap].bluePrint[i]);
        var line = Math.floor(i / 28);
        var column = i - (line * 28);
        ctx.drawImage(tiles, selectedTile[1], selectedTile[0], 16, 16,
          Math.floor(column * 32 + 8 - map.zob + map.leftRight + map.xOffset), Math.floor(line * 32 + map.upDown + map.yOffset), 32, 32);
        if (map.newMap === 2) ctx.drawImage(mansionSprite, 0, 0, 178, 200, 600 + map.xOffset + map.leftRight, -36 + map.yOffset + map.upDown, 178, 200);
      }
      if (map.yOffset === 390 || map.yOffset === -390) {
        map.zobi = false;
        map.yOffset = 0;
        map.actual = map.newMap;
        map.direction = 0;
        map.monsters = spawnMonsters(mainMap[map.actual], ctx);
        if (mainMap[map.actual].hasWater) map.zora = spawnZora(mainMap[map.actual].bluePrint, ctx);
      }
      if (map.xOffset === 888 || map.xOffset === -896) {
        map.zobi = false;
        map.xOffset = 0;
        map.actual = map.newMap;
        map.direction = 0;
        map.monsters = spawnMonsters(mainMap[map.actual], ctx);
        if (mainMap[map.actual].hasWater) map.zora = spawnZora(mainMap[map.actual].bluePrint, ctx);
      }
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, 8);
    ctx.fillRect(0, 392, canvas.width, 8);
    ctx.fillRect(0, 0, 8, canvas.height);
    ctx.fillRect(904, 0, 296, canvas.height);
  }

  displayItemsPng(ctx);

}

function spawnMonsters(map, ctx) {
  var monsters = [];
  var monstersNb = 0;
  for (let i = 0; i < map.monsterList.length; i++) {
    monstersNb += map.monsterList[i].nb;

    while (monsters.length < monstersNb) {
      var type = map.monsterList[i].type;
      switch (type) {
        case "Octorok":
          var monster = new Octorok(map, [1, 1, 1, 1], ctx, 1);
          if (map.bluePrint[monster.index] === 2) monsters.push(monster);
          break;
        case "Moblin":
          var monster = new Moblin(map, [1, 1, 1, 1], ctx, 0.75);
          if (map.bluePrint[monster.index] === 2) monsters.push(monster);
          break;
        case "Lynel":
          var monster = new Lynel(map, [1, 1, 1, 1], ctx, 1.25);
          if (map.bluePrint[monster.index] === 2) monsters.push(monster);
          break;
      }
    }
  }
  return monsters;
}

function spawnZora(map, ctx) {
  var waterTiles = [];
  for (let i = 0; i < map.length; i++) {
    if ([24, 25, 26, 30, 31, 32, 36, 37, 38].includes(map[i])) {
      var line = Math.floor(i / 28);
      var column = i - (line * 28);
      waterTiles.push({
        x: column * 32 + 8,
        y: line * 32 + 8
      });
    }
  }
  var zoraCoord = waterTiles[Math.floor(Math.random() * waterTiles.length)];
  var zora = new Zora(zoraCoord.x, zoraCoord.y, waterTiles, ctx);
  return zora;
}

export { drawTiles };
