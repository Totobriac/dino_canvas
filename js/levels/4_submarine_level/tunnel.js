var w = 1200;
var pi = Math.PI;
var sin = Math.sin;
var cos = Math.cos;

var tickCount = 0;
var c = 36;


function drawCircle(ctx, x, y, r, h, s, l) {
  ctx.beginPath();
  ctx.fillStyle = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  ctx.arc(x, y, r, 0, pi * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.clip();
}

function tick(ctx) {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save();

  ctx.translate((2 * canvas.width) / 3, (2 * canvas.height) / 3);
  if (tickCount < 400) {
    for (var i = c; i >= 0; i--) {
      var cycle = ~~((c * (1 + sin(((tickCount - i) * pi * 2) / c))) / 2);
      var cyclep = ~~((c * (1 + sin(((tickCount * 0.3 - i) * pi * 2) / c))) / 2);
      var coscyclep = ~~((c * (1 + cos(((tickCount * 0.1 - i) * pi * 2) / c))) / 2);

      var h;
      var s;
      var l;
      tickCount < 400 ? (h = 0) : (h = 238);
      tickCount < 400 ? (s = 0) : (s = 75);
      tickCount < 400 ? (l = 0) : (l = 58);

      i != 1 ? (l = ~~((cycle * 50) / c)) : (l = 75);

      drawCircle(
        ctx,
        cyclep * 8 - c * (c / 5),
        coscyclep * 8 - c * (c / 6),
        (w / 1.2 / c) * i,
        h,
        s,
        l
      );
    }
  }
  ctx.restore();
  tickCount += 1;


}

export { tick };