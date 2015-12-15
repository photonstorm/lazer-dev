import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import Clear from 'canvas/graphics/Clear.js';
import ResetTransform from 'canvas/ResetTransform.js';
import Circle from 'canvas/shapes/Circle.js';
import Rectangle from 'canvas/shapes/Rectangle.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.circ = new Circle({ x: 400, y: 300, radius: 128, fill: 'rgba(255, 0, 255, 1)', stroke: 'rgba(0, 0, 0, 1)', lineWidth: 8, scaleX: 2, scaleY: 0.5 });

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        ResetTransform(this.ctx);

        Clear(this.ctx, true, 200, 200, 255, 1);

    }

    update (delta) {

        this.circ.rotation += 0.01;

    }

    draw (i) {

        this.circ.draw(this.ctx, i);

    }

}

new CanvasGraphics();
