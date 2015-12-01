import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import Star from 'canvas/shapes/Star.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(0, 0, 0)');

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        this.star = new Star({ x: 400, y: 300, stroke: 'rgba(255, 255, 0, 1)' });

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        this.ctx.clearRect(0, 0, 800, 600);

    }

    update (delta) {

        this.star.angle++;

    }

    draw (i) {

        this.star.draw(this.ctx, i);

    }

}

new CanvasGraphics();
