import Transform2D from 'components/Transform2D.js';
import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import CLS from 'canvas/graphics/Clear.js';
import DrawImage from 'canvas/DrawImage.js';
import SetTransformFromMatrix from 'canvas/SetTransformFromMatrix.js';
import Loader from 'loader/Loader.js';

export default class TransformTest {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.sprite1 = new Transform2D({}, null, 200, 200);

        //  Coords relative to parent, so display position will be 264x264
        this.sprite2 = new Transform2D({}, this.sprite1, 64, 64);

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

        // this.sprite1.angle += 2;

        // this.sprite1.x += 100 * this.loop.physicsStep;

        // if (this.sprite1.x > 800)
        // {
        //     this.sprite1.x = 0;
        // }

    }

    draw (i) {

        SetTransformFromMatrix(this.ctx, this.sprite1._local);
        DrawImage(this.ctx, this.image);

        SetTransformFromMatrix(this.ctx, this.sprite2._local);
        DrawImage(this.ctx, this.image);

    }

}

new TransformTest();
