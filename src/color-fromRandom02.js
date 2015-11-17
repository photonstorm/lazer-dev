import Color from 'graphics/color/BaseColor.js';

import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

let canvas = Canvas(512, 512);

BackgroundColor(canvas, 'rgb(0, 0, 0)');

AddToDOM(canvas, 'game');

let ctx = canvas.getContext('2d');

let color = new Color();

for (let y = 0; y < 8; y++)
{
    for (let x = 0; x < 8; x++)
    {
        color.fromRandom();
        ctx.fillStyle = color.rgba;
        ctx.fillRect(x * 64, y * 64, 64, 64);
    }
}
