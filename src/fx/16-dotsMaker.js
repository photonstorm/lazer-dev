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
import ProcessKeyDown, { onDown } from 'input/keyboard/events/ProcessKeyDown.js';

export default class FX {

    constructor () {

        this.canvas = Canvas(800, 600);

        BackgroundColor(this.canvas, 'rgb(0, 0, 0)');

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = '16px courier';

        this.sinusdots = new SinusDots({ x: 400, y: 300 });

        onDown.add(event => this.keypress(event));

        AddKeyDown(window, e => ProcessKeyDown(e, null, true));

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    keypress (event) {

        console.log(event.keyCode);
        
        let s = this.sinusdots;

        switch (event.keyCode)
        {
            //  LEFT
            case 37:
                if (event.shiftKey) { s.x4++; } else { s.x3++; }
                break;

            //  UP
            case 38:
                if (event.shiftKey) { s.y4++; } else { s.y3++; }
                break;

            //  RIGHT
            case 39:
                if (event.shiftKey) { s.x4--; } else { s.x3--; }
                break;

            //  DOWN
            case 40:
                if (event.shiftKey) { s.y4--; } else { s.y3--; }
                break;

            //  F3
            case 114:
                s.x1++;
                break;

            //  F4
            case 115:
                s.x1--;
                break;

            //  F5
            case 116:
                s.y1++;
                break;

            //  F6
            case 117:
                s.y1--;
                break;

            //  F7
            case 118:
                s.x2++;
                break;

            //  F8
            case 119:
                s.x2--;
                break;

            //  F9
            case 120:
                s.y2++;
                break;

            //  F10
            case 121:
                s.y2--;
                break;

            //  Dump (SPACE)
            case 32:
                let t = `x1: ${s.x1}, y1: ${s.y1}, x2: ${s.x2}, y2: ${s.y2}, x3: ${s.x3}, y3: ${s.y3}, x4: ${s.x4}, y4: ${s.y4}`;
                console.log('{ ' + t + '}');
                break;

            //  Set 1 (A)
            case 65:
                s.loadData({ x1: 7779, y1: -32703, x2: 0, y2: 0, x3: 232, y3: 274, x4: -204, y4: 130 });
                break;

            //  Set 2 (B)
            case 66:
                s.loadData({ x1: 7964, y1: 39680, x2: 21, y2: 64, x3: 169, y3: 292, x4: -119, y4: 356 });
                break;

            //  Set 3 (C)
            case 67:
                s.loadData({ x1: -309, y1: -16255, x2: 277, y2: 188, x3: 97, y3: 198, x4: -255, y4: 512 });
                break;

            //  Set 4 (D)
            case 68:
                s.loadData({ x1: -1093, y1: -1855, x2: 757, y2: 1014, x3: 846, y3: 572, x4: -274, y4: 408 });
                break;

            //  Set 5 (E)
            case 69:
                s.loadData({ x1: 864, y1: 2328, x2: 408, y2: 1014, x3: 421, y3: 1220, x4: 18, y4: 94 });
                break;

            //  Set 6 (F)
            case 70:
                s.loadData({ x1: -12, y1: 2952, x2: 737, y2: 1518, x3: -357, y3: -833, x4: 40, y4: 46 });
                break;

            //  Set 7 (G)
            case 71:
                s.loadData({ x1: 598, y1: 598, x2: 598, y2: 598, x3: 893, y3: 898, x4: 482, y4: 816 });
                break;

            //  Set 8 (H)
            case 72:
                s.loadData({ x1: 243, y1: 276, x2: 404, y2: 484, x3: 1259, y3: 1144, x4: 916, y4: 1268 });
                break;

            //  Random! (R)
            case 82:
                s.x1 = Between(-1000, 1000);
                s.y1 = Between(-20000, 20000);
                s.x2 = Between(0, 2048);
                s.y2 = Between(0, 2048);
                s.x3 = Between(-1024, 1024);
                s.y3 = Between(-1024, 1024);
                s.x4 = Between(-1024, 1024);
                s.y4 = Between(-1024, 1024);
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

        this.ctx.fillStyle = '#fff';

        this.sinusdots.renderDot(i, this.ctx, 2);

        this.ctx.fillStyle = '#00ff00';

        this.ctx.fillText('LEFT / RIGHT   x3: ' + this.sinusdots.x3, 32, 32);
        this.ctx.fillText('UP / DOWN      y3: ' + this.sinusdots.y3, 32, 64);

        this.ctx.fillText('Shift + LEFT / RIGHT    x4: ' + this.sinusdots.x4, 400, 32);
        this.ctx.fillText('Shift + UP / DOWN       y4: ' + this.sinusdots.y4, 400, 64);

        this.ctx.fillText('F3 / F4        x1: ' + this.sinusdots.x1, 32, 96);
        this.ctx.fillText('F5 / F6        y1: ' + this.sinusdots.y1, 32, 128);

        this.ctx.fillText('F7 / F8                 x2: ' + this.sinusdots.x2, 400, 96);
        this.ctx.fillText('F9 / F10                y2: ' + this.sinusdots.y2, 400, 128);

    }

}

new FX();
