import Circle from 'geom/circle/Circle.js';
import Circumference from 'geom/circle/Circumference.js';

let a = Circle(0, 0, 64);

//  C≈402.12
console.log('A', Circumference(a));
