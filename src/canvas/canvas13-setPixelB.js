import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import AddToDOM from 'dom/AddToDOM.js';
import SetPixel from 'canvas/pixels/SetPixel.js';
import Loader from 'loader/Loader.js';
import Between from 'math/Between.js';

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

        //  Draw 200 random pixels

        for (let i = 0; i < 200; i++)
        {
            SetPixel(ctx, Between(0, 320), Between(0, 200), 255, 255, 255);
        }

    }

}

new CanvasTest();
