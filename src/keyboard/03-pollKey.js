import Key from 'input/keyboard/Key.js';
import * as KeyDown from 'input/keyboard/events/KeyDown.js';
import * as KeyUp from 'input/keyboard/events/KeyUp.js';
import * as ProcessKeyEvent from 'input/keyboard/ProcessKeyEvent.js';
import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import Star from 'canvas/shapes/Star.js';

export default class CanvasGraphics {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(50, 60, 70)');

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        this.star = new Star({ x: 400, y: 300, fill: 'rgba(255, 255, 0, 1)' });

        //  Keyboard handler

        this.leftKey = Key('z');
        this.rightKey = Key('x');

        ProcessKeyEvent.list.add(this.leftKey);
        ProcessKeyEvent.list.add(this.rightKey);

        KeyDown.add(window, ProcessKeyEvent.down);
        KeyUp.add(window, ProcessKeyEvent.up);

        //  MainLoop

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        this.ctx.clearRect(0, 0, 800, 600);

    }

    update (delta) {

        if (this.leftKey.isDown)
        {
            this.star.angle -= 2;
        }
        else if (this.rightKey.isDown)
        {
            this.star.angle += 2;
        }

    }

    draw (i) {

        this.star.draw(this.ctx, i);

    }

}

new CanvasGraphics();
