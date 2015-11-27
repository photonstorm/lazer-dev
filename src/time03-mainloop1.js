import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

export default class MainLoopTest {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(0, 0, 50)');

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this.ctx.font = '14px Courier';

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

        this.x1 = 0;
        this.x2 = 0;
        this.vx1 = 200;
        this.vx2 = 200;

    }

    begin () {

        this.ctx.clearRect(0, 0, 800, 600);

    }

    update (delta) {

        this.px = this.x1;

        this.x1 += (this.vx1 * this.loop.physicsStep);

        this.x2 += (this.vx2 * this.loop.physicsStep);

        if (this.x1 >= 800 || this.x1 < 0)
        {
            this.vx1 *= -1;
        }

        if (this.x2 >= 800 || this.x2 < 0)
        {
            this.vx2 *= -1;
        }

    }

    draw (i) {

        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this.ctx.fillText('i: ' + i, 16, 30);
        this.ctx.fillText('FTS: ' + this.loop.framesThisSecond, 16, 60);
        this.ctx.fillText('FD: ' + this.loop.frameDelta, 16, 90);
        this.ctx.fillText('fps: ' + this.loop.fps, 16, 120);

        //  interpolated
        let tx = (this.px + (this.x1 - this.px) * i);
        this.ctx.fillRect(tx, 200, 128, 128);

        //  non-interpolated

        this.ctx.fillStyle = 'rgba(255, 0, 255, 1)';
        this.ctx.fillRect(this.x2, 400, 128, 128);

    }

}

new MainLoopTest();
