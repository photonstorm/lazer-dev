import Loader from 'loader/Loader.js';

let loader = new Loader();

loader.image('logo', 'assets/phaser1.png');

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