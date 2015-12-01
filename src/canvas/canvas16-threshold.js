import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import Threshold from 'canvas/effects/Threshold.js';
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

        const ctx = GetContext(this.canvas);

        ctx.drawImage(file.data, 0, 0);

        // Threshold(100, ctx);
        Threshold(100, ctx, 0, 0, 160, 200);
        // Threshold(100, ctx, 60, 0, 160, 200);
        // Threshold(100, ctx, 160, 0, 160, 200);
        // Threshold(100, ctx, 200, 100, 160, 200);

    }

}

new CanvasTest();
