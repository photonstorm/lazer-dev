import Triangulate from 'geom/earclipping/Triangulate.js'
import ToCCW from 'geom/earclipping/ToCCW.js'
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
    }
    for (var i = 0; i < vertices.length; ++i) {
        ctx.fillRect(vertices[i][0] - 2, vertices[i][1] - 2, 4, 4);
    }
}

export default class TriangulateGraphics {

    constructor() {

        let mouse = new Vec2(0, 0);
        let canvas;
        let ctx;
        let currentPolygon = [];
        let ears = null;
        let hideEars = false;
        let instructions = document.createElement('div');
        instructions.style = 'color: #fff; font-size: 12px; font-family: Arial;'
        instructions.innerHTML = '*** Only Works for CCW Polygons ***<br>Click to add new vertex<br>Press X to remove last vertex<br>Press Z to hide triangulation result.';
        document.getElementById('game').appendChild(instructions);

        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            mouse.x = evt.clientX - evt.target.offsetLeft;
            mouse.y = evt.clientY - evt.target.offsetTop;
        });
        canvas.addEventListener('mousedown', function (evt) {
            currentPolygon.push(new Vec2(
                evt.clientX - evt.target.offsetLeft,
                evt.clientY - evt.target.offsetTop));

            currentPolygon = ToCCW(currentPolygon);
            if (currentPolygon.length > 3)
                ears = Triangulate(currentPolygon);
        });
        window.addEventListener('keyup', function (evt) {
            if (evt.keyCode === 88) {
                currentPolygon.pop();
                if (currentPolygon.length > 3)
                    ears = Triangulate(currentPolygon);
            } else if (evt.keyCode === 90) {
                hideEars = false;
            }
        });
        window.addEventListener('keydown', function (evt) {
            if (evt.keyCode === 90) {
                hideEars = true;
            }
        });

        function loop() {
            requestAnimationFrame(loop);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            drawPoly(ctx, currentPolygon);
            if (ears && ears.length > 0 && !hideEars) {
                ctx.fillStyle = '#00ff00';
                ctx.fillStyle = '#00ff00';
                for (let index = 0; index < ears.length; ++index) {
                    drawPoly(ctx, ears[index]);
                }
            }
        }
        loop();
    }
}

new TriangulateGraphics();