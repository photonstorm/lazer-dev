import AtlasJSONFile from 'loader/types/AtlasJSONFile.js';

let testFile = AtlasJSONFile('test', 'assets/folderTest.png', 'assets/folderTest.json');

console.log(testFile);

testFile.load().then(
    (file) => atlasComplete(file)
);

function atlasComplete (file) {

    console.log('Atlas loaded');

    //  The two parts of the atlas are available in file.fileA (image) and file.fileB (json)

    console.log(file);

}
