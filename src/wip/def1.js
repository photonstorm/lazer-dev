import Vec2 from 'math/vector/vec2/Build.js';

function ObservableVec2 (x = 0, y = 0) {

    let position = Vec2(x, y);

    return {

        name: 'position',

        get x () {
            return position[0];
        },

        get y () {
            return position[1];
        },

        set x (value) {

            if (position[0] !== value)
            {
                position[0] = value;
            }

        },

        set y (value) {

            if (position[1] !== value)
            {
                position[1] = value;
            }

        },

        getX () {
            return position[0];
        },

        getY () {
            return position[1];
        },

        setX (value) {

            if (position[0] !== value)
            {
                position[0] = value;
            }

        },

        setY (value) {

            if (position[1] !== value)
            {
                position[1] = value;
            }

        },

        addProperties (target, element) {

            target[element] = {};

            Object.defineProperties(target[element], {

                'x': {
                    enumerable: true,
                    get: () => this.getX(),
                    set: (value) => this.setX(value)
                },

                'y': {
                    enumerable: true,
                    get: () => this.getY(),
                    set: (value) => this.setY(value)
                }

            });

        }

    };

}

console.log('hello world');

/*
let bob = {
    name: 'Bob',
    position: ObservableVec2(10, 20),
    scale: ObservableVec2(1, 1)
}

bob.position.addProperties(bob);
// bob.scale.addProperties(bob.scale);

console.log(bob);

console.log('pos', bob.x, bob.y);
console.log('scale', bob.scale.x, bob.scale.y);

bob.x = 200;
bob.scale.x = 2;

console.log('pos', bob.x, bob.y);
console.log('scale', bob.scale.x, bob.scale.y);
*/

let bob = {
    name: 'Bob',
    position: ObservableVec2(10, 20)
};

bob.position.addProperties(bob, 'whizz');

console.log(bob);

