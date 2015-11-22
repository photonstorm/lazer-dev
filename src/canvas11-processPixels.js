import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import GetImageData from 'canvas/imagedata/GetImageData.js';
import Process from 'canvas/imagedata/Process.js';
import Loader from 'loader/Loader.js';

export default class CanvasTest {

    constructor () {

        this.canvas = Canvas(320, 200);

        AddToDOM(this.canvas, 'game');

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('agent-t-buggin-acf_logo').then((file) => this.loadComplete(file));

        this.loader.start();

    }

    loadComplete (file) {

        //  Draw the image

        const ctx = GetContext(this.canvas);

        ctx.drawImage(file.data, 0, 0);

        const imageData = GetImageData(ctx);

        // Process(imageData, this.greyScale);
        Process(imageData, this.greyScale, 0, 0, 160, 200);
        // Process(imageData, this.greyScale, 60, 0, 160, 200);
        // Process(imageData, this.greyScale, 160, 0, 160, 200);
        // Process(imageData, this.greyScale, 200, 100, 160, 200);

        ctx.putImageData(imageData, 0, 0);

    }

    greyScale (x, y, r, g, b, a) {

        let avg = (r + g + b) / 3;

        r = avg;
        g = avg;
        b = avg;

        return [ r, g, b, a ];

    }

}

new CanvasTest();
