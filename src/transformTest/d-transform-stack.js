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
        if (this.quadCount > 500000) {
            flush();
        }
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

function main() {
    let canvas = document.createElement('canvas');
    canvas.width = canvas.height = 512;
    let gl = canvas.getContext('experimental-webgl');
    let renderer = new MatrixStackGLRenderer(gl, canvas.width, canvas.height);
    let rad = 0.0;
    let Abs = Math.abs;
    let mx = 0;
    let my = 0;
    const quads = 200;
    let fpsMeter = new FPSMeter({
            graph: 1,
            heat: 1,
            theme: 'dark',
            interval: 50
    });
    document.getElementById('game').appendChild(canvas);
    canvas.onmousemove = function(e) {
        mx = e.clientX - canvas.offsetLeft;
        my = e.clientY - canvas.offsetTop;
    };
    let quadArray = [];
    for (let i = 0;  i < 10; ++i) {
        quadArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 0,
            color: [Math.random(), Math.random(), Math.random()]
        });
    }
    function loop() {
        //requestAnimationFrame(loop);
        /*renderer.clearScreen(0, 0, 0);
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
        }*/
        requestAnimationFrame(loop);
        renderer.clearScreen(0, 0, 0);
        for (var i = 0; i < quadArray.length; ++i) {
            var q = quadArray[i];
            renderer.pushMatrix();
            renderer.setColor(q.color[0], q.color[1], q.color[2], q.color[3]);
            renderer.translate(q.x, q.y);
            renderer.rotate(q.r);
            renderer.drawRect(-5, -5, 10, 10);            
            renderer.popMatrix();
            q.r = -rad;
        }
        renderer.pushMatrix();
        renderer.translate(mx, my);
        renderer.rotate(rad);
        renderer.setColor(1, 1, 1);
        renderer.drawRect(-50, -50, 100, 100);
        renderer.popMatrix();
        renderer.flush();
        rad += 0.01;
        fpsMeter.tick();
    }
    loop();
}

/*! FPSMeter 0.3.1 - 9th May 2013 | https://github.com/Darsain/fpsmeter */
(function(m,j){function s(a,e){for(var g in e)try{a.style[g]=e[g]}catch(j){}return a}function H(a){return null==a?String(a):"object"===typeof a||"function"===typeof a?Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof a}function R(a,e){if("array"!==H(e))return-1;if(e.indexOf)return e.indexOf(a);for(var g=0,j=e.length;g<j;g++)if(e[g]===a)return g;return-1}function I(){var a=arguments,e;for(e in a[1])if(a[1].hasOwnProperty(e))switch(H(a[1][e])){case "object":a[0][e]=
I({},a[0][e],a[1][e]);break;case "array":a[0][e]=a[1][e].slice(0);break;default:a[0][e]=a[1][e]}return 2<a.length?I.apply(null,[a[0]].concat(Array.prototype.slice.call(a,2))):a[0]}function N(a){a=Math.round(255*a).toString(16);return 1===a.length?"0"+a:a}function S(a,e,g,j){if(a.addEventListener)a[j?"removeEventListener":"addEventListener"](e,g,!1);else if(a.attachEvent)a[j?"detachEvent":"attachEvent"]("on"+e,g)}function D(a,e){function g(a,b,d,c){return y[0|a][Math.round(Math.min((b-d)/(c-d)*J,J))]}
function r(){f.legend.fps!==q&&(f.legend.fps=q,f.legend[T]=q?"FPS":"ms");K=q?b.fps:b.duration;f.count[T]=999<K?"999+":K.toFixed(99<K?0:d.decimals)}function m(){z=A();L<z-d.threshold&&(b.fps-=b.fps/Math.max(1,60*d.smoothing/d.interval),b.duration=1E3/b.fps);for(c=d.history;c--;)E[c]=0===c?b.fps:E[c-1],F[c]=0===c?b.duration:F[c-1];r();if(d.heat){if(w.length)for(c=w.length;c--;)w[c].el.style[h[w[c].name].heatOn]=q?g(h[w[c].name].heatmap,b.fps,0,d.maxFps):g(h[w[c].name].heatmap,b.duration,d.threshold,
0);if(f.graph&&h.column.heatOn)for(c=u.length;c--;)u[c].style[h.column.heatOn]=q?g(h.column.heatmap,E[c],0,d.maxFps):g(h.column.heatmap,F[c],d.threshold,0)}if(f.graph)for(p=0;p<d.history;p++)u[p].style.height=(q?E[p]?Math.round(O/d.maxFps*Math.min(E[p],d.maxFps)):0:F[p]?Math.round(O/d.threshold*Math.min(F[p],d.threshold)):0)+"px"}function k(){20>d.interval?(x=M(k),m()):(x=setTimeout(k,d.interval),P=M(m))}function G(a){a=a||window.event;a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=
!1,a.cancelBubble=!0);b.toggle()}function U(){d.toggleOn&&S(f.container,d.toggleOn,G,1);a.removeChild(f.container)}function V(){f.container&&U();h=D.theme[d.theme];y=h.compiledHeatmaps||[];if(!y.length&&h.heatmaps.length){for(p=0;p<h.heatmaps.length;p++){y[p]=[];for(c=0;c<=J;c++){var b=y[p],e=c,g;g=0.33/J*c;var j=h.heatmaps[p].saturation,m=h.heatmaps[p].lightness,n=void 0,k=void 0,l=void 0,t=l=void 0,v=n=k=void 0,v=void 0,l=0.5>=m?m*(1+j):m+j-m*j;0===l?g="#000":(t=2*m-l,k=(l-t)/l,g*=6,n=Math.floor(g),
v=g-n,v*=l*k,0===n||6===n?(n=l,k=t+v,l=t):1===n?(n=l-v,k=l,l=t):2===n?(n=t,k=l,l=t+v):3===n?(n=t,k=l-v):4===n?(n=t+v,k=t):(n=l,k=t,l-=v),g="#"+N(n)+N(k)+N(l));b[e]=g}}h.compiledHeatmaps=y}f.container=s(document.createElement("div"),h.container);f.count=f.container.appendChild(s(document.createElement("div"),h.count));f.legend=f.container.appendChild(s(document.createElement("div"),h.legend));f.graph=d.graph?f.container.appendChild(s(document.createElement("div"),h.graph)):0;w.length=0;for(var q in f)f[q]&&
h[q].heatOn&&w.push({name:q,el:f[q]});u.length=0;if(f.graph){f.graph.style.width=d.history*h.column.width+(d.history-1)*h.column.spacing+"px";for(c=0;c<d.history;c++)u[c]=f.graph.appendChild(s(document.createElement("div"),h.column)),u[c].style.position="absolute",u[c].style.bottom=0,u[c].style.right=c*h.column.width+c*h.column.spacing+"px",u[c].style.width=h.column.width+"px",u[c].style.height="0px"}s(f.container,d);r();a.appendChild(f.container);f.graph&&(O=f.graph.clientHeight);d.toggleOn&&("click"===
d.toggleOn&&(f.container.style.cursor="pointer"),S(f.container,d.toggleOn,G))}"object"===H(a)&&a.nodeType===j&&(e=a,a=document.body);a||(a=document.body);var b=this,d=I({},D.defaults,e||{}),f={},u=[],h,y,J=100,w=[],W=0,B=d.threshold,Q=0,L=A()-B,z,E=[],F=[],x,P,q="fps"===d.show,O,K,c,p;b.options=d;b.fps=0;b.duration=0;b.isPaused=0;b.tickStart=function(){Q=A()};b.tick=function(){z=A();W=z-L;B+=(W-B)/d.smoothing;b.fps=1E3/B;b.duration=Q<L?B:z-Q;L=z};b.pause=function(){x&&(b.isPaused=1,clearTimeout(x),
C(x),C(P),x=P=0);return b};b.resume=function(){x||(b.isPaused=0,k());return b};b.set=function(a,c){d[a]=c;q="fps"===d.show;-1!==R(a,X)&&V();-1!==R(a,Y)&&s(f.container,d);return b};b.showDuration=function(){b.set("show","ms");return b};b.showFps=function(){b.set("show","fps");return b};b.toggle=function(){b.set("show",q?"ms":"fps");return b};b.hide=function(){b.pause();f.container.style.display="none";return b};b.show=function(){b.resume();f.container.style.display="block";return b};b.destroy=function(){b.pause();
U();b.tick=b.tickStart=function(){}};V();k()}var A,r=m.performance;A=r&&(r.now||r.webkitNow)?r[r.now?"now":"webkitNow"].bind(r):function(){return+new Date};for(var C=m.cancelAnimationFrame||m.cancelRequestAnimationFrame,M=m.requestAnimationFrame,r=["moz","webkit","o"],G=0,k=0,Z=r.length;k<Z&&!C;++k)M=(C=m[r[k]+"CancelAnimationFrame"]||m[r[k]+"CancelRequestAnimationFrame"])&&m[r[k]+"RequestAnimationFrame"];C||(M=function(a){var e=A(),g=Math.max(0,16-(e-G));G=e+g;return m.setTimeout(function(){a(e+
g)},g)},C=function(a){clearTimeout(a)});var T="string"===H(document.createElement("div").textContent)?"textContent":"innerText";D.extend=I;window.FPSMeter=D;D.defaults={interval:100,smoothing:10,show:"fps",toggleOn:"click",decimals:1,maxFps:60,threshold:100,position:"absolute",zIndex:10,left:"5px",top:"5px",right:"auto",bottom:"auto",margin:"0 0 0 0",theme:"dark",heat:0,graph:0,history:20};var X=["toggleOn","theme","heat","graph","history"],Y="position zIndex left top right bottom margin".split(" ")})(window);(function(m,j){j.theme={};var s=j.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:"5px",minWidth:"95px",height:"30px",lineHeight:"30px",textAlign:"right",textShadow:"none"},count:{heatOn:null,heatmap:null,position:"absolute",top:0,right:0,padding:"5px 10px",height:"30px",fontSize:"24px",fontFamily:"Consolas, Andale Mono, monospace",zIndex:2},legend:{heatOn:null,heatmap:null,position:"absolute",top:0,left:0,padding:"5px 10px",height:"30px",fontSize:"12px",lineHeight:"32px",fontFamily:"sans-serif",
textAlign:"left",zIndex:2},graph:{heatOn:null,heatmap:null,position:"relative",boxSizing:"padding-box",MozBoxSizing:"padding-box",height:"100%",zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};j.theme.dark=j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.8}],container:{background:"#222",color:"#fff",border:"1px solid #1a1a1a",textShadow:"1px 1px 0 #222"},count:{heatOn:"color"},column:{background:"#3f3f3f"}});j.theme.light=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.5}],
container:{color:"#666",background:"#fff",textShadow:"1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},count:{heatOn:"color"},column:{background:"#eaeaea"}});j.theme.colorful=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.6}],container:{heatOn:"backgroundColor",background:"#888",color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.2)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},column:{background:"#777",backgroundColor:"rgba(0,0,0,.2)"}});j.theme.transparent=
j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.5}],container:{padding:0,color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.5)"},count:{padding:"0 5px",height:"40px",lineHeight:"40px"},legend:{padding:"0 5px",height:"40px",lineHeight:"42px"},graph:{height:"40px"},column:{width:5,background:"#999",heatOn:"backgroundColor",opacity:0.5}})})(window,FPSMeter);

main();