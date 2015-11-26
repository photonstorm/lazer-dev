import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import GetImageData from 'canvas/imagedata/GetImageData.js';
import PutImageData from 'canvas/imagedata/PutImageData.js';
import Distort from 'canvas/filters/Distort.js';
import Loader from 'loader/Loader.js';

export default class CanvasTest {

    constructor () {

        this.canvas = Canvas(512, 256);

        AddToDOM(this.canvas, 'game');

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('jelly').then((file) => this.loadComplete(file));

        this.loader.start();

    }

    loadComplete (file) {

        const ctx = GetContext(this.canvas);

        ctx.drawImage(file.data, 0, 0);

        const imageData = GetImageData(ctx, 0, 0, 256, 256);

        Distort(imageData, 0.5, 0.5);

        PutImageData(ctx, imageData, 256, 0);

    }

}

new CanvasTest();
