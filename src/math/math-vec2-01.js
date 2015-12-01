import * as Vec2Math from 'math/vector/Vec2Math.js';

// let v = Vec2Math.buildZero();
// console.log(v);

export class Vec2 {
    constructor (x, y) {

        this[0] = x;
        this[1] = y;

    }
}

let bob = new Vec2(256, 32);
console.log(bob[0]);
console.log(bob[1]);
