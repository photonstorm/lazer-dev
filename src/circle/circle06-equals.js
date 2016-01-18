import Circle from 'geom/circle/Circle.js';
import Equals from 'geom/circle/Equals.js';

let a = Circle(0, 0, 64);
let b = Circle(0, 0, 64.1);

console.log(Equals(a,b));

b.radius = 64;

console.log(Equals(a,b));
