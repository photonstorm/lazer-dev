import ImageFile from 'loader/types/ImageFile.js';

//  Files can load all on their own, without the need for the BaseLoader at all.
//  However when you do this you are responsible for running file.onProcess on them (if needed)

ImageFile('loop', 'assets/loop.png').load().then(file => showImage(file));

function showImage (file) {

    document.getElementById('game').appendChild(file.data);

}
