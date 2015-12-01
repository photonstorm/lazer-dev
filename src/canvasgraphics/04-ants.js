import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import Line from 'canvas/graphics/Line.js';
import Fill from 'canvas/graphics/Fill.js';
import Stroke from 'canvas/graphics/Stroke.js';
import Rectangle from 'canvas/shapes/Rectangle.js';
import MainLoop from 'system/MainLoop.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(512, 512);

        BackgroundColor(this.canvas, 'rgb(0, 0, 20)');

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        this.offset = 0;

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        this.ctx.clearRect(0, 0, 512, 512);

    }

    update (delta) {

        this.offset--;

        //  1 less than the line segments distance
        if (this.offset < -9)
        {
            this.offset = 0;
        }

    }

    draw (i) {

        this.ctx.save();

        this.ctx.beginPath();

        Line(this.ctx, 1, 'butt', 'miter', [5, 5], this.offset); // miter = crisp pixels at 1px line width stroke (+ see below)
        //  With a lineWidth of 1 (or any odd number) we need to -0.5 this to retain pixel clarity:
        Rectangle(this.ctx, 32-0.5, 32-0.5);
        Stroke(this.ctx, 255, 255, 0);

        this.ctx.closePath();

        this.ctx.restore();

    }

}

new CanvasGraphics();
