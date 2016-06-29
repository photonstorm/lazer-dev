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

function CreateFramebuffer(width, height) {
    var fbo = gl.createFramebuffer();
    var rbo = gl.createRenderbuffer();
    var tex = null;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.bindRenderbuffer(gl.RENDERBUFFER, rbo);
    tex = CreateRenderTarget(width, height);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        tex,
        0
    );
    assert(gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE, 'Frame buffer incomplete');
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    fbo.width = width;
    fbo.height = height;
    fbo.targetTexture = tex;
    return fbo;
}

function BindFramebuffer(fbo) {
    gl.viewport(0, 0, fbo.width, fbo.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
}

function UnbindFramebuffer() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
}

//****************//
// GPGPU Specific //
//****************//
function CreateComputeTexture(shaderProgram, samplerName, jsArray) {
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
    gl.bindTexture(gl.TEXTURE_2D, null);
    texture.floatBuffer = floatArray;
    texture.byteBuffer = byteData;
    texture.dimensions = dimensions;
    texture.itemCount = jsArray.length;
    texture.samplerLocation = gl.getUniformLocation(shaderProgram, samplerName);
    //console.log('Packed 32-Bit Float Data: ', floatArray);
    return texture;
}

function BindComputeTexture(texture, textureUnit) {
    gl.uniform1i(texture.samplerLocation, textureUnit);
    gl.activeTexture(gl.TEXTURE0 + textureUnit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
}

function IsPow2(value) {
    return (value & (value - 1)) == 0;
}

function getGPUOutput(fsize, fbo) {
    var buffer = null;
    var output = null;
    output = new Float32Array(fsize);
    buffer = new Uint8Array(output.buffer);
    gl.readPixels(0, 0, fbo.width, fbo.height, gl.RGBA, gl.UNSIGNED_BYTE, buffer);
    return output;
}

function getMaxValue(array) {
    var max = 0;
    for (var i = 0, l = array.length; i < l; ++i) {
        max = array[i] > max ? array[i] : max;
    }
    return max;
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
            'uniform sampler2D sampler0;',
            'uniform sampler2D sampler1;',
            'uniform sampler2D sampler2;',
            'uniform sampler2D sampler3;',
            // Source for RGBA <-> 32-Bit Float Encoding
            // http://stackoverflow.com/a/7237286
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
            '   float aX = decode32(texture2D(sampler0, outUV).abgr * 255.0) ;',
            '   float aY = decode32(texture2D(sampler1, outUV).abgr * 255.0) ;',
            '   float bX = decode32(texture2D(sampler2, outUV).abgr * 255.0) ;',
            '   float bY = decode32(texture2D(sampler3, outUV).abgr * 255.0) ;',
            //  Simple Computation for testing.
            '   vec4 vecResult = encode32(sqrt((aX  - bX) * (aX  - bX) + (aY  - bY) * (aY  - bY))).abgr / 255.0;',
            '   gl_FragColor = vecResult;',
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
        computeTexture0 = null,
        computeTexture1 = null,
        computeTexture2 = null,
        computeTexture3 = null,
        sqrtSampleSize = 1024,
        maxComp = sqrtSampleSize * sqrtSampleSize,
        testDataPX = new Float32Array(maxComp),
        testDataPY = new Float32Array(maxComp),
        testDataVX = new Float32Array(maxComp),
        testDataVY = new Float32Array(maxComp),
        t0 = 0,
        t1 = 0,
        gpuTime = 0,
        cpuTime = 0,
        cpuOutput = new Float32Array(maxComp);


    //***************//
    // WebGL Prelude //
    //***************//
    canvas = document.createElement('canvas');
    gl = canvas.getContext('experimental-webgl');
    window.gl = gl;
    shaderOutput = CreateShaderProgram(vComputeSource, fOutputSource);
    shaderCompute = CreateShaderProgram(vComputeSource, fComputeSource);
    shaderCompute.enable();
    loc = gl.getAttribLocation(shaderCompute.program, 'inUV');
    vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 0, 0, 1, 1, 1, 1, -1, 1, 0, 1, -1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1]),
        gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 4, gl.FLOAT, gl.FALSE, 0, 0);

    //***************//
    // Generate Data //
    //***************//
    for (var i = 0; i < maxComp; ++i) {
        testDataPX[i] = i + ((Math.random() * i) % 10);
        testDataPY[i] = i + ((Math.random() * i) % 10);
        testDataVX[i] = i + ((Math.random() * i) % 10);
        testDataVY[i] = i + ((Math.random() * i) % 10);
    }

    //********************//
    // Setup Compute Data //
    //********************//
    fbo = CreateFramebuffer(sqrtSampleSize, sqrtSampleSize);
    BindFramebuffer(fbo);
    computeTexture0 = CreateComputeTexture(
        shaderCompute.program, 'sampler0',
        testDataPX
    );
    computeTexture1 = CreateComputeTexture(
        shaderCompute.program, 'sampler1',
        testDataPY
    );
    computeTexture2 = CreateComputeTexture(
        shaderCompute.program, 'sampler2',
        testDataVX
    );
    computeTexture3 = CreateComputeTexture(
        shaderCompute.program, 'sampler3',
        testDataVY
    );
    //*********************//
    // Execute GPU Compute //
    //*********************//
    BindComputeTexture(computeTexture0, 0);
    BindComputeTexture(computeTexture1, 1);
    BindComputeTexture(computeTexture2, 2);
    BindComputeTexture(computeTexture3, 3);
    document.getElementById('game').innerHTML += 'Sampling ' + (maxComp * 2) + ' 2D vectors<br>';
    t0 = performance.now();
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    t1 = performance.now();
    //var maxValue = getMaxValue(getGPUOutput(maxComp, fbo));
    gpuTime = t1 - t0;
    document.getElementById('game').innerHTML += 'GPU Execution Time: ' + gpuTime + ' milliseconds<br>';

    t0 = performance.now();
    for (var i = 0, aX = 0, aY = 0, bX = 0, bY = 0, sqrt = Math.sqrt; i < maxComp; ++i) {
        aX = testDataPX[i];
        aY = testDataPY[i];
        bX = testDataVX[i];
        bY = testDataVY[i];
        cpuOutput[i] = sqrt((aX - bX) * (aX - bX) + (aY - bY) * (aY - bY));
    }
    //maxValue = getMaxValue(cpuOutput);
    t1 = performance.now();
    cpuTime = t1 - t0;
    document.getElementById('game').innerHTML += 'CPU Execution Time: ' + cpuTime + ' milliseconds<br>';

    // Cleanup
    UnbindFramebuffer();
    shaderCompute.disable();
    shaderCompute.discard();
    shaderOutput.enable();
    shaderOutput.discard();
}());