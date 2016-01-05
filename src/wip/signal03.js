import SignalGroup from 'system/SignalGroup.js';

//  This would happen inside a class like Loader
let events = new SignalGroup();

let onComplete = events.create();
let onLoad = events.create();
let onError = events.create();

//  Our handler (game side code)
events.listen(handler);

//  Fake some Phaser events ...
onComplete.dispatch('onComplete');
onLoad.dispatch('onLoad');
onError.dispatch('onError');

function handler (a) {
    console.log('Hello from', a);
}
