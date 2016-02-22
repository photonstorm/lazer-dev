import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import Clear from 'canvas/graphics/Clear.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import MainLoop from 'system/MainLoop.js';
import Grid from 'create/Grid.js';

export default class FX {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(0, 0, 0)');

        AddToDOM(this.canvas, 'game');

        //  Create our pattern
        this.fill = Grid({ width: 512, cellWidth: 64, color1: '#3566FF', color2: '#6DC1FF' });

        this.ctx = GetContext(this.canvas);


        // this.ctx.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);
        this.ctx.setTransform(1, -0.2, 0.2, 1, 0, 0);

        this.ctx.drawImage(this.fill, 0, 0);

        // this.loop = new MainLoop(60);

        // this.loop.begin = (t => this.begin(t));
        // this.loop.update = (delta => this.update(delta));
        // this.loop.draw = (t => this.draw(t));

        // this.loop.start();

    }

    begin () {

        Clear(this.ctx);

    }

    update (delta) {
    }

    draw (i) {
    }


}

new FX();
