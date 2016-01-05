import Transform from 'math/transform/2d/Transform.js';

let bob = {
    name: 'Bob',
    transform: new Transform()
};

bob.transform.addProperties(bob);

bob.x = 123;
bob.scale.x = 2;
bob.scale.y = 2;

console.log(bob);
