import Wrap from 'math/Wrap.js';
import DegToRad from 'math/DegToRad.js';
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

        this.angle = 0;

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

        this.angle++;

        this.angle = Wrap(this.angle, 0, 360);

    }

    draw (i) {

        this.ctx.save();

        this.ctx.beginPath();

        Line(this.ctx, 2);

        //  Rotate from center
        Rectangle(this.ctx, 256, 256, 128, 128, DegToRad(this.angle), true);

        Stroke(this.ctx, 255, 255, 0);

        this.ctx.closePath();

        this.ctx.restore();

    }

}

new CanvasGraphics();
