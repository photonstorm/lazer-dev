import JSONFile from 'loader/types/JSONFile.js';

let testFile = JSONFile('test', 'assets/folderTest.json');

testFile.load().then(
    (file) => loadComplete(file)
);

function loadComplete (file) {

    console.log('JSON File has loaded');

    file.onProcess();

    console.log(file.data);

}
