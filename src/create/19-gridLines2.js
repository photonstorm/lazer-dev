import Grid from 'create/Grid.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        //  Here we use a custom line color

        let canvas = Grid({ drawLines: true, lineColor: '#FF00FF', color1: '#CCCCCC', color2: '#E6E6E6' });

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
