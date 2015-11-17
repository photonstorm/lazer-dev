import Math from 'math/Math.js';

//  This will be a Phaser Game level class
var math = new Math();

//  Should snap to 10
console.log(math.snap.to(12, 5));

//  Should snap to 5
console.log(math.snap.floor(9, 5));

//  Should snap to 15
console.log(math.snap.ceil(11, 5));

window.pmath = math;
