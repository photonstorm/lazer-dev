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