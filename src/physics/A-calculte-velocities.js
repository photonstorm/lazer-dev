import {
    RunSimulationFrame
}
from 'physics/arcade/PhysicsSystem.js'
import {
    RectangleCollider
} from 'physics/arcade/Collider.js'
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
        let body = null;
        let bodies = new Array(1000);

        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        for (let i = 0; i < bodies.length; ++i) {
            bodies[i] = new Body(canvas.width / 2, canvas.height / 2, new RectangleCollider(0, 0, 4, 4));
            bodies[i].acceleration.y = 0.4;
            bodies[i].velocity.x = getRandom(-5.0, 5.0);
            bodies[i].velocity.y = getRandom(-10.0, -1.0);
        }

        canvas.addEventListener('mousemove', function (evt) {
            mouse.x = evt.clientX - evt.target.offsetLeft;
            mouse.y = evt.clientY - evt.target.offsetTop;
        });
        ctx.fillStyle = '#fff';

        function begin() {
            ctx.clearRect(0, 0, 512, 512);
        }

        function update() {
            RunSimulationFrame(loop.physicsStep);
        }

        function draw() {
            for (let i = 0; i < bodies.length; ++i) {
                ctx.fillRect(
                    bodies[i].position.x, 
                    bodies[i].position.y, 
                    bodies[i].collider.width, 
                    bodies[i].collider.height
                );
                if (bodies[i].position.y > 512) {
                    bodies[i].position.x = canvas.width / 2;
                    bodies[i].position.y = canvas.height / 2;
                    bodies[i].velocity.y = getRandom(-10.0, -1.0);
                }
            }
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