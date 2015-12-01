import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import AddToDOM from 'dom/AddToDOM.js';
import * as SetPixels from 'canvas/pixels/SetPixels.js';
import GetImageData from 'canvas/imagedata/GetImageData.js';
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

        //  Get the ImageData
        const imageData = GetImageData(ctx);

        //  Expects the ImageData to contain the full canvas (maybe optimise?)
        SetPixels.load(ctx, imageData);

        //  Draw 3 diagonal lines
        for (let x = 0; x < 64; x++)
        {
            SetPixels.set(x, x, 255);
            SetPixels.set(x + 1, x, 0, 255);
            SetPixels.set(x + 2, x, 0, 0, 255);
        }

        //  Write it back to the Canvas context
        SetPixels.write();

    }

}

new CanvasTest();
