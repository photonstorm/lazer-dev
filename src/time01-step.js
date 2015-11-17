import Clock from 'time/MasterClock.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

export default class ClockTest {

    constructor () {

        this.canvas = Canvas(512, 256);

        BackgroundColor(this.canvas, 'rgb(0, 0, 50)');

        AddToDOM(this.canvas, 'game');

        this.ctx = this.canvas.getContext('2d');

        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this.ctx.font = '14px Courier';

        this.clock = new Clock();

        this.clock.init(() => this.update());

    }

    update () {

        this.ctx.clearRect(0, 0, 512, 256);

        this.ctx.fillText('Time: ' + this.clock.time, 16, 30);
        this.ctx.fillText('Elapsed: ' + this.clock.elapsed, 16, 60);
        this.ctx.fillText('Total Elapsed: ' + this.clock.totalElapsed, 16, 90);

    }

}

new ClockTest();
