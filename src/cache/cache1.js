import Loader from 'loader/Loader.js';
import Cache from 'cache/Cache.js';

let loader = new Loader();

loader.image('logo', 'assets/phaser1.png');

loader.start().then(files => loaderComplete(files));

let cache = Cache();

function loaderComplete (files) {

    for (let file of files)
    {
        cache.add(file.key, file.data);
    }

    console.log(cache.get('logo'));

    // game.add.sprite(100, 200, 'level1:background,level2:background,level3:background');
    // game.add.sprite(100, 200, 'level1|background');
    // game.add.sprite(100, 200, 'level1/background');
    // game.add.sprite(100, 200, 'level1>background');


}