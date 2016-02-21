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

        this.starfield = new Starfield2D(800, 600);

        this.layer1 = this.starfield.addLayer(200);
        this.layer2 = this.starfield.addLayer(200);
        this.layer3 = this.starfield.addLayer(200);

        this.i = 0;

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

        this.layer1.speedX = Math.sin(this.i += 0.004) * 2;
        this.layer1.speedY = Math.cos(this.i += 0.004) * 2;

        this.layer2.speedX = Math.sin(this.i += 0.004) * 3;
        this.layer2.speedY = Math.cos(this.i += 0.004) * 3;

        this.layer3.speedX = Math.sin(this.i += 0.005) * 4;
        this.layer3.speedY = Math.cos(this.i += 0.005) * 4;

    }

    draw (i) {

        this.starfield.render(i, (layer, x, y) => this.drawStar(layer, x, y));

    }

    drawStar (layer, x, y) {
        
        if (layer === 0)
        {
            this.ctx.fillStyle = '#666';
        }
        else if (layer === 1)
        {
            this.ctx.fillStyle = '#aaa';
        }
        else if (layer === 2)
        {
            this.ctx.fillStyle = '#fff';
        }

        this.ctx.fillRect(x, y, 2, 2);

    }

}

new FX();
