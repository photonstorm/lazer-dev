import Grid from 'create/Grid.js';
import AddToDOM from 'dom/AddToDOM.js';
import FillGradient from 'canvas/graphics/FillGradient.js';
import Rectangle from 'canvas/graphics/Rectangle.js';
import LinearGradient from 'canvas/graphics/LinearGradient.js';

export default class CanvasGraphics {

    constructor () {

        //  Here we use a postRender callback to fill the canvas after it has had the Grid applied

        let canvas = Grid({ postRender: (canvas, ctx) => this.addGradient(canvas, ctx) });

        AddToDOM(canvas, 'game');

    }

    //  This is the postRender callback, it is sent two arguments: The Canvas and the Context
    addGradient (canvas, ctx) {

        let p = LinearGradient(ctx, 0, 0, 0, canvas.height * 2, [ 0, 'rgba(255,0,255,0.5)', 0.5, 'rgba(50,255,255,0.5)', 1, 'rgba(50,50,255,0.5)' ]);

        Rectangle(ctx, 0, 0, canvas.width, canvas.height);

        FillGradient(ctx, p);

    }

}

new CanvasGraphics();
