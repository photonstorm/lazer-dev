// Intrusive List design
// from Doom 3
class IntrusiveList {
	constructor(owner = null) {
		this.prev = this;
		this.next = this;
		this.head = this;
		this.owner = owner;
	}
	count() {
		let count = 0;
		let head = this.head;
		for (let node = head.next; node != head; node = node.next) {
			++count;
		}
		return count;
	}
	selfRemove() {
		this.prev.next = this.next;
		this.next.prev = this.prev;
		this.next = this;
		this.prev = this;
		this.head = this;
	}
	clear() {
		if (this.head !== this) {
			while (this.next !== this) {
				this.next.selfRemove();
			}
		} else {
			this.selfRemove();
		}
	}
	selfInsertBefore(target) {
		this.selfRemove();
		this.next = target;
		this.prev = target.prev;
		target.prev = this;
		this.prev.next = this;
		this.head = target.head;
	}
	selfInsertAfter(target) {
		this.selfRemove();
		this.prev = target;
		this.next = target.next;
		target.next = this;
		this.next.prev = this;
		this.head = target.head;
	}
	selfInsertTail(target) {
		this.selfInsertBefore(target.head);
	}
	selfInsertHead(target) {
		this.selfInsertAfter(target.head);
	}
}

class Transform {
	constructor(name) {
		// for test purpose only
		this.name = name;
		this._parent = new IntrusiveList(this);
		this._children = new IntrusiveList(this);
	}
	removeParent() {
		this._parent.selfRemove();
	}
	removeChild(child) {
		child._parent.selfRemove();
	}
	setParent(parentTransform) {
		this._parent.selfInsertTail(parentTransform._children);
	}
	getParent() {
		return this._parent.head.owner;
	}
	getChildrenCount() {
		return this._children.count();
	}
	forEachChild(callback) {
		for (let node = this._children.head.next; node != this._children.head; node = node.next) {
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

(function main() {
	var t_root = new Transform('IAmRoot');
	var t0 = new Transform('Foo');
	var t1 = new Transform('Bar');
	var t2 = new Transform('Hello');
	var t3 = new Transform('World');
	var names = '';

	t0.setParent(t_root);	
	t1.setParent(t_root);	
	t2.setParent(t_root);	
	t3.setParent(t_root);	

	t_root.forEachChild(function(child) {
		names += child.name;
	});
	assert(names === 'FooBarHelloWorld', 'Invalid childrens');
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
}());
