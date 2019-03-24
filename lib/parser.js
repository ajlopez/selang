
const gelex = require('gelex');
const gepars = require('gepars');
const geast = require('geast');

const ldef = gelex.definition();

ldef.define('name', '[a-zA-Z_][a-zA-Z0-9_]*');
ldef.define('integer', '[0-9][0-9]*');
ldef.define('operator', '+');
ldef.defineText('string', '"', '"');

const pdef = gepars.definition();

pdef.define('name', 'name:', function (value) { return geast.name(value); });
pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });
pdef.define('expression', [ 'term', 'operator:+', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('term', 'integer');
pdef.define('term', 'name');

function parseNode(type, text) {
    const lexer = ldef.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
};
