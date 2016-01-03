import Grid from 'create/Grid.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        //  New size, including slightly cut-off height

        let canvas = Grid({ width: 512, height: 300 });

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
