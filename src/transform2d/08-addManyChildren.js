import Transform2D from 'components/Transform2D.js';
import MainLoop from 'system/MainLoop.js';
import Between from 'math/Between.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import CLS from 'canvas/graphics/Clear.js';
import DrawImageFromMatrix from 'canvas/DrawImageFromMatrix.js';
import SetTransform from 'canvas/SetTransform.js';
import SetTransformFromMatrix from 'canvas/SetTransformFromMatrix.js';
import Loader from 'loader/Loader.js';

export default class TransformTest {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.sprites = new Set();

        //  Our root transform, right in the middle of the screen
        this.root = new Transform2D({}, null, 400, 300);

        this.sprites.add(this.root);

        //  And now let's create a bunch of transforms around it
        for (let i = 0; i < 32; i++)
        {
            let child = new Transform2D({}, this.root, Between(-200, 200), Between(-200, 200));
            this.sprites.add(child);
        }

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

        //  Rotate the root
        this.root.angle += 2;

        this.root.x += 200 * this.loop.physicsStep;

        if (this.root.x > 1000)
        {
            this.root.x = -200;
        }

    }

    draw (i) {

        for (let sprite of this.sprites)
        {
            SetTransformFromMatrix(this.ctx, sprite._local);
            DrawImageFromMatrix(this.ctx, this.image, sprite._local);
        }

    }

}

new TransformTest();
