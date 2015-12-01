import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import WebGLBatchedPointRenderer from 'renderers/batch_point/WebGLBatchedPoint.js';

let canvas = Canvas(800, 600);

AddToDOM(canvas, 'game');

let renderer = new WebGLBatchedPointRenderer(canvas);

renderer.addTri(100, 100, 128);
renderer.addTri(300, 100, 128);
renderer.addTri(500, 100, 128);
renderer.addTri(700, 100, 128);

//  Buffer and draw
renderer.bufferStatic();

// renderer.render();
// renderer.renderLines();
// renderer.renderLineStrip();
// renderer.renderLineLoop();
renderer.renderTriangles();
// renderer.renderTriangleStrip();
// renderer.renderTriangleFan();
