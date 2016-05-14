// SAT modules
import RectangleToRectangleCorrection from 'sat/collision/RectangleToRectangleCorrection.js'
import CorrectionData from 'sat/collision/CorrectionData.js'
import Vec2 from 'math/vector/vec2/Vec2.js'
    // Rendering
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

function drawRect(ctx, rect) {
    ctx.beginPath();
    ctx.rect(rect[0], rect[1], rect[2], rect[3]);
    ctx.closePath();
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.stroke();
}

export default class RectToRectGraphics {

    constructor() {

        let canvas;
        let ctx;
        let rect0 = [206, 206, 100, 100];
        let rect1 = [0, 0, 50, 80];
        let correctionData = new CorrectionData();

        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            rect1[0] = evt.clientX - evt.target.offsetLeft;
            rect1[1] = evt.clientY - evt.target.offsetTop;
        });

        function loop() {
            requestAnimationFrame(loop);
            ctx.clearRect(0, 0, 512, 512);
            // *** This is what really matters. ***
            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#00ff00';
            if (RectangleToRectangleCorrection(rect0, rect1, correctionData)) {
                ctx.fillStyle = '#ff0000';
                ctx.strokeStyle = '#ff0000';
                drawRect(ctx, [rect1[0] + correctionData.correction[0], rect1[1] + correctionData.correction[1], rect1[2], rect1[3]]);
            }
            drawRect(ctx, rect0);
            drawRect(ctx, rect1);
        }
        loop();
    }
}

new RectToRectGraphics();