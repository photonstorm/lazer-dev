import BaseTransform from 'math/transform/2d/basic/BaseTransform.js';
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

    render (ctx) {

        SetTransformToContext(this.transform, ctx);

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
        this.loader.image('mushroom2').then((file) => this.loadComplete(file));
        this.loader.start();

    }

    loadComplete (file) {

        this.image = file.data;

        this.sprites = new Set();

        for (let i = 0; i < 100; i++)
        {
            let x = Between(0, 800);
            let y = Between(0, 600);
            let mushroom = new Sprite(this.image, x, y);
            mushroom.rotationAnchor.set(0.5);
            this.sprites.add(mushroom);
        }

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        ResetTransform(this.ctx);

        CLS(this.ctx, true, 50, 50, 100);

    }

    update (delta) {

        for (let sprite of this.sprites)
        {
            sprite.rotation += 0.05;
        }

    }

    draw (i) {

        for (let sprite of this.sprites)
        {
            sprite.render(this.ctx);
        }

    }

}

new TransformTest();
