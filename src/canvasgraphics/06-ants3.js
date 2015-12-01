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

        //  line segments distance + size
        if (this.offset < -33)
        {
            this.offset = 0;
        }

    }

    draw (i) {

        this.ctx.save();

        this.ctx.beginPath();

        Line(this.ctx, 12, 'round', 'round', [1, 32], this.offset);
        Rectangle(this.ctx, 32, 32, 256, 256);
        Stroke(this.ctx, 255, 255, 0);

        this.ctx.closePath();

        this.ctx.restore();

    }

}

new CanvasGraphics();
