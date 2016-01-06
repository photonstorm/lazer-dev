import BaseLoader from 'loader/BaseLoader.js';
import File from 'loader/File.js';
import JSONFile from 'loader/types/JSONFile.js';

let loader = new BaseLoader();

loader.path = 'assets/';

let testFile = JSONFile('test', 'folderTest.json');

loader.addFile(testFile);

loader.start().then(
    (loader) => loadComplete(loader)
);

function loadComplete (bob) {

    console.log('Loader finished');

    console.log(bob.getLoadedFiles());

}


/*
let testFile = File('test', 'folderTest.json', 'text');

testFile.onComplete = function (xhr) {
    console.log('onComplete');
    console.log(xhr);
}

testFile.onError = function (xhr) {
    console.log('onError');
    console.log(xhr);
}

console.log(testFile);

loader.addFile(testFile);

loader.start().then(
    (loader) => loadComplete(loader)
);

function loadComplete (bob) {

    console.log('Loader finished');

    console.log(bob.getLoadedFiles());

}
*/
