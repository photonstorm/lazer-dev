import { PALETTE_ARNE } from 'create/palettes/Arne16.js';
import RenderToCanvas from 'create/RenderToCanvas.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(800, 300);

        BackgroundColor(this.canvas, 'rgb(0, 0, 20)');

        AddToDOM(this.canvas, 'game');

        let data = [
            ' 333 ',
            ' 777 ',
            'E333E',
            ' 333 ',
            ' 3 3 '
        ];

        RenderToCanvas(data, this.canvas, PALETTE_ARNE);

    }

}

new CanvasGraphics();
