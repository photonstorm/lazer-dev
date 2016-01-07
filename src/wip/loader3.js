import BaseLoader from 'loader/BaseLoader.js';
import JSONFile from 'loader/types/JSONFile.js';

let loader = new BaseLoader();

loader.path = 'assets/';

let testFile = JSONFile('test', 'folderTest.json');

//  This Promise resolves after the file has loaded but BEFORE the file data is processed (if required)
loader.addFile(testFile).then((file) => fileComplete(file));

//  This Promise resolves after all files have been loaded AND processed
loader.start().then((files) => loadComplete(files));

function fileComplete (file) {

    console.log('File Complete Promise:', file.key);

}

function loadComplete (files) {

    console.log('Loader finished');

    console.log(files);

}
