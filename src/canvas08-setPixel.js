import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import AddToDOM from 'dom/AddToDOM.js';
import SetPixel from 'canvas/pixels/SetPixel.js';
import Loader from 'loader/Loader.js';

export default class CanvasTest {

    constructor () {

        this.canvas = Canvas(320, 200);

        AddToDOM(this.canvas, 'game');

        BackgroundColor(this.canvas, '#000000');

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('agent-t-buggin-acf_logo').then((file) => this.loadComplete(file));

        this.loader.start();

    }

    loadComplete (file) {

        //  Draw the image

        const ctx = GetContext(this.canvas);

        ctx.drawImage(file.data, 0, 0);

        //  Draws 4 purple pixels at 32x22

        SetPixel(ctx, 32, 22, 255, 0, 255);
        SetPixel(ctx, 33, 22, 255, 0, 255);
        SetPixel(ctx, 32, 23, 255, 0, 255);
        SetPixel(ctx, 33, 23, 255, 0, 255);

    }

}

new CanvasTest();
