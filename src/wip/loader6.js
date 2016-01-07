import BaseLoader from 'loader/BaseLoader.js';
import JSONFile from 'loader/types/JSONFile.js';

let loader = new BaseLoader();

loader.path = 'assets/';

let testFile = JSONFile('test', 'folderTest.json');

//  Loader XHR settings are global, but File based ones override them
loader.xhr.timeout = 1000;
testFile.xhr.timeout = 4000;

loader.addFile(testFile);

loader.start().then(
    (files) => loadComplete(files)
);

function loadComplete (files) {

    console.log('Loader finished');

    console.log(files);

}
