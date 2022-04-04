import { charOffset } from "./dinoAnimation.js";
import { top } from "../../script.js";

const customerSprite = new Image();
customerSprite.src = "./assets/2_restaurant/rest_customers_stupid_air.png";

const cookSprite = new Image();
cookSprite.src = "./assets/2_restaurant/cook.png";

const tableEdgeSprite = new Image();
tableEdgeSprite.src = "./assets/2_restaurant/table_edge.png";

const mustache = {
  frames: 3,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

const lady = {
  frames: 2,
  frameIndex: 0,
  ticksPerFrame: 18,
  tickCount: 0,
}

const bold = {
  frames: 4,
  frameIndex: 0,
  ticksPerFrame: 24,
  tickCount: 0,
}

const cook = {
  frames: 8,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

var isCookFired = false;

function generateCustomers(ctx, left) {

  mustache.tickCount += 1;
  checkFrame(mustache);
  ctx.drawImage(customerSprite, 50 * mustache.frameIndex, 0, 50, 84, -444 + charOffset + left, 210 + top, 60, 101);

  lady.tickCount += 1;
  checkFrame(lady);
  ctx.drawImage(customerSprite, 150 + (50 * lady.frameIndex), 0, 50, 84, -310 + charOffset + left, 212 + top, 60, 101);

  bold.tickCount += 1;
  checkFrame(bold);
  ctx.drawImage(customerSprite, 250 + (50 * bold.frameIndex), 0, 50, 84, 180 + charOffset + left, 210 + top, 60, 101);


  if (!isCookFired) {
    cook.tickCount += 1;
    checkFrame(cook);
    ctx.drawImage(cookSprite, (50 * cook.frameIndex), 0, 50, 100, 1000 + charOffset + left, 155 + top, 60, 120);
  }


  ctx.drawImage(tableEdgeSprite, 208 + charOffset + left, 270 + top, 126, 22);
  ctx.drawImage(tableEdgeSprite, -408 + charOffset + left, 270 + top, 126, 22);
}

function checkFrame(sprite) {
  if (sprite.tickCount > sprite.ticksPerFrame) {
    sprite.tickCount = 0;
    if (sprite.frameIndex < sprite.frames - 1) {
      sprite.frameIndex += 1;
    } else {
      sprite.frameIndex = 0;
    }
  }
}

function fireCook() {
  isCookFired = true;
}

export { generateCustomers, fireCook };
