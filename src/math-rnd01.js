import RandomDataGenerator from 'math/RandomDataGenerator.js';

var seed = '!rnd,1,0.005559559212997556,0.5825409316457808,0.5391019422095269';
// var seed = [(Date.now() * Math.random()).toString()];

var rnd = new RandomDataGenerator(seed);

// console.log(rnd.state());

console.log('integer', rnd.integer);
console.log('frac', rnd.frac);
console.log('real', rnd.real);
console.log('normal', rnd.normal);
console.log('uuid', rnd.uuid);
console.log('angle', rnd.angle);

//  150, 142, 116 with !rnd seed

console.log('between', rnd.between(100, 200));
console.log('between', rnd.between(100, 200));
console.log('between', rnd.between(100, 200));

console.log('realInRange', rnd.realInRange(1, 20));

