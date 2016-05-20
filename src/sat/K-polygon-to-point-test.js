// SAT modules
import PolygonToPoint from 'sat/collision/point/PolygonToPointTest.js'
import Vec2 from 'math/vector/vec2/Vec2.js'
    // Rendering
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

function drawPoly(ctx, vertices) {
    if (vertices.length > 2) {
        ctx.beginPath();
        ctx.moveTo(vertices[0][0], vertices[0][1]);
        for (var i = 1; i < vertices.length; ++i) {
            ctx.lineTo(vertices[i][0], vertices[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#fff';
        for (var i = 0; i < vertices.length; ++i) {
            ctx.fillRect(vertices[i][0] - 2, vertices[i][1] - 2, 4, 4);
        }
    }
}

export default class PolygonToPolygonGraphics {

    constructor() {

        let offset = new Vec2(206, 206);
        let canvas;
        let ctx;

        let poly0 = [
            new Vec2(offset.x + 50, offset.y + 0),
            new Vec2(offset.x + 100, offset.y + 100),
            new Vec2(offset.x + 0, offset.y + 100),
        ];

        offset.set(0,0);;

        canvas = Canvas(512, 512);
        canvas.style.cursor = 'none';
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            offset.x = evt.clientX - evt.target.offsetLeft;
            offset.y = evt.clientY - evt.target.offsetTop;
        });

        function loop() {
            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#00ff00';
            // *** This is what really matters. ***
            if (PolygonToPoint(offset, poly0)) {
                ctx.fillStyle = '#ff0000';
                ctx.strokeStyle = '#ff0000';
            }
            requestAnimationFrame(loop);
            ctx.clearRect(0, 0, 512, 512);
            drawPoly(ctx, poly0);
            ctx.fillRect(offset.x, offset.y, 1, 1);
            //drawPoly(ctx, poly1);
        }
        loop();
    }
}

new PolygonToPolygonGraphics();