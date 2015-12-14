import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import Fill from 'canvas/graphics/Fill.js';
import Circle from 'canvas/graphics/Circle.js';
import Pattern from 'canvas/graphics/Pattern.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import Clear from 'canvas/graphics/Clear.js';
import Rectangle from 'canvas/shapes/Rectangle.js';

export default class CanvasGraphics {

    constructor () {

        //  Pattern Context
        let patternCanvas = Canvas(64, 64);
        let patternContext = GetContext(patternCanvas);
        Circle(patternContext, 0, 0, 32);
        Circle(patternContext, 64, 64, 32);
        Fill(patternContext, 0, 0, 0, 0.9);

        let patternFill = Pattern(patternCanvas, patternContext);

        //  Drawing canvas
        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.rect = new Rectangle({ x: 400, y: 300, width: 256, anchor: 0.5, lineWidth: 8 });

        let fill1 = this.rect.addFill();
        fill1.setLinearGradientHorizontal(0, '#ff00f0', 0.5, '#05fff0', 1, '#8000ff');

        let fill2 = this.rect.addFill();
        fill2.setPattern(patternFill);

        let fill3 = this.rect.addStroke();
        fill3.setLinearGradientVertical(0, '#ff0000', 0.5, '#ff7f00', 1, '#ffff00');

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        Clear(this.ctx, true);

    }

    update (delta) {

        this.rect.angle++;

    }

    draw (i) {

        this.rect.draw(this.ctx, i);

    }

}

new CanvasGraphics();
