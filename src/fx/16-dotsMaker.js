import Between from 'math/Between.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import Clear from 'canvas/graphics/Clear.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import MainLoop from 'system/MainLoop.js';
import SinusDots from 'fx/sinusdots/SinusDots.js';
import Key from 'input/keyboard/Key.js';
import AddKeyDown from 'input/keyboard/events/AddKeyDown.js';
import AddKeyUp from 'input/keyboard/events/AddKeyUp.js';
import ProcessKeyDown, { onDown } from 'input/keyboard/events/ProcessKeyDown.js';
import ProcessKeyUp, { onUp } from 'input/keyboard/events/ProcessKeyUp.js';
import Loader from 'loader/Loader.js';

export default class FX {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(0, 0, 0)');

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = '16px courier';

        this.sinusdots = new SinusDots({ x: 400, y: 300 });

        this.isDown = false;
        this.downTime = 0;
        this.keyInc = 1;
        this.useImage = false;

        //  Loader
        this.image = null;
        this.loader = new Loader();
        this.loader.path = 'assets/';
        this.loader.image('blue_ball').then((file) => this.loadComplete(file));
        this.loader.start();

    }

    loadComplete (file) {

        this.image = file.data;

        onDown.add(event => this.keyDown(event));
        onUp.add(event => this.keyUp(event));

        AddKeyDown(window, e => ProcessKeyDown(e, null, true));
        AddKeyUp(window, e => ProcessKeyUp(e, null, true));

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    keyUp (event) {

        this.isDown = false;

    }

    keyDown (event) {

        if (!this.isDown)
        {
            this.downTime = event.timeStamp;
            this.isDown = true;
            this.keyInc = 1;
        }
        else
        {
            //  Repeat press
            if (event.timeStamp - this.downTime > 500)
            {
                this.downTime = event.timeStamp;
                this.keyInc *= 2;

                if (this.keyInc > 128)
                {
                    this.keyInc = 128;
                }
                else if (this.keyInc < -128)
                {
                    this.keyInc = -128;
                }
            }
        }

        // console.log(event.keyCode);
        
        let s = this.sinusdots;

        switch (event.keyCode)
        {
            //  F1
            case 112:
                s.x1 += this.keyInc;
                break;

            //  F2
            case 113:
                s.x1 -= this.keyInc;
                break;

            //  F3
            case 114:
                s.y1 += this.keyInc;
                break;

            //  F4
            case 115:
                s.y1 -= this.keyInc;
                break;

            //  F5
            case 116:
                s.x2 += this.keyInc;
                break;

            //  F6
            case 117:
                s.x2 -= this.keyInc;
                break;

            //  F7
            case 118:
                s.y2 += this.keyInc;
                break;

            //  F8
            case 119:
                s.y2 -= this.keyInc;
                break;

            //  LEFT
            case 37:
                if (event.shiftKey) { s.x4 -= this.keyInc; } else { s.x3 -= this.keyInc; }
                break;

            //  UP
            case 38:
                if (event.shiftKey) { s.y4 += this.keyInc; } else { s.y3 += this.keyInc; }
                break;

            //  RIGHT
            case 39:
                if (event.shiftKey) { s.x4 += this.keyInc; } else { s.x3 += this.keyInc; }
                break;

            //  DOWN
            case 40:
                if (event.shiftKey) { s.y4 -= this.keyInc; } else { s.y3 -= this.keyInc; }
                break;

            //  Dump (SPACE)
            case 32:
                let t = `xInc: ${s.xInc}, yInc: ${s.yInc}, width: ${s.width}, height: ${s.height}, x1: ${s.x1}, y1: ${s.y1}, x2: ${s.x2}, y2: ${s.y2}, x3: ${s.x3}, y3: ${s.y3}, x4: ${s.x4}, y4: ${s.y4}`;
                console.log('{ ' + t + ' }');
                break;

            //  Set 1 (1)
            case 49:
                s.loadData({ x1: 7779, y1: -32703, x2: 0, y2: 0, x3: 232, y3: 274, x4: -204, y4: 130 });
                break;

            //  Set 2 (2)
            case 50:
                s.loadData({ x1: 7964, y1: 39680, x2: 21, y2: 64, x3: 169, y3: 292, x4: -119, y4: 356 });
                break;

            //  Set 3 (3)
            case 51:
                s.loadData({ x1: -309, y1: -16255, x2: 277, y2: 188, x3: 97, y3: 198, x4: -255, y4: 512 });
                break;

            //  Set 4 (4)
            case 52:
                s.loadData({ x1: -1093, y1: -1855, x2: 757, y2: 1014, x3: 846, y3: 572, x4: -274, y4: 408 });
                break;

            //  Set 5 (5)
            case 53:
                s.loadData({ x1: 864, y1: 2328, x2: 408, y2: 1014, x3: 421, y3: 1220, x4: 18, y4: 94 });
                break;

            //  Set 6 (6)
            case 54:
                s.loadData({ x1: -12, y1: 2952, x2: 737, y2: 1518, x3: -357, y3: -833, x4: 40, y4: 46 });
                break;

            //  Set 7 (7)
            case 55:
                s.loadData({ x1: 598, y1: 598, x2: 598, y2: 598, x3: 893, y3: 898, x4: 482, y4: 816 });
                break;

            //  Set 8 (8)
            case 56:
                s.loadData({ x1: 243, y1: 276, x2: 404, y2: 484, x3: 1259, y3: 1144, x4: 916, y4: 1268 });
                break;

            //  Set 9 (9)
            case 57:
                s.loadData();
                break;

            //  Random! (R)
            case 82:
                if (event.shiftKey)
                {
                    s.x1 = Between(-500, 500);
                    s.y1 = Between(-10000, 10000);
                    s.x2 = Between(0, 1024);
                    s.y2 = Between(0, 1024);
                    s.x3 = Between(-512, 512);
                    s.y3 = Between(-512, 512);
                    s.x4 = Between(-512, 512);
                    s.y4 = Between(-512, 512);
                }
                else
                {
                    s.x1 = Between(-250, 250);
                    s.y1 = Between(-5000, 5000);
                    s.x2 = Between(-128, 512);
                    s.y2 = Between(-128, 512);
                    s.x3 = Between(-256, 256);
                    s.y3 = Between(-256, 256);
                    s.x4 = Between(-256, 256);
                    s.y4 = Between(-256, 256);
                }
                break;

            //  xInc / width (A)
            case 65:
                if (event.shiftKey) { s.xInc--; } else { s.width--; }
                break;

            //  xInc / width (D)
            case 68:
                if (event.shiftKey) { s.xInc++; } else { s.width++; }
                break;

            //  yInc / height (W)
            case 87:
                if (event.shiftKey) { s.yInc++; } else { s.height++; }
                break;

            //  yInc / height (S)
            case 83:
                if (event.shiftKey) { s.yInc--; } else { s.height--; }
                break;

            //  Toggle dots / balls (I)
            case 73:
                this.useImage = (this.useImage) ? false : true;
                break;
        }

    }

    begin () {

        Clear(this.ctx);

    }

    update (delta) {

        this.sinusdots.update();

    }

    draw (i) {

        if (this.useImage)
        {
            this.sinusdots.renderImage(i, this.ctx, this.image);
        }
        else
        {
            this.ctx.fillStyle = '#fff';
            this.sinusdots.renderDot(i, this.ctx, 2);
        }

        this.ctx.fillStyle = '#00ff00';

        this.ctx.fillText('F1 / F2        x1: ' + this.sinusdots.x1, 32, 96);
        this.ctx.fillText('F3 / F4        y1: ' + this.sinusdots.y1, 32, 128);

        this.ctx.fillText('LEFT / RIGHT   x3: ' + this.sinusdots.x3, 32, 32);
        this.ctx.fillText('UP / DOWN      y3: ' + this.sinusdots.y3, 32, 64);

        this.ctx.fillText('A / D       width: ' + this.sinusdots.width, 32, 512);
        this.ctx.fillText('W / S      height: ' + this.sinusdots.height, 32, 544);

        //  Right column

        this.ctx.fillText('F5 / F6                 x2: ' + this.sinusdots.x2, 400, 96);
        this.ctx.fillText('F7 / F8                 y2: ' + this.sinusdots.y2, 400, 128);

        this.ctx.fillText('Shift + LEFT / RIGHT    x4: ' + this.sinusdots.x4, 400, 32);
        this.ctx.fillText('Shift + UP / DOWN       y4: ' + this.sinusdots.y4, 400, 64);

        this.ctx.fillText('Shift + A / D         xInc: ' + this.sinusdots.xInc, 400, 512);
        this.ctx.fillText('Shift + W / S         yInc: ' + this.sinusdots.yInc, 400, 544);

        //  Bottom
        this.ctx.fillText('[1 to 9] Waves   [R + Shift] Random   [I] Toggle Dots    [Space] Dump', 32, 576);

    }

}

new FX();
