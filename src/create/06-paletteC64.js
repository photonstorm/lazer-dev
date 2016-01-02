import { PALETTE_C64 } from 'create/palettes/C64.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import GetContext from 'canvas/GetContext.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(512, 96);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        let i = 0;

        for (let p of PALETTE_C64)
        {
            this.ctx.fillStyle = p;
            this.ctx.fillRect(i, 0, 32, 96);
            i += 32;
        }

    }

}

new CanvasGraphics();
