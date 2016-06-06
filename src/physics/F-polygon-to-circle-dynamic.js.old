import {
    RunSimulationFrame
} from 'physics/arcade/PhysicsSystem.js'
import {
    RectangleCollider,
    CircleCollider
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

function drawCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.fillRect(x - 2, y - 2, 4, 4);
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
        ctx.fillStyle = '#fff';
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

        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            mouse.x = evt.clientX - evt.target.offsetLeft;
            mouse.y = evt.clientY - evt.target.offsetTop;
        });
        ctx.fillStyle = ctx.strokeStyle = '#fff';

        bodyA = new Body(256, 356, new RectangleCollider(-50, -50, 100, 100));
        bodyB = new Body(186, 150, new CircleCollider(0, 0, 40));

        bodyA.acceleration.y = -0.1;
        bodyB.bounce.y = 1;
        bodyA.bounce.y = 1;
        bodyB.acceleration.y = 0.15;


        function begin() {
            ctx.clearRect(0, 0, 512, 512);
        }

        function BodiesCollided() {
            console.log('Collision detected');
        }

        function update() {
            RunSimulationFrame(loop.physicsStep);
            Collide(bodyA, bodyB, BodiesCollided);

            // Run this after all collision request
            // have been done.
            RunCollisionFrame();
            EmitCollisionCallbacks();

            if (bodyA.position.y < 0) {
                bodyA.position.x = canvas.width / 2;
                bodyA.position.y = canvas.height;
                bodyA.velocity.y = getRandom(-10.0, -1.0);
                bodyA.position.x = canvas.width / 2 + getRandom(-70, 70);
                bodyA.velocity.x = getRandom(-0.1, 0.1);
            }
            if (bodyB.position.y > 512) {
                bodyB.position.x = canvas.width / 2;
                bodyB.position.y = -bodyB.collider.radius;
                bodyB.velocity.y = getRandom(-10.0, -1.0);
                bodyB.velocity.x = -bodyA.velocity.x
                bodyB.position.x = canvas.width / 2 + getRandom(-70, 70);                
            }
        }

        function draw() {
            drawPoly(ctx, bodyA.position, bodyA.collider.verticesX, bodyA.collider.verticesY);
           // drawPoly(ctx, bodyB.position, bodyB.collider.verticesX, bodyB.collider.verticesY);
            drawCircle(ctx, bodyB.position.x, bodyB.position.y, bodyB.collider.radius);
            ctx.fillText('fps: ' + loop.fps.toFixed(2), 16, 16);
        }
        let loop = new MainLoop(60);
        loop.begin = (t => begin(t));
        loop.update = (delta => update(delta));
        loop.draw = (t => draw(t));
        loop.start();
    }
}

new App();