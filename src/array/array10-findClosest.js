import FindClosestInSorted from 'utils/array/FindClosestInSorted.js';

//  Array must be sorted prior to using this function

let data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];

console.log(FindClosestInSorted(5.4, data)); // 5
console.log(FindClosestInSorted(100, data)); // 20
console.log(FindClosestInSorted(-30, data)); // 1
console.log(FindClosestInSorted(10.9, data)); // 11
