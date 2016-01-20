import Generate from 'sound/sfxr/webaudio/Generate.js';
import BlipSelect from 'sound/sfxr/synths/BlipSelect.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = BlipSelect(rnd, frnd);
let sound = Generate(params);

console.log(params);
console.log(sound);

sound.play();
