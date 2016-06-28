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

class Transform {
    constructor(name, parent = null) {
            this.parent = {
                prev: null,
                next: null,
                head: null,
                owner: null
            };
            this.children = {
                prev: null,
                next: null,
                head: null,
                owner: null
            };
            this.parent.prev = this.parent;
            this.parent.next = this.parent;
            this.parent.head = this.parent;
            this.parent.owner = this;
            this.children.prev = this.children;
            this.children.next = this.children;
            this.children.head = this.children;
            this.children.owner = this;

            this.root = null;
            this.localMatrix = new Mat4x4();
            this.transformDecomposition = new Float32Array(4);
            this.setParent(parent);

            this.name = name;
        }
        // Transform
    localTranslate(x, y) {
        this.localMatrix.translate(x, y);
        return this;
    }
    localScale(x, y) {
        this.localMatrix.scale(x, y);
        return this;
    }
    localRotate(t) {
            this.localMatrix.rotate(t);
            return this;
        }
        // Matrix Decomposition
    getLocalTranslate() {
        let translate = this.transformDecomposition.subarray(0, 2),
            localMatrix = this.localMatrix;

        translate[0] = localMatrix.data[3];
        translate[1] = localMatrix.data[7];
        return translate;
    }
    getLocalScale() {
        let scale = this.transformDecomposition.subarray(2, 4),
            localMatrix = this.localMatrix,
            a = localMatrix.data[0],
            b = localMatrix.data[1],
            c = localMatrix.data[4],
            d = localMatrix.data[5],
            a2 = a * a,
            b2 = b * b,
            c2 = c * c,
            d2 = d * d,
            sx = Sqrt(a2 + c2),
            sy = Sqrt(b2 + d2);

        scale[0] = sx;
        scale[1] = sy;
        return scale;
    }
    getLocalRotation() {
        let localMatrix = this.localMatrix,
            a = localMatrix.data[0],
            b = localMatrix.data[1],
            c = localMatrix.data[4],
            d = localMatrix.data[5],
            a2 = a * a,
            c2 = c * c;
       
        return Acos(a / Sqrt(a2 + c2)) * (Atan(-c / a) < 0 ? -1 : 1);        
    }

    // Intrusive List Methods
    getRootNode() {
        let rootTransform = this.parent.head.owner;
        for (; rootTransform != rootTransform.parent.head.owner; rootTransform = rootTransform.parent.head.owner);
        return rootTransform;
    }
    removeParent() {
        let parent = this.parent;
        parent.prev.next = parent.next;
        parent.next.prev = parent.prev;
        parent.next = parent;
        parent.prev = parent;
        parent.head = parent;
        this.root = this.getRootNode();
    }
    removeChild(child) {
        child.removeParent();
    }
    removeAllChildren() {
        let children = this.children;
        let next = null;
        if (children.head !== children) {
            next = children.next;
            while (next !== children) {
                next.prev.next = next.next;
                next.next.prev = next.prev;
                next.next = next;
                next.prev = next;
                next.head = next;
                next = children.next;
            }
        } else {
            children.prev.next = children.next;
            children.next.prev = children.prev;
            children.next = children;
            children.prev = children;
            children.head = children;
        }
    }
    setParent(parentTransform) {
        if (parentTransform != null) {
            let parent = this.parent;
            let target = parentTransform.children;
            this.removeParent();
            parent.next = target;
            parent.prev = target.prev;
            target.prev = parent;
            parent.prev.next = parent;
            parent.head = target.head;
            this.root = this.getRootNode();
        }
    }
    getParent() {
        return this.parent.head.owner;
    }
    getRoot() {
        return this.root;
    }
    getChildrenCount() {
        let count = 0;
        let head = this.children.head;
        for (let node = head.next; node != head; node = node.next) {
            ++count;
        }
        return count;
    }
    forEachChild(callback) {
        let head = this.children.head;
        for (let node = head.next; node != head; node = node.next) {
            callback(node.owner);
        }
    }
}

function assert(expr, message) {
    if (!expr) {
        alert('Failed Assertion: ' + message);
        throw 'Failed Assertion: ' + message;
    }
}

function vec2Equal(v, x, y) {
    return v[0] === x && v[1] === y;
}

function TestMatrixDecomposition() {
    console.log('----');
    console.log('TestMatrixDecomposition');

    let tempTrans = new Transform('t');

    tempTrans.localTranslate(110, 130);
    tempTrans.localRotate(2);
    tempTrans.localScale(2, 1);

    console.log(
        'Translate', tempTrans.getLocalTranslate(),
        'Scale', tempTrans.getLocalScale(),
        'Rotation', (tempTrans.getLocalRotation()|0)
    );

    assert(
        vec2Equal(tempTrans.getLocalTranslate(), 110, 130) &&
        vec2Equal(tempTrans.getLocalScale(), 2, 1) &&
        (tempTrans.getLocalRotation()|0) === 2
        ,'Failed to decompose transform matrix'
    );    
}

function TestIntrusiveList() {
    console.log('----');
    console.log('TestIntrusiveList');
    var t_root = new Transform('IAmRoot');
    var t0 = new Transform('Foo');
    var t1 = new Transform('Bar');
    var t2 = new Transform('Hello');
    var t3 = new Transform('World');
    var t4 = new Transform('t4');
    var names = '';

    t0.setParent(t_root);
    t1.setParent(t_root);
    t2.setParent(t_root);
    t3.setParent(t_root);
    t4.setParent(t3);
    t_root.forEachChild(function (child) {
        names += child.name;
    });
    assert(names === 'FooBarHelloWorld', 'Invalid children');
    console.log(names);
    assert(t3.getParent().name === 'IAmRoot', 'Invalid root');
    console.log('Parent name:', t3.getParent().name);
    assert(t_root.getChildrenCount() === 4, 'Invalid children count');
    console.log('Children count', t_root.getChildrenCount());
    t3.removeParent();
    assert(t3.getParent().name === 'World', 'Failed to remove parent');
    console.log('t3 parent name:', t3.getParent().name);
    t_root.removeChild(t1);
    assert(t1.getParent().name === 'Bar', 'Failed to remove child');
    console.log('t1 parent name:', t1.getParent().name);
    t_root.removeAllChildren();
    assert(t_root.getChildrenCount() === 0, 'Failed to remove all children');
    console.log('root children count:', t_root.getChildrenCount());
    assert(t4.getParent().name === 'World' && t4.getRoot().name === 'IAmRoot', 'Invalid parent and root');
    console.log('t4 parent name: %s t4 root name: %s', t4.getParent().name, t4.getRoot().name);
}

TestIntrusiveList();
TestMatrixDecomposition();