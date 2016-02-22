import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import Clear from 'canvas/graphics/Clear.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import MainLoop from 'system/MainLoop.js';

export default class FX {

    constructor () {

        this.canvas = Canvas(640, 480);

        BackgroundColor(this.canvas, 'rgb(0, 0, 0)');

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.size = 60;
        this.x = 0;
        this.y = 0;
        this.x1 = this.size;
        this.y1 = this.size;
        this.xs = 2;
        this.ys = 1;
        this.xs1 = -1;
        this.ys1 = -2;
        this.xf = 0;
        this.yf = 0;
        this.sh = 8;

        this.vy = [];
        this.vy2 = [];
        this.vx = [];
        this.vx2 = [];

        this.lx = 0;
        this.c1 = 0;
        this.c2 = 255;
        this.c3 = 0;
        this.i = 0;
        this.di = 0;


        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        Clear(this.ctx);

    }

    update (delta) {

        this.vx[0] = this.x * this.x;
        this.vx2[0] = this.x1 * this.x1;
        this.vy[0] = this.y * this.y;
        this.vy2[0] = this.y1 * this.y1;

        for (let a = 1; a < this.size; a++)
        {
            let b = this.y - a;
            this.vy[a] = b * b;
            b = this.y1 - a;
            this.vy2[a] = b * b;
            b = this.x - a;
            this.vx[a] = b * b;
            b = this.x1 - a;
            this.vx2[a] = b * b;
        }

        for (let a = 0; a < this.size; a++)
        {
            let sy = this.yf + (a * this.sh);
            let sy2 = this.yf + (a * 8) + 8;
            let d = this.vy[a];
            let f = this.vy2[a];

            for (let b = 0; b < this.size; b++)
            {
                let h = (f + this.vx2[b]) * (d + this.vx[b]);

                if (h < 32768)
                {
                    h = 255 - (h / 128);

                    this.c1 = 0;
                    this.c2 = h + b;
                    this.c3 = (b + h + a) / 2;

                    if (this.c2 > 255) { this.c2 = 255; }
                    if (this.c3 > 255) { this.c3 = 255; }

                    this.ctx.fillStyle = 'rgb(' + this.c2 + ',' + this.c3 + ',' + this.i + ')';

                    let b1 = this.xf + (b * 10);
                    let b3 = this.xf + ((b + 1) * 10);

                    this.ctx.fillRect(b1, sy, b3-b1, sy2-sy);
                }
            }
        }

        this.x += this.xs;
        this.y += this.ys;

        this.x1 += this.xs1;
        this.y1 += this.ys1;

        if (this.x < 0 || this.x > this.size)
        {
            this.xs = -this.xs;
        }

        if (this.y < 0 || this.y > this.size)
        {
            this.ys = -this.ys;
        }

        if (this.x1 < 0 || this.x1 > this.size)
        {
            this.xs1 = -this.xs1;
        }

        if (this.y1 < 0 || this.y1 > this.size)
        {
            this.ys1 = -this.ys1;
        }

        // Rotate the colour of the blobs

        if (this.di === 0)
        {
            this.i++;

            if (this.i === 255)
            {
                this.di = 1;
            }
        }
        else
        {
            this.i--;

            if (this.i === 0)
            {
                this.di = 0;
            }
        }

    }

    draw (i) {


    }


}

new FX();
