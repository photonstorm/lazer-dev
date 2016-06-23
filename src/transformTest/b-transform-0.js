class Transform {
	constructor(name) {
		var parent = {
				prev: null,
				next: null,
				head: null,
				owner: this
			},
			children = {
				prev: null,
				next: null,
				head: null,
				owner: this
			};
		parent.prev = parent;
		parent.next = parent;
		parent.head = parent;
		children.prev = children;
		children.next = children;
		children.head = children;
		this._parent = parent;
		this._children = children;
		// for test purpose only
		this.name = name;
	}
	removeParent() {
		let parent = this._parent;
		parent.prev.next = parent.next;
		parent.next.prev = parent.prev;
		parent.next = parent;
		parent.prev = parent;
		parent.head = parent;
	}
	removeChild(child) {
		child.removeParent();
	}
	removeAllChildren() {
		let children = this._children;
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
		let parent = this._parent;
		let target = parentTransform._children;
		this.removeParent();
		parent.next = target;
		parent.prev = target.prev;
		target.prev = parent;
		parent.prev.next = parent;
		parent.head = target.head;
	}
	getParent() {
		return this._parent.head.owner;
	}
	getChildrenCount() {
		let count = 0;
		let head = this._children.head;
		for (let node = head.next; node != head; node = node.next) {
			++count;
		}
		return count;
	}
	forEachChild(callback) {
		let head = this._children.head;
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
	t_root.forEachChild(function (child) {
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
	t_root.removeAllChildren();
	assert(t_root.getChildrenCount() === 0, 'Failed to remove all children');
	console.log('root children count:', t_root.getChildrenCount());
}());