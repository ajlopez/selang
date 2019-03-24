
const gelex = require('gelex');
const gepars = require('gepars');
const geast = require('geast');

const ldef = gelex.definition();

ldef.define('name', '[a-zA-Z_][a-zA-Z0-9_]*');

const pdef = gepars.definition();

pdef.define('name', 'name:', function (value) { return geast.name(value); });

function parseNode(type, text) {
    const lexer = ldef.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
};

