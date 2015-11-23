import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import Fill from 'canvas/graphics/Fill.js';
import DrawImage from 'canvas/DrawImage.js';
import * as ImageRendering from 'canvas/ImageRendering.js';
import * as Smoothing from 'canvas/Smoothing.js';
import DegToRad from 'math/DegToRad.js';
import Loader from 'loader/Loader.js';

export default class CanvasTest {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        ImageRendering.crisp(this.canvas);

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('mushroom2').then((file) => this.loadComplete(file));

        this.loader.start();

    }

    loadComplete (file) {

        const ctx = GetContext(this.canvas);

        Smoothing.disable(ctx);

        Fill(ctx, 120, 0, 120);

        DrawImage(ctx, file.data, { 
            x: 400, y: 300, 
            width: 16,
            anchorX: 0.5, anchorY: 0.5, 
            scaleX: 4, scaleY: 4, 
            rotate: DegToRad(45) 
        });

    }

}

new CanvasTest();
