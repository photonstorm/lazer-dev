import GenerateWebAudio from 'sound/sfxr/generate/GenerateWebAudio.js';
import Explosion from 'sound/sfxr/synths/Explosion.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = Explosion(rnd, frnd);

console.log(params);

let sound = GenerateWebAudio(params);

console.log(sound);

sound.play();
