// var statue = new Image();
// statue.src = "https://i.ibb.co/3TvCH8n/liberty.png";

// import { createClouds } from "./cloud.js";


// const startPt = { x: 1200, y: 400 };
// const controlPt = { x: 600, y: 200 };
// const endPt = { x: 0, y: 400 };
// var percent = 0;

// statue.addEventListener("load", () => {
// 	animateMonuments();
// });

// export function animateMonuments(ctx) {
// 	ctx.setTransform(1, 0, 0, 1, 0, 0);
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	percent > 1 ? (percent = 0) : (percent += 0.002);

// 	var point = getQuadraticBezierXYatPercent(startPt, controlPt, endPt, percent);
// 	var lastPoint = getQuadraticBezierXYatPercent(startPt, controlPt, endPt, percent - 0.003);
// 	var angle = Math.atan2(lastPoint.y - point.y, lastPoint.x - point.x);

// 	ctx.translate(point.x, point.y);
// 	ctx.rotate(angle);
// 	ctx.drawImage(statue, 0, 0, statue.width, statue.height, -50, -50, 200, 200);
// }

// function getQuadraticBezierXYatPercent(startPt, controlPt, endPt, percent) {
// 	var x =
// 		Math.pow(1 - percent, 2) * startPt.x +
// 		2 * (1 - percent) * percent * controlPt.x +
// 		Math.pow(percent, 2) * endPt.x;
// 	var y =
// 		Math.pow(1 - percent, 2) * startPt.y +
// 		2 * (1 - percent) * percent * controlPt.y +
// 		Math.pow(percent, 2) * endPt.y;
// 	return { x: x, y: y };
// }