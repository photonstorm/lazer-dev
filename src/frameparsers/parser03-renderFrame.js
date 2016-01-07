import Loader from 'loader/Loader.js';
import TexturePackerJSONArray from 'texture/parsers/TexturePackerJSONArray.js';
import BaseTransform from 'math/transform/2d/basic/BaseTransform.js';
import SetTransformToContext from 'math/transform/2d/SetTransformToContext.js';
import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import CLS from 'canvas/graphics/Clear.js';
import ResetTransform from 'canvas/ResetTransform.js';
import Between from 'math/Between.js';

class Sprite extends BaseTransform {

    constructor (x, y, frame) {

        super(x, y);

        this.speed = Between(1, 5);
        this.rotateSpeed = 0.02 * this.speed;

        this.frame = frame;

        this.rotationAnchor.set(0.5);

        this.transform.enableInterpolation();

    }

    render (ctx, i) {

        SetTransformToContext(this.transform, ctx, i);

        let dx, dy;

        if (this.frame.trimmed)
        {
            dx = this.frame.trimX - this.rotationAnchor.x * this.frame.width;
            dy = this.frame.trimY - this.rotationAnchor.y * this.frame.height;
        }
        else
        {
            dx = this.rotationAnchor.x * -this.frame.width;
            dy = this.rotationAnchor.y * -this.frame.height;
        }

        ctx.drawImage(
            this.frame.source,
            this.frame.x,
            this.frame.y,
            this.frame.width,
            this.frame.height,
            dx,
            dy,
            this.frame.width,
            this.frame.height
        );

    }

}

export default class ParseTest {

    constructor () {

        this.canvas = Canvas(800, 600);
        this.ctx = GetContext(this.canvas);

        AddToDOM(this.canvas, 'game');

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.atlas('megasetHD-0').then(multipart => this.atlasLoaded(multipart));

        this.loader.start();

    }

    atlasLoaded (multipart) {

        let texture = multipart.fileA.data;
        let json = multipart.fileB.data;

        let frames = TexturePackerJSONArray(texture, json);

        let frame = frames[23];

        console.log(frame);

        this.sprites = new Set();

        for (let i = 0; i < 10; i++)
        {
            let x = Between(0, 800);
            let y = Between(0, 600);
            this.sprites.add(new Sprite(x, y, frame));
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
            sprite.rotation += sprite.rotateSpeed;

            sprite.x += sprite.speed;

            if (sprite.x > 864)
            {
                sprite.position.resetX(-64);
            }
        }

    }

    draw (i) {

        for (let sprite of this.sprites)
        {
            sprite.render(this.ctx, i);
        }

    }

}

new ParseTest();
