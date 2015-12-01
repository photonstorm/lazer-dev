import MatrixToString from 'utils/array/matrix/MatrixToString.js';
import RotateMatrix from 'utils/array/matrix/RotateMatrix.js';

let small = [
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4 ],
    [ 2, 0, 1, 2, 0, 0, 0, 0, 1, 2, 0, 4 ],
    [ 2, 0, 3, 4, 0, 0, 0, 0, 3, 4, 0, 4 ],
    [ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4 ],
    [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ]
];

console.log('Before Rotation');

console.log(MatrixToString(small));

//  Rotate Left
let t = RotateMatrix(small, 90);

//  Rotate Right
// let t = RotateMatrix(small, -90);

//  Rotate 180
// let t = RotateMatrix(small, 180);


console.log('After Rotation');

console.log(MatrixToString(t));
