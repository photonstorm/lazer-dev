// SAT modules
import CircleToCircleCorrection from 'sat/collision/CircleToCircleCorrection.js'
import Vec2 from 'math/vector/vec2/Vec2.js'
import CorrectionData from 'sat/collision/CorrectionData.js'
    // Rendering
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#fff';
    ctx.fillRect(x - 2, y - 2, 4, 4);
}

export default class PolygonToCircleCorrectionGraphics {

    constructor() {

        let offset = new Vec2();
        let canvas;
        let ctx;
        let radius = 40;
        let radius2 = 60;
        let circle2Pos = new Vec2(256, 256);
        let correctionData = new CorrectionData();

        offset.set(0, 0);;

        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            offset.x = evt.clientX - evt.target.offsetLeft;
            offset.y = evt.clientY - evt.target.offsetTop;
        });

        function loop() {
            requestAnimationFrame(loop);
            ctx.clearRect(0, 0, 512, 512);
            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#00ff00';
            // *** This is what really matters. ***
            if (CircleToCircleCorrection(offset, radius, circle2Pos, radius2, correctionData)) {
                ctx.fillStyle = '#ff0000';
                ctx.strokeStyle = '#ff0000';
                drawCircle(ctx, offset.x + correctionData.correction[0], offset.y + correctionData.correction[1], radius);
            }
            drawCircle(ctx, circle2Pos.x, circle2Pos.y, radius2);
            drawCircle(ctx, offset.x, offset.y, radius);
        }
        loop();
    }
}

new PolygonToCircleCorrectionGraphics();