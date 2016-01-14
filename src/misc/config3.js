import Config from 'config/Config.js';
import Dimensions from 'config/settings/Dimensions.js';
import Transparent from 'config/settings/Transparent.js';
import Parent from 'config/settings/Parent.js';
import GameTitle from 'config/settings/GameTitle.js';
import DisableWebAudio from 'config/settings/DisableWebAudio.js';
import Banner from 'utils/Banner.js';

let config = Config(
    Transparent(false),
    GameTitle('Arkanoid'),
    DisableWebAudio(true)
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
