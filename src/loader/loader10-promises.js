import Loader from 'loader/Loader.js';

export default class LoaderTest {

    constructor () {

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('phaser1').then(file => this.fileLoaded(file));
        this.loader.image('mushroom2').then(file => this.fileLoaded(file));
        this.loader.image('loop').then(file => this.fileLoaded(file));

        this.loader.start().then(files => this.loaderComplete(files));

    }

    fileLoaded (file) {

        console.log(file.key, 'loaded');

    }

    loaderComplete (files) {

        for (let file of files)
        {
            console.log(file);
        }

    }

}

new LoaderTest();
