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

        this.speed = Between(1, 5);
        this.rotateSpeed = 0.02 * this.speed;

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
        this.loader.image('mushroom2').then((file) => this.loadComplete(file));
        this.loader.start();

    }

    loadComplete (file) {

        this.image = file.data;

        //  Chrome cannot optimize a Set or Map yet, so use a traditional Array for hot code
        this.sprites = [];

        for (let i = 0; i < 100; i++)
        {
            let x = Between(0, 800);
            let y = Between(0, 600);
            let mushroom = new Sprite(this.image, x, y);
            mushroom.rotationAnchor.set(0.5);
            this.sprites.push(mushroom);
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

        for (var c = 0; c < this.sprites.length; c++)
        {
            var sprite = this.sprites[c];

            sprite.rotation += sprite.rotateSpeed;

            sprite.x += sprite.speed;

            if (sprite.x > 864)
            {
                sprite.position.resetX(-64);
            }
        }

    }

    draw (i) {

        for (let c = 0; c < this.sprites.length; c++)
        {
            this.sprites[c].render(this.ctx, i);
        }

    }

}

new TransformTest();
