import * as MathSnap from 'math/SnapTo.js';

//  Should snap to 10
console.log(MathSnap.to(12, 5));

//  Should snap to 5
console.log(MathSnap.floor(9, 5));

//  Should snap to 15
console.log(MathSnap.ceil(11, 5));
