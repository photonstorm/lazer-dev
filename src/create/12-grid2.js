import Grid from 'create/Grid.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        //  With alternate false you get vertical strips

        let canvas = Grid({ alternate: false });

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
