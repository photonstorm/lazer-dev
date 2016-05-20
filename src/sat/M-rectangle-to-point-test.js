// SAT modules
import RectangleToPointTest from 'sat/collision/point/RectangleToPointTest.js'
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
        let point = [0, 0];

        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            point[0] = evt.clientX - evt.target.offsetLeft;
            point[1] = evt.clientY - evt.target.offsetTop;
        });
        canvas.style.cursor = 'none';

        function loop() {
            requestAnimationFrame(loop);
            ctx.clearRect(0, 0, 512, 512);

            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#00ff00';
            // *** This is what really matters. ***
            if (RectangleToPointTest(point, rect0)) {
                ctx.fillStyle = '#ff0000';
                ctx.strokeStyle = '#ff0000';
            }
            
            drawRect(ctx, rect0);
            ctx.fillStyle = '#fff';
            ctx.fillRect(point[0], point[1], 1, 1);
        }
        loop();
    }
}

new RectToRectGraphics();