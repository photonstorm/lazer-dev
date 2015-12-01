import * as Angle from 'math/Angle.js';

//  45 degrees
console.log(Angle.between(100, 100, 300, 300) * (180 / Math.PI));

//  Keeps between -180 and 180
console.log(Angle.wrapDeg(300));
