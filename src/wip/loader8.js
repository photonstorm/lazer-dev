import ImageFile from 'loader/types/ImageFile.js';

//  Files can load all on their own, without the need for the BaseLoader at all.
//  However when you do this you are responsible for running file.onProcess on them (if needed)

let testFile = ImageFile('loop', 'assets/loop.png');

testFile.load().then(
    (file) => loadComplete(file)
);

function loadComplete (file) {

    document.getElementById('game').appendChild(file.data);

}
