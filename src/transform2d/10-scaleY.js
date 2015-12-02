import Transform2D from 'components/Transform2D.js';
import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import CLS from 'canvas/graphics/Clear.js';
import DrawImage from 'canvas/DrawImage.js';
import DrawImageFromMatrix from 'canvas/DrawImageFromMatrix.js';
import SetTransform from 'canvas/SetTransform.js';
import SetTransformFromMatrix from 'canvas/SetTransformFromMatrix.js';
import Loader from 'loader/Loader.js';

export default class TransformTest {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.sprite1 = new Transform2D({}, null, 400, 300);

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

        SetTransform(this.ctx);
        CLS(this.ctx, true, 50, 50, 100);

    }

    update (delta) {

        this.sprite1.scaleY += 0.1;

        if (this.sprite1.scaleY >= 10)
        {
            this.sprite1.scale(1);
        }

    }

    draw (i) {

        SetTransformFromMatrix(this.ctx, this.sprite1._local);
        DrawImageFromMatrix(this.ctx, this.image, this.sprite1._local);

    }

}

new TransformTest();
