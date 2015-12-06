
import Key from 'input/keyboard/Key.js';
import AddKeyDown from 'input/keyboard/events/AddKeyDown.js';
import ProcessKeyDown, { onDown } from 'input/keyboard/events/ProcessKeyDown.js';

function fire (event) {

    console.log('pew pew', event.keyCode);

}

onDown.add(fire);

AddKeyDown(window, e => ProcessKeyDown(e, null, true));

console.log('Keyboard ready');
