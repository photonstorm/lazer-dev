import Loader from 'loader/Loader.js';

let loader = new Loader();

loader.path = 'assets/';

loader.image('logo', 'phaser1.png');
loader.image('arrow'); // automatic png addition
loader.images( [ 'jelly', 'octopus', 'loop' ] );

loader.start().then(
    (files) => loaderComplete(files)
);

function loaderComplete (files) {

    for (let file of files)
    {
        document.getElementById('game').appendChild(file.data);
    }

}