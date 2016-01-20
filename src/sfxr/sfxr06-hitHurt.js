import Generate from 'sound/sfxr/webaudio/Generate.js';
import HitHurt from 'sound/sfxr/synths/HitHurt.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = HitHurt(rnd, frnd);
let sound = Generate(params);

console.log(params);
console.log(sound);

sound.play();
