import Generate from 'sound/sfxr/webaudio/Generate.js';
import PickUpCoin from 'sound/sfxr/synths/PickUpCoin.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = PickUpCoin(rnd, frnd);
let sound = Generate(params);

console.log(params);
console.log(sound);

sound.play();
