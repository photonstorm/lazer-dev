import Transform2D from 'components/Transform2D.js';

let peter = new Transform2D();
let paul = new Transform2D();
let mary = new Transform2D();

peter.name = 'peter';
paul.name = 'paul';
mary.name = 'mary';

peter.setParent(paul);
peter.setParent(mary);

for (var child of peter)
{
    console.log(child.name);
}

