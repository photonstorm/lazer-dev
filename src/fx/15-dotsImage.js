import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import Clear from 'canvas/graphics/Clear.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import MainLoop from 'system/MainLoop.js';
import Loader from 'loader/Loader.js';
import SinusDots from 'fx/sinusdots/SinusDots.js';

export default class FX {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(0, 0, 0)');

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.ctx.fillStyle = '#fff';

        this.sinusdots = new SinusDots({ x: 400, y: 300, qty: 400, x1: 1008, y1: 2048, x2: 512, y2: 970, x3: 248, y3: -436, x4: 372, y4: 64 });

        //  Loader
        this.image = null;
        this.loader = new Loader();
        this.loader.path = 'assets/';
        this.loader.image('blue_ball').then((file) => this.loadComplete(file));
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

        Clear(this.ctx);

    }

    update (delta) {

        this.sinusdots.update();

    }

    draw (i) {

        this.sinusdots.renderImage(i, this.ctx, this.image);

    }

}

new FX();
