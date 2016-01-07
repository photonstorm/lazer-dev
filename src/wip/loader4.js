import BaseLoader from 'loader/BaseLoader.js';
import JSONFile from 'loader/types/JSONFile.js';

let loader = new BaseLoader();

loader.path = 'assets/';

let testFile = JSONFile('test', 'folderTest.json');

//  Let's use a process callback to modify the json slightly

//  The callback is invoked AFTER the JSONFile Process handler has run, 
//  allowing for further modification of the data

testFile.processCallback = function (file) {
    file.data.meta.app = 'LazerPacker';
};

loader.addFile(testFile);

loader.start().then(
    (files) => loadComplete(files)
);

function loadComplete (files) {

    console.log(files);

}
