import BaseLoader from 'loader/BaseLoader.js';
import AtlasJSONFile from 'loader/types/AtlasJSONFile.js';

let loader = new BaseLoader();

loader.path = 'assets/';

let testFile = AtlasJSONFile('test', 'folderTest.png', 'folderTest.json');

loader.addFile(testFile).then(
    (file) => atlasComplete(file)
);

loader.start().then(
    (files) => loadComplete(files)
);

function atlasComplete (file) {

    console.log('Atlas loaded');

    //  The two parts of the atlas are available in file.fileA and file.fileB

    console.log(file);

}

function loadComplete (files) {

    console.log('Loader finished');

    console.log(files);

}
