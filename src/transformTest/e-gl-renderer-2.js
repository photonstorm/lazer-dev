function main() {
    var canvas = document.createElement('canvas'),
        renderer = null,
        quadSample = null,
        fpsMeter = new FPSMeter({
            graph: 1,
            heat: 1,
            theme: 'dark',
            interval: 50
        }),
        quadArray = [],
        gl = null;

    canvas.width = canvas.height = 512;
    renderer = CreateRenderer2D(canvas);
    gl = renderer.gl;
    for (var i = 0; i < 80000; ++i) {
        var q = CreateQuad(renderer, -2, -2, 4, 4);
        q.setTranslate(Math.random() * canvas.width, Math.random() * canvas.height);
        q.setColor(Math.random(), Math.random(), Math.random());
        quadArray.push(q);
    }
    quadSample = CreateQuad(renderer, -50, -50, 100, 100);
    quadSample.setTranslate(256, 256);

    document.getElementById('game').appendChild(canvas);

    function loop() {
        requestAnimationFrame(loop);
        ClearScreen(renderer);
        for (var i = 0; i < quadArray.length; ++i) {
            quadArray[i].incRotation(-0.1);
        }
        quadSample.incRotation(0.01);
        FlushRenderer(renderer);
        fpsMeter.tick();
    }
    loop();
}

// Lazer Code
function CompileGLShader(gl, src, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('WebGL %s Shader Error: %s',
            type === gl.FRAGMENT_SHADER ? 'Fragment' : type === gl.VERTEX_SHADER ? 'Vertex' : 'Undefined',
            gl.getShaderInfoLog(shader)
        );
        return null;
    }
    return shader;
}

function BuildShader(gl, vSource, fSource) {
    var program = gl.createProgram();
    var vertexShader = CompileGLShader(gl, vSource, gl.VERTEX_SHADER);
    var fragmentShader = CompileGLShader(gl, fSource, gl.FRAGMENT_SHADER);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('WebGL Program Error: %s', gl.getProgramInfoLog(program));
    }
    gl.useProgram(null);
    return {
        enable: function () {
            gl.useProgram(program);
        },
        disable: function () {
            gl.useProgram(null);
        },
        discard: function () {
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteProgram(program);
        },
        getAttribLocation(name) {
            return gl.getAttribLocation(program, name);
        },
        getUniformLocation(name) {
            return gl.getUniformLocation(program, name);
        }
    };
}

function CreateRenderer2D(canvas) {
    try {
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return CreateGLRenderer2D(canvas, gl);
    } catch (e) {
        console.error('Failed to create WebGL Context\n', e);
        return null // CreateCanvasRenderer2D(canvas, ctx);
    }
}

function AllocBufferObject(gl, location, size, baseAllocSize, usage) {
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, baseAllocSize * size, usage);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, gl.FALSE, 0, 0);
    return vbo;
}

function CreateGLRenderer2D(canvas, gl) {
    var MAX_QUADS = 200001,
        FLOAT_SIZE = 4,
        QUAD_VERTEX_COUNT = 6,
        MAX_BYTE_SIZE = MAX_QUADS * QUAD_VERTEX_COUNT * FLOAT_SIZE,
        mainShader = BuildShader(
            gl, [
                // Vertex Shader
                'precision mediump float;',
                // input
                'attribute vec2 inVertexPosition;',
                'attribute vec2 inTranslation;',
                'attribute vec2 inScale;',
                'attribute vec4 inColor;',
                'attribute float inRotation;',
                // output
                'varying vec4 outColor;',
                // const
                'uniform mat4 constViewMatrix;',
                // exec
                'void main() {',
                '   vec2 result = inVertexPosition;',
                '   float rc = cos(inRotation);',
                '   float rs = sin(inRotation);',
                '   result.x = inVertexPosition.x * rc - inVertexPosition.y * rs;',
                '   result.y = inVertexPosition.x * rs + inVertexPosition.y * rc;',
                '   result = result * inScale;',
                '   result = result + inTranslation;',
                '   gl_Position = constViewMatrix * vec4(result, 1.0, 1.0);',
                '   outColor = inColor;',
                '}'
            ].join('\n'), [
                // Fragment Shader
                'precision mediump float;',
                // output
                'varying vec4 outColor;',
                // exec
                'void main() {',
                '   gl_FragColor = outColor;',
                '}'
            ].join('\n')
        ),
        inVertexPositionBuffer = null,
        inTranslationBuffer = null,
        inScaleBuffer = null,
        inRotationBuffer = null,
        inColorBuffer = null,
        inVertexPositionData = null,
        inTranslationData = null,
        inScaleData = null,
        inRotationData = null,
        inColorData = null,
        width = canvas.width,
        height = canvas.height;

    mainShader.enable();

    inVertexPositionData = new Float32Array(MAX_QUADS * QUAD_VERTEX_COUNT * 2);
    inTranslationData = new Float32Array(MAX_QUADS * QUAD_VERTEX_COUNT * 2);
    inScaleData = new Float32Array(MAX_QUADS * QUAD_VERTEX_COUNT * 2);
    inRotationData = new Float32Array(MAX_QUADS * QUAD_VERTEX_COUNT * 1);
    inColorData = new Float32Array(MAX_QUADS * QUAD_VERTEX_COUNT * 4);

    inVertexPositionBuffer = AllocBufferObject(
        gl,
        mainShader.getAttribLocation('inVertexPosition'),
        2,
        MAX_BYTE_SIZE,
        gl.STATIC_DRAW
    );
    inTranslationBuffer = AllocBufferObject(
        gl,
        mainShader.getAttribLocation('inTranslation'),
        2,
        MAX_BYTE_SIZE,
        gl.STATIC_DRAW
    );
    inRotationBuffer = AllocBufferObject(
        gl,
        mainShader.getAttribLocation('inRotation'),
        1,
        MAX_BYTE_SIZE,
        gl.STATIC_DRAW
    );
    inScaleBuffer = AllocBufferObject(
        gl,
        mainShader.getAttribLocation('inScale'),
        2,
        MAX_BYTE_SIZE,
        gl.STATIC_DRAW
    );

    inColorBuffer = AllocBufferObject(
        gl,
        mainShader.getAttribLocation('inColor'),
        4,
        MAX_BYTE_SIZE,
        gl.STATIC_DRAW
    );
    gl.uniformMatrix4fv(
        mainShader.getUniformLocation('constViewMatrix'),
        gl.FALSE,
        new Float32Array([
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 1, 1, -1, 1, 0, 0
        ])
    );
    gl.viewport(0, 0, width, height);
    return {
        vbo: {
            vertexPosition: inVertexPositionBuffer,
            translation: inTranslationBuffer,
            scale: inScaleBuffer,
            rotation: inRotationBuffer,
            color: inColorBuffer,
            vertexPositionDirty: true,
            translationDirty: true,
            scaleDirty: true,
            rotationDirty: true,
            colorDirty: true
        },
        cpuData: {
            vertexPosition: inVertexPositionData,
            translation: inTranslationData,
            scale: inScaleData,
            rotation: inRotationData,
            color: inColorData,
            vertexPositionSize: 0,
            translationSize: 0,
            scaleSize: 0,
            rotationSize: 0,
            colorSize: 0,
            quadCount: 0
        },
        canvas: canvas,
        gl: gl,
        clearColor: new Float32Array([0, 0, 0]),
        get MAX_QUADS() {
            return MAX_QUADS;
        },
        get QUAD_VERTEX_COUNT() {
            return QUAD_VERTEX_COUNT;
        }
    };
}

function CreateQuad(renderer, x, y, width, height) {
    var data = renderer.cpuData,
        rawVertexPosition = data.vertexPosition.subarray(data.vertexPositionSize, data.vertexPositionSize + 12),
        rawTranslation = data.translation.subarray(data.translationSize, data.translationSize + 12),
        rawScale = data.scale.subarray(data.scaleSize, data.scaleSize + 12),
        rawRotation = data.rotation.subarray(data.rotationSize, data.rotationSize + 6),
        rawColor = data.color.subarray(data.colorSize, data.colorSize + 24),
        xw = x + width,
        yh = y + height,
        vbo = renderer.vbo,
        quadX = x,
        quadY = y,
        quadWidth = width,
        quadHeight = height,
        quadTranslateX = 0,
        quadTranslateY = 0,
        quadScaleX = 1,
        quadScaleY = 1,
        quadRotation = 0,
        quadColorR = 1,
        quadColorG = 1,
        quadColorB = 1,
        quadColorA = 1,
        gl = renderer.gl,
        vertexPositionOffset = data.vertexPositionSize,
        translationOffset = data.translationSize,
        scaleOffset = data.scaleSize,
        rotationOffset = data.rotationSize,
        colorOffset = data.colorSize,
        quadCount = data.quadCount;

    rawVertexPosition.set([
        x, y,
        xw, yh,
        x, yh,
        x, y,
        xw, y,
        xw, yh
    ], 0);

    rawTranslation.fill(0);
    rawScale.fill(1);
    rawRotation.fill(0);
    rawColor.fill(1);

    data.quadCount += 1;
    data.vertexPositionSize += 12;
    data.translationSize += 12;
    data.scaleSize += 12;
    data.rotationSize += 6;
    data.colorSize += 24;
    vbo.vertexPositionDirty = true;
    vbo.translationDirty = true;
    vbo.scaleDirty = true;
    vbo.rotationDirty = true;
    vbo.colorDirty = true;

    return {
        f: 0,
        get x() {
            return quadX;
        },
        get y() {
            return quadY;
        },
        set x(x) {
            var xw = x + quadWidth;
            var yh = quadY + quadHeight;
            quadX = x;
            rawVertexPosition.set([
                x, quadY,
                xw, yh,
                x, yh,
                x, quadY,
                xw, quadY,
                xw, yh
            ], 0);
            vbo.vertexPositionDirty = true;
        },
        set y(y) {
            var xw = quadX + quadWidth;
            var yh = y + quadHeight;
            quadY = y;
            rawVertexPosition.set([
                quadX, y,
                xw, yh,
                quadX, yh,
                quadX, y,
                xw, y,
                xw, yh
            ], 0);
            vbo.vertexPositionDirty = true;
        },
        setPosition: function (x, y) {
            rawVertexPosition.set([
                x, y,
                xw, yh,
                x, yh,
                x, y,
                xw, y,
                xw, yh
            ], 0);
            quadX = x;
            quadY = y;
            vbo.vertexPositionDirty = true;
        },
        get width() {
            return quadWidth;
        },
        get height() {
            return quadHeight;
        },
        translate: {
            get x() {
                return quadTranslateX;
            },
            get y() {
                return quadTranslateY;
            },
            set x(tx) {
                var ty = quadTranslateY;
                quadTranslateX = tx;
                rawTranslation.set([
                    tx, ty,
                    tx, ty,
                    tx, ty,
                    tx, ty,
                    tx, ty,
                    tx, ty
                ], 0);
                vbo.translationDirty = true;
            },
            set y(ty) {
                var tx = quadTranslateX;
                quadTranslateY = ty;
                rawTranslation.set([
                    tx, ty,
                    tx, ty,
                    tx, ty,
                    tx, ty,
                    tx, ty,
                    tx, ty
                ], 0);
                vbo.translationDirty = true;
            }
        },
        setTranslate: function (tx, ty) {
            quadTranslateX = tx;
            quadTranslateY = ty;
            rawTranslation.set([
                tx, ty,
                tx, ty,
                tx, ty,
                tx, ty,
                tx, ty,
                tx, ty
            ], 0);
            vbo.translationDirty = true;
        },
        scale: {
            get x() {
                return quadScaleX;
            },
            get y() {
                return quadScaleY;
            }
        },
        get rotation() {
            return quadRotation;
        },
        set rotation(rt) {
            rawRotation.fill(rt);
            quadRotation = rt;
            vbo.rotationDirty = true;
        },
        incRotation(rt) {
            quadRotation += rt;
            rawRotation.fill(quadRotation);
            vbo.rotationDirty = true;
        },
        setColor: function (r, g, b, a = 1) {
            quadColorR = r;
            quadColorG = g;
            quadColorB = b;
            quadColorA = a;
            rawColor.set([
                r, g, b, a,
                r, g, b, a,
                r, g, b, a,
                r, g, b, a,
                r, g, b, a,
                r, g, b, a
            ], 0);
            vbo.colorDirty = true;
        },
        getColor: function () {
            return [quadColorR, quadColorG, quadColorB, quadColorA];
        }
    };
}

function ClearScreen(renderer) {
    var color = renderer.clearColor;
    var gl = renderer.gl;
    gl.clearColor(color[0], color[1], color[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function FlushRenderer(renderer) {
    var vbo = renderer.vbo;
    var data = renderer.cpuData;
    var gl = renderer.gl;
    var quadCount = data.quadCount;
    // Submit Vertex Position
    if (vbo.vertexPositionDirty) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo.vertexPosition);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, data.vertexPosition.subarray(0, quadCount * 2 * 6));
        vbo.vertexPositionDirty = false;
    }
    // Submit Translation
    if (vbo.translationDirty) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo.translation);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, data.translation.subarray(0, quadCount * 2 * 6));
        vbo.translationDirty = false;
    }
    // Submit Scale
    if (vbo.scaleDirty) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo.scale);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, data.scale.subarray(0, quadCount * 2 * 6));
        vbo.scaleDirty = false;
    }
    // Submit Rotation
    if (vbo.rotationDirty) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo.rotation);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, data.rotation.subarray(0, quadCount * 1 * 6));
        vbo.rotationDirty = false;
    }
    // Submit Color
    if (vbo.colorDirty) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo.color);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, data.color.subarray(0, quadCount * 4 * 6));
        vbo.colorDirty = false;
    }
    // Draw Call
    gl.drawArrays(gl.TRIANGLES, 0, quadCount * 6);
}


/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/****************************     hi!    ********************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
/*! FPSMeter 0.3.1 - 9th May 2013 | https://github.com/Darsain/fpsmeter */
(function (m, j) {
    function s(a, e) {
        for (var g in e) try {
            a.style[g] = e[g]
        } catch (j) {}
        return a
    }

    function H(a) {
        return null == a ? String(a) : "object" === typeof a || "function" === typeof a ? Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase() || "object" : typeof a
    }

    function R(a, e) {
        if ("array" !== H(e)) return -1;
        if (e.indexOf) return e.indexOf(a);
        for (var g = 0, j = e.length; g < j; g++)
            if (e[g] === a) return g;
        return -1
    }

    function I() {
        var a = arguments,
            e;
        for (e in a[1])
            if (a[1].hasOwnProperty(e)) switch (H(a[1][e])) {
            case "object":
                a[0][e] =
                    I({}, a[0][e], a[1][e]);
                break;
            case "array":
                a[0][e] = a[1][e].slice(0);
                break;
            default:
                a[0][e] = a[1][e]
            }
        return 2 < a.length ? I.apply(null, [a[0]].concat(Array.prototype.slice.call(a, 2))) : a[0]
    }

    function N(a) {
        a = Math.round(255 * a).toString(16);
        return 1 === a.length ? "0" + a : a
    }

    function S(a, e, g, j) {
        if (a.addEventListener) a[j ? "removeEventListener" : "addEventListener"](e, g, !1);
        else if (a.attachEvent) a[j ? "detachEvent" : "attachEvent"]("on" + e, g)
    }

    function D(a, e) {
        function g(a, b, d, c) {
            return y[0 | a][Math.round(Math.min((b - d) / (c - d) * J, J))]
        }

        function r() {
            f.legend.fps !== q && (f.legend.fps = q, f.legend[T] = q ? "FPS" : "ms");
            K = q ? b.fps : b.duration;
            f.count[T] = 999 < K ? "999+" : K.toFixed(99 < K ? 0 : d.decimals)
        }

        function m() {
            z = A();
            L < z - d.threshold && (b.fps -= b.fps / Math.max(1, 60 * d.smoothing / d.interval), b.duration = 1E3 / b.fps);
            for (c = d.history; c--;) E[c] = 0 === c ? b.fps : E[c - 1], F[c] = 0 === c ? b.duration : F[c - 1];
            r();
            if (d.heat) {
                if (w.length)
                    for (c = w.length; c--;) w[c].el.style[h[w[c].name].heatOn] = q ? g(h[w[c].name].heatmap, b.fps, 0, d.maxFps) : g(h[w[c].name].heatmap, b.duration, d.threshold,
                        0);
                if (f.graph && h.column.heatOn)
                    for (c = u.length; c--;) u[c].style[h.column.heatOn] = q ? g(h.column.heatmap, E[c], 0, d.maxFps) : g(h.column.heatmap, F[c], d.threshold, 0)
            }
            if (f.graph)
                for (p = 0; p < d.history; p++) u[p].style.height = (q ? E[p] ? Math.round(O / d.maxFps * Math.min(E[p], d.maxFps)) : 0 : F[p] ? Math.round(O / d.threshold * Math.min(F[p], d.threshold)) : 0) + "px"
        }

        function k() {
            20 > d.interval ? (x = M(k), m()) : (x = setTimeout(k, d.interval), P = M(m))
        }

        function G(a) {
            a = a || window.event;
            a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            b.toggle()
        }

        function U() {
            d.toggleOn && S(f.container, d.toggleOn, G, 1);
            a.removeChild(f.container)
        }

        function V() {
            f.container && U();
            h = D.theme[d.theme];
            y = h.compiledHeatmaps || [];
            if (!y.length && h.heatmaps.length) {
                for (p = 0; p < h.heatmaps.length; p++) {
                    y[p] = [];
                    for (c = 0; c <= J; c++) {
                        var b = y[p],
                            e = c,
                            g;
                        g = 0.33 / J * c;
                        var j = h.heatmaps[p].saturation,
                            m = h.heatmaps[p].lightness,
                            n = void 0,
                            k = void 0,
                            l = void 0,
                            t = l = void 0,
                            v = n = k = void 0,
                            v = void 0,
                            l = 0.5 >= m ? m * (1 + j) : m + j - m * j;
                        0 === l ? g = "#000" : (t = 2 * m - l, k = (l - t) / l, g *= 6, n = Math.floor(g),
                            v = g - n, v *= l * k, 0 === n || 6 === n ? (n = l, k = t + v, l = t) : 1 === n ? (n = l - v, k = l, l = t) : 2 === n ? (n = t, k = l, l = t + v) : 3 === n ? (n = t, k = l - v) : 4 === n ? (n = t + v, k = t) : (n = l, k = t, l -= v), g = "#" + N(n) + N(k) + N(l));
                        b[e] = g
                    }
                }
                h.compiledHeatmaps = y
            }
            f.container = s(document.createElement("div"), h.container);
            f.count = f.container.appendChild(s(document.createElement("div"), h.count));
            f.legend = f.container.appendChild(s(document.createElement("div"), h.legend));
            f.graph = d.graph ? f.container.appendChild(s(document.createElement("div"), h.graph)) : 0;
            w.length = 0;
            for (var q in f) f[q] &&
                h[q].heatOn && w.push({
                    name: q,
                    el: f[q]
                });
            u.length = 0;
            if (f.graph) {
                f.graph.style.width = d.history * h.column.width + (d.history - 1) * h.column.spacing + "px";
                for (c = 0; c < d.history; c++) u[c] = f.graph.appendChild(s(document.createElement("div"), h.column)), u[c].style.position = "absolute", u[c].style.bottom = 0, u[c].style.right = c * h.column.width + c * h.column.spacing + "px", u[c].style.width = h.column.width + "px", u[c].style.height = "0px"
            }
            s(f.container, d);
            r();
            a.appendChild(f.container);
            f.graph && (O = f.graph.clientHeight);
            d.toggleOn && ("click" ===
                d.toggleOn && (f.container.style.cursor = "pointer"), S(f.container, d.toggleOn, G))
        }
        "object" === H(a) && a.nodeType === j && (e = a, a = document.body);
        a || (a = document.body);
        var b = this,
            d = I({}, D.defaults, e || {}),
            f = {},
            u = [],
            h, y, J = 100,
            w = [],
            W = 0,
            B = d.threshold,
            Q = 0,
            L = A() - B,
            z, E = [],
            F = [],
            x, P, q = "fps" === d.show,
            O, K, c, p;
        b.options = d;
        b.fps = 0;
        b.duration = 0;
        b.isPaused = 0;
        b.tickStart = function () {
            Q = A()
        };
        b.tick = function () {
            z = A();
            W = z - L;
            B += (W - B) / d.smoothing;
            b.fps = 1E3 / B;
            b.duration = Q < L ? B : z - Q;
            L = z
        };
        b.pause = function () {
            x && (b.isPaused = 1, clearTimeout(x),
                C(x), C(P), x = P = 0);
            return b
        };
        b.resume = function () {
            x || (b.isPaused = 0, k());
            return b
        };
        b.set = function (a, c) {
            d[a] = c;
            q = "fps" === d.show; - 1 !== R(a, X) && V(); - 1 !== R(a, Y) && s(f.container, d);
            return b
        };
        b.showDuration = function () {
            b.set("show", "ms");
            return b
        };
        b.showFps = function () {
            b.set("show", "fps");
            return b
        };
        b.toggle = function () {
            b.set("show", q ? "ms" : "fps");
            return b
        };
        b.hide = function () {
            b.pause();
            f.container.style.display = "none";
            return b
        };
        b.show = function () {
            b.resume();
            f.container.style.display = "block";
            return b
        };
        b.destroy = function () {
            b.pause();
            U();
            b.tick = b.tickStart = function () {}
        };
        V();
        k()
    }
    var A, r = m.performance;
    A = r && (r.now || r.webkitNow) ? r[r.now ? "now" : "webkitNow"].bind(r) : function () {
        return +new Date
    };
    for (var C = m.cancelAnimationFrame || m.cancelRequestAnimationFrame, M = m.requestAnimationFrame, r = ["moz", "webkit", "o"], G = 0, k = 0, Z = r.length; k < Z && !C; ++k) M = (C = m[r[k] + "CancelAnimationFrame"] || m[r[k] + "CancelRequestAnimationFrame"]) && m[r[k] + "RequestAnimationFrame"];
    C || (M = function (a) {
        var e = A(),
            g = Math.max(0, 16 - (e - G));
        G = e + g;
        return m.setTimeout(function () {
            a(e +
                g)
        }, g)
    }, C = function (a) {
        clearTimeout(a)
    });
    var T = "string" === H(document.createElement("div").textContent) ? "textContent" : "innerText";
    D.extend = I;
    window.FPSMeter = D;
    D.defaults = {
        interval: 100,
        smoothing: 10,
        show: "fps",
        toggleOn: "click",
        decimals: 1,
        maxFps: 60,
        threshold: 100,
        position: "absolute",
        zIndex: 10,
        left: "5px",
        top: "5px",
        right: "auto",
        bottom: "auto",
        margin: "0 0 0 0",
        theme: "dark",
        heat: 0,
        graph: 0,
        history: 20
    };
    var X = ["toggleOn", "theme", "heat", "graph", "history"],
        Y = "position zIndex left top right bottom margin".split(" ")
})(window);
(function (m, j) {
    j.theme = {};
    var s = j.theme.base = {
        heatmaps: [],
        container: {
            heatOn: null,
            heatmap: null,
            padding: "5px",
            minWidth: "95px",
            height: "30px",
            lineHeight: "30px",
            textAlign: "right",
            textShadow: "none"
        },
        count: {
            heatOn: null,
            heatmap: null,
            position: "absolute",
            top: 0,
            right: 0,
            padding: "5px 10px",
            height: "30px",
            fontSize: "24px",
            fontFamily: "Consolas, Andale Mono, monospace",
            zIndex: 2
        },
        legend: {
            heatOn: null,
            heatmap: null,
            position: "absolute",
            top: 0,
            left: 0,
            padding: "5px 10px",
            height: "30px",
            fontSize: "12px",
            lineHeight: "32px",
            fontFamily: "sans-serif",
            textAlign: "left",
            zIndex: 2
        },
        graph: {
            heatOn: null,
            heatmap: null,
            position: "relative",
            boxSizing: "padding-box",
            MozBoxSizing: "padding-box",
            height: "100%",
            zIndex: 1
        },
        column: {
            width: 4,
            spacing: 1,
            heatOn: null,
            heatmap: null
        }
    };
    j.theme.dark = j.extend({}, s, {
        heatmaps: [{
            saturation: 0.8,
            lightness: 0.8
        }],
        container: {
            background: "#222",
            color: "#fff",
            border: "1px solid #1a1a1a",
            textShadow: "1px 1px 0 #222"
        },
        count: {
            heatOn: "color"
        },
        column: {
            background: "#3f3f3f"
        }
    });
    j.theme.light = j.extend({}, s, {
        heatmaps: [{
            saturation: 0.5,
            lightness: 0.5
        }],
        container: {
            color: "#666",
            background: "#fff",
            textShadow: "1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",
            boxShadow: "0 0 0 1px rgba(0,0,0,.1)"
        },
        count: {
            heatOn: "color"
        },
        column: {
            background: "#eaeaea"
        }
    });
    j.theme.colorful = j.extend({}, s, {
        heatmaps: [{
            saturation: 0.5,
            lightness: 0.6
        }],
        container: {
            heatOn: "backgroundColor",
            background: "#888",
            color: "#fff",
            textShadow: "1px 1px 0 rgba(0,0,0,.2)",
            boxShadow: "0 0 0 1px rgba(0,0,0,.1)"
        },
        column: {
            background: "#777",
            backgroundColor: "rgba(0,0,0,.2)"
        }
    });
    j.theme.transparent =
        j.extend({}, s, {
            heatmaps: [{
                saturation: 0.8,
                lightness: 0.5
            }],
            container: {
                padding: 0,
                color: "#fff",
                textShadow: "1px 1px 0 rgba(0,0,0,.5)"
            },
            count: {
                padding: "0 5px",
                height: "40px",
                lineHeight: "40px"
            },
            legend: {
                padding: "0 5px",
                height: "40px",
                lineHeight: "42px"
            },
            graph: {
                height: "40px"
            },
            column: {
                width: 5,
                background: "#999",
                heatOn: "backgroundColor",
                opacity: 0.5
            }
        })
})(window, FPSMeter);

main();