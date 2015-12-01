import Color from 'graphics/color/BaseColor.js';

import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

let canvas = Canvas(512, 640);

BackgroundColor(canvas, 'rgb(0, 0, 0)');

AddToDOM(canvas, 'game');

let ctx = canvas.getContext('2d');

let color = new Color();

for (let y = 0; y < 360; y++)
{
    color.fromHSVColorWheel(y);
    ctx.fillStyle = color.rgba;
    ctx.fillRect(0, y*2, 512, 2);
}
