import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

//*********//
// Globals //
//*********//

let gl = null;
let canvas = null;

//**********//
// GL Utils //
//**********//
function assert(exp, message) {
    if (!exp) {
        alert('Failed Assertion: ' + message);
        throw 'Failed Assertion: ' + message;
    }
}

function Shader(program, vs, fs) {
    return {
        program: program,
        vertexShader: vs,
        fragmentShader: fs,
        enable: function () {
            gl.useProgram(program);
        },
        disable: function () {
            gl.useProgram(null);
        },
        discard: function () {
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            gl.deleteProgram(program);
        }
    };
}

function CompileShader(src, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('WebGL %s Shader Error: %s', type === gl.FRAGMENT_SHADER ? 'Fragment' : type === gl.VERTEX_SHADER ? 'Vertex' : 'Undefined', gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function CreateShaderProgram(vs, fs) {
    var program = gl.createProgram(),
        vertexShader = CompileShader(vs, gl.VERTEX_SHADER),
        fragmentShader = CompileShader(fs, gl.FRAGMENT_SHADER);

    if (vertexShader === null || fragmentShader === null)
        return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log('WebGL Program Error: %s', gl.getProgramInfoLog(program));
        return null;
    }
    return Shader(program, vertexShader, fragmentShader);
}

function CreateComputeTexture(jsArray) {
    var floatArray = new Float32Array(jsArray);
    var texture = gl.createTexture();
    var dimensions = Math.sqrt(floatArray.length) | 0;
    var byteData = new Uint8Array(floatArray.buffer);
    assert(IsPow2(floatArray.length), 'Data length is not power of 2.');
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, dimensions, dimensions, 0, gl.RGBA, gl.UNSIGNED_BYTE, byteData);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, null);
    texture.floatBuffer = floatArray;
    texture.byteBuffer = byteData;
    texture.dimensions = dimensions;
    return texture;
}

function CreateRenderTarget(width, height) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.activeTexture(gl.TEXTURE0);
    return texture;
}

function CreateFramebuffer(dimensions) {
    var fbo = gl.createFramebuffer();
    var rbo = gl.createRenderbuffer();
    var tex = null;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.bindRenderbuffer(gl.RENDERBUFFER, rbo);
    tex = CreateRenderTarget(dimensions, dimensions);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        tex,
        0
    );
    assert(gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE, 'Frame buffer incomplete');
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    fbo.dimensions = dimensions;
    fbo.targetTexture = tex;
    return fbo;
}

function BindComputeFramebuffer(fbo) {
    gl.viewport(0, 0, fbo.dimensions, fbo.dimensions);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
}

function UnbindComputeFramebuffer() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
}

function IsPow2(value) {
    return (value & (value - 1)) == 0;
}

function copyObject(obj) {
    var copy = {};
    for (var n in obj) {
        if (typeof obj[n] !== 'function') {
            copy[n] = obj[n];
        } else if (typeof obj[n] === 'object') {
            copy[n] = obj[n].toString();
        }
    }
    return copy;
}

function getGPUOutput(computeTexture, sampleSize) {
    var buffer = new Uint8Array(computeTexture.floatBuffer.byteLength);
    var output = null;
    gl.readPixels(0, 0, 2, 2, gl.RGBA, gl.UNSIGNED_BYTE, buffer);
    output = new Float32Array(buffer.buffer);
    console.log('original uint8:', computeTexture.byteBuffer.subarray(0, sampleSize * 4));
    console.log('original float32:', computeTexture.floatBuffer.subarray(0, sampleSize))
    console.log('output uint8 buffer:', buffer.subarray(0, sampleSize * 4));
    console.log('output float32 buffer:', output.subarray(0, sampleSize));
}

//*************//
// Entry Point //
//*************//
(function main() {
    let vComputeSource = [
            'attribute vec4 inUV;',
            'varying vec2 outUV;',
            'void main() {',
            '   outUV = inUV.zy;',
            '   gl_Position = vec4(inUV.xy, 1.0, 1.0);',
            '}'
        ].join('\n'),
        fComputeSource = [
            'precision highp float;',
            'varying vec2 outUV;',
            'uniform sampler2D sampler;',
            'highp vec4 encode32(highp float f) {',
            '    highp float e =5.0;',
            '    highp float F = abs(f); ',
            '    highp float Sign = step(0.0,-f);',
            '    highp float Exponent = floor(log2(F)); ',
            '    highp float Mantissa = (exp2(- Exponent) * F);',
            '    Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));',
            '    highp vec4 rgba;',
            '    rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));',
            '    rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);  ',
            '    rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));',
            '    rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));',
            '    return rgba;',
            '}',
            'highp float decode32(highp vec4 rgba) {',
            '    highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;',
            '    highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0; ',
            '    highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);',
            '    highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 )); ',
            '    return Result;',
            '}',
            'void main() {',
            '   float scalar = decode32(texture2D(sampler, outUV).abgr * 255.0) ;',
            //  Simple Computation for testing.
            '   scalar *= 2.0;',
            '   vec4 result = encode32(scalar).abgr / 255.0;',
            '   gl_FragColor = result;',
            '}'
        ].join('\n'),
        fOutputSource = [
            'precision mediump float;',
            'varying vec2 outUV;',
            'uniform sampler2D sampler;',
            'void main() {',
            '   gl_FragColor = texture2D(sampler,  outUV);',
            '}'
        ].join('\n'),
        shaderCompute = null,
        shaderOutput = null,
        loc = null,
        vbo = null,
        fbo = null,
        uvData = new Float32Array([-1, -1, 0, 0, 1, 1, 1, 1, -1, 1, 0, 1, -1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1]),
        computeTexture = null;

    canvas = Canvas(512, 512);
    AddToDOM(canvas, 'game');

    //***************//
    // WebGL Prelude //
    //***************//
    gl = canvas.getContext('experimental-webgl');
    window.gl = gl;
    shaderOutput = CreateShaderProgram(vComputeSource, fOutputSource);
    shaderCompute = CreateShaderProgram(vComputeSource, fComputeSource);
    shaderCompute.enable();
    loc = gl.getAttribLocation(shaderCompute.program, 'inUV');
    vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, uvData, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 4, gl.FLOAT, gl.FALSE, 0, 0);
    //***************//

    //********************//
    // Setup Compute Data //
    //********************//
    computeTexture = CreateComputeTexture(
    //  Simple input data to feed the GPU
        [1.4, 2.3, 3.2, 4.1]
    );
    gl.bindTexture(gl.TEXTURE_2D, null);
    fbo = CreateFramebuffer(computeTexture.dimensions);
    BindComputeFramebuffer(fbo);
    //*********************//
    // Execute GPU Compute //
    //*********************//
    gl.bindTexture(gl.TEXTURE_2D, computeTexture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    getGPUOutput(computeTexture, 4);
    shaderCompute.disable();
    //**************//
    // Draw Output  //
    //**************//
    // This part isn't necessary
    UnbindComputeFramebuffer();
    shaderOutput.enable();
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindTexture(gl.TEXTURE_2D, fbo.targetTexture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}());