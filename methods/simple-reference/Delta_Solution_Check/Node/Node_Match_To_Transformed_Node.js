const Base_Delta_Solution_Check = require('./Base');

const crypto = require('crypto');
const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();
// Have Match_Node_Against_Transformed_Nodes perhaps....

// Match_Multi_Transformed_Node_Against_Transformed_Nodes perhaps....

// Symmetrical_Transformed_Node_Match

// Those ahead-of-time maps of matches maybe are not all that important.
//  Or maybe not the best way....


// Matching against a transformed node, such as a node with its children removed.
// By having a reference doc too, there could be fewer instructions needed when it comes to some basics like writing some elements,
// as well as some relatively simple structures of elements.

// All this should help to make the main find_delta more concise and more flexible - easier to add more checks and delta solutions to.
//  The delta solutions for the whole doc a and doc b diff may be nicely found and expressed at the level of strings - do
//   not want to rule that out.


// also want Node_Match_To_Transformed_Node or something like that.





const {abbreviate_instruction_names, abbreviate_instruction_property_names, 
    map_instruction_codenames_by_names} = require('../../method_consts');



// Maybe don't want class names for all the checks.
//  Could give it a check and provide result function.
//  Maybe multiple functions.

// This should be / provide a nice API for coding the way to check for possible ways of doing delta encoding.
//  Though the indexed a and b pair class that runs comparisons / identifies matches could help a lot too.



// Could have both a check and solve function.

// or even initial relevancy condition.
//  so a delta solution checker could check for modifications off the corresponding script textnode.
//  it would first check that it actually is a text node inside a script element.

// identify_corresponding_node on a lower level...?






// or check_and_solve perhaps.
// may be best to have checking and solving as 2 functions / statements / blocks.

// though check_and_solve could be useful too....

// check_and_find_solution_length even....







// Exact match node.

// Nodes_Exact_Match???


// But am most interested in using any transform to reconstruct the 'b' node.
// Though being specific about encoding the specifics of what can match, how, then what to do with it outside of the main algorithm
//  is one of the main priorities.

class Node_Match_To_Transformed_Node extends Base_Delta_Solution_Check {
    constructor(spec = {}) {
        super(spec);

        if (spec.transformer) this.transformer = spec.transformer;

    }


    // check applicability
    //  some work on any node.




    check(node) {

        // node, doc_the_node_is_in
        const {indexed_a, html_b, doc_b, transformer, node_encoder} = this;
        //const {doc_b} = this;

        // run the node through the transformer.
        //  maybe doc should be the second parameter.
        //  its not needed for some / many transforms.

        // see if its applicable???

        //let tr_res = transformer.fn(doc_b, node);

        //console.log('node', node);
        //console.log('tr_res', tr_res);
        //console.log('!!doc_b', !!doc_b);

        // +1 seems to have fixed bug that meant it could not find some encodings.
        const node_html = html_b.substring(node.startIndex, node.endIndex + 1);
        //console.log('node_html', node_html);

        const hash_node = calc_hash_256bit(node_html).toString('hex');

        // then check for a match (same transform???) on indexed_a.

        const i_tr_matching = indexed_a.data.transformed_node_indexes_by_hash.get(hash_node);

        //console.log('i_tr_matching', i_tr_matching);

        // So node in "b" not transformed?

        if (i_tr_matching?.transformer_name === 'node without children') {
            // Maybe syntax to do the transformation on a node in a, then add children back.

            //console.log('node.children?.length', node.children?.length);

            // So this node would not have children.

            const instr_n = 'copy node by "a" index, replace children';
            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
            let instruction;
            if (abbreviate_instruction_property_names) {
                instruction = [str_inst, {ani: i_tr_matching.node_index, c: []}];
            } else {
                instruction = [str_inst, {a_node_index: i_tr_matching.node_index, children: []}];
            }
            //console.log('abbreviate_instruction_property_names', abbreviate_instruction_property_names);
            return {
                solved: true,
                instruction
            }



        }

        return false;
    }
}

module.exports = Node_Match_To_Transformed_Node;