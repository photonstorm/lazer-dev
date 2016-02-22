import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import Clear from 'canvas/graphics/Clear.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import MainLoop from 'system/MainLoop.js';
import Starfield2D from 'fx/starfield/2d/Starfield2D.js';
import DrawImage from 'canvas/DrawImage.js';
import Loader from 'loader/Loader.js';

export default class FX {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(0, 0, 0)');

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        //  Loader
        this.image = null;
        this.loader = new Loader();
        this.loader.path = 'assets/';
        this.loader.image('blue_ball').then((file) => this.loadComplete(file));
        this.loader.start();

    }

    loadComplete (file) {

        this.image = file.data;

        this.starfield = new Starfield2D(800, 600, { paddingX: 64, paddingY: 64 });

        this.starfield.addWaveLayer({ qty: 64, speedY: -2, sinX: 0.06, sinAmpX: 6 });
        this.starfield.addWaveLayer({ qty: 64, speedY: -2, sinX: 0.06, sinAmpX: 7 });
        this.starfield.addWaveLayer({ qty: 64, speedY: -2, sinX: 0.06, sinAmpX: 8 });
        this.starfield.addWaveLayer({ qty: 64, speedY: -2, sinX: 0.06, sinAmpX: 9 });
        this.starfield.addWaveLayer({ qty: 64, speedY: -2, sinX: 0.06, sinAmpX: 10 });
        this.starfield.addWaveLayer({ qty: 64, speedY: -2, sinX: 0.06, sinAmpX: 11 });
        this.starfield.addWaveLayer({ qty: 64, speedY: -2, sinX: 0.06, sinAmpX: 12 });
        this.starfield.addWaveLayer({ qty: 64, speedY: -2, sinX: 0.06, sinAmpX: 13 });

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

        this.starfield.render(i, (layer, x, y) => this.drawStar(layer, x, y));

    }

    drawStar (layer, x, y) {
        
        DrawImage(this.ctx, this.image, { x, y });

    }

}

new FX();
