let Cos = Math.cos;
let Sin = Math.sin;
let Sqrt = Math.sqrt;
let PI = Math.PI;
let Atan = Math.atan;
let Acos = Math.acos;

class Mat4x4 {
    constructor(
        a = 1.0, b = 0.0, c = 0.0, d = 0.0,
        e = 0.0, f = 1.0, g = 0.0, h = 0.0,
        i = 0.0, j = 0.0, k = 1.0, l = 0.0,
        m = 0.0, n = 0.0, o = 0.0, p = 1.0
    ) {
        this.data = new Float32Array(16);
        this.data.set([
            a, b, c, d,
            e, f, g, h,
            i, j, k, l,
            m, n, o, p
        ], 0);
    }
    translate(x, y) {
        this.mulConstValues(
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return this;
    }
    scale(x, y) {
        this.mulConstValues(
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return this;
    }
    translateVec2(v) {
        this.mulConstValues(
            1, 0, 0, v.x,
            0, 1, 0, v.y,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return this;
    }
    scaleVec2(v) {
        this.mulConstValues(
            v.x, 0, 0, 0,
            0, v.y, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return this;
    }
    rotate(t) {
        this.mulConstValues(
            Cos(t), -Sin(t), 0, 0,
            Sin(t), Cos(t), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return this;
    }
    load(
        a, b, c, d,
        e, f, g, h,
        i, j, k, l,
        m, n, o, p) {
        this.data.set([
            a, b, c, d,
            e, f, g, h,
            i, j, k, l,
            m, n, o, p
        ], 0);
        return this;
    }
    loadMat(m) {
        let d = m.data;
        this.data.set([
            d[0], d[1], d[2], d[3],
            d[4], d[5], d[6], d[7],
            d[8], d[9], d[10], d[11],
            d[12], d[13], d[14], d[15]
        ], 0);
        return this;
    }
    getValueAt(x, y) {
        return this.data[x * 4 + y];
    }
    mulConstValues(
        b00, b04, b08, b12,
        b01, b05, b09, b13,
        b02, b06, b10, b14,
        b03, b07, b11, b15) {
        let adata = this.data,
            a00 = adata[0],
            a01 = adata[1],
            a02 = adata[2],
            a03 = adata[3],
            a04 = adata[4],
            a05 = adata[5],
            a06 = adata[6],
            a07 = adata[7],
            a08 = adata[8],
            a09 = adata[9],
            a10 = adata[10],
            a11 = adata[11],
            a12 = adata[12],
            a13 = adata[13],
            a14 = adata[14],
            a15 = adata[15];

        adata.set([
            a00 * b00 + a01 * b01 + a02 * b02 + a03 * b03,
            a00 * b04 + a01 * b05 + a02 * b06 + a03 * b07,
            a00 * b08 + a01 * b09 + a02 * b10 + a03 * b11,
            a00 * b12 + a01 * b13 + a02 * b14 + a03 * b15,
            a04 * b00 + a05 * b01 + a06 * b02 + a07 * b03,
            a04 * b04 + a05 * b05 + a06 * b06 + a07 * b07,
            a04 * b08 + a05 * b09 + a06 * b10 + a07 * b11,
            a04 * b12 + a05 * b13 + a06 * b14 + a07 * b15,
            a08 * b00 + a09 * b01 + a10 * b02 + a11 * b03,
            a08 * b04 + a09 * b05 + a10 * b06 + a11 * b07,
            a08 * b08 + a09 * b09 + a10 * b10 + a11 * b11,
            a08 * b12 + a09 * b13 + a10 * b14 + a11 * b15,
            a12 * b00 + a13 * b01 + a14 * b02 + a15 * b03,
            a12 * b04 + a13 * b05 + a14 * b06 + a15 * b07,
            a12 * b08 + a13 * b09 + a14 * b10 + a15 * b11,
            a12 * b12 + a13 * b13 + a14 * b14 + a15 * b15
        ], 0);
        return this;
    }
    mul(other) {
        let adata = this.data,
            bdata = other.data,
            a00 = adata[0],
            a01 = adata[1],
            a02 = adata[2],
            a03 = adata[3],
            a04 = adata[4],
            a05 = adata[5],
            a06 = adata[6],
            a07 = adata[7],
            a08 = adata[8],
            a09 = adata[9],
            a10 = adata[10],
            a11 = adata[11],
            a12 = adata[12],
            a13 = adata[13],
            a14 = adata[14],
            a15 = adata[15],
            b00 = bdata[0],
            b04 = bdata[1],
            b08 = bdata[2],
            b12 = bdata[3],
            b01 = bdata[4],
            b05 = bdata[5],
            b09 = bdata[6],
            b13 = bdata[7],
            b02 = bdata[8],
            b06 = bdata[9],
            b10 = bdata[10],
            b14 = bdata[11],
            b03 = bdata[12],
            b07 = bdata[13],
            b11 = bdata[14],
            b15 = bdata[15];

        adata.set([
            a00 * b00 + a01 * b01 + a02 * b02 + a03 * b03,
            a00 * b04 + a01 * b05 + a02 * b06 + a03 * b07,
            a00 * b08 + a01 * b09 + a02 * b10 + a03 * b11,
            a00 * b12 + a01 * b13 + a02 * b14 + a03 * b15,
            a04 * b00 + a05 * b01 + a06 * b02 + a07 * b03,
            a04 * b04 + a05 * b05 + a06 * b06 + a07 * b07,
            a04 * b08 + a05 * b09 + a06 * b10 + a07 * b11,
            a04 * b12 + a05 * b13 + a06 * b14 + a07 * b15,
            a08 * b00 + a09 * b01 + a10 * b02 + a11 * b03,
            a08 * b04 + a09 * b05 + a10 * b06 + a11 * b07,
            a08 * b08 + a09 * b09 + a10 * b10 + a11 * b11,
            a08 * b12 + a09 * b13 + a10 * b14 + a11 * b15,
            a12 * b00 + a13 * b01 + a14 * b02 + a15 * b03,
            a12 * b04 + a13 * b05 + a14 * b06 + a15 * b07,
            a12 * b08 + a13 * b09 + a14 * b10 + a15 * b11,
            a12 * b12 + a13 * b13 + a14 * b14 + a15 * b15
        ], 0);
        return this;
    }
    loadIdentity() {
        this.data.set([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
        return this;
    }
}

class TransformStack {
    constructor(stackSize) {
        this.matrixStack = new Array(stackSize);
        this.matrixStackPointer = 0;
        this.currentMatrix = new Mat4x4();
        for (let index = 0; index < stackSize; ++index) {
            this.matrixStack[index] = new Mat4x4();
        }
    }
    translate(x, y) {
        this.currentMatrix.translate(x, y);
    }
    scale(x, y) {
        this.currentMatrix.scale(x, y);
    }
    rotate(t) {
        this.currentMatrix.rotate(t);
    }
    pushMatrix() {
        this.matrixStack[this.matrixStackPointer++].loadMat(this.currentMatrix);
    }
    popMatrix() {
        this.currentMatrix.loadMat(this.matrixStack[--this.matrixStackPointer]);
    }
}

function CompileShader(gl, src, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('WebGL %s Shader Error: %s', type === gl.FRAGMENT_SHADER ? 'Fragment' : type === gl.VERTEX_SHADER ? 'Vertex' : 'Undefined', gl.getShaderInfoLog(shader));
        throw 'Shader Error';
        return null;
    }
    return shader;
}

class Shader {
    constructor(gl, vSource, fSource) {
        this.gl = gl;
        this.program = gl.createProgram();
        this.vertexShader = CompileShader(gl, vSource, gl.VERTEX_SHADER);
        this.fragmentShader = CompileShader(gl, fSource, gl.FRAGMENT_SHADER);
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.log('WebGL Program Error: %s', gl.getProgramInfoLog(this.program));
            throw 'Shader Error';
        }
    }
    getAttribLocation(name) {
        return this.gl.getAttribLocation(this.program, name);
    }
    getUniformLocation(name) {
        return this.gl.getUniformLocation(this.program, name);
    }
    enable() {
        this.gl.useProgram(this.program);
    }
    disable() {
        this.gl.useProgram(null);
    }
    discard() {
        let gl = this.gl;
        gl.deleteShader(this.vertexShader);
        gl.deleteShader(this.fragmentShader);
        gl.deleteProgram(this.program);
    }
}

class MatrixStackGLRenderer {
    constructor(gl, width, height) {
        const MAX_SPRITES = 500000;
        const FLOAT_SIZE = 4;
        const MAX_VERTICES = MAX_SPRITES * 6;
        const MAX_POS_COUNT = MAX_VERTICES * 2;
        const MAX_COLOR_COUNT = MAX_VERTICES * 4;
        const POS_BUFFER_SIZE = MAX_VERTICES * 2 * FLOAT_SIZE;
        const COL_BUFFER_SIZE = MAX_VERTICES * 4 * FLOAT_SIZE;
        let location = null;

        this.gl = gl;
        this.transformMatrix = new TransformStack(500000);
        this.shader = new Shader(
            gl, [
                'precision mediump float;',
                'attribute vec2 inPos;',
                'attribute vec4 inColor;',
                'varying vec4 outColor;',
                'uniform mat4 constViewMatrix;',
                'void main() {',
                '   gl_Position = constViewMatrix * vec4(inPos, 1.0, 1.0);',
                '   outColor = inColor;',
                '}'
            ].join('\n'), [
                'precision mediump float;',
                'varying vec4 outColor;',
                'void main() {',
                '   gl_FragColor = outColor;',
                '}'
            ].join('\n')
        );
        this.shader.enable();
        // Allocate vertex position buffers
        location = this.shader.getAttribLocation('inPos');
        this.positionVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionVBO);
        gl.bufferData(gl.ARRAY_BUFFER, POS_BUFFER_SIZE, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 2, gl.FLOAT, gl.FALSE, 0, 0);
        this.positionData = new Float32Array(MAX_COLOR_COUNT);
        // Allocate vertex color buffers
        location = this.shader.getAttribLocation('inColor');
        this.colorVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorVBO);
        gl.bufferData(gl.ARRAY_BUFFER, COL_BUFFER_SIZE, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 4, gl.FLOAT, gl.FALSE, 0, 0);
        this.colorData = new Float32Array(MAX_COLOR_COUNT);
        // Set view matrix
        gl.uniformMatrix4fv(
            this.shader.getUniformLocation('constViewMatrix'),
            gl.FALSE,
            new Float32Array([
                2 / width, 0, 0, 0,
                0, -2 / height, 0, 0,
                0, 0, 1, 1, -1, 1, 0, 0
            ])
        );
        gl.viewport(0, 0, width, height);
        this.quadCount = 0;
        this.color = new Float32Array(4);
        this.color.set([1, 1, 1, 1], 0);
    }
    pushMatrix() {
        this.transformMatrix.pushMatrix();
    }
    popMatrix() {
        this.transformMatrix.popMatrix();
    }
    translate(x, y) {
        this.transformMatrix.translate(x, y);
    }
    scale(x, y) {
        this.transformMatrix.scale(x, y);
    }
    rotate(t) {
        this.transformMatrix.rotate(t);
    }
    clearScreen(r, g, b, a = 1.0) {
        let gl = this.gl;
        gl.clearColor(r, g, b, a);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    setColor(r, g, b) {
        this.color[0] = r;
        this.color[1] = g;
        this.color[2] = b;
    }
    setAlpha(a) {
        this.color[3] = a;
    }
    drawRect(x, y, width, height) {
        let quadCount = this.quadCount;
        let r = this.color[0];
        let g = this.color[1];
        let b = this.color[2];
        let a = this.color[3];
        let data = this.transformMatrix.currentMatrix.data;
        let x0 = x,
            y0 = y;
        let x1 = x + width,
            y1 = y + height;
        let x2 = x,
            y2 = y + height;
        let x3 = x,
            y3 = y;
        let x4 = x + width,
            y4 = y;
        let x5 = x + width,
            y5 = y + height;

        this.positionData.set([
            data[0] * x0 + data[1] * y0 + data[2] + data[3],
            data[4] * x0 + data[5] * y0 + data[6] + data[7],
            data[0] * x1 + data[1] * y1 + data[2] + data[3],
            data[4] * x1 + data[5] * y1 + data[6] + data[7],
            data[0] * x2 + data[1] * y2 + data[2] + data[3],
            data[4] * x2 + data[5] * y2 + data[6] + data[7],
            data[0] * x3 + data[1] * y3 + data[2] + data[3],
            data[4] * x3 + data[5] * y3 + data[6] + data[7],
            data[0] * x4 + data[1] * y4 + data[2] + data[3],
            data[4] * x4 + data[5] * y4 + data[6] + data[7],
            data[0] * x5 + data[1] * y5 + data[2] + data[3],
            data[4] * x5 + data[5] * y5 + data[6] + data[7]
        ], quadCount * 2 * 6);

        this.colorData.set([
            r, g, b, a,
            r, g, b, a,
            r, g, b, a,
            r, g, b, a,
            r, g, b, a,
            r, g, b, a
        ], quadCount * 4 * 6);
        ++this.quadCount;
    }
    flush() {
        let gl = this.gl;
        let quadCount = this.quadCount;

        if (quadCount > 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionVBO);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.positionData.subarray(0, quadCount * 2 * 6));
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorVBO);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.colorData.subarray(0, quadCount * 4 * 6));
            gl.drawArrays(gl.TRIANGLES, 0, quadCount * 6);
        }
        this.quadCount = 0;
    }
}

(function main() {
    let canvas = document.createElement('canvas');
    canvas.width = canvas.height = 512;
    let gl = canvas.getContext('experimental-webgl');
    let renderer = new MatrixStackGLRenderer(gl, canvas.width, canvas.height);
    let rad = 0.0;
    let Abs = Math.abs;
    const quads = 200;
    document.getElementById('game').appendChild(canvas);

    function loop() {
        requestAnimationFrame(loop);
        renderer.clearScreen(0, 0, 0);
        renderer.pushMatrix();
        renderer.translate(256, 256)
        for (let i = 0, abcos = Abs(Cos(rad)); i < quads; ++i) {
            renderer.rotate(rad)
            renderer.scale(abcos + 0.1, abcos + 0.1);
            renderer.setColor((i / quads), abcos, abcos / 2);
            renderer.drawRect(-10, -10, 20, 20);
            renderer.pushMatrix();
            renderer.translate(10, 10);
        }
        for (let i = 0; i < quads + 1; ++i) {
            renderer.popMatrix();
        }
        renderer.flush();
        rad += 0.002;
    }
    loop();
}());