import UpdatePhysics from 'physics/arcade/system/PhysicsSystem.js'
import RectangleCollider from 'physics/arcade/collider/RectangleCollider.js'
import PolygonCollider from 'physics/arcade/collider/PolygonCollider.js'
import {
    Collide,
    Overlap,
    UpdateCollisions
} from 'physics/arcade/system/CollisionSystem.js'

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
        let bodyC = null;
        let bodyE = null;
        let bodies = [];
        let jump = false;
        let directionX = 0;
        let directionY = 0;
        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            mouse.x = evt.clientX - evt.target.offsetLeft;
            mouse.y = evt.clientY - evt.target.offsetTop;
        });
        ctx.fillStyle = '#fff';

        bodyA = new Body(256, 400, new PolygonCollider([
            [-108, -50],
            [-108, 0],
            [-108 + 217, 0],
            [109, -100],
            [-50, -100]
        ]));


        bodyB = new Body(256, 150, new RectangleCollider(-12, -30, 25, 60));
        bodyC = new Body(0, 350, new RectangleCollider(0, 0, 148, 50));
        bodyE = new Body(365, 350, new RectangleCollider(0, 0, 155, 50));

        bodyB.acceleration.y = 0.4;
        bodyB.maxVelocity.y = 15;

        bodyA.immovable = true;
        bodyC.immovable = true;
        bodyE.immovable = true;

        window.onkeydown = function(e) {
            if (e.keyCode === 65) {
                directionX = -1;
            } else if (e.keyCode === 68) {
                directionX = 1;
            }
            if (e.keyCode === 87 && !jump) {
                bodyB.velocity.y = -8.5;
                jump = true;
            }
        };
        window.onkeyup = function(e) {
            if (e.keyCode === 65) {
                directionX = 0;
            } else if (e.keyCode === 68) {
                directionX = 0;
            }
            if (e.keyCode === 87) {
                jump = false;
            }
        }
        function begin() {
            ctx.clearRect(0, 0, 512, 512);
        }

        function update() {
            bodyB.velocity.x = 0;
            if (directionX == -1) {
                bodyB.velocity.x = -2.5;
            } else if (directionX == 1) {
                bodyB.velocity.x = 2.5;
            }
            if (directionY == -1) {
                bodyB.velocity.y = -2.5;
            } else if (directionY == 1) {
                bodyB.velocity.y = 2.5;
            }

            ctx.fillStyle = ctx.strokeStyle = '#fff';
            UpdatePhysics(loop.physicsStep);

            Collide(bodyA, bodyB);
            Collide(bodyC, bodyB);
            Collide(bodyE, bodyB);

            // Run this after all collision request
            // have been done.
            UpdateCollisions();

            if (bodyB.position.y > 512) {
                bodyB.position.y = -bodyB.collider.height;
            } else if (bodyB.position.y < -bodyB.collider.height) {
                bodyB.position.y = 512;
            }
            if (bodyB.position.x < 0) {
                bodyB.position.x = 512;
            } else if (bodyB.position.x > 512) {
                bodyB.position.x = 0;
            }
        }

        function draw() {
            drawPoly(ctx, bodyB.position, bodyB.collider.verticesX, bodyB.collider.verticesY);
            drawPoly(ctx, bodyA.position, bodyA.collider.verticesX, bodyA.collider.verticesY);
            drawPoly(ctx, bodyC.position, bodyC.collider.verticesX, bodyC.collider.verticesY);
            drawPoly(ctx, bodyE.position, bodyE.collider.verticesX, bodyE.collider.verticesY);
        }
        let loop = new MainLoop(60);
        loop.begin = (t => begin(t));
        loop.update = (delta => update(delta));
        loop.draw = (t => draw(t));
        loop.start();
    }
}

new App();