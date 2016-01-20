import Generate from 'sound/sfxr/webaudio/Generate.js';
import Explosion from 'sound/sfxr/synths/Explosion.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = Explosion(rnd, frnd);
let sound = Generate(params);

console.log(params);
console.log(sound);

sound.play();
