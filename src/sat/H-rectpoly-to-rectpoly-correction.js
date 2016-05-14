// SAT modules
import RectPolygonToRectPolygonCorrection from 'sat/collision/RectPolygonToRectPolygonCorrection.js'
import CorrectionData from 'sat/collision/CorrectionData.js'
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

export default class RectPolygonToRectPolygonGraphics {

    constructor() {
        let correctionData = new CorrectionData();
        let offset = new Vec2(206, 206);
        let canvas;
        let ctx;
        let angle = 0;
        let cos = Math.cos;
        let sin = Math.sin;
        let poly0 = [
            new Vec2(offset.x + 0, offset.y + 0),
            new Vec2(offset.x + 100, offset.y + 0),
            new Vec2(offset.x + 100, offset.y + 100),
            new Vec2(offset.x + 0, offset.y + 100)
        ];

        let poly1 = [
            new Vec2(0, 0),
            new Vec2(50, 0),
            new Vec2(50, 50),
            new Vec2(0, 50)
        ];

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
            let transformedPoly1 = new Array(4);

            for (let index = 0; index < 4; ++index) {
                transformedPoly1[index] = [
                    offset.x + poly1[index].x * cos(angle) - poly1[index].y * sin(angle),
                    offset.y + poly1[index].x * sin(angle) + poly1[index].y * cos(angle)
                ];
            }

            // *** This is what really matters. ***
            if (RectPolygonToRectPolygonCorrection(poly0, transformedPoly1, correctionData)) {
                ctx.fillStyle = '#ff0000';
                ctx.strokeStyle = '#ff0000';
                let resultPoly = new Array(transformedPoly1.length)
                for (var i = 0; i < resultPoly.length; ++i) {
                    resultPoly[i] = [
                        transformedPoly1[i][0] + correctionData.correction[0],
                        transformedPoly1[i][1] + correctionData.correction[1]
                    ];
                }
                drawPoly(ctx, resultPoly);
            }
            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#00ff00';

            drawPoly(ctx, poly0);
            drawPoly(ctx, transformedPoly1);
            angle += 0.01;
        }
        loop();
    }
}

new RectPolygonToRectPolygonGraphics();