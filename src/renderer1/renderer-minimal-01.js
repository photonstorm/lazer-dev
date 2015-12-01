import Phaser from 'Phaser.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import MinimalRenderer from 'renderers/minimal/MinimalRenderer.js';

let canvas = Canvas(800, 400);

AddToDOM(canvas, 'game');

//  Try for WebGL then fall back to Canvas
const renderer = new MinimalRenderer(canvas, Phaser.AUTO);

console.log(renderer);

renderer.render(255, 0, 0);
