import GenerateWebAudio from 'sound/sfxr/generate/GenerateWebAudio.js';
import PickUpCoin from 'sound/sfxr/synths/PickUpCoin.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = PickUpCoin(rnd, frnd);

console.log(params);

let sound = GenerateWebAudio(params);

console.log(sound);

sound.play();
