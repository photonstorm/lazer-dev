import Transform from 'math/transform/2d/basic/Transform.js';
import SetTransformToContext from 'math/transform/2d/SetTransformToContext.js';
import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import CLS from 'canvas/graphics/Clear.js';
import Loader from 'loader/Loader.js';
import ResetTransform from 'canvas/ResetTransform.js';

class TransformTest {

    constructor () {

        this.canvas = Canvas(800, 600);
        this.ctx = GetContext(this.canvas);

        AddToDOM(this.canvas, 'game');

        //  Sprite
        this.sprite = {
            name: 'Bob',
            transform: new Transform()
        };

        //  Inject the Transform properties directly into the Sprite object
        this.sprite.transform.addProperties(this.sprite);

        //  Now we can do things like this ...
        this.sprite.x = 400;
        this.sprite.y = 300;

        this.sprite.rotationAnchor.set(0.5);

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

        ResetTransform(this.ctx);

        CLS(this.ctx, true, 50, 50, 100);

    }

    update (delta) {

        this.sprite.rotation += 0.05;

    }

    draw (i) {

        SetTransformToContext(this.sprite.transform, this.ctx);

        //  64 = image frame dimensions
        let dx = this.sprite.rotationAnchor.x * -64;
        let dy = this.sprite.rotationAnchor.y * -64;

        this.ctx.drawImage(this.image, dx, dy);

    }

}

new TransformTest();
