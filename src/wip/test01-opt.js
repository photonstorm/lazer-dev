import WebGLContextOptions from 'renderers/common/webgl/WebGLContextOptions.js';

var opt1 = new WebGLContextOptions();

console.log(opt1); // false, true, false, false, false (defaults)

var opt2 = new WebGLContextOptions(true, true);

console.log(opt2); // false, true, false, false, false (defaults)

