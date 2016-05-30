import {
    RunSimulationFrame
} from 'physics/arcade/PhysicsSystem.js'
import {
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
    ctx.fill();
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
        ctx.fillStyle = '#fff';

        bodyA = new Body(256, 356, new CircleCollider(0, 0, 40));
        bodyB = new Body(250, 150, new CircleCollider(0, 0, 30));

        bodyA.acceleration.y = -0.3;
        bodyB.bounce.y = 1;
        bodyA.bounce.y = 1;
        bodyB.acceleration.y = 0.3;


        function begin() {
            ctx.clearRect(0, 0, 512, 512);
        }

        function BodiesCollided() {
        }

        function update() {
            RunSimulationFrame(loop.physicsStep);
            Collide(bodyA, bodyB, BodiesCollided);

            // Run this after all collision request
            // have been done.
            RunCollisionFrame();
            EmitCollisionCallbacks();

            if (bodyA.position.y < 0) {
                bodyA.position.x = canvas.width / 2 + getRandom(-50, 50);
                bodyA.position.y = canvas.height;
                bodyA.velocity.y = 0;
                bodyA.velocity.x = 0;
            }
            if (bodyB.position.y > 512) {
                bodyB.position.x = canvas.width / 2 + getRandom(-50, 50);
                bodyB.position.y = -bodyB.collider.radius;
                bodyB.velocity.y = 0;
                bodyB.velocity.x = 0;
            }
        }

        function draw() {
            drawCircle(ctx, bodyA.position.x, bodyA.position.y, bodyA.collider.radius);
            drawCircle(ctx, bodyB.position.x, bodyB.position.y, bodyB.collider.radius);
        }
        let loop = new MainLoop(60);
        loop.begin = (t => begin(t));
        loop.update = (delta => update(delta));
        loop.draw = (t => draw(t));
        loop.start();
    }
}

new App();