import Loader from 'loader/Loader.js';

export default class LoaderTest {

    constructor (key, url) {

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.binary(key, url, (key, data) => { this.checkFile(key, data); });

    }

    start () {

        this.loader.start();

    }

    checkFile (key, data) {

        console.log('checkFile', this);

        return data;

    }

}

var test = new LoaderTest('mush', 'mushroom2.png');

test.start();

