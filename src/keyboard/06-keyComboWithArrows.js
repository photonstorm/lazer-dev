
import AddKeyDown from 'input/keyboard/events/AddKeyDown.js';
import KeyCombo from 'input/keyboard/combo/KeyCombo.js';
import ProcessKeyCombo from 'input/keyboard/combo/ProcessKeyCombo.js';

function checkCombo (event, combo) {

    let result = ProcessKeyCombo(event, combo);

    if (result)
    {
        console.log('COMBO MATCHED!');
    }

}

//  37 = LEFT
//  38 = UP
//  39 = RIGHT
//  40 = DOWN

let combo = KeyCombo([ 38, 38, 38, 40, 40, 40, 37, 37, 37, 39, 39, 39 ]);

console.log(combo);

AddKeyDown(window, e => checkCombo(e, combo));

console.log('Keyboard ready');
