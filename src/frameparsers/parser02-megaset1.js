import Loader from 'loader/Loader.js';
import TexturePackerJSONArray from 'texture/parsers/TexturePackerJSONArray.js';

let loader = new Loader();

loader.path = 'assets/';

loader.atlas('megasetHD-0').then(
    (multipart) => atlasLoaded(multipart)
);

loader.start();

function atlasLoaded (multipart) {

    let texture = multipart.fileA.data;
    let json = multipart.fileB.data;

    let frames = TexturePackerJSONArray(texture, json);

    console.log(frames);

}