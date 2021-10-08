var mansionSprite = new Image();
mansionSprite.src = "../assets/mansion_level/maniac_no_light.png";

var gateSprite = new Image();
gateSprite.src = "../assets/mansion_level/portail_pixel.png";

var skySprite = new Image();
skySprite.src = "../assets/road_level/sky_race_1200.png";

var wallSprite = new Image();
wallSprite.src = "../assets/mansion_level/wall.png";



export function drawOutsideScenery(ctx) {
    ctx.drawImage(skySprite, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(mansionSprite, 350, 0, 144, 160);

    ctx.drawImage(wallSprite,0, 210, 160, 160); 
    ctx.drawImage(wallSprite,160, 210, 160, 160);
    ctx.drawImage(wallSprite,552, 210, 160, 160); 
    ctx.drawImage(wallSprite,712, 210, 160, 160);


    ctx.drawImage(gateSprite, 256, 140, 360, 240);
}