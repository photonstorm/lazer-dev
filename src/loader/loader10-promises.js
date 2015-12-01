import Loader from 'loader/Loader.js';

export default class LoaderTest {

    constructor () {

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('phaser1');
        this.loader.image('mushroom2').then(this.fileLoaded);
        this.loader.image('loop');

        this.loader.start();

    }

    fileLoaded (file) {

        console.log('The Mushroom loaded!');

    }

}

new LoaderTest();
