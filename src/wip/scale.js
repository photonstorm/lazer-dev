import Scale from 'math/transform/2d/Scale.js';

let parentA = { name: 'parentA' };
let parentB = { name: 'parentB' };

let bob = Scale(parentA, 1, 1);
let bill = Scale(parentB, 2, 2);
let ben = Scale(bob, 3, 3);

bob.x = 4;

console.log(bob);
console.log(bill);
console.log(ben);

// bob.x = 123;
// bill.x = 50;

// console.log('bob', bob.x);
// console.log('bill', bill.x);

// bob.reset();

// console.log('bob', bob.x);
