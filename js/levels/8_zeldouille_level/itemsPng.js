import { map } from "./script.js";
import { mainMap } from "./maps.js";
import { getTile } from "./functions.js";

import { Gannon } from "./monsters/gannon.js";


var sprites = new Image();
sprites.src = "../assets/8_zeldouille/sprites.png";

var tickCount = 0;
var textTickCount = 0;
var maxTextTickCount = 5;
var maxTickCount = 12;
var frame = 0;
var index = 0;

function displayItemsPng(ctx) {
  tickCount++;
  textTickCount++;
  if (mainMap[map.actual].itemsPng) {
    for (let i = 0; i < mainMap[map.actual].itemsPng.length; i++) {
      if (mainMap[map.actual].itemsPng[i].frames) {
        if (tickCount > maxTickCount) {
          tickCount = 0;
          frame === 0 ? frame = 1 : frame = 0
        }
        mainMap[map.actual].itemsPng[i].img = mainMap[map.actual].itemsPng[i].frames[frame];
      }
      var sprite = getTile(mainMap[map.actual].itemsPng[i].img);
      ctx.drawImage(
        sprites,
        sprite[1],
        sprite[0],
        16,
        16,
        mainMap[map.actual].itemsPng[i].x,
        mainMap[map.actual].itemsPng[i].y,
        32,
        32
      );
    }
  }
    if (mainMap[map.actual].text && !mainMap[map.actual].hasEntered) {
      if (textTickCount > maxTextTickCount) {
        textTickCount = 0;
        if (index < mainMap[map.actual].text.content.length) index++
      }
      for (let i = 0; i < index; i++) {
        ctx.font = "30px pixel";
        ctx.fillStyle = mainMap[map.actual].text.color;
        var breakLine = [];
        i < mainMap[map.actual].text.lineBreak ? breakLine = [0, 0] : breakLine = [450, 24];
        ctx.fillText(mainMap[map.actual].text.content[i], mainMap[map.actual].text.x + i * 25 - breakLine[0], mainMap[map.actual].text.y + breakLine[1]);
      }
    }
    if (mainMap[map.actual].objects) {
      for (let i = 0; i < mainMap[map.actual].objects.length; i++) {
        var sprite = getTile(mainMap[map.actual].objects[i].img);
        ctx.drawImage(
          sprites,
          sprite[1],
          sprite[0],
          16,
          16,
          mainMap[map.actual].objects[i].x,
          mainMap[map.actual].objects[i].y,
          32,
          32
        );
      }
    }

}

function resetTextIndex() {
  index = 0;
}

export { displayItemsPng, resetTextIndex };
