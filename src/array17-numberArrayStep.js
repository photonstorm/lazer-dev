import NumberArrayStep from 'utils/array/NumberArrayStep.js';

let a = NumberArrayStep(4);
console.log(a);
// => [0, 1, 2, 3]

a = NumberArrayStep(1, 5);
console.log(a);
// => [1, 2, 3, 4]

a = NumberArrayStep(0, 20, 5);
console.log(a);
// => [0, 5, 10, 15]

a = NumberArrayStep(0, -4, -1);
console.log(a);
// => [0, -1, -2, -3]

a = NumberArrayStep(1, 4, 0);
console.log(a);
// => [1, 1, 1]

a = NumberArrayStep(0);
console.log(a);
// => []
