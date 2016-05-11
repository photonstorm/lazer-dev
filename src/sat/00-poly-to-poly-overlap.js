import PolygonToPolygon from 'sat/collision/PolygonToPolygon.js'
import Vec2 from 'math/vector/vec2/Vec2.js'

let offset = new Vec2(80, 150);

const poly0 = [
    new Vec2(offset.x + 0, offset.y + 0),
    new Vec2(offset.x + 0, offset.y + 100),
    new Vec2(offset.x + 100, offset.y + 100),
    new Vec2(offset.x + 100, offset.y + 0),
    new Vec2(offset.x + 0, offset.y + 0)
];

offset.set(0, 130);

const poly1 = [
    new Vec2(offset.x + 0, offset.y + 0),
    new Vec2(offset.x + 0, offset.y + 100),
    new Vec2(offset.x + 100, offset.y + 100),
    new Vec2(offset.x + 100, offset.y + 0),
    new Vec2(offset.x + 0, offset.y + 0)
];

offset.set(400, 400);

const poly2 = [
    new Vec2(offset.x + 0, offset.y + 0),
    new Vec2(offset.x + 0, offset.y + 100),
    new Vec2(offset.x + 100, offset.y + 100),
    new Vec2(offset.x + 100, offset.y + 0),
    new Vec2(offset.x + 0, offset.y + 0)
];

console.log('poly0 overlap poly1 should be TRUE', PolygonToPolygon(poly0, poly1));
console.log('poly1 overlap poly2 should be FALSE', PolygonToPolygon(poly1, poly2));
