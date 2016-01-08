import Loader from 'loader/Loader.js';

var loader = new Loader();

loader.path = 'assets/';

//  Here we'll tag all the following files as being in the 'mainmenu' File Group
loader.startFileGroup('MainMenu');

loader.image('phaser1');
loader.image('arrow');

//  These files will be in the 'Level1' File Group

loader.startFileGroup('Level1');

loader.images([ 'jelly', 'octopus', 'loop' ]);

//  This ends the Level1 File Group, meaning the next file will be un-grouped

loader.stopFileGroup();

loader.atlas('invaderpig');

loader.start().then(files => loaderComplete(files));

function loaderComplete () {

    for (let file of loader.getLoadedFiles('MainMenu'))
    {
        console.log('MainMenu >', file.key);
    }

    for (let file of loader.getLoadedFiles('Level1'))
    {
        console.log('Level1 >', file.key);
    }

    for (let file of loader.getLoadedFiles())
    {
        console.log('Un-grouped >', file.key);
    }

}