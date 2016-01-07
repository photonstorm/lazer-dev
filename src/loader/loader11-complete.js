import Loader from 'loader/Loader.js';

export default class LoaderTest {

    constructor () {

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('phaser1');
        this.loader.image('mushroom2').then(file => this.fileComplete(file));
        this.loader.image('loop');

        this.loader.start().then(files => this.loadComplete(files));

    }

    fileComplete (file) {

        console.log('Mushroom loaded');

    }

    loadComplete (files) {

        console.log('All images have loaded');

    }

}

new LoaderTest();
