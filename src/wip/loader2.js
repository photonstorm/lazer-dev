import BaseLoader from 'loader/BaseLoader.js';
import JSONFile from 'loader/types/JSONFile.js';

let loader = new BaseLoader();

loader.path = 'assets/';

loader.addFile(JSONFile('folder', 'folderTest.json'));
loader.addFile(JSONFile('megaset', 'megasetHD-0.json'));

loader.start().then(
    (files) => loadComplete(files)
);

function loadComplete (files) {

    console.log('Loader finished');

    console.log(files);

}
