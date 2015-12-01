import CSStoRGB from 'graphics/color/CSStoRGB.js';

let { r, g, b } = CSStoRGB('wheat');

console.log('wheat', r, g, b);

console.log('lightskyblue', CSStoRGB('lightskyblue'));
