import Generate from 'sound/sfxr/webaudio/Generate.js';
import PowerUp from 'sound/sfxr/synths/PowerUp.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = PowerUp(rnd, frnd);
let sound = Generate(params);

console.log(params);
console.log(sound);

sound.play();
