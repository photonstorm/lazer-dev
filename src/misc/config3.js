import Config from 'config/Config.js';
import Dimensions from 'config/Dimensions.js';
import Transparent from 'config/Transparent.js';
import Parent from 'config/Parent.js';
import GameTitle from 'config/GameTitle.js';
import Banner from 'utils/Banner.js';

let config = Config(
    Transparent(false),
    GameTitle('Arkanoid')
);

//  Our Game requires the Dimensions, Parent and Transparent config objects.
//  We've only included Transparent so far, so we'll use 'requires' to set the rest.

config.require(
    Dimensions(),
    Parent(),
    Transparent(true)
);

console.log(config.get());

Banner(config.get('gameTitle').name, config.get('gameTitle').url);
