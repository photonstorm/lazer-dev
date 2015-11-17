import Phaser from 'Phaser.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import PointRenderer from 'renderers/point/PointRendererF.js';

let canvas = Canvas(800, 600);

AddToDOM(canvas, 'game');

//  Try for WebGL then fall back to Canvas
// const renderer = new PointRenderer(canvas, Phaser.AUTO);

const renderer = PointRenderer(canvas, Phaser.AUTO);

console.log(renderer);

renderer.update(400, 300);

renderer.render();
