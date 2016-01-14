import Config from 'config/Config.js';
import Dimensions from 'config/settings/Dimensions.js';
import Transparent from 'config/settings/Transparent.js';

let config = Config(
    Dimensions(1024, 768),
    Transparent(false)
);

console.log(config.get());
