import Color from 'graphics/color/BaseColor.js';

let color = new Color();

//  Even though 500 is an invalid value the 'red' setter clamps it within range
color.red = 500;
color.green = 50;
color.blue = 50;

console.log(color);

console.log(color.toString());
