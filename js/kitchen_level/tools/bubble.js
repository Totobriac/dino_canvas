var maxPoints = 50;
var points = [];

var frame = 0;
var maxFrame = 8;
var maxRadius = 3;

class Point {
  constructor() {
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;
    this.dist = this.distance();
    this.radius = 0;
  }
  distance() {
    return Math.sqrt(
      (this.x - 250) * (this.x - 250) + (this.y - 250) * (this.y - 250)
    )
  }
}

function populatePoints() {
  for (let i = 0; points.length < maxPoints; i++) {
    var point = new Point();
    if (point.dist < 48) {
      points.push(point);
    }
  }
}

function boil(ctx) {

  ctx.beginPath();
  ctx.arc(250, 250, 50, 0, 2 * Math.PI);
  ctx.stroke();

  for (let i = 0; i < points.length; i++) {
    if (frame > maxFrame) {
      frame = 0;
      points[i].radius += 1;
    } else {
      frame++;
    }
    if (points[i].dist + points[i].radius > 48 || points[i].radius > maxRadius) {
      points.splice(i, 1);
      i --;
    } else {
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, points[i].radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
  populatePoints();
};

export {boil};
