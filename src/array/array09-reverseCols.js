import MatrixToString from 'utils/array/matrix/MatrixToString.js';
import ReverseColumns from 'utils/array/matrix/ReverseColumns.js';

let small = [
    [ 1, 2, 3, 4, 5, 6 ],
    [ 1, 2, 3, 4, 5, 6 ],
    [ 1, 2, 3, 4, 5, 6 ],
    [ 1, 2, 3, 4, 5, 6 ],
    [ 1, 2, 3, 4, 5, 6 ],
    [ 1, 2, 3, 4, 5, 6 ]
];

console.log('Before Reverse');

console.log(MatrixToString(small));

let t = ReverseColumns(small);

console.log('After Reverse');

console.log(MatrixToString(t));
