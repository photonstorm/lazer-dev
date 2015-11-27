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

        this.distance = 300;
        this.speed = 300;
        this.stars = [];

        this.max = 400;
        this.xx = [];
        this.yy = [];
        this.zz = [];

        for (var i = 0; i < this.max; i++)
        {
            this.xx[i] = Math.floor(Math.random() * 800) - 400;
            this.yy[i] = Math.floor(Math.random() * 600) - 300;
            this.zz[i] = Math.floor(Math.random() * 2000);

            this.stars.push({ x: this.xx[i], y: this.yy[i], px: this.xx[i], py: this.yy[i], perspective: 0 });
        }

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

        for (var i = 0; i < this.max; i++)
        {
            this.stars[i].px = this.stars[i].x;
            this.stars[i].py = this.stars[i].y;

            this.stars[i].perspective = this.distance / (this.distance - this.zz[i]);
            this.stars[i].x = 400 + this.xx[i] * this.stars[i].perspective;
            this.stars[i].y = 300 + this.yy[i] * this.stars[i].perspective;

            this.zz[i] += (this.speed * this.loop.physicsStep);

            if (this.zz[i] > 290)
            {
                this.zz[i] -= 600;
            }

            // stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
            // stars[i].scale.set(stars[i].perspective / 2);
        }

    }

    draw (interpolation) {

        for (var i = 0; i < this.max; i++)
        {
            //  interpolation
            let tx = (this.stars[i].px + (this.stars[i].x - this.stars[i].px) * interpolation);
            let ty = (this.stars[i].py + (this.stars[i].y - this.stars[i].py) * interpolation);
            this.ctx.fillRect(tx, ty, 4, 4);
        }

    }

}

new MainLoopTest();
