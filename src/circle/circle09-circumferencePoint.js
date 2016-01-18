import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import Line from 'canvas/graphics/LineStyle.js';
import Stroke from 'canvas/graphics/Stroke.js';
import CanvasCircle from 'canvas/graphics/Circle.js';
import SetPixel from 'canvas/pixels/SetPixel.js';
import Circle from 'geom/circle/Circle.js';
import CircumferencePoint from 'geom/circle/CircumferencePoint.js';
import DegToRad from 'math/DegToRad.js';
import Between from 'math/Between.js';

export default class CircleTest {

    constructor () {

        this.circle = Circle(256, 256, 128);

        this.canvas = Canvas(512, 512);

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        Line(this.ctx, 1);

        CanvasCircle(this.ctx, this.circle.x, this.circle.y, this.circle.radius);

        Stroke(this.ctx, 255, 255, 255);

        for (let i = 0; i < 32; i++)
        {
            let p = CircumferencePoint(this.circle, DegToRad(Between(-180, 180)));

            SetPixel(this.ctx, p.x, p.y, 255, 0, 0);
        }

    }

}

new CircleTest();
