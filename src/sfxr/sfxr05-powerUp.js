import GenerateWebAudio from 'sound/sfxr/generate/GenerateWebAudio.js';
import PowerUp from 'sound/sfxr/synths/PowerUp.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = PowerUp(rnd, frnd);

console.log(params);

let sound = GenerateWebAudio(params);

console.log(sound);

sound.play();
