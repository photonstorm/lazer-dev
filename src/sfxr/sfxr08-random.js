import Generate from 'sound/sfxr/webaudio/Generate.js';
import Random from 'sound/sfxr/synths/Random.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = Random(rnd, frnd);
let sound = Generate(params);

console.log(params);
console.log(sound);

sound.play();
