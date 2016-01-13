import Config from 'config/Config.js';
import Dimensions from 'config/Dimensions.js';
import Transparent from 'config/Transparent.js';

let config = Config(
    Dimensions(1024, 768),
    Transparent(false)
);

console.log(config.get());
