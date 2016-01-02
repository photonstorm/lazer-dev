import { PALETTE_ARNE } from 'create/palettes/Arne16.js';
import RenderToCanvas from 'create/RenderToCanvas.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

export default class CanvasGraphics {

    constructor () {

        let data = [
            ' 333 ',
            ' 777 ',
            'E333E',
            ' 333 ',
            ' 3 3 '
        ];

        let canvas = RenderToCanvas(data, null, PALETTE_ARNE, 16, 16);

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
