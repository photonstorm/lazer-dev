import BaseLoader from 'loader/BaseLoader.js';
import AtlasJSONFile from 'loader/types/AtlasJSONFile.js';

let loader = new BaseLoader();

loader.path = 'assets/';

let testFile = AtlasJSONFile('test', 'folderTest.png', 'folderTest.json');

loader.addFile(testFile);

loader.start().then(
    (files) => loadComplete(files)
);

function loadComplete (files) {

    console.log('Loader finished');

    console.log(files);

}
