import RenderToCanvas from 'create/RenderToCanvas.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        //  Render sprite data to a new canvas, using a bigger 'pixel' size
        //  As Arne16 is the default palette we don't need to specify it

        let data = [
            ' 333 ',
            ' 777 ',
            'E333E',
            ' 333 ',
            ' 3 3 '
        ];

        let canvas = RenderToCanvas(data, { pixelWidth: 16 });

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
