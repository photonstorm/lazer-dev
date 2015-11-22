import MatrixToString from 'utils/array/matrix/MatrixToString.js';
import TransposeMatrix from 'utils/array/matrix/TransposeMatrix.js';

let small = [
    [ 1, 1, 1, 1, 1, 1 ],
    [ 2, 0, 0, 0, 0, 4 ],
    [ 2, 0, 1, 2, 0, 4 ],
    [ 2, 0, 3, 4, 0, 4 ],
    [ 2, 0, 0, 0, 0, 4 ],
    [ 3, 3, 3, 3, 3, 3 ]
];

console.log('Before TransposeMatrix');

console.log(MatrixToString(small));

let t = TransposeMatrix(small);

console.log('After TransposeMatrix');

console.log(MatrixToString(t));
