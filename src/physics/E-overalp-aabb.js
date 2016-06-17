import UpdatePhysics from 'physics/arcade/system/PhysicsSystem.js'
import AABBCollider from 'physics/arcade/collider/AABBCollider.js'
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
        ctx.strokeStyle = ctx.fillStyle = '#fff';
        bodyA = new Body(256, 250, new AABBCollider(0, 0, 100, 100));
        bodyB = new Body(256, 180, new AABBCollider(0, 0, 25, 60));

        /*bodyA.acceleration.y = -0.05;
        bodyB.bounce.y = 1;
        bodyA.bounce.y = 0.5;
        bodyB.acceleration.y = 0.05;*/


        function begin() {
            ctx.clearRect(0, 0, 512, 512);
        }

        function BodiesOveralp(aID, bID) {
            console.log('Collision detected');
            ctx.strokeStyle = ctx.fillStyle = '#ff0000';
        }

        function update() {
            bodyB.position.x = mouse.x;
            bodyB.position.y = mouse.y;
            ctx.strokeStyle = ctx.fillStyle = '#fff';
            UpdatePhysics(loop.physicsStep);
            Overlap(bodyA, bodyB, BodiesOveralp);

            // Run this after all collision request
            // have been done.
            UpdateCollisions();

            if (bodyA.position.y < 0) {
                bodyA.position.x = canvas.width / 2;
                bodyA.position.y = canvas.height;
                bodyA.velocity.x = 0;
                bodyA.velocity.y = 0;
            }
            if (bodyB.position.y > 512) {
                bodyB.position.x = canvas.width / 2;
                bodyB.position.y = -bodyB.collider.height;
                bodyB.velocity.x = 0;
                bodyB.velocity.y = 0;
            }
        }

        function draw() {
            ctx.fillRect(bodyA.position.x, bodyA.position.y, bodyA.collider.width, bodyA.collider.height);
            ctx.fillRect(bodyB.position.x, bodyB.position.y, bodyB.collider.width, bodyB.collider.height);
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