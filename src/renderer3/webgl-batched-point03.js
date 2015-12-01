import MasterClock from 'time/MasterClock.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import WebGLBatchedPointRenderer from 'renderers/batch_point/WebGLBatchedPoint.js';
import Vec2 from 'math/vector/Vec2.js';
import DegToRad from 'math/DegToRad.js';

export default class Particle {

    constructor (renderer) {

        this.pos = new Vec2(400, 300);

        this.velocity = new Vec2();
        this.velocity.length = 1 + Math.random() * 3;

        const a = -180 + (Math.random() * 360);

        this.velocity.rotate(Math.PI / DegToRad(a));

        this.index = renderer.addPoint(this.pos.x, this.pos.y);

        this.renderer = renderer;

    }

    update () {

        this.pos.add(this.velocity);

        if (this.pos.x < 0 || this.pos.x > 800)
        {
            this.velocity.x *= -1;
        }

        if (this.pos.y < 0 || this.pos.y > 600)
        {
            this.velocity.y *= -1;
        }

        this.renderer.updatePoint(this.index, this.pos.x, this.pos.y);

    }

}

export default class PointTest {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.renderer = new WebGLBatchedPointRenderer(this.canvas);

        this.particles = [];

        for (let i = 0; i < 1000; i++)
        {
            this.particles.push(new Particle(this.renderer));
        }

        this.master = new MasterClock();

        this.master.init(() => this.update());

    }

    update () {

        for (let i = 0; i < 1000; i++)
        {
            this.particles[i].update();
        }

        this.renderer.bufferDynamic();
        this.renderer.render();

    }

}

new PointTest();
