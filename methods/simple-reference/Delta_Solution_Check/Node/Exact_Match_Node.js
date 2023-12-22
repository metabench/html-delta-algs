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



const {abbreviate_instruction_names, map_instruction_codenames_by_names} = require('../../method_consts');



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

class Exact_Match_Node_Delta_Solution_Check extends Base_Delta_Solution_Check {
    constructor(spec = {}) {
        super(spec);
    }


    // check applicability
    //  some work on any node.




    check(node) {


        //console.log('node', node);

        const {indexed_a, html_b} = this;

        //console.log('html_b', html_b);

        // But this is a specific check though.
        //  It's a direct node match, solution being to copy the node by index.
        //  Don't want the specific checks to do this each time.

        //console.trace();
        //throw 'stop';



        // But maybe we want to see which solution check actually finds what....

        // Need the hash of the node.
        //  Maybe rendering the node would take too long.
        //   can extract it as a string.

        const pos_node = [node.startIndex, node.endIndex + 1]; // Not sure why the +1 but it (always???) seems to be needed.


        // No - it needs to get it from the full html of "b" not "a".


        const html_node = html_b.substring(...pos_node);

        //console.log('html_node', html_node);

        const hash_node = calc_hash_256bit(html_node).toString('hex');

        if (indexed_a.data.node_indexes_by_hash.has(hash_node)) {
            // Want to say what the solution is...?
            //  

            // the copy node from doc a instruction....

            const node_index = indexed_a.data.node_indexes_by_hash.get(hash_node)
            const instr_n = 'copy node by "a" index'
            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;




            const instruction = [str_inst, node_index];
            const res = {
                solved: true,
                perfect: true,
                instruction: instruction // single instruction.
            }
            return res;

            


        }

        return false;
    }
}

module.exports = Exact_Match_Node_Delta_Solution_Check;