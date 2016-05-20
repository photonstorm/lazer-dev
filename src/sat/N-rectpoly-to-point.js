// SAT modules
import RectPolygonToPointTest from 'sat/collision/point/RectPolygonToPointTest.js'
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

export default class RectPolygonToPointGraphics {

    constructor() {

        let offset = new Vec2(206, 206);
        let canvas;
        let ctx;
        let angle = 0;
        let cos = Math.cos;
        let sin = Math.sin;
        let poly1 = [
            new Vec2(0, 0),
            new Vec2(50, 0),
            new Vec2(50, 50),
            new Vec2(0, 50)
        ];
        let point = new Vec2();

        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            point.x = evt.clientX - evt.target.offsetLeft;
            point.y = evt.clientY - evt.target.offsetTop;
        });
        canvas.style.cursor = 'none';

        function loop() {
            requestAnimationFrame(loop);
            ctx.clearRect(0, 0, 512, 512);

            let transformedPoly1 = new Array(4);
            for (let index = 0; index < 4; ++index) {
                transformedPoly1[index] = [
                    offset.x + poly1[index].x * cos(angle) - poly1[index].y * sin(angle),
                    offset.y + poly1[index].x * sin(angle) + poly1[index].y * cos(angle)
                ];
            }

            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#00ff00';
            // *** This is what really matters. ***
            if (RectPolygonToPointTest(point, transformedPoly1)) {
                ctx.fillStyle = '#ff0000';
                ctx.strokeStyle = '#ff0000';
            }

            drawPoly(ctx, transformedPoly1);
            ctx.fillStyle = '#fff';
            ctx.fillRect(point[0], point[1], 1, 1);
            angle += 0.01;
        }
        loop();
    }
}

new RectPolygonToPointGraphics();