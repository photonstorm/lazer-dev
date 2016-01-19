import GenerateWebAudio from 'sound/sfxr/generate/GenerateWebAudio.js';
import LaserShoot from 'sound/sfxr/synths/LaserShoot.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = LaserShoot(rnd, frnd);

console.log(params);

let sound = GenerateWebAudio(params);

console.log(sound);

sound.play();
