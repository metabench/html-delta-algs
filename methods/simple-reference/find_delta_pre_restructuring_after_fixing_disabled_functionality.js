

const abbr = true;


const abbreviate_instruction_names = abbr;
const abbreviate_instruction_property_names = abbr;

// Definitely want to see about further savings within the simple JS / JSON object format.
//  Sequence of instructions should help a lot.
//  Could even use 1 or 2 bit codes for when the depth changes, indicating it's moving up or down, and sometimes longer codes.
//  A highly compressed format for encoded instructions and reconciliations would be very helpful.

// Or instructions such as 'insert transformed node from doc "a"'. could be a shorter way to represent a node without its child nodes.
//  Seems worth testing and integrating some specific strategies and optimisations.

// Things such as compression layers, such as abbreviation, or codecs that majorly shift the format.
//  Though for the moment, reliability on large docs, and doing some of the most important things to make
//  algorithmically compact deltas will be best.

// Want support for the instruction of creating a node.

// Abbreviations using arrays may help more.
// Getting more into classes and OO to represent and encode the instructions themselves...












/*
    This is not such a large module after all.
    Making it so it provides nice idioms for checking things would help.
    Not so sure there is a very clear idiom yet of what is the best way to do the checking.

    May be worth splitting parts of this into classes.
    Have the base classes and then subclasses with extra functionality.

    Maybe also see about documents that start with a declaration.

    Breaking this down into more logical parts could help.

    Want to see about restructuring to better implement current features, in a way in which more features could be added
    in the same way, using the same supporting code.

    // Want to be able to log conclusions it has at different stages of the delta construction.

    // Matching full document reconsiliations first would be a good strategy.
    // Then can look for node reconsiliations.
    // Can also use a few basic instructions to create nodes.
    // A cursor for the document b recreation could be helpful.
    //  Does look more like making a specific VM class to process the reconsiliations / deltas would help.

    // Identifying a full document reconsiliation that reconciles one (specific) thing would help.
    // Maybe also full document reconsiliations that reconcile multiple things at once, of the same category.
    //  Itself using node reconsiliation? Maybe it would know better which nodes to compare?
    //   Though if the reconsiliation condition checks are all O(1) each and O(N) combined identifying matches will be fast that way.
    
    // A reconsiliation would get some of the way to creating document "b".
    //  So that further checks will find other reconsiliations which can be made.
    //   Though it may require re-indexing the document in the currently reconciled state to see what else needs to be done to it.
    //   This algo could probably be O(N) and still take a while... not so sure exactly.
    //   Maybe would have an O(N) core while using other complexity in calling that core multiple times
    //    Such as when reconciling nodes - would have multiple attempts with the node reconciliation, and search for the way(s) to do it with
    //    the smallest delta sizes.

    // Though dealing with DTD without using a reconsiliation strategy would help for the moment.
    //  May need to get into the node encoding for a DTD that is not matched.













    Maybe have a logging / observation option in the fn call???




*/

const HTML_Delta = require('../../HTML_Delta');
const Simple_HTML_Indexer = require('../../tools/Simple_Extended_HTML_Indexer');
const {arrayify, is_array, each} = require('lang-mini');
const {remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths} = require('../../tools/tools');
const crypto = require('crypto');
const {
    Parser
} = require('htmlparser2');
const {
    DomHandler
} = require('domhandler');
const render = require("dom-serializer").default;
const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();
const {
    method_name, method_codename, arr_instruction_names, arr_instruction_codenames,
    arr_instruction_property_names, 
    map_instruction_names_by_codenames, map_instruction_codenames_by_names, 
    arr_instruction_property_codenames,
    map_instruction_property_names_by_codenames, map_instruction_property_codenames_by_names,
    method_description
} = require('./method_consts');



// Possibly Delta_Node_Encoder
// Indexed_Html_Pair???



// HTML_Pair_Feature_Matcher perhaps...
// Could extend Indexed_HTML_Pair ??? HTML_Pair_Indexer???

// Seems like recreating find_delta and apply_delta using more classes and a clearer structure will help things along.
//  Can aim for feature parity for the moment while reintroducing those features in a more structured way.





//  And it could itself check for matches.

//  And then can query it for matches...

// Node_Encoder that encodes a node in terms of another document.
//  Could possibly call more specific encoders or encoding functions based on the characteristics of the node

// Probably want parallel decode_node as well?
// And put that in an Encoder&Decoder (Codec) class?

// Externally_Referencing_Node_Encoder

// The fact that it makes reference to doc "a" is a big thing to do with the way this will encode nodes.

// Could run specific delta finders - finders that look out for a specific type of delta (such as 2 transforms) and then could put things
// back together using the transforms (though would need to consider inserting new data too)

// Maybe an Instruction_Set class or array?

// The VM that can run instructions may help too.

// Preparing an array / JSON object of instructions seems the best way right now.
// Or at least that being one of the supported formats.

// Or the instructions will be represented as instances of classes even?




// Some or much of this could be done or supported by some kind of HTML_Pair_Comparer or HTML_Pair_Feature_Match_Finder
//  Then maybe make a version that also feature matches transformed nodes????
// 


//  And use the to determine what from "b" can be represented in terms of "a", and how.


// Much of this could be separated into:
//  Detect state
//  Determine task to do based on state
//  Carry out task (or record it in the result)

// Classes may work best here for some longer and therefore more efficient storage of things rather than recomputing them.
//  Or even being able to recompute them quickly / easily.

// Making use of already detected hash matches....?

// May want some specific 'rules' or some better name for them all put together.
//  Identifying the situation (in O(N) time)
//   Including things to identify / hash on each node in each doc
//  Then using the information about the situation to determine how to solve the problem.


// Identifying that one of them starts with a doctype, the other does not.
// Something like add or remove doctype as the first instruction.

// Want better visibility into the multiple stages of the process.
//  So if something is not working, we can better test / assess at which stage(s).

// And an order for applying things?
//  May be best to remove the doctype at the very beginning.

// Or program in better treatment of doctypes in some place(s).
//  Don't assume that html is node 0.

// Probably want better independent testing of some specific things.
//  Such as encoding of nodes, indexing of the docs.

// Could have orders of possible delta and reconstruction.
//  Such as the very first, being adding or removing the doctype declaration.

// Could even have sequence / stack of independent operations that would deal with the various things in order.
// Reconsiling may be the word...
//  Spotting differences, then working out what changes would need to be made to make the difference(s), one way or another or both.

// But having an easy-to-read sequence (even if long) will help.
//  Things like remove_starting_dtd, add_starting_dtd.

// And then after it has reconsiled that thing, it could then reconsile the rest of the document.
//  And could have a validation that the thing has actually been reconsiled.

// Want to write higher-level delta-finding algorithms.


// Or algorithm plugins.
// A plugin may interact with the algorithm at various different points.
//  Such as an extra test / thing to record with a hash for each element.
//  Then an extra comparison / extra comparisons to make
//   Things to look out for when going through the comparisons that happen automatically.
//  Then if the comparison finds specific conditions, how to encode that as a delta.
//   Also include the reverse encoding too?

// Such as:
//  Does each doc start with a DTD
//   "a" does, "b" does not
//  Then logic determines the above condition has been met
//   Instruction such as remove the DTD from the beginning of the document.

// But with a dtd there, it seems as though it's not the root node.
//  DTD support could mean allowing for 2 (or more) nodes at the document root.

// So looks like when building doc b, it will need to make 2 nodes at the root.
// Looks like it would need to correctly index whichever docs have the dtd to start with.
//  May need to address some root node assumptions.
//   Probably starting with the doc parsing function.
//   Check that the indexer deals with those cases properly.






















const encode_node = (indexed_a, node, o_a_b_matches_info, full_html) => {
    const {
        arr_a_b_matches,
        arr_transformed_a_b_matches,
        arr_transformed_a_transformed_b_matches,
        map_b_to_a_node_matches,
        map_b_to_transformed_a_node_matches,
        map_transformed_b_to_transformed_a_node_matches
    } = o_a_b_matches_info;

    //console.log('\nencode_node\n');
    //console.log('typeof node', typeof node);
    //console.trace();

    if (typeof node === 'string') {
        //console.log('string node.length', node.length);

        // Seems much simpler here....

        // Loses some full doc? string transformation facilities.
        //  Yes, I think the full doc transformations relied on these.
        //   Not entirely sure.
        // Want the simpler architecture - having 2? 'mount points' for a plugin / reconciliation strategy?





        //const node_html = node;
        const parsed_node = assign_xpaths(parse_str_html_node(node));
        return encode_node(indexed_a, parsed_node, o_a_b_matches_info, full_html);

        // No, don't have the index as 0 right now!
        //  index 0 would really represent the doctype if there was one. if no doctype, then html el is basically higher up.

        // Seems like we basically can't do anything with this right now.
        //  Or it does not work when b starts with a doctype?
        //  The node hash matches don't operate in terms of strings!



        const falsely_assuming_node_index_would_be_0_for_the_html = () => {

            const node_index = 0;



            const node_hash = calc_hash_256bit(node_html).toString('hex');
            const a_hash_match = indexed_a.find_hash_match(node_hash);
            //console.log('node_index', node_index);
            if (a_hash_match) {
                console.log('a_hash_match', a_hash_match);
                console.trace();
                throw 'NYI';
            } else {
                // So that means the two are the same???

                console.log('string checking matches of node from "b" against "a"');
                // May be better to do the checks first, then do the task.
                //  So we see the state more easily at one place.



                let match_state = false;

                if (map_b_to_a_node_matches.has(node_index)) {

                    match_state = {
                        name: 'b to a node match',
                        b_node_index: node_index,
                        a_node_index: map_b_to_a_node_matches.get(node_index)
                    }

                    
                } else if (map_b_to_transformed_a_node_matches.has(node_index)) {
                    // b to transformed a node match

                    match_state = {
                        name: 'b to transformed a node match',
                        b_node_index: node_index,
                        o_match: map_b_to_transformed_a_node_matches.get(node_index)
                    }

                    //console.log('map_b_to_transformed_a_node_matches.has(node_index)', node_index);
                    //console.trace();
                    //throw 'NYI';
                } else if (map_transformed_b_to_transformed_a_node_matches.has(node_index)) {
                    console.log('map_transformed_b_to_transformed_a_node_matches.has(node_index)', node_index);


                    match_state = {
                        name: 'transformed b to transformed a node match',
                        b_node_index: node_index,
                        a_match: map_transformed_b_to_transformed_a_node_matches.get(node_index)
                    }
                    
                } else {
                    
                    // no match



                }

                console.log('match_state', match_state);

                if (match_state) {
                    const match_state_name = match_state.name;
                    if (match_state_name === 'b to a node match') {
                        // Then we have the instruction - copy the node.
                        const {b_node_index, a_node_index} = match_state;
                        const instr_n = 'copy node by "a" index'
                        const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                        if (abbreviate_instruction_property_names) {
                            return [str_inst, a_node_index]
                        } else {
                            return [str_inst, a_node_index]
                        }
                    }
                    console.log('match_state_name', match_state_name);
                }





                const before_using_match_state = () => {

                    if (map_b_to_a_node_matches.has(node_index)) {

                        // So, transformed???

                        // Is this map of matches wrong even?

                        // But what if the full string is not a 'node'?
                        //  If it's two nodes in an array, for example.

                        console.log('map_b_to_a_node_matches.size', map_b_to_a_node_matches.size);


                        

                        console.log('map_b_to_a_node_matches.has(node_index)', node_index);
                        
                        const idx_in_a = map_b_to_a_node_matches.get(node_index);
                        console.log('idx_in_a', idx_in_a);

                        console.trace();

                        // Have a look at node a, from indexed a...

                        const a0h = render(indexed_a.data.nodes[0]);


                        console.log('a0h', a0h);
                        console.log('indexed_a.data.nodes.length', indexed_a.data.nodes.length);
                        // Plenty of nodes there...
                        //  Seems like it's matching wrong!
                        //   Not entirely sure why right now.

                        // Maybe one or both the docs was indexed wrong?
                        //  Maybe an assumption about node[0] being the html?
                        




                        
                        // Depending on abbreviation mode?

                        const instr_n = 'copy node by "a" index'
                        const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                        if (abbreviate_instruction_property_names) {
                            return [str_inst, idx_in_a]
                        } else {
                            return [str_inst, idx_in_a]
                        }

                        return ['copy node by "a" index', idx_in_a];
                        console.trace();
                        throw 'NYI';
                    } else if (map_b_to_transformed_a_node_matches.has(node_index)) {
                        console.log('map_b_to_transformed_a_node_matches.has(node_index)', node_index);
                        console.trace();
                        throw 'NYI';
                    } else if (map_transformed_b_to_transformed_a_node_matches.has(node_index)) {
                        console.log('map_transformed_b_to_transformed_a_node_matches.has(node_index)', node_index);
                        const a_tb_ta = map_transformed_b_to_transformed_a_node_matches.get(node_index);
                        if (a_tb_ta.length === 2) {
                            const transformers_match = a_tb_ta[0][1] === a_tb_ta[1];
                            console.log('transformers_match', transformers_match);
                            if (transformers_match) {
                                const transformer_name = a_tb_ta[1];
                                if (transformer_name === 'node without children') {
                                    const parsed_node = assign_xpaths(parse_str_html_node(node));
                                    if (parsed_node.children) {
                                        const encoded_children = parsed_node.children.map(cn => encode_node(indexed_a, cn, o_a_b_matches_info, node));
                                        //console.log('encoded_children', encoded_children);
                                        const instr_n = 'copy node by "a" index, replace children'
                                        const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                                        if (abbreviate_instruction_property_names) {
                                            return [str_inst, {ani: a_tb_ta[0][0], c: encoded_children}]
                                        } else {
                                            return [str_inst, {a_node_index: a_tb_ta[0][0], children: encoded_children}]
                                        }
                                    }
                                } else {
                                    console.trace();
                                    throw 'unhandled transformation';
                                }
                            }
                        } else {
                            console.trace();
                            throw 'NYI';

                        }
                    } else {

                        console.log('the last case - will parse and then encode the node');

                        //console.trace();
                        //throw 'stop;'

                        const parsed_node = assign_xpaths(parse_str_html_node(node));
                        return encode_node(indexed_a, parsed_node, o_a_b_matches_info, full_html);

                        // Then parse that node, and run the encode function again....



                    }

                }
                
                // No matching transformers....




                //console.log('node not yet encoded....');
                //console.log('pre parse node - node (str)', node);

                // Probably best to parse it....
                // Parse it and call the encode function again.

                

                //  Or even have some code that checks if it begins <!DOCTYPE html>, then deal with that.
                //  That could happen when 


            }

        }

        
    } else {
        if (is_array(node)) {

            return node.map(node => encode_node(indexed_a, node, o_a_b_matches_info, full_html));

            // Encode each of them... maybe add 2 instructions?
            // Or the node could contain children, and be some kind of unrendered document root node.

            // Maybe represents the document node itself in htmlparser2.

            // Basically the nodes one after each other.
            //  Maybe map the encoding of the array?
            //   But increase the depth? Or not???

            // Or specific check here for dtd and then HTML?

            // Maybe Node_Encoding_Possibility objects?
            //  so if the node matches a criteria - fn?
            //  then it can be encoded (and decoded) in a set way.
            //   using an Instruction, or array of them.

            // Need to work out what is going wrong in some cases where there are DTDs.
            //  May need better logic when working with multiple nodes at the root of the doc.

            // Get this right before working on a new Reconsiliation system
            //  Including reconciliation chaining.
            //   Can measure the results of potential reconciliations of the total diffs of the doc.
            //   And choose those that solve it in fewest bytes.
            //    Questions such as how many (new) bytes of doc b does it directly produce?.

            // Full reconciliation, partial reconciliation.
            
            // See about problems when both have got the DTD...?
            //  May only be a problem for more complex ops?













        } else {

            const pos_node = [node.startIndex, node.endIndex + 1];



            const full_html_node_substring = full_html.substring(...pos_node);

            const log_node_info = () => {
                console.log('node', node);
                console.log('pos_node', pos_node);
                console.log('full_html_node_substring', full_html_node_substring);
            }

            


            const node_hash_from_full_html_substring = calc_hash_256bit(full_html_node_substring).toString('hex');
            const found_node_hash_match_from_doc_a = indexed_a.find_hash_match(node_hash_from_full_html_substring);
            //console.log('found_node_hash_match_from_doc_a', found_node_hash_match_from_doc_a);
            //const abbreviate_instruction_names = true;
            //const abbreviate_instruction_property_names = true;
            if (found_node_hash_match_from_doc_a) {
                const {type} = found_node_hash_match_from_doc_a;
                if (type === 'node') {
                    const {node_index} = found_node_hash_match_from_doc_a;
                    const instr_n = 'copy node by "a" index'
                    const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                    return [str_inst, node_index];
                } else {
                    if (type === 'transformed') {
                        const {o_transform} = found_node_hash_match_from_doc_a;
                        const {node_index, transformer_name} = o_transform;
                        if (transformer_name === 'node without children') {
                            const instr_n = 'copy node by "a" index, replace children'
                            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                            if (abbreviate_instruction_property_names) {
                                return [str_inst, {ani: node_index, c: []}]
                            } else {
                                return [str_inst, {a_node_index: node_index, children: []}]
                            }
                        } else {
                            console.trace();
                            throw 'NYI';
                        }
                    } else {
                        console.trace();
                        throw 'stop';
                    }
                }
            } else {
                //console.log('no found_node_hash_match_from_doc_a found');
                //console.log('');
                const node_index = typeof node.idx === 'number' ? node.idx : node.index;
                //console.log('(b) node_index', node_index);
                //console.log('full_html_node_substring', full_html_node_substring);
                const node_html_as_childless = render_as_childless(node);
                //console.log('node_html_as_childless', node_html_as_childless);
                const hnc = calc_hash_256bit(node_html_as_childless).toString('hex');
                const hnc_match = indexed_a.data.transformed_node_indexes_by_hash.get(hnc);
                //console.log('hnc_match', hnc_match);
                if (hnc_match) {
                    const a_node_index = hnc_match.node_index, transformer_name = hnc_match.transformer_name;
                    if (transformer_name === 'node without children') {
                        if (node.children && node.children.length > 0) {
                            const encoded_children = node.children.map(ch => encode_node(indexed_a, ch, o_a_b_matches_info, full_html));
                            //console.log('** encoded_children', encoded_children);
                            //console.log('** encoded_children', JSON.stringify(encoded_children));
                            const instr_n = 'copy node by "a" index, replace children';
                            //const abbreviate_instruction_names = true;
                            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                            //const abbreviate_instruction_property_names = true;
                            if (abbreviate_instruction_property_names) {
                                return [str_inst, {ani: a_node_index, c: encoded_children}];
                            } else {
                                return [str_inst, {a_node_index: a_node_index, children: encoded_children}];
                            }
                        }
                    }
                }
                const just_write_the_node = () => {
                    const instr_n = 'write';
                    const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                    return [str_inst, full_html_node_substring];
                }
                return just_write_the_node();
                const old_transformed_matching_attempt = () => {
                    if (map_transformed_b_to_transformed_a_node_matches.has(node_index)) {
                        const a_tb_ta = map_transformed_b_to_transformed_a_node_matches.get(node_index);
                        console.log('*** a_tb_ta', a_tb_ta);
                        const are_the_same_transforms = a_tb_ta[0][1] === a_tb_ta[1];
                        console.log('are_the_same_transforms', are_the_same_transforms);
                        const attempt_with_transformed_checking = () => {
                            if (are_the_same_transforms) {
                                const transformer_name = a_tb_ta[1];
                                if (transformer_name === 'node without children') {
                                    const doc_a_node_index = a_tb_ta[0][0];
                                    console.log('');
                                    if (node.children && node.children.length > 0) {
                                        console.log('node.children', node.children);
                                        const encoded_children = node.children.map(ch => encode_node(indexed_a, ch, o_a_b_matches_info, full_html));
                                        console.log('** encoded_children', encoded_children);
                                        console.log('** encoded_children', JSON.stringify(encoded_children));
                                        const instr_n = 'copy node by "a" index, replace children';
                                        console.log('doc_a_node_index', doc_a_node_index);
                                        const abbreviate_instruction_names = true;
                                        const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                                        const abbreviate_instruction_property_names = true;
                                        if (abbreviate_instruction_property_names) {
                                            return [str_inst, {ani: doc_a_node_index, c: encoded_children}];
                                        } else {
                                            return [str_inst, {a_node_index: doc_a_node_index, children: encoded_children}];
                                        }
                                    } else {
                                        console.trace();
                                        throw 'NYI';
                                    }
                                    console.log('');
                                    console.log('doc_a_node_index', doc_a_node_index);
                                    console.trace();
                                    throw 'stop';
                                } else {
                                    console.trace();
                                    console.log('transformer_name', transformer_name);
                                    throw 'nyi';
                                }
                            } else {
                                console.trace();
                                throw 'nyi';
                            }
                        }
                    } else {
                        console.log('nowhere in the transformed map either');
                        const instr_n = 'write';
                        const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                        return [str_inst, full_html_node_substring];
                        console.trace();
                        throw 'stop';
                    }
                }
                console.log('');
            }

        }

        
    }
}

// Actually using a Delta_Finder class may help....

//  This is not all that complex an algorithm here right now. Want to generalise it more if possible.

// Creating an array of instructions to apply to get the doc b. Can refer to doc a and things indexed / automatically derived in
//  O(N) time from it.


// So to start with Find_Delta carries out a few specific tests to see if it has matches that support a full document
// transform (or two).

// There may be some relatively simple operations that can find the delta for the whole doc, if only a simple delta is required.

// Possibly have modules of some sort that ensure the necessary transformers are loaded, and also that there is logic
// to look out for some specific matches of some transformed nodes or documents.

// The Delta Finder and the Node Encoder need to 'know' that instructions are available???
//  Not necessarily, but maybe in some more advanced versions.

// Finding the inverse, or being given the inverse, of a transformation could help.

// Recognition of matches and what they mean...
//  May help to implement logic for special cases that solve the doc diff.

// A stage that checks for full document delta transforms - such as one item being removed, another being added.
// Even being able to solve it with a simple operation.


// Testing the delta construction???
//  Without applying it.
//  Such as testing it contains at least one instruction.
//   Or testing that with a specific delta 'method' a specific delta is made.

// Though, the standard delta construction needs to be upgradable, and improve as the code improves.
//  Want regression testing on sizes of deltas too.
//   So, maybe a new instruction / delta construction pattern would be less efficient in some cases, and it would be better
//   to have the system select the better pattern / instruction.

// Delta construction patterns - may be a good way to express things.
//  See how the various dispirate checks / reconciliations could be expressed separately, with maybe 2 to 4 functions being needed
//   for each of them.
//  Generation of transformed nodes / docs depending on the node.
//  Comparisons to make between the indexed docs (including transformed nodes)
//  What to do / what can be done in cases of there being matches
//   (what reconciliation it enables perhaps)
//     so identifying a 'full document reconsiliation' match / paired feature would help a lot.













const find_delta = (a, b, options = {abbreviate_instruction_names: abbreviate_instruction_names, abbreviate_instruction_property_names: abbreviate_instruction_property_names}) => {
    
    //console.log('finding delta [a.length, b.length]', [a.length, b.length]);
    
    const {abbreviate_instruction_names, abbreviate_instruction_property_names} = options;
    const res = new HTML_Delta();
    if (a === b) {
        res.unchanged = true;
        return res;
    } else {
        
        const indexed_a = new Simple_HTML_Indexer(a), indexed_b = new Simple_HTML_Indexer(b);
        //console.log('have indexed docs a and b');

        let doc_b_without_node_matching_doc_a = false;
        let doc_b_without_node_matching_doc_a_without_node = false;
        const arr_transformed_a_transformed_b_matches = [];
        const arr_transformed_a_b_matches = []; 
        const arr_a_b_matches = [];
        indexed_b.data.node_indexes_by_hash.forEach((node_index, hash) => {
            const a_direct_match_node_index = indexed_a.data.node_indexes_by_hash.get(hash);
            if (typeof a_direct_match_node_index === 'number') {
                //console.log('a_direct_match_node_index', a_direct_match_node_index);
                const a_b_matching_pair_idxs = [a_direct_match_node_index, node_index];
                arr_a_b_matches.push(a_b_matching_pair_idxs);
            } else {
                const match_transformed_a_node = indexed_a.data.transformed_node_indexes_by_hash.get(hash);
                if (match_transformed_a_node) {
                    //console.log('match_transformed_a_node', match_transformed_a_node);
                    arr_transformed_a_b_matches.push([[match_transformed_a_node.node_index, match_transformed_a_node.transformer_name], node_index]);
                }
            }
        });


        // Condition check then instruction generator???

        indexed_b.data.transformed_node_indexes_by_hash.forEach((value, key) => {
            const hash_match = indexed_a.find_hash_match(key);

            // So here it may be trying different reconsiliation strategies.
            // Perhaps Reconsiliation_Strategy would be a good class.
            // Possible_Reconsiliation?
            //  Could define a few. They would add / ensure some transformation hashes to get indexed.
            //                      Then could have a reconsiliation_condition, or
            //                        test_reconsiliation_condition(idxd_a, idxd_b)
            //                         true or false? maybe other function could see how many bytes it would take to encode.
            //                        get_reconsiliation_parameters???
            //                        apply_reconsiliation(idxd_a, b, reconsiliation)
            //                        an encoded reconsiliation could help measuring its size, in order to compare to other ones.
            //                        reconsiliation object containing clear / useful / easy to access info on the nodes it modifies?
            //                         especially interested in the ratio of bytes (usefully) added to "b" compared with the bytes taken
            //                         to encode it.

            // Eg a possible reconsiliation for when "b" contains multiple repeating items from "a".

            // Could see about "apply reconsiliation" being an instruction.
            // The instructions system seems flexible and capable. Reconsiliations seems like a new thing, they seem like a good / very good
            //  way to apply changes to represent some specific things.

            // They definitely seem like a good way to encapsulate functionality. Not without their own challenges of course.
            // Computing stacked reconsiliations could be tricky or compute intensive.

            // Multiple reconsiliations may be needed for one delta.
            //  Maybe could consider Full_Document_Reconsiliation and Node_Reconsiliation separately?
            //  Could have a reconsile then reindex (b) strategy when working out reconsiliations to make.
            //   Once that thing is reconciled, can then get back to reconciling the next thing in "b".
            //   Then if they are the same, we have the delta through reconsiliation.
            //   If they are not the same, and no reconsiliations found, then would need to get into more standard techniques.

            // Though, it may be possible to express everything as a reconsiliation.
            // Doing them 1 by 1, in a prioritised or ordered way, could be a good way to check that they are working OK.

            // Encoded reconsiliations could be really small.
            //  binary serialise and deserialise.
            // Could be something like 4 bytes long in many cases, ie 32 bit instructions.

            // Reconsiliation being somewhat different to constructing doc "b" with instructions that make reference to doc "a".
            //  It will be a bit more thought out structurally.
            // Though, when constructing "b", it could include instructions to add nodes that are based on reconsiliations with nodes
            //  in doc "a".

            // Node reconsiliations could run the reconsiliation finder algorithm (in a class?) on the nodes that match
            //  or have the best match in terms of structure, or xpath.
            // Could look for node reconsiliations (possibly depending on hashed properties of nodes).

            // a hashed reference array (of node indexes?) of nodes with various properties it looks for...
            //  such as have 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 child nodes.
            //  or all the child nodes are divs.
            //  or all the child nodes are lis.
            // Then when it finds some matches of properties of nodes, it may be able to apply a reconsiliation
            //  function that makes use of the fact these properties of the two nodes match.

            // Hashes (with arrays) of node properties could help.
            //  And even transformations / reductions (detail reducing transformations) could have their names / obj representation
            //  hashed - but where to use those hashes, or apply them as a further hashing step to existing hashes?

            // Want to focus on things that can be done in an O(N) way.
            // Checks that can be carried out quickly on a node.
            // Then when they are done on many nodes, the results can be compared through hashes.


            // Anyway, lets quickly fix the doctype issue.
            //  Still seems a problem in some cases with a larger doc...
            //  Maybe it's not looking after the doctypes, or assuming some node is 0
            
























            if (hash_match) {
                if (value.transformer_name === 'doc without node' && hash_match.type === 'node' && hash_match.node_index === 0) {
                    doc_b_without_node_matching_doc_a = {
                        b_node_index: value.node_index
                    }
                }
                if (value.transformer_name && hash_match.type === 'transformed') {
                    const o_t_a_t_b_match = {
                        a_transformer_name: hash_match.o_transform.transformer_name,
                        a_node_index: hash_match.o_transform.node_index,
                        b_transformer_name: value.transformer_name,
                        b_node_index: value.node_index,
                    }
                    arr_transformed_a_transformed_b_matches.push(o_t_a_t_b_match);
                }
                if (value.transformer_name === 'doc without node' && hash_match.type === 'transformed' && hash_match.o_transform.transformer_name === 'doc without node') {
                    doc_b_without_node_matching_doc_a_without_node = {
                        a_node_index: hash_match.o_transform.node_index,
                        b_node_index: value.node_index
                    }
                }
                //const b_node = indexed_b.data.nodes[value.node_index];
                //const html_b_node = render(b_node);
            }
        });
        if (doc_b_without_node_matching_doc_a) {
            const doc_b_node = indexed_b.data.nodes[doc_b_without_node_matching_doc_a.b_node_index];
            const pos_doc_b_node = [doc_b_node.startIndex, doc_b_node.endIndex];
            const b_node_html = render(doc_b_node);
            const doc_a_html = indexed_a.html;
            var html_transformed_doc_a = doc_a_html.substring(0, pos_doc_b_node[0]) + b_node_html + doc_a_html.substring(pos_doc_b_node[0]);
            if (html_transformed_doc_a === indexed_b.html) {
                //console.log('FOUND FULL DOC TRANSFORM');

                let instruction, instr_ca, instr_insert_string;

                if (abbreviate_instruction_property_names) {

                    if (abbreviate_instruction_names) {
                        instr_insert_string = ['is', {
                            p: pos_doc_b_node[0],
                            s: b_node_html
                        }]
                    } else {
                        instr_insert_string = ['insert string', {
                            p: pos_doc_b_node[0],
                            s: b_node_html
                        }]
                    }

                    
                } else {

                    if (abbreviate_instruction_names) {
                        instr_insert_string = ['is', {
                            p: pos_doc_b_node[0],
                            s: b_node_html
                        }]
                    } else {
                        instr_insert_string = ['insert string', {
                            pos: pos_doc_b_node[0],
                            str: b_node_html
                        }]
                    }

                }

                if (abbreviate_instruction_names) {
                    instr_ca = ['ca'];
                } else {
                    instr_ca = ['copy doc "a"'];
                }

                const instrs = [
                    instr_ca, instr_insert_string
                ];

                if (abbreviate_instruction_property_names) {
                    res.i = instrs;
                } else {
                    res.instructions = instrs;
                }

                if (abbreviate_instruction_property_names) {
                    return {
                        m: method_codename,
                        v: res
                    }
                } else {
                    return {
                        method: method_name,
                        value: res
                    }
                }

                
                
            }
        } else {
            //console.log('1) cant use the fairly simple delta of copying doc a and adding a string at a pos.');
            if (doc_b_without_node_matching_doc_a_without_node) {
                //console.log('doc_b_without_node_matching_doc_a_without_node', doc_b_without_node_matching_doc_a_without_node);
                //console.log('FOUND FULL DOC TRANSFORM');
                const [a_node, b_node] = [
                    indexed_a.data.nodes[doc_b_without_node_matching_doc_a_without_node.a_node_index],
                    indexed_b.data.nodes[doc_b_without_node_matching_doc_a_without_node.b_node_index]
                ]
                const a_node_pos = [a_node.startIndex, a_node.endIndex];
                const b_node_pos = [b_node.startIndex, b_node.endIndex];
                //console.log('a_node_pos', a_node_pos);
                //console.log('b_node_pos', b_node_pos);

                //console.log('abbreviate_instruction_names', abbreviate_instruction_names);

                if (abbreviate_instruction_names === false && abbreviate_instruction_property_names === false) {
                    res.instructions = [
                        ['copy doc "a"'], 
                        ['remove string', {pos: a_node_pos[0], length: a_node_pos[1] - a_node_pos[0]}], 
                        ['insert string', {
                            pos: b_node_pos[0],
                            str: render(b_node)
                        }]
                    ]
                    return {
                        method_name: method_name,
                        value: res
                    }

                } else if (abbreviate_instruction_names === true && abbreviate_instruction_property_names === true) {

                    // Def need unabbreviated

                    res.i = [
                        ['ca'], 
                        ['rs', {p: a_node_pos[0], l: a_node_pos[1] - a_node_pos[0]}], 
                        ['is', {
                            p: b_node_pos[0],
                            s: render(b_node)
                        }]
                    ]
                    return {
                        m: method_codename,
                        v: res
                    }
                    
                } else {

                    console.trace();
                    throw 'NYI';

                }

               
            } else {
                //console.log('2) cant use the fairly simple delta of copying a, removing a string from res, adding a string at pos in res.');
                
                
                const map_b_to_a_node_matches = new Map(arr_a_b_matches.map(x => {
                    return [x[1], x[0]];
                }))
                const map_b_to_transformed_a_node_matches = new Map(arr_transformed_a_b_matches.map(x => {
                    const [[a_node_index, a_node_transformer_name], b_node_index] = x;
                    //console.log('[[a_node_index, a_node_transformer_name], b_node_index]', [[a_node_index, a_node_transformer_name], b_node_index]);
                    return [b_node_index, [a_node_index, a_node_transformer_name]];
                }));
                const map_transformed_b_to_transformed_a_node_matches = new Map(arr_transformed_a_transformed_b_matches.map(x => {
                    const {b_node_index, b_transformer_name, a_node_index, a_transformer_name} = x;
                    return [b_node_index, [[a_node_index, a_transformer_name], b_transformer_name]];
                }));
                const o_a_b_matches_info = {
                    arr_a_b_matches,
                    arr_transformed_a_b_matches,
                    arr_transformed_a_transformed_b_matches,
                    map_b_to_a_node_matches,
                    map_b_to_transformed_a_node_matches,
                    map_transformed_b_to_transformed_a_node_matches
                }

                //console.log('pre encode b b', b);
                let encoded_b;

                //console.log('b', b);
                //console.log('typeof b', typeof b);

                if (typeof b === 'string') {
                    
                    // But if that string holds 2 nodes in an array - need to deal with that properly.
                    //  Returning an array of instructions should be OK / best.
                    
                    encoded_b = encode_node(indexed_a, b, o_a_b_matches_info, b);


                } else {
                    encoded_b = encode_node(indexed_a, b, o_a_b_matches_info);
                }

                //const 
                //console.log('encoded_b (find_delta())', encoded_b);
                //console.trace();

                if (abbreviate_instruction_property_names) {
                    res.i = [encoded_b];
                } else {
                    res.instructions = [encoded_b];
                }

                
            }
        }
    }

    if (abbreviate_instruction_property_names) {
        return {
            m: method_codename,
            v: res
        }
    } else {
        return {
            method_name: method_name,
            value: res
        }
    }

    
}
module.exports = find_delta;