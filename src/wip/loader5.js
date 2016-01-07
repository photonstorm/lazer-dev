import BaseLoader from 'loader/BaseLoader.js';
import ImageFile from 'loader/types/ImageFile.js';

let loader = new BaseLoader();

loader.path = 'assets/';

let testFile = ImageFile('test', 'loop.png');

loader.addFile(testFile);

loader.start().then(
    (files) => loadComplete(files)
);

function loadComplete (files) {

    console.log('Loader finished');

    console.log(files);

    //  Throw the image onto the page just so we can see it worked
    document.getElementById('game').appendChild(files[0].data);

}
