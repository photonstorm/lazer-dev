import MainLoop from 'system/MainLoop.js';
import Between from 'math/Between.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import Clear from 'canvas/graphics/Clear.js';
import ResetTransform from 'canvas/ResetTransform.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import Rectangle from 'canvas/shapes/Rectangle.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.rect = new Rectangle({ x: 0, y: 300, width: 128, height: 128, fill: 'rgba(255,0,255,1)', anchor: 0.5 });

        console.log(this.rect.transform.e, this.rect.transform.f);

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

        this.bx = 0;

        console.log(this.canvas);

    }

    begin () {

        ResetTransform(this.ctx);

        Clear(this.ctx, true, 0, 0, 50, 1);

        this.ctx.fillStyle = 'rgb(255,0,0)';
        this.ctx.fillRect(this.bx, 200, 32, 32);
        this.bx++;

        this.rect.x++;


    }

    update (delta) {

        // this.rect.angle++;

    }

    draw (i) {

        this.rect.draw(this.ctx, i);

    }

}

new CanvasGraphics();
