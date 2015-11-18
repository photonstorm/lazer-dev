import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import AddToDOM from 'dom/AddToDOM.js';
import MoveHorizontal from 'canvas/MoveHorizontal.js';
import Loader from 'loader/Loader.js';

export default class CanvasTest {

    constructor () {

        this.canvas = Canvas(320, 200);

        this.pic = null;

        BackgroundColor(this.canvas, 'rgb(200, 50, 50)');
        AddToDOM(this.canvas, 'game');

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('agent-t-buggin-acf_logo').then((file) => this.loadComplete(file));

        this.loader.start();

    }

    loadComplete (file) {

        this.pic = file.data;

        //  Draw the image in its initial state
        GetContext(this.canvas).drawImage(this.pic, 0, 0);

        //  Move it left by 100px
        // MoveHorizontal(this.canvas, -100, false);
        MoveHorizontal(this.canvas, -100, true);

        //  Move it right by 100px
        // MoveHorizontal(this.canvas, 100, false);
        // MoveHorizontal(this.canvas, 100, true);

    }

}

new CanvasTest();
