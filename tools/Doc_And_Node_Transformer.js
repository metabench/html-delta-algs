

const HTML_Transformer = require('./HTML_Transformer');

class Doc_And_Node_Transformer extends HTML_Transformer {
    constructor(spec) {
        spec.type = '(doc, node)';
        super(spec);
    }
}

module.exports = Doc_And_Node_Transformer;
