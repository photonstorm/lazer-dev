import Generate from 'sound/sfxr/webaudio/Generate.js';
import LaserShoot from 'sound/sfxr/synths/LaserShoot.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = LaserShoot(rnd, frnd);
let sound = Generate(params);

console.log(params);
console.log(sound);

sound.play();
