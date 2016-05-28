import {
    RunSimulationFrame
} from 'physics/arcade/PhysicsSystem.js'
import {
    RectangleCollider,
    PolygonCollider
} from 'physics/arcade/Collider.js';
import {
    Collide,
    RunCollisionFrame,
    EmitCollisionCallbacks
} from 'physics/arcade/CollisionSystem.js'
import Body from 'physics/arcade/Body.js'
import Vec2 from 'math/vector/vec2/Vec2.js'
// Rendering
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import MainLoop from 'system/MainLoop.js';

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function drawPoly(ctx, pos, verticesX, verticesY) {
    if (verticesY.length > 2) {
        ctx.beginPath();
        ctx.moveTo(pos.x + verticesX[0], pos.y + verticesY[0]);
        for (var i = 1; i < verticesY.length; ++i) {
            ctx.lineTo(pos.x + verticesX[i], pos.y + verticesY[i]);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        //ctx.fillStyle = '#fff';
        for (var i = 0; i < verticesY.length; ++i) {
            ctx.fillRect(pos.x + verticesX[i] - 2, pos.y + verticesY[i] - 2, 4, 4);
        }
    }
}
export default class App {

    constructor() {
        let mouse = new Vec2(0, 0);
        let canvas = null;
        let ctx = null;
        let bodyA = null;
        let bodyB = null;
        let bodies = [];
        let inc = 0;
        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            mouse.x = evt.clientX - evt.target.offsetLeft;
            mouse.y = evt.clientY - evt.target.offsetTop;
        });
        ctx.fillStyle = '#fff';

        bodyA = new Body(256, 450, new PolygonCollider([
            [-228, -50],
            [-228, -50 + 100],
            [-228 + 456, -50 + 100],
            [20, -90],
            [-128, -90]
        ]));

        bodyA.immovable = true;

        bodyB = new Body(256, 150, new RectangleCollider(-12, -30, 25, 60));

        bodyB.acceleration.y = 0.15;
        bodyB.velocity.x = 1.5;


        function begin() {
            ctx.clearRect(0, 0, 512, 512);
        }

        function update() {
            ctx.fillStyle = ctx.strokeStyle = '#fff';
            RunSimulationFrame(loop.physicsStep);

            Collide(bodyA, bodyB);

            // Run this after all collision request
            // have been done.
            RunCollisionFrame();
            EmitCollisionCallbacks();

            if (bodyB.position.y > 512) {
                bodyB.position.x = bodyB.position.x > 0 ? 512 : 0;
                bodyB.position.y = -bodyB.collider.height;
                bodyB.velocity.y = 0;
                bodyB.velocity.x *= -1;
                ++inc;
            }
        }

        function draw() {
            drawPoly(ctx, bodyB.position, bodyB.collider.verticesX, bodyB.collider.verticesY);
            drawPoly(ctx, bodyA.position, bodyA.collider.verticesX, bodyA.collider.verticesY);
        }
        let loop = new MainLoop(60);
        loop.begin = (t => begin(t));
        loop.update = (delta => update(delta));
        loop.draw = (t => draw(t));
        loop.start();
    }
}

new App();