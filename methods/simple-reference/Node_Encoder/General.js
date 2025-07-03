

const Base_Node_Encoder = require('./Base');
const {is_array} = require('lang-mini');

// Take referenced and indexed HTML (docs?) (full html fragments?) as input.
// Maybe array of referenced indexed html?

const Delta_Solution_Check = require('../Delta_Solution_Check/Node/General');

const red = str => '\x1b[31m' + str + '\x1b[0m';

// Provide it with reference doc(s).
//  Allowing multiple would help, especially as an encoder could contain a standard reference doc.
//  Could contain a few HTML structures, even very commonly occuring class names. May not be so important.
//   May be worth testing such a reference doc to enable multiple more applicable docs to be used.


// Will / should encode as instructions, do there is not exactly a corresponding decoder, but it will run in a VM or a pretend one.

// And the full html string of the doc that the node is from (doc b)

// This is still a very special purpose node encoder.
// It's for when we encode a node in terms of what is already available in another document.

class General_Node_Encoder extends Base_Node_Encoder {
    constructor(spec = {}) {
        super(spec);
        this.ds_check = new Delta_Solution_Check({indexed_a: this.indexed_a, 
            html_b: this.html_b, doc_b: this.doc_b,
            node_encoder: this
        });

    }
    encode(node, full_html) {

        // More specific node encoders could be different to delta solution encoders.
        //  More focused on just putting together the nodes (html syntax) and then inside them it could look for delta solutions etc.


        // if the node is an array...?

        if (is_array(node)) {
            //console.log(red('node is an array.'));

            // Suppose we need to process the array here???
            //  or the superclass does that OK?

            // But the super encoder should call the encoder here or in deepest subclass???
            return super.encode(node, full_html);


        } else {
            const super_res = super.encode(node, full_html);
            //console.log('1) full_html', full_html);

            //console.log('[node.startIndex, node.endIndex]', [node.startIndex, node.endIndex]);

            // Look at the size of the encoding...?
            //  Or if it is marked 'perfect'.

            if (super_res && super_res.perfect === true) {

                console.log('super_res', super_res);
                console.trace();
                throw 'stop';
                
                return super_res;
            } else {

                const dsc_res = this.ds_check.check(node);

                if (dsc_res && dsc_res.solved === true) {
                    // Something like matching a node directly.
                    return dsc_res.instruction || dsc_res.instructions; // Returning the delta solution check directly could be the right balance for node encoding.
                    // It's not always clear which file to write the functionality in.

                    // Definitely want to incorporate this into the current find_delta, and apply_delta later.
                    //  For the moment, it just needs to generate the same (or better) instructions from the same set to apply.

                    // Should just return the instruction(s)???






                } else {

                    if (super_res) {
                        //return super_res.instruction || super_res.instructions;
                        //return super_res; // if its an array???
                        return super_res;
                        /*

                        if (is_array(super_res)) {
                            return super_res.map(x => x.instruction);
                        } else {
                            return super_res.instruction;
                        }
                        */

                        
                    }
                }

            }
        }
    }
}

module.exports = General_Node_Encoder;