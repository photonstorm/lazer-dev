import Config from 'config/Config.js';
import Parent from 'config/settings/Parent.js';
import GameTitle from 'config/settings/GameTitle.js';
import State from 'config/settings/State.js';
import Game from 'game/nano/Game.js';

let game = new Game(
    Config(
        Parent('game'),
        GameTitle('BobVaders'),
        State({ preload, create, render })
    )
);

let image;

function preload () {

    this.load.path = 'assets/';
    this.load.image('phaser1');

}

function create () {

    for (let file of this.load.getLoadedFiles())
    {
        image = file.data;
    }

}

function render() {

    this.context.drawImage(image, 200, 100);

}
