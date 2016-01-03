import Grid from 'create/Grid.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        //  drawLines allows you to draw lines around each grid cell

        let canvas = Grid({ drawLines: true });

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
