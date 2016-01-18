import Circle from 'geom/circle/Circle.js';
import Area from 'geom/circle/Area.js';

let a = Circle(0, 0, 64);

//  A≈12867.96
console.log('A', Area(a));
