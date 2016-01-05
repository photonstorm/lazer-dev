import WebGLContextOptions from 'webgl/ContextOptions.js';

const opts = WebGLContextOptions();

console.log(opts);

const opts2 = WebGLContextOptions( { alpha: true });

console.log(opts2);
