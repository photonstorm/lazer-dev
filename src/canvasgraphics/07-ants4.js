import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import Line from 'canvas/graphics/LineStyle.js';
import Fill from 'canvas/graphics/Fill.js';
import Stroke from 'canvas/graphics/Stroke.js';
import Rectangle from 'canvas/graphics/Rectangle.js';
import MainLoop from 'system/MainLoop.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(512, 512);

        BackgroundColor(this.canvas, 'rgb(0, 0, 20)');

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        this.ctx.globalCompositeOperation = 'screen';

        this.offsetR = 0;
        this.offsetG = -4;
        this.offsetB = -8;

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

        //  line segments distance + size

        this.offsetR--;

        if (this.offsetR < -33)
        {
            this.offsetR = 0;
        }

        this.offsetG--;

        if (this.offsetG < -33)
        {
            this.offsetG = 0;
        }

        this.offsetB--;

        if (this.offsetB < -33)
        {
            this.offsetB = 0;
        }

    }

    draw (i) {

        //  Red

        this.ctx.save();

        this.ctx.beginPath();

        Line(this.ctx, 12, 'round', 'round', [1, 32], this.offsetR);
        Rectangle(this.ctx, 32, 32, 256, 256);
        Stroke(this.ctx, 255, 0, 0, 0.5);

        this.ctx.closePath();

        this.ctx.restore();

        //  Green

        this.ctx.save();

        this.ctx.beginPath();

        Line(this.ctx, 12, 'round', 'round', [1, 32], this.offsetG);
        Rectangle(this.ctx, 32, 32, 256, 256);
        Stroke(this.ctx, 0, 255, 0, 0.5);

        this.ctx.closePath();

        this.ctx.restore();

        //  Blue

        this.ctx.save();

        this.ctx.beginPath();

        Line(this.ctx, 12, 'round', 'round', [1, 32], this.offsetB);
        Rectangle(this.ctx, 32, 32, 256, 256);
        Stroke(this.ctx, 0, 0, 255, 0.5);

        this.ctx.closePath();

        this.ctx.restore();

    }

}

new CanvasGraphics();
