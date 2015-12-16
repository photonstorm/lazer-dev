import Transform from 'math/transform/2d/Transform2DMinimal.js';

let t1 = Transform(100, 200, 0.32);

console.log(t1, t1.x);

t1.x = 345;

console.log(t1, t1.x);
