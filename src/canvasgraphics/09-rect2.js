import DegToRad from 'math/DegToRad.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import Line from 'canvas/graphics/Line.js';
import Fill from 'canvas/graphics/Fill.js';
import Stroke from 'canvas/graphics/Stroke.js';
import Rectangle from 'canvas/shapes/Rectangle.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(512, 512);

        BackgroundColor(this.canvas, 'rgb(0, 0, 20)');

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        Line(this.ctx, 2);

// export default function Rectangle (context, x, y, width = 128, height = 128, angle = 0, fromCenter = false) {

        //  Rotate from center
        Rectangle(this.ctx, 100, 100, 128, 128, DegToRad(20), true);

        Stroke(this.ctx, 255, 0, 255);


    }

}

new CanvasGraphics();
