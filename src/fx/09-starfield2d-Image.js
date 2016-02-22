import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import Clear from 'canvas/graphics/Clear.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import MainLoop from 'system/MainLoop.js';
import Starfield2DImage from 'fx/starfield/2d/Starfield2DImage.js';
import Loader from 'loader/Loader.js';

export default class FX {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(0, 0, 0)');

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        //  Loader
        this.loader = new Loader();
        this.loader.path = 'assets/';
        this.loader.image('star3').then((file) => this.loadComplete(file));
        this.loader.start();

    }

    loadComplete (file) {

        this.starfield = new Starfield2DImage(800, 600, { paddingX: 64, paddingY: 64 });

        this.starfield.addWaveLayer({ qty: 200, image: file.data, sinX: 0.02, sinAmpX: 2, cosY: 0.04, cosAmpY: 2 });
        this.starfield.addWaveLayer({ qty: 200, image: file.data, sinX: 0.02, sinAmpX: 3, cosY: 0.04, cosAmpY: 3 });
        this.starfield.addWaveLayer({ qty: 200, image: file.data, sinX: 0.02, sinAmpX: 4, cosY: 0.04, cosAmpY: 4 });

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

        this.starfield.update();

    }

    draw (i) {

        this.starfield.render(i, this.ctx);

    }

}

new FX();
