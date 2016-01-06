import { FILE, LOADER } from 'loader/Constants.js';

console.log(LOADER.COMPLETE, FILE.LOADING);

let bob = {
    x: 1,
    y: 4,
    onProcess: function () { console.log('test'); }
};

console.log(bob.x);

if (bob.onProcess)
{
    console.log('bob has onProcess');
}
