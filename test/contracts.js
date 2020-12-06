
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse empty contract'] = function (test) {
    const result = parser.parse('contract', 'contract Empty {}');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Empty',
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse contract with variable declaration'] = function (test) {
    const result = parser.parse('contract', 'contract Counter { uint counter; }');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'contract',
        name: 'Counter',
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'variable',
                    name: 'counter',
                    type: 'uint'
                }
            ]
        }
    });
};

