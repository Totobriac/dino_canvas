import { zelda } from "./script.js";
import { mainMap, openSwordCave } from "./maps.js";

function action(i) {
  console.log(i);
  switch (i) {
    case 4:
      enterCave(9);
      break;
    case 5:
      exitCave();
      break;
    case 6:
      getSword();
      break;
    case 7:
      enterGannon();
      break;
    case 8:
      exitCave();
      break;
    case 9:
      openDoor();
      break;
    case 10:
      removeMansionMessage();
      break;
    case 11:
      removeGannonMessage();
      break;
  }
}

function enterGannon() {
  zelda.hasSword ? enterCave(10) :  mainMap[1].hasEntered = false;
}

function enterCave(cave) {
  if (zelda.direction === 1 && zelda.y === 40 || zelda.direction === 1 && zelda.y === 200) {
    zelda.isEnteringCave = true;
    zelda.cave = cave;
  }
}

function exitCave() {
  if (zelda.direction === 0) zelda.isExitingCave = true;
}

function getSword() {
  openSwordCave();
  zelda.isGrabingSword = true;
}

function openDoor() {
  if (zelda.hasKey === true) {
    console.log("game is over !!!!!");
  } else {
    mainMap[2].hasEntered = false;
  }
}

function removeMansionMessage() {
  mainMap[2].hasEntered = true;
}

function removeGannonMessage() {
  mainMap[1].hasEntered = true;
}

export { action };
