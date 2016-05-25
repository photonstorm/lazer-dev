(function (scope) {
    var vSource = [
            'precision mediump float;',
            'attribute vec2 in_vpos;',
            'attribute vec3 in_vcol;',
            'uniform mat4 orthoProj;',
            'varying vec3 out_vcol;',
            'varying vec2 out_vpos;',
            'void main() {',
            '   gl_Position = orthoProj * vec4(in_vpos, 1.0, 1.0);',
            '   out_vcol = in_vcol;',
            '   out_vpos = in_vpos;',
            '}'
        ].join('\n'),
        fSource = [
            'precision mediump float;',
            'varying vec3 out_vcol;',
            'varying vec2 out_vpos;',
            'void main() {',
            '   gl_FragColor = vec4(normalize(out_vpos), cos(out_vcol.g), 1.0);',
            '}'
        ].join('\n'),
        canvas = null,
        gl = null,
        shaderProgram = null,
        fragShader = null,
        vertShader = null,
        posVBO = null,
        colVBO = null,
        maxSprites = 2000000,
        posSize = maxSprites * 2 * 6,
        colSize = maxSprites * 3 * 6,
        posData = new Float32Array(posSize),
        colData = new Float32Array(colSize),
        currentSpriteCount = 0,
        colorR = 1.0,
        colorG = 1.0,
        colorB = 1.0,
        setColor = function (r, g, b) {
            colorR = r;
            colorG = g;
            colorB = b;
        },
        drawRect = function (x, y, width, height) {
            posData.set([
                x, y, x + width, y + height,
                x, y + height, x, y,
                x + width, y, x + width, y + height
            ], currentSpriteCount * 2 * 6);
            colData.set([
                colorR, colorG, colorB,
                colorR, colorG, colorB,
                colorR, colorG, colorB,
                colorR, colorG, colorB,
                colorR, colorG, colorB,
                colorR, colorG, colorB
            ], currentSpriteCount * 3 * 6);
            ++currentSpriteCount;
        },
        clear = function (r, g, b) {
            gl.clearColor(r, g, b, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
        },
        flush = function () {
            if (currentSpriteCount <= 0) return;
            gl.bindBuffer(gl.ARRAY_BUFFER, posVBO);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, posData.subarray(0, currentSpriteCount * 2 * 6));
            gl.bindBuffer(gl.ARRAY_BUFFER, colVBO);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, colData.subarray(0, currentSpriteCount * 3 * 6));
            gl.drawArrays(gl.TRIANGLES, 0, currentSpriteCount * 6);
            currentSpriteCount = 0;
        },
        initShader = function (canvasWidth, canvasHeight) {
            shaderProgram = gl.createProgram();
            vertShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertShader, vSource);
            gl.compileShader(vertShader);
            if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
                throw gl.getShaderInfoLog(vertShader);
            }
            fragShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragShader, fSource);
            gl.compileShader(fragShader);
            if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
                throw gl.getShaderInfoLog(fragShader);
            }
            gl.attachShader(shaderProgram, vertShader);
            gl.attachShader(shaderProgram, fragShader);
            gl.linkProgram(shaderProgram);
            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                throw gl.getProgramInfoLog(shaderProgram);
            }
            gl.useProgram(shaderProgram);
            gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, 'orthoProj'), gl.FALSE, new Float32Array([
                2 / canvasWidth, 0, 0, 0,
                0, -2 / canvasHeight, 0, 0,
                0, 0, 1, 1, -1, 1, 0, 0
            ]));
        },
        initVBOs = function () {
            var posLoc = gl.getAttribLocation(shaderProgram, 'in_vpos'),
                colLoc = gl.getAttribLocation(shaderProgram, 'in_vcol');

            posVBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, posVBO);
            gl.bufferData(gl.ARRAY_BUFFER, posSize, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, gl.FALSE, 0, 0);

            colVBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colVBO);
            gl.bufferData(gl.ARRAY_BUFFER, colSize, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(colLoc);
            gl.vertexAttribPointer(colLoc, 3, gl.FLOAT, gl.FALSE, 0, 0);
        },
        initGL = function () {
            canvas = document.getElementById('canvas');
            gl = canvas.getContext('experimental-webgl');
            initShader(canvas.width, canvas.height);
            initVBOs();
            gl.viewport(0, 0, canvas.width, canvas.height);
            scope.fast2d = {
                drawRect: drawRect,
                clear: clear,
                setColor: setColor,
                flush: flush,
                width: canvas.width,
                height: canvas.height
            };
        };
    scope.addEventListener('load', initGL);
}(window));
