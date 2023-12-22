// Solutions such as a 'node being removed from doc a, then we have doc b'.

// And should have the solution too...

// Maybe define Delta_Solution separately?
const crypto = require('crypto');
const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();

const {abbreviate_instruction_names} = require('../../method_consts');

// Possibly there are match observations to do before solutions?

// This could provide the insruction(s) if it has the solution.

// Though maybe make a general solution check???
//  This covers some similar territory to the node encoder.
//  But more specific.
//   So the node encoder could use this to do / help with encoding.

// Another type of delta solution check for the full HTML delta...?
//  May be nicer to call these one by one for the moment, not using the 'General' class.

// Quickly finding a delta solution (maybe using xpaths) would help a lot for encoding some (specific) deltas efficiently.

// The full a => b delta finding system should have a fair few separate pieces of functionality (checks / encodings)








class Base_Delta_Solution_Check {
    constructor(spec = {}) {
        if (spec.indexed_a) this.indexed_a = spec.indexed_a;
        if (spec.html_b) this.html_b = spec.html_b;
        if (spec.doc_b) this.doc_b = spec.doc_b;
        if (spec.node_encoder) this.node_encoder = spec.node_encoder;

        //console.log('this.node_encoder', this.node_encoder);

        //console.trace();
        //throw 'stop';

        // and possibly a full_html_b property too....
        //  would only be cheching b nodes against a for delta solutions I think.

        // Should be able to do O(N) hash lookups itself here.
    }

    // check a node against its referenced doc(s).
    // indexed_doc for the moment.
    //  could upgrade it to more later.

    // And may as well check nodes (too). Probably is necessary anyway.
    //  Maybe worth having the most basic ones here.


    // Though passing the html of the node down / up the fn call chain could help.
    //  Substring lookup should be fast though.


    // May (only) want to check the full document.
    //  That would be making use of the HTML pair comparison.

    // So maybe this will be a 'node delta solution check'?
    //  Or even just a node encoding solution check?





    check(node) {
        // Possibly nothing worthwhile here.

    }   




}

module.exports = Base_Delta_Solution_Check;