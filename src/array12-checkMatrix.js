import CheckMatrix from 'utils/array/matrix/CheckMatrix.js';

let matrix1 = [
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4 ],
    [ 2, 0, 1, 2, 0, 0, , 1, 2, 0, 4 ],
    [ 2, 0, 3, 4, 0,0, 0, 3, 4, 0, 4 ],
    [ 2, 0, 0, 0,  0, 0, 0, 0, 0, 0, 4 ],
    [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ]
];

//  false because the rows are of un-even length, they must be identical lengths
console.log('Valid Matrix?', CheckMatrix(matrix1));

let matrix2 = [
    [ 1, 1, 1, 1, 1, 1 ],
    [ 2, 0, 0, 0, 0, 4 ],
    [ 2, 0, 1, 2, 0, 4 ],
    [ 2, 0, 3, 4, 0, 4 ],
    [ 2, 0, 0, 0, 0, 4 ],
    [ 3, 3, 3, 3, 3, 3 ]
];

//  true because the rows are all the same length
console.log('Valid Matrix?', CheckMatrix(matrix2));
