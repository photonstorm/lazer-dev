import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import Clear from 'canvas/graphics/Clear.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import MainLoop from 'system/MainLoop.js';
import Starfield2D from 'fx/starfield/2d/Starfield2D.js';

export default class FX {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(0, 0, 0)');

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.ctx.fillStyle = '#ffffff';

        this.starfield = new Starfield2D(800, 600);

        // this.starfield.addLayer(200, -1.9, 0.4);
        // this.starfield.addLayer(200, -1.7, 0.4);
        // this.starfield.addLayer(200, -1.5, 0.4);

        this.starfield.addLayer(200, -4, 0);
        this.starfield.addLayer(200, -3, 0);
        this.starfield.addLayer(200, -2, 0);

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
        
        // this.ctx.fillRect(Math.round(x), Math.round(y), 4, 1);
        this.ctx.fillRect(x, y, 2, 2);

    }

}

new FX();
