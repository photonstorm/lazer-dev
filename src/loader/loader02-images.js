import Loader from 'loader/Loader.js';

let loader = new Loader();

loader.path = 'assets/';

loader.image('phaser1');
loader.image('mushroom2');
loader.image('loop');

loader.start().then(
    (files) => loaderComplete(files)
);

function loaderComplete (files) {

    for (let file of files)
    {
        console.log(file);
        document.getElementById('game').appendChild(file.data);
    }

}