import { Character } from "./class.js";
import * as pics from "./mJPics.js";
import { left, dino } from "../../script.js";

var picsList = [];

for (let i in Object.values(pics)) {
  picsList.push(Object.values(pics)[i])
};

var guybrushSprite = new Image();
guybrushSprite.src = "./assets/2_restaurant/guy.png";

var batmanSprite = new Image();
batmanSprite.src = "./assets/2_restaurant/batman.png";

var jokerSprite = new Image();
jokerSprite.src = "./assets/2_restaurant/joker.png";

var characters = [
  { sprite: guybrushSprite, y: 140, width: 110, height: 151, frames: 6, coef: 0.65 },
  { sprite: batmanSprite, y: 140, width: 70, height: 87, frames: 6, coef: 1.2 },
  { sprite: jokerSprite, y: 140, width: 70, height: 87, frames: 6, coef: 1.2 },
]

var enter = true;
var exit = false;
var entering;
var startToDance;
var exiting;

var dance;
var direction;
var oldDirection;
var isMikiKaKo = false;

var loop = 0;
var mJx = 680;

var passerTick = 0;
var passerby = [];

var position = [
  { pose: pics.moonWalk, frames: 7, width: 40 },
  { pose: pics.moonWalkRight, frames: 7, width: 40 },
  { pose: pics.bend, frames: 3, width: 40 },
  { pose: pics.bendingHat, frames: 3, width: 40 },
  { pose: pics.danceLeft, frames: 15, width: 50 },
  { pose: pics.dance, frames: 15, width: 50 },
  { pose: pics.hat, frames: 8, width: 80 },
  { pose: pics.legUp, frames: 9, width: 50 },
  { pose: pics.salchi, frames: 10, width: 50 },
  { pose: pics.turn, frames: 6, width: 50 },
];

function generateChar(ctx, game, dino) {
  if (dino.state === "isChanged" && !isMikiKaKo) {
    entering = new Character(ctx, game, pics.moonWalk, 1100, 140, -1, 7, 0.2, 40, 67, 2.2);
    exiting = new Character(ctx, game, pics.moonWalk, mJx, 140, -1, 7, 0.2, 40, 67, 2.2);
    isMikiKaKo = true;
  }

  if (dino.state === "done") exit = true;

  if (isMikiKaKo) {

    if (enter) entering.updateChar();

    if (entering.x < 680) {
      enter = false;
      startToDance = true;
    }
    if (startToDance && !exit) {
      if (loop > 0) {
        dance.updateChar();
        if (dance.frameIndex === dance.frames - 1) loop--;
      } else {
        if (dance) mJx = dance.x;
        poseChange(ctx, game);
      }
    }
    if (exit) {
      if (exiting.x > 0) exiting.updateChar();
    }
  }
  generatePasserby(ctx, game);
}

function poseChange(ctx, game) {
  var pose = Math.floor(Math.random() * 9);
  loop = 1 + Math.floor(Math.random() * 2);

  if (pose != 0 && pose != 1) {
    direction = 0;
  } else {
    if (direction === 0) {
      oldDirection === 1 ? oldDirection = -1 : oldDirection = 1;
      direction = oldDirection;
    }
    else {
      direction === 1 ? direction = -1 : direction = 1;
    }
  }
  dance = new Character(ctx, game, position[pose].pose, mJx, 140, direction, position[pose].frames, 0.2, position[pose].width, 67, 2.2);
}

function generatePasserby(ctx, game) {
  if (passerTick <= 0 && dino.state != "isSweeping" && dino.state != "comingBack") {
    passerTick = Math.floor(Math.random() * 1000) + 600;
    var char = characters[Math.floor(Math.random() * 3)];
    passerby.push(new Character(ctx, game, char.sprite, 0, 140, 1, char.frames, 0.2, char.width, char.height, char.coef))
  } else {
    passerTick--;
  }
  passerby.forEach(passer => {
    if( passer.x < left + 1200)
    passer.updateChar();
  });
}

export { generateChar };
