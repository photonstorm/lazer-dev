import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import Circle from 'canvas/shapes/Circle.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(200, 200, 250)');

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        this.circ = new Circle({ x: 400, y: 300, radius: 128, fill: 'rgba(255, 0, 255, 1)', stroke: 'rgba(0, 0, 0, 1)', lineWidth: 8 });

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

        // this.rect.angle++;

        // this.rect.x += 60 * this.loop.physicsStep;

    }

    draw (i) {

        this.circ.draw(this.ctx, i);

    }

}

new CanvasGraphics();
