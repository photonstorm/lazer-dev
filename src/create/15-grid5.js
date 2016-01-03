import Grid from 'create/Grid.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        //  The default cell size is 32x32, this time we use 64x64
        //  If you set just the cellWidth then cellHeight will match it automatically.

        let canvas = Grid({ width: 512, cellWidth: 64, color1: '#3566FF', color2: '#6DC1FF' });

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
