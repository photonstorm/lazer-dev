import Key from 'input/keyboard/Key.js';
import AddKeyDown from 'input/keyboard/events/AddKeyDown.js';
import ProcessKeyDown from 'input/keyboard/events/ProcessKeyDown.js';

//  Create 3 keys
let A = Key('a');
let B = Key('b');
let C = Key('c');

//  Add them to our Set (could also be a plain Array, anything you can iterate)
let list = new Set([ A, B, C ]);

AddKeyDown(window, e => ProcessKeyDown(e, list));
