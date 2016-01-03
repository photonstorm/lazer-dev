import Grid from 'create/Grid.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        //  If you set a color to undefined, null or false it will not render that cell, leaving
        //  it transparent

        let canvas = Grid({ color1: '#3566FF', color2: null });

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
