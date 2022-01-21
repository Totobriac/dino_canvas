import { pot } from "../tools.js";

var maxPoints = 50;
var points = [];

var frame = 0;
var maxFrame = 12;
var maxRadius = 6;

class Point {
  constructor() {
    this.x = pot.x + Math.random() * pot.width;
    this.y = pot.y + Math.random() * pot.height;
    this.dist = this.distance();
    this.radius = 0;
  }
  distance() {
    return Math.sqrt(
      (this.x - (pot.x + pot.width / 2)) * (this.x - (pot.x + pot.width / 2)) +
      (this.y - (pot.y + pot.height / 2)) * (this.y - (pot.y + pot.height / 2))
    )
  }
}

function populatePoints() {
  for (let i = 0; points.length < maxPoints; i++) {
    var point = new Point();
    if (point.dist < 63) {
      points.push(point);
    }
  }
}

function boil(ctx) {

  for (let i = 0; i < points.length; i++) {
    if (frame > maxFrame) {
      frame = 0;
      points[i].radius += 1;
    } else {
      frame++;
    }
    if (points[i].dist + points[i].radius > 63 || points[i].radius > maxRadius) {
      points.splice(i, 1);
      i--;
    } else {
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, points[i].radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
  populatePoints();
};

export { boil };
