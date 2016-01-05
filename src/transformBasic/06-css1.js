import BaseTransform from 'math/transform/2d/basic/BaseTransform.js';
import SetTransformToCSS from 'math/transform/2d/SetTransformToCSS.js';
import MainLoop from 'system/MainLoop.js';
import AddToDOM from 'dom/AddToDOM.js';
import Loader from 'loader/Loader.js';
import Between from 'math/Between.js';

class Sprite extends BaseTransform {

    constructor (image, x, y) {

        super(x, y);

        this.speed = Between(1, 5);
        this.rotateSpeed = 0.02 * this.speed;

        this.texture = { image: image, width: image.width, height: image.height };

        this.element = document.createElement('div');
        this.element.style.background = 'url(assets/mushroom2.png) no-repeat';
        this.element.style.width = image.width + 'px';
        this.element.style.height = image.height + 'px';
        this.element.style['will-change'] = 'transform';
        this.element.style.position = 'absolute';

        SetTransformToCSS(this.transform, this.element);

        AddToDOM(this.element, 'game');

    }

    render (i) {

        SetTransformToCSS(this.transform, this.element, i);

    }

}

class TransformTest {

    constructor () {

        //  Throw some CSS into our game container
        let g = document.getElementById('game').style;
        g.width = '800px';
        g.height = '600px';
        g.backgroundColor = '#2d2d2d';
        g.overflow = 'hidden';
        g.position = 'absolute';

        let ul = document.getElementById('demos').style;
        ul.marginTop = '600px';

        this.image = null;
        this.loader = new Loader();
        this.loader.path = 'assets/';
        this.loader.image('mushroom2').then((file) => this.loadComplete(file));
        this.loader.start();

    }

    loadComplete (file) {

        this.image = file.data;

        this.sprites = new Set();

        for (let i = 0; i < 50; i++)
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
            sprite.render(i);
        }

    }

}

new TransformTest();
