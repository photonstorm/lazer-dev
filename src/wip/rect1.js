import MainLoop from 'system/MainLoop.js';
import Between from 'math/Between.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import Clear from 'canvas/graphics/Clear.js';
import ResetTransform from 'canvas/ResetTransform.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import Rectangle from 'canvas/shapes/Rectangle.js';
import Transform from 'math/transform/2d/Transform2DMinimal.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.rect = Rectangle({ x: 0, y: 100, width: 64, height: 64, fill: 'rgba(255,0,255,1)', anchor: 0.5 });

        let t = Transform(100, 100);

        this.rect.transform = t;

        console.log(t);

        // Object.defineProperty(this.rect, 'transform', t);

        console.log(this.rect);

        this.rect.transform.x = 100;
        this.rect.transform.y = 100;


        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        ResetTransform(this.ctx);

        Clear(this.ctx, true, 0, 0, 50, 1);

        // this.rect.x++;


    }

    update (delta) {

        // this.rect.angle += 1.5;

    }

    draw (i) {

        this.rect.draw(this.ctx, i);

    }

}

new CanvasGraphics();
