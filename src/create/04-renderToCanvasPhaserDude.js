import RenderToCanvas from 'create/RenderToCanvas.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';

export default class CanvasGraphics {

    constructor () {

        let data = [
            '.......3.....',
            '......333....',
            '....5343335..',
            '...332333333.',
            '..33333333333',
            '..37773337773',
            '..38587778583',
            '..38588888583',
            '..37888888873',
            '...333333333.',
            '.F....5556...',
            '3E34.6757.6..',
            '.E.55.666.5..',
            '......777.5..',
            '.....6..7....',
            '.....7..7....'
        ];

        let canvas = RenderToCanvas(data, { pixelWidth: 16 });

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
