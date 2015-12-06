import Key from 'input/keyboard/Key.js';
import AddKeyUp from 'input/keyboard/events/AddKeyUp.js';
import ProcessKeyUp from 'input/keyboard/events/ProcessKeyUp.js';

//  Create 3 keys
let A = Key('a');
let B = Key('b');
let C = Key('c');

//  Add them to our Set
let list = new Set([ A, B, C ]);

AddKeyUp(window, e => ProcessKeyUp(e, list));
