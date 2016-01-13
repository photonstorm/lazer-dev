import Config from 'config/Config.js';
import Dimensions from 'config/Dimensions.js';
import Transparent from 'config/Transparent.js';
import GameTitle from 'config/GameTitle.js';
import Banner from 'utils/Banner.js';

let config = Config(
    Dimensions(1024, 768),
    Transparent(false),
    GameTitle('Arkanoid 2', 'http://akrano.id')
);

console.log(config.get());

Banner(config.get('gameTitle').name, config.get('gameTitle').url);
