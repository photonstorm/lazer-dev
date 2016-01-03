import Grid from 'create/Grid.js';
import AddToDOM from 'dom/AddToDOM.js';
import FillGradient from 'canvas/graphics/FillGradient.js';
import Rectangle from 'canvas/graphics/Rectangle.js';
import LinearGradient from 'canvas/graphics/LinearGradient.js';

export default class CanvasGraphics {

    constructor () {

        //  Here we use a preRender callback to fill the canvas before it gets the Grid applied

        let canvas = Grid({ 
            preRender: (canvas, ctx) => this.addGradient(canvas, ctx), 
            color1: 'rgba(100, 100, 100, 0.5)', 
            color2: 'rgba(100, 100, 100, 0.3)' 
        });

        AddToDOM(canvas, 'game');

    }

    //  This is the preRender callback, it is sent two arguments: The Canvas and the Context
    addGradient (canvas, ctx) {

        let p = LinearGradient(ctx, 0, 0, 0, canvas.height * 2, [ 0, '#ff00f0', 0.5, '#05fff0', 1, '#8000ff' ]);

        Rectangle(ctx, 0, 0, canvas.width, canvas.height);

        FillGradient(ctx, p);

    }

}

new CanvasGraphics();
