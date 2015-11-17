import Phaser from 'Phaser.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import MinimalRenderer from 'renderers/minimal/MinimalRenderer.js';

let canvas = Canvas(800, 400);

AddToDOM(canvas, 'game');

//  Canvas only
const renderer = new MinimalRenderer(canvas, Phaser.CANVAS);

console.log(renderer);

renderer.render(200, 200, 0);
