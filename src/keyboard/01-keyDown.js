import Key from 'input/keyboard/Key.js';
import * as KeyDown from 'input/keyboard/events/KeyDown.js';
import * as ProcessKeyEvent from 'input/keyboard/ProcessKeyEvent.js';

function test (e) {

    console.log(e);

    if (e.keyCode === fire.keyCode)
    {
        console.log('BOOM!');
    }

    if (e.keyCode === 82)
    {
        KeyDown.remove(window, test);
        console.log('removed?');
    }

}

KeyDown.add(window, test);

//  Can pass either string or keyCode (65 = A, etc)
var fire = Key('a');

console.log(fire);
