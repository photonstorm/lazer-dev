import Loader from 'loader/Loader.js';

export default class LoaderTest {

    constructor () {

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('phaser1');
        this.loader.image('mushroom2').then(this.fileComplete);
        this.loader.image('loop');

        this.loader.start().then(this.loadComplete);

    }

    fileComplete () {

        console.log('Mushroom loaded');

    }

    loadComplete () {

        console.log('All images have loaded');

    }

}

new LoaderTest();
