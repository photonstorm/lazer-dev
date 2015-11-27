import Transform from 'components/Transform.js';

let peter = new Transform();
let paul = new Transform();
let mary = new Transform();

peter.name = 'peter';
paul.name = 'paul';
mary.name = 'mary';

peter.children.add(paul);
peter.children.add(mary);

for (var child of peter)
{
    console.log(child.name);
}

