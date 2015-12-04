import Key from 'input/keyboard/Key.js';
import * as KeyDown from 'input/keyboard/events/KeyDown.js';
import * as KeyUp from 'input/keyboard/events/KeyUp.js';
import * as ProcessKeyEvent from 'input/keyboard/ProcessKeyEvent.js';

let A = Key('a');
let B = Key('b');
let C = Key('c');

ProcessKeyEvent.list.add(A);
ProcessKeyEvent.list.add(B);
ProcessKeyEvent.list.add(C);

KeyDown.add(window, ProcessKeyEvent.down);
KeyUp.add(window, ProcessKeyEvent.up);
