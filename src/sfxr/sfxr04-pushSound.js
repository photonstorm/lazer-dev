import GenerateWebAudio from 'sound/sfxr/generate/GenerateWebAudio.js';
import PushSound from 'sound/sfxr/synths/PushSound.js';
import rnd from 'sound/sfxr/Rand.js';
import frnd from 'sound/sfxr/RandFloat.js';

let params = PushSound(rnd, frnd);

console.log(params);

let sound = GenerateWebAudio(params);

console.log(sound);

sound.play();
