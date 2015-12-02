import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import Rectangle from 'canvas/shapes/Rectangle.js';
import Circle from 'canvas/shapes/Circle.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(200, 200, 250)');

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        this.rect = new Rectangle({ x: 200, y: 200, width: 128, fill: true });
        this.rect.createLinearGradient(true, [ 0, '#ff00f0', 0.5, '#05fff0', 1, '#8000ff' ]);

        // let gradient = RadialGradient(this.ctx, 256, 256, 300, 256, 256, 50, [ 0, '#ff00f0', 0.5, '#05fff0', 1, '#8000ff' ]);
        // this.circ = new Circle({ x: 400, y: 300, radius: 128, fill: gradient });

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

        this.rect.angle++;

        // this.rect.x += 30 * this.loop.physicsStep;

    }

    draw (i) {

        this.rect.draw(this.ctx, i);

    }

}

new CanvasGraphics();
