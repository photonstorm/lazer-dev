import Clock from 'time/Clock.js';
import MasterClock from 'time/MasterClock.js';
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

        this.master = new MasterClock();

        this.clock1 = this.master.add(1000/60); // 60fps
        this.clock2 = this.master.add(1000/30); // 30fps
        this.clock3 = this.master.add(1000); // 1fps

        this.master.init(() => this.update());

    }

    update () {

        this.ctx.clearRect(0, 0, 512, 256);

        this.ctx.fillText('Master: ' + this.master.time, 16, 30);
        this.ctx.fillText('Clock1: ' + this.clock1.time, 16, 60);
        this.ctx.fillText('Clock2: ' + this.clock2.time, 16, 90);
        this.ctx.fillText('Clock3: ' + this.clock3.time, 16, 120);

        this.ctx.fillText('Tick: ' + this.clock1.tickSize, 300, 60);
        this.ctx.fillText('Tick: ' + this.clock2.tickSize, 300, 90);
        this.ctx.fillText('Tick: ' + this.clock3.tickSize, 300, 120);

    }

}

new ClockTest();
