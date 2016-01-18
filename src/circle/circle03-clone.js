import Circle from 'geom/circle/Circle.js';
import Clone from 'geom/circle/Clone.js';

let a = Circle(50, 100, 32);

console.log('A', a.toString());

let b = Clone(a);

console.log('B', b.toString());
