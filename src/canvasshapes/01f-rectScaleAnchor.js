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

        this.rect1 = new Rectangle({ x: 400, y: 300, width: 128, height: 128, fill: 'rgba(255,0,255,0.8)', anchor: 0.5 });

        this.d = 1;

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        ResetTransform(this.ctx);

        Clear(this.ctx, true, 0, 0, 50, 1);

    }

    update (delta) {

        this.rect1.rotation += 0.05;

        if (this.d)
        {
            this.rect1.scaleX += 0.01;
            this.rect1.scaleY += 0.01;

            if (this.rect1.scaleX >= 4)
            {
                this.d = 0;
            }
        }
        else
        {
            this.rect1.scaleX -= 0.01;
            this.rect1.scaleY -= 0.01;

            if (this.rect1.scaleX <= 0.5)
            {
                this.d = 1;
            }
        }

    }

    draw (i) {

        this.rect1.draw(this.ctx, i);

    }

}

new CanvasGraphics();
