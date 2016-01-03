import Grid from 'create/Grid.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        //  Here we use a custom line color and no cell fills

        let canvas = Grid({ drawLines: true, lineColor: '#FF00FF', color1: null, color2: null });

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
