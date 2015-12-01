import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import GetImageData from 'canvas/imagedata/GetImageData.js';
import GetIndex from 'canvas/imagedata/GetIndex.js';
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

        console.log(imageData.width, 'x', imageData.height, 'len', imageData.data.length);

        console.log('0 x 0 - index', GetIndex(imageData, 0, 0));
        console.log('1 x 0 - index', GetIndex(imageData, 1, 0));
        console.log('10 x 0 - index', GetIndex(imageData, 10, 0));
        console.log('0 x 1 - index', GetIndex(imageData, 0, 1));
        console.log('32 x 32 - index', GetIndex(imageData, 32, 32));
        console.log('42 x 199 - index', GetIndex(imageData, 42, 199));
        console.log('77 x 3 - index', GetIndex(imageData, 77, 3));
        console.log('9 x 178 - index', GetIndex(imageData, 9, 178));
        console.log('319 x 199 - index', GetIndex(imageData, 319, 199));

    }

}

new CanvasTest();
