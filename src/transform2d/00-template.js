import Transform2D from 'components/Transform2D.js';
import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import CLS from 'canvas/graphics/Clear.js';
import DrawImage from 'canvas/DrawImage.js';
import Loader from 'loader/Loader.js';

export default class TransformTest {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.sprite1 = new Transform2D({}, null, 100, 100);

        //  Loader
        this.image = null;
        this.loader = new Loader();
        this.loader.path = 'assets/';
        this.loader.image('mushroom2').then((file) => this.loadComplete(file));
        this.loader.start();

    }

    loadComplete (file) {

        this.image = file.data;

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        CLS(this.ctx, true, 50, 50, 100);

    }

    update (delta) {

        // this.x1 += (this.vx1 * this.loop.physicsStep);

    }

    draw (i) {

        DrawImage(this.ctx, this.image, { x: this.sprite1.x, y: this.sprite1.y, anchorX: 0.5, anchorY: 0.5 });

        //  interpolated
        // let tx = (this.px + (this.x1 - this.px) * i);
        // this.ctx.fillRect(tx, 200, 128, 128);

    }

}

new TransformTest();
