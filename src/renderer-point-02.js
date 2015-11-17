import Phaser from 'Phaser.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import PointRenderer from 'renderers/point/PointRenderer.js';

let canvas = Canvas(800, 600);

AddToDOM(canvas, 'game');

//  Canvas only
const renderer = new PointRenderer(canvas, Phaser.CANVAS);

console.log(renderer);

renderer.update(100, 100);

renderer.render();
