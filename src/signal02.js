import Signal from 'system/Signal.js';

let onComplete = new Signal();

onComplete.addOnce(response, 0, 'lobsters');

onComplete.dispatch('bob', 49);
onComplete.dispatch('evelyn', 34);

function response (a, b, c) {
    console.log('hello from', a, b, c);
}
