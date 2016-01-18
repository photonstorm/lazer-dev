import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import Line from 'canvas/graphics/LineStyle.js';
import Stroke from 'canvas/graphics/Stroke.js';
import CanvasCircle from 'canvas/graphics/Circle.js';
import SetPixel from 'canvas/pixels/SetPixel.js';
import Circle from 'geom/circle/Circle.js';
import Random from 'geom/circle/Random.js';

export default class CircleTest {

    constructor () {

        this.circle = Circle(256, 0, 128);

        this.canvas = Canvas(512, 512);

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        Line(this.ctx, 2);

        CanvasCircle(this.ctx, this.circle.x, this.circle.y, this.circle.radius);

        Stroke(this.ctx, 255, 255, 255);

        for (let i = 0; i < 320; i++)
        {
            let p = Random(this.circle);

            SetPixel(this.ctx, p.x, p.y, 255, 255, 255);
        }

    }

}

new CircleTest();
