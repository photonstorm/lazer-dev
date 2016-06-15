import UpdatePhysics from 'physics/arcade/system/PhysicsSystem.js'
import RectangleCollider from 'physics/arcade/collider/RectangleCollider.js'
import AABBCollider from 'physics/arcade/collider/AABBCollider.js'
import Body from 'physics/arcade/Body.js'
import Vec2 from 'math/vector/vec2/Vec2.js'
import {
    Collide,
    Overlap,
    UpdateCollisions
} from 'physics/arcade/system/CollisionSystem.js'
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
        const boxCount = 300;
        let mouse = new Vec2(0, 0);
        let canvas = null;
        let ctx = null;
        let body = null;
        let bodies0 = new Array(boxCount);
        let bodies1 = new Array(boxCount);
        let incr = 0;
        let staticBody = new Body(156, 400, new AABBCollider(0, 0, 200, 40));
        let Sin = Math.sin;
        let collideGroup = false;


        staticBody.immovable = true;
        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        for (let i = 0; i < bodies0.length; ++i) {
            bodies0[i] = new Body(0, canvas.height / 2 - 100, new AABBCollider(0, 0, 10, 10));
            bodies0[i].acceleration.y = 0.4;
            bodies0[i].velocity.y = getRandom(-10.0, -1.0);
            bodies0[i].velocity.x = getRandom(2.0, 8.0);
            bodies0[i].bounce.y = Math.random();
            //bodies0[i].bounce.x = Math.random();
            bodies0[i].acceleration.x = getRandom(0.001, 0.1);

        }
        for (let i = 0; i < bodies1.length; ++i) {
            bodies1[i] = new Body(canvas.width, canvas.height / 2 - 100, new AABBCollider(0, 0, 10, 10));
            bodies1[i].acceleration.y = 0.4;
            bodies1[i].velocity.y = getRandom(-10.0, -1.0);
            bodies1[i].velocity.x = getRandom(-2.0, -8.0);
            bodies1[i].bounce.y = Math.random();
           // bodies1[i].bounce.x = Math.random();
            bodies1[i].acceleration.x = -getRandom(0.001, 0.1);
        }
        canvas.addEventListener('mousemove', function (evt) {
            mouse.x = evt.clientX - evt.target.offsetLeft;
            mouse.y = evt.clientY - evt.target.offsetTop;
        });
        ctx.fillStyle = '#fff';
        window.addEventListener('keydown', function (evt) {
            if (evt.keyCode == 83)
                collideGroup = !collideGroup;
        });

        function begin() {
            ctx.clearRect(0, 0, 512, 512);
        }

        function update() {
            incr += 0.05;
            staticBody.position.y = 300 + Sin(incr) * 110;
            for (let i = 0; i < bodies0.length; ++i) {
                Collide(staticBody, bodies0[i], null);
            }
            for (let i = 0; i < bodies1.length; ++i) {
                Collide(staticBody, bodies1[i], null);
            }
            if (collideGroup) {
                for (let i = 0, len0 = bodies0.length; i < len0; ++i) {
                    for (let j = 0, len1 = bodies1.length; j < len1; ++j) {
                        Collide(bodies0[i], bodies1[j], null);
                    }
                }
            }
            UpdatePhysics(loop.physicsStep);
            UpdateCollisions();
        }

        function draw() {
            ctx.fillStyle = '#ff0000';
            for (let i = 0; i < bodies0.length; ++i) {
                ctx.fillRect(
                    bodies0[i].position.x,
                    bodies0[i].position.y,
                    bodies0[i].collider.width,
                    bodies0[i].collider.height
                );
                if (bodies0[i].position.y > 512) {
                    bodies0[i].position.x = 0;
                    bodies0[i].position.y = canvas.height / 2 - 100;
                    bodies0[i].velocity.y = getRandom(-10.0, -1.0);
                    bodies0[i].velocity.x = getRandom(2.0, 8.0);
                }
            }
            ctx.fillStyle = '#0000ff';
            for (let i = 0; i < bodies1.length; ++i) {
                ctx.fillRect(
                    bodies1[i].position.x,
                    bodies1[i].position.y,
                    bodies1[i].collider.width,
                    bodies1[i].collider.height
                );
                if (bodies1[i].position.y > 512) {
                    bodies1[i].position.x = canvas.width;
                    bodies1[i].position.y = canvas.height / 2 - 100;
                    bodies1[i].velocity.y = getRandom(-10.0, -1.0);
                    bodies1[i].velocity.x = getRandom(-2.0, -8.0);
                }
            }
            ctx.fillStyle = '#fff';
            ctx.fillRect(staticBody.position.x, staticBody.position.y, staticBody.collider.width, staticBody.collider.height);
            ctx.fillText('Colliding Groups: ' + collideGroup + ' FPS: ' + loop.fps.toFixed(2), 16, 16);
        }
        let loop = new MainLoop(60);
        loop.begin = (t => begin(t));
        loop.update = (delta => update(delta));
        loop.draw = (t => draw(t));
        loop.start();
    }
}

new App();