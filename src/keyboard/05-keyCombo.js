
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

let combo = KeyCombo('ABCDEF');

console.log(combo);

AddKeyDown(window, e => checkCombo(e, combo));

console.log('Keyboard ready');
