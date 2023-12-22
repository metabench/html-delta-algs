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

// Need better matching of the document with the node removed when there is a dtd at the beginning.
//  Possibly extra textnode(s) as well with white space.


// Could test that the indexer can do these transforms....

class Symmetrical_Transformed_Node_Match extends Base_Delta_Solution_Check {
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

        let tr_res = transformer.fn(doc_b, node);

        //console.log('node', node);
        //console.log('tr_res', tr_res);
        //console.log('!!doc_b', !!doc_b);

        if (tr_res) {
            const hash_transformed_node = calc_hash_256bit(tr_res).toString('hex');

            // then check for a match (same transform???) on indexed_a.

            const i_tr_matching = indexed_a.data.transformed_node_indexes_by_hash.get(hash_transformed_node);

            //console.log('i_tr_matching', i_tr_matching);

            if (i_tr_matching) {

                if (i_tr_matching.transformer_name === 'node without children') {
                    // Maybe syntax to do the transformation on a node in a, then add children back.

                    //console.log('node.children?.length', node.children?.length);


                    if (node.children?.length > 0) {

                        // seems like it would need a circular reference here???
                        //  Or dependency injection could do it.
                        //  Give it the encoder object on construction of this.
                        //   The Node_Encoder uses this to identify transformations / solutions using transformations.
                        //    This system calling things from the node_encoder could help.

                        const encoded_children = node.children.map(ch => node_encoder.encode(ch, html_b));

                        // Need the index of the node.
                        //  Should not need to look it up by hashing.
                        //  The node indexes should be added to the nodes / passed through the system.

                        //console.log('node', node);

                        //const encoded_children = node.children.map(ch => encode_node(indexed_a, ch, o_a_b_matches_info, full_html));
                        const instr_n = 'copy node by "a" index, replace children';
                        const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                        let instruction;
                        if (abbreviate_instruction_property_names) {
                            instruction = [str_inst, {ani: i_tr_matching.node_index, c: encoded_children}];
                        } else {
                            instruction = [str_inst, {a_node_index: i_tr_matching.node_index, children: encoded_children}];
                        }
                        //console.log('abbreviate_instruction_property_names', abbreviate_instruction_property_names);
                        return {
                            solved: true,
                            instruction
                        }
                    } else {
                        // Could do something else...?
                        // 

                    }



                } else {
                    console.log('i_tr_matching', i_tr_matching);

                    console.trace();
                    throw 'stop';
                }

            } else {
                //console.log('i_tr_matching', i_tr_matching);

                //console.trace();
                //throw 'stop';
            }


            //console.trace();
            //throw 'stop';

            //console.log('node', node);

            
            //const pos_node = [node.startIndex, node.endIndex];
            //const html_node = html_b.substring(...pos_node);
            //console.log('html_node', html_node);

            // Need the whole doc of b though.

            //const tr_res = transformer.fn()


            // const hash_node = calc_hash_256bit(html_node).toString('hex');
            //  but we need to transform the node and render it.
            //  or look it up? the heavily indexed "b" document would have the hashed transformed index...

            // But for the moment, keep it simpler, functional, will call that function / use that transformer.






            

            

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

            

            
            // Need to look it up on the transformed node indexes by hash.


            const old = () => {
                if (indexed_a.data.transformed_node_indexes_by_hash.has(hash_transformed_node)) {
                    // Want to say what the solution is...?
                    //  

                    // the copy node from doc a instruction....

                    const node_index = indexed_a.data.node_indexes_by_hash.get(hash_transformed_node)
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
            }
        }


        // Transformation (full doc only???) of removal of text nodes from within.
        //  Such as matching symmetrically without text nodes, and then making the delta instruction put the text nodes back in.

        


        

        return false;
    }
}

module.exports = Symmetrical_Transformed_Node_Match;