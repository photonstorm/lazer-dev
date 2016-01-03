import Grid from 'create/Grid.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        //  Default is 256x256 with 32x32 cells and black / white alternate fill

        let canvas = Grid();

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
