import { mainMap } from "./maps.js";
import { collChecker } from "./functions.js";
import { monsterMayem } from "./monsters/ghouls.js";

class Map {
  constructor() {
    this.actual = 3;
    this.obstacles;
    this.monsters = [];
    this.zora;
    this.gannon;
    this.missiles = [];
    this.newMap;
    this.xOffset = 0;
    this.yOffset = 0;
    this.mapTiles = 336;
    this.direction = 0;
    this.upDown = 392;
    this.leftRight = 904;
    this.zob = 0;
    this.zobi = false;
  }

  moveDown() {
    this.zobi = true;
    this.newMap = this.nextMap(0);
    this.direction = -2;
    this.upDown = 392;
    this.leftRight = 0;
    this.xOffset = 0;
    this.zob = 0;
    monsterMayem();
  }
  moveUp() {
    this.zobi = true;
    this.newMap = this.nextMap(1);
    this.direction = 2;
    this.upDown = -376;
    this.leftRight = 0;
    this.xOffset = 0;
    this.zob = 0;
    monsterMayem();
  }
  moveRight() {
    this.zobi = true;
    this.newMap = this.nextMap(2);
    this.direction = -4;
    this.upDown = 8;
    this.leftRight = 904;
    this.yOffset = 0;
    this.zob = 8;
    monsterMayem();
  }
  moveLeft() {
    this.zobi = true;
    this.newMap = this.nextMap(3);
    this.direction = 4;
    this.upDown = 8;
    this.leftRight = -888;
    this.yOffset = 0;
    this.zob = 0;
    monsterMayem();
  }
  nextMap(side) {
    switch (side) {
      case 0:
        return (this.actual + 3);
      case 1:
        return (this.actual - 3);
      case 2:
        return this.actual + 1;
      case 3:
        return this.actual - 1;
    }
  }
}

function checkAction(x, y, map) {

  if (mainMap[map].objects) {
    var objectInteraction = collChecker(x, y, mainMap[map].objects)
    if (objectInteraction.isColliding === true && map === 9) {
      return 6;
    };
  }
  var actualTile = getActualTile(x, y);

  if (mainMap[map].bluePrint[actualTile] === 10 && map === 3) {
    return (4);
  }
  if (mainMap[map].bluePrint[actualTile] === 10 && map === 9) {
    return (5);
  }
  if (mainMap[map].bluePrint[actualTile] === 10 && map === 1) {
    return (7);
  }
  if (mainMap[map].bluePrint[actualTile] === 10 && map === 10) {
    return (8);
  }
  if (mainMap[map].bluePrint[actualTile] === 10 && map === 2) {
    return (9);
  }
  if (mainMap[map].bluePrint[actualTile] === 2 && map === 2) {
    return (10);
  }
  if (x < 40) {
    return (0);
  }
  if (x > 840) {
    return (1);
  }
  if (y < 40) {
    return (2);
  }
  if (y > 328) {
    return (3);
  }
  else return undefined
}


function getActualTile(x, y) {
  var line = Math.floor((y - 8) / 32);
  var column = Math.floor((x - 8) / 32);
  return (line * 28) + column;
}

export { Map, checkAction, };
