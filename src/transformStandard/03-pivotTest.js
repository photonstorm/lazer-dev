import BaseTransform from 'math/transform/2d/standard/BaseTransform.js';
import SetTransformToContext from 'math/transform/2d/SetTransformToContext.js';
import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import CLS from 'canvas/graphics/Clear.js';
import Loader from 'loader/Loader.js';
import ResetTransform from 'canvas/ResetTransform.js';
import Between from 'math/Between.js';

class Sprite extends BaseTransform {

    constructor (image, x, y) {

        super(x, y);

        this.texture = { image: image, width: image.width, height: image.height };

    }

    render (ctx, i) {

        SetTransformToContext(this.transform, ctx, i);

        let dx = this.rotationAnchor.x * -this.texture.width;
        let dy = this.rotationAnchor.y * -this.texture.height;

        ctx.drawImage(this.texture.image, dx, dy);

    }

}

class TransformTest {

    constructor () {

        this.canvas = Canvas(800, 600);
        this.ctx = GetContext(this.canvas);

        AddToDOM(this.canvas, 'game');

        //  Loader
        this.image = null;
        this.loader = new Loader();
        this.loader.path = 'assets/';

        // this.loader.image('128x128').then((file) => this.loadComplete(file));

        //  176 x 50
        this.loader.image('lazer2').then((file) => this.loadComplete(file));
        this.loader.start();

    }

    loadComplete (file) {

        this.image = file.data;

        this.arrow1 = new Sprite(this.image, 256, 256);

        //  Makes it rotate around the center (without using rotationAnchor)
        // this.arrow1.pivot.x = 64;       // half image width
        // this.arrow1.pivot.y = -64;      // negative half image height

        // this.arrow1.pivot.x = 88;       // half image width
        // this.arrow1.pivot.y = -25;      // negative half image height

        this.arrow1.pivot.x = 88;       // half image width
        this.arrow1.pivot.y = -25;      // negative half image height

        // this.arrow1.rotation = 0.01;

        // this.arrow1.rotationAnchor.set(0.5);

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        ResetTransform(this.ctx);

        CLS(this.ctx, true, 62, 95, 150);

    }

    update (delta) {

        // this.arrow1.rotation += 0.01;

    }

    draw (i) {

        this.arrow1.render(this.ctx, i);

        ResetTransform(this.ctx);
        this.ctx.fillStyle = 'rgb(255,0,0)';
        this.ctx.fillRect(this.arrow1.x, this.arrow1.y, 4, 4);

    }

}

new TransformTest();
