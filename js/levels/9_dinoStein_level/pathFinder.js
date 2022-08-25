import { heuristic } from "./functions.js";

let cols = 32;
let rows = 40;
let grid;
let openSet = [];
let closedSet = [];
let start;
let end;
let path = [];
var pathToDraw = [];

function getPath(player, map, nmeX, nmeY) {

  pathToDraw = search(map, player, nmeX, nmeY);

  return pathToDraw;
}

class GridPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.parent = undefined;
  }
  updateNeighbors(grid) {
    let i = this.x;
    let j = this.y;
    this.neighbors = [];

    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }

    return this.neighbors;
  };
}


function init(player, nmeX, nmeY) {
  openSet = [];
  closedSet = [];
  path = [];

  var startX = Math.floor(player.x / 64);
  var startY = Math.floor(player.y / 64);

  var endX = Math.floor(nmeX / 64);
  var endY = Math.floor(nmeY / 64);

  end = grid[startX][startY];
  start = grid[endX][endY];

  openSet.push(start);
}


function search(map, player, nmeX, nmeY) {

  populateGrid(map);

  init(player, nmeX, nmeY);

  while (openSet.length > 0) {

    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    let current = openSet[lowestIndex];
    if (current === end) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      return path.reverse();
    }

    openSet.splice(lowestIndex, 1);

    closedSet.push(current);

    let neighbors = current.updateNeighbors(grid);

    for (let i = 0; i < neighbors.length; i++) {
      let neigh = neighbors[i];

      if (!closedSet.includes(neigh)) {

        if (map.wall[neigh.y][neigh.x] == 0 && !map.blockBlocks.includes(parseInt(map.sprites[neigh.y][neigh.x]))) {

          let possibleG = current.g + 1;

          if (!openSet.includes(neigh)) {
            openSet.push(neigh);
          } else if (possibleG >= neigh.g) {
            continue;
          }
          neigh.g = possibleG;
          neigh.h = heuristic(neigh, end);
          neigh.f = neigh.g + neigh.h;
          neigh.parent = current;

        } else if (map.wall[neigh.y][neigh.x] == 24) {
          var X = neigh.x;
          var Y = neigh.y;

          var index = map.getDoor(X, Y);

          if (map.doors[index].status == 0) {

            let possibleG = current.g + 1;

            if (!openSet.includes(neigh)) {
              openSet.push(neigh);
            } else if (possibleG >= neigh.g) {
              continue;
            }
            neigh.g = possibleG;
            neigh.h = heuristic(neigh, end);
            neigh.f = neigh.g + neigh.h;
            neigh.parent = current;

          }
        }
      }
    }
  }
  return [];
}

function populateGrid(map) {
  grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new GridPoint(i, j, map);
    }
  }
}


export { getPath };
