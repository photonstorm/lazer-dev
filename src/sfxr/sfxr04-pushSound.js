import Generate from 'sound/sfxr/webaudio/Generate.js';
import PushSound from 'sound/sfxr/synths/PushSound.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = PushSound(rnd, frnd);
let sound = Generate(params);

console.log(params);
console.log(sound);

sound.play();
