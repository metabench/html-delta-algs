// Still not doing so well in some cases.
//  At least it's no longer malfunctioning with failed encodings like before.
//   So how to make an improved encoding???

// For the moment, a not so efficient JSON string encoding system can help to work on the logic of getting it encoding for less.
// Things like the logic of 'copy doc "a", remove a specified node from it, then add a node at index i which is a transformation of a node
//  from doc a. That kind of logic, rather than rebuilding elements in doc "b" would help.
// Full doc / html delta discovery and encoding.

// Maybe the hashing of the doc with the doctype is the problem in some cases.
//  May need still better DTD support.



// This is winding up much simpler code because the broken code was removed.
// Worth making more specialised and easy-to-use classes to make comparisons between the HTML pair.



// Basically just uses the General_Node_Encoder now.









// To keep it O(N), there could be some tests / comparisons that only get done in the case of small documents.
//  This will help with being able to find some smaller reconciliation methods.
//  See about representing a node in B as a transformed node from A...?
//   Or see about finding a node's delta with its corresponding node as per xpath in "a".
// Things such as recognising that a string / text node within "b" is more concisely represented as a modified version of a 
//  text node from "a".
// May want to try doing some checks like that in a limited set of circumstances, eg when there are no more than 256 pieces of text
//  in doc "a" to compare a piece of text to.

// Could have some quite arbitrary and specific cut-offs for using some techniques. This way the algorithm can be kept O(N) (or kind of?)
//  Think it still counts as O(N) when there are constant limits, though having 256^2 as such a constant and using things like that multiple times
//  may be pushing it a bit too much.

// It will be worth seeing which delta encoding rules could be implemented to improve some specific test / example encodings.
// Want to cover a fair few in the smaller examples, make sure they work, and get them to work in combination to some extent.

// Finding and representing deltas rather than re-encoding things will help a lot more.
//  Eg deltas between corresponding nodes.
//  Maybe identify when not relevant or worth trying in some cases?
//   Such as if there is a node (incl nested) count that's very different.
//  Maybe definitely worth doing with the 'head', 'html' and 'body' nodes, then it could depend on structure matches or
//   near enough matches????
//  Or have a heuristic yet to be determined called 'worth determining node deltas' that prevents it from trying when it's
//   not as likely to be rewarding while also being computationally expensive.

// Want to move more functionality from this into relevant plugins (or at least code written elsewhere ready to connect to here in
//  in a way that does not hard-code much, but carries out the checks as they are specified)




















const abbr = true;
const abbreviate_instruction_names = abbr;
const abbreviate_instruction_property_names = abbr;
const HTML_Delta = require('../../HTML_Delta');
const Simple_HTML_Indexer = require('../../tools/Simple_Extended_HTML_Indexer');
const {arrayify, is_array, each} = require('lang-mini');
const {remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths} = require('../../tools/tools');

const {
    Parser
} = require('htmlparser2');
const {
    DomHandler
} = require('domhandler');
const render = require("dom-serializer").default;
const crypto = require('crypto');
const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();
const {
    method_name, method_codename, arr_instruction_names, arr_instruction_codenames,
    arr_instruction_property_names, 
    map_instruction_names_by_codenames, map_instruction_codenames_by_names, 
    arr_instruction_property_codenames,
    map_instruction_property_names_by_codenames, map_instruction_property_codenames_by_names,
    method_description
} = require('./method_consts');

// A node encoder...

// The Delta_Finder can make more or less use of the Node_Encoder.
//  

// Moving this to Node_Encoder would definitely be nice.

const Node_Encoder = require('./Node_Encoder/General');

// and make a new node_encoder with the indexed_a....
//  So it would be done in the delta finding function.
//   And use that instead of the encode_node function here.

// It does check a few things....
//  Implementing all those things elsewhere in their own solution checks / node encoders may be best.





/*
const encode_node = (indexed_a, node) => {

}
*/

const _encode_node = (indexed_a, node, o_a_b_matches_info, full_html) => {
    const {
        arr_a_b_matches,
        arr_transformed_a_b_matches,
        arr_transformed_a_transformed_b_matches,
        map_b_to_a_node_matches,
        map_b_to_transformed_a_node_matches,
        map_transformed_b_to_transformed_a_node_matches
    } = o_a_b_matches_info;

    // This will all be broken into smaller parts.
    //  Maybe those parts will themselves be larger, but the code here smaller.

    // Use the general node encoder for now???




    if (typeof node === 'string') {
        const parsed_node = assign_xpaths(parse_str_html_node(node));
        return encode_node(indexed_a, parsed_node, o_a_b_matches_info, full_html);
    } else {
        if (is_array(node)) {
            return node.map(node => encode_node(indexed_a, node, o_a_b_matches_info, full_html));
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
            // find_hash_match could prove trickier to use than directly accessing the maps....

            if (found_node_hash_match_from_doc_a) {
                const {type} = found_node_hash_match_from_doc_a;
                if (type === 'node') {
                    const {node_index} = found_node_hash_match_from_doc_a;
                    const instr_n = 'copy node by "a" index'
                    const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                    return [str_inst, node_index];
                } else {

                    // More structured code for doing / encoding / decoding / running instructions based on transformed nodes....



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
                const node_index = typeof node.idx === 'number' ? node.idx : node.index;

                // The childless node match and delta at this point....

                const node_html_as_childless = render_as_childless(node);
                const hnc = calc_hash_256bit(node_html_as_childless).toString('hex');
                const hnc_match = indexed_a.data.transformed_node_indexes_by_hash.get(hnc);
                if (hnc_match) {
                    const a_node_index = hnc_match.node_index, transformer_name = hnc_match.transformer_name;
                    if (transformer_name === 'node without children') {
                        if (node.children && node.children.length > 0) {
                            const encoded_children = node.children.map(ch => encode_node(indexed_a, ch, o_a_b_matches_info, full_html));
                            const instr_n = 'copy node by "a" index, replace children';
                            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
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
            }
        }
    }
}



// Could run it through an array of Delta_Solution or Delta_Solution_Checker objects?
// Rather than have it check within code right here.





// And a Delta_Finder class may be better here too.
//  It may be a better system for trying multiple attempts at delta finding, and comparing the sizes of successful deltas.



// Seems like we still need better node encoding of a node matching a transformed version of a node in doc "a".
//  Maybe the Node_Encoder class needs to be improved to do this better.



const find_delta = (a, b, options = {abbreviate_instruction_names: abbreviate_instruction_names, abbreviate_instruction_property_names: abbreviate_instruction_property_names}) => {
    const {abbreviate_instruction_names, abbreviate_instruction_property_names} = options;



    const res = new HTML_Delta();

    // Condition testing....


    if (a === b) {
        res.unchanged = true;
        return res;
    } else {

        // Could be better done using an Indexed_Html_Pair, maybe Indexed_Html_Pair_Comparison.

        // Indexed_Html_Pair_With_Transformations_Comparison
        //  

        // Modularising the functionality could be very helpful.
        //  It would contain the o_a_b_matches_info functionality more nicely.
        //   Though could have / start with that exact object.



        
        // The html indexer should iterate the nodes and add their 'idx' / 'index' property.

        const indexed_a = new Simple_HTML_Indexer(a), indexed_b = new Simple_HTML_Indexer(b);

        // obtain_o_a_b_matches_info

        // And the parsed doc b?
        // May be best to give it indexed_b even?
        //  Though maybe it would / should not need it, logically it's a bit more complex to use it and justify passing it over.
        //  Giving it the root_b or doc_b would help.


        // Could use HTML_Pair_Referencing_Node_Encoder perhaps...?

        const node_encoder = new Node_Encoder({
            indexed_a,
            html_b: b,
            doc_b: indexed_b.doc
        });


        // The document / html pair comparison...
        // Would be nice to have a dedicated class for that.
        // Then the find_delta function, or a Delta_Finder class instance, could use that, making queries to it with an
        // API that is concise in this part of the code.






        // Seems like the point where reconciliation strategies, or something else but a bit similar could be used here.





        // Looks like it would be better to modularise these.
        //  First in the HTML_Pair_Comparison.
        //  Then in solution checks that make use of what the pair comparison determined.





        


        //console.log('doc_b_without_node_matching_doc_a_without_node', doc_b_without_node_matching_doc_a_without_node);

        // non-transformed "b" to transformed "a" matches


        // transformed "b" to transformed "a" matches


        // So that data would be available (throughout) when doing encoding of nodes / diffs of nodes.






        // This is just for the situation where "b" is "a" but with a node missing.

        // A Solution / Potential_Solution checker could be helpful.

        // The delta solution check that takes the HTML_Pair_Comparison may be more effective - could apply them in order here.
        //  Checking for full solutions.




        // Also - need to be able to represent a node in "b" as a node from "a" with a delta applied.



        // Condition check, and delta encoding would be better specified / done elsewhere, and called from here, maybe as one of 
        // a sequence.

        // Don't want the if logic here specifying (too many?) specific checks here.

        const unweildy_transformed_matching_system = () => {


            const map_b_to_a_node_matches = new Map(arr_a_b_matches.map(x => {
                return [x[1], x[0]];
            }))
            const map_b_to_transformed_a_node_matches = new Map(arr_transformed_a_b_matches.map(x => {
                const [[a_node_index, a_node_transformer_name], b_node_index] = x;
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

            let doc_b_without_node_matching_doc_a = false;
            let doc_b_without_node_matching_doc_a_without_node = false;
            const arr_transformed_a_transformed_b_matches = [];
            const arr_transformed_a_b_matches = []; 
            const arr_a_b_matches = [];

            // Reconciliation seems about fixing one (or more) differences but maybe not all.
            // When it's finding a complete match, the full delta, it's more like a solution than a reconciliation / partial reconciliation.
            //  A reconciliation could be a solution.

            // So there could be some ways to (totally) solve the diff, maybe in very few instructions.
            //  Perhaps they could be defined as Solution_Strategy classes / objects.
            //   Would have a condition / situation (check with fn)
            //   

            // A class that automatically looks for / check for matches would help here.
            // HTML_Pair_Indexed_Comparison
            //  And would include comparisons of transformed nodes too - or maybe a more advanced subclass of it?




            // Definitely would be nice to have the match identificaton done in a separate HTML_Pair or HTML_Pair_Comparison class.
            // Will need to be careful about hashing large / very large things.
            //  Hashing the full doc (transformed) for every node will no longer be O(N)
            //  May be worth using the technique, but limiting it to cases of the HTML being no larger than 4KB or something like that.
            //   Maybe a maximum of 256 nodes too.
            
            // A lot of these techniqies that only work in small documents or HTML fragments will be useful if the algorithm recursively
            //  produces deltas on divs that correspond, and don't have such large content.


            // Could see about running 'perf_cost': 'n' functions / transformations only in some cases, such as when the HTML
            //  is no more than 4KB long.


            // html_pair_comparison.matches.identical_nodes


            //  A specialised HTML pair comparison class could be quite helpful here, esp for splitting responsibilities of code,
            //  and having the code in find_delta more concise and to-the-point.

            indexed_b.data.node_indexes_by_hash.forEach((node_index, hash) => {
                const a_direct_match_node_index = indexed_a.data.node_indexes_by_hash.get(hash);
                if (typeof a_direct_match_node_index === 'number') {
                    const a_b_matching_pair_idxs = [a_direct_match_node_index, node_index];
                    arr_a_b_matches.push(a_b_matching_pair_idxs);
                } else {
                    const match_transformed_a_node = indexed_a.data.transformed_node_indexes_by_hash.get(hash);
                    if (match_transformed_a_node) {
                        arr_transformed_a_b_matches.push([[match_transformed_a_node.node_index, match_transformed_a_node.transformer_name], node_index]);
                    }
                }
            });


            // A simpler to access and test HTML_Pair_Comparison may work better.
            //  



            // transformed "b" to non-transformed "a" matches

            indexed_b.data.transformed_node_indexes_by_hash.forEach((value, key) => {
                const hash_match = indexed_a.find_hash_match(key);
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
                }
            });



            // Matching doc a also without that node index?
            if (doc_b_without_node_matching_doc_a) {

                // Matching doc a without that node???

                console.log('doc_b_without_node_matching_doc_a', doc_b_without_node_matching_doc_a);

                // A reconciliation strategy?
                //  A solution strategy? (ie only for the complete delta being recognised)

                // Seems not to compare properly using doctypes???
                //  Or it matches but with the doctypes removed in some cases?




                const doc_b_node = indexed_b.data.nodes[doc_b_without_node_matching_doc_a.b_node_index];
                const pos_doc_b_node = [doc_b_node.startIndex, doc_b_node.endIndex];
                const b_node_html = render(doc_b_node);
                console.log('b_node_html', b_node_html);
                const doc_a_html = indexed_a.html;
                const html_transformed_doc_a = doc_a_html.substring(0, pos_doc_b_node[0]) + b_node_html + doc_a_html.substring(pos_doc_b_node[0]);

                // This looks like one of the specific document delta solutions.
                //  Could implement it in its own class, and have used like a plugin here.

                if (html_transformed_doc_a === indexed_b.html) {

                    // Quite a longwinded way to put together (compile) the instruction.
                    //  Maybe better to make it unabbreviated and apply abbreviations.
                    //  Or use instances of Instruction classes.

                    // Maybe could have instruction / instruction sequence rendering (helper) functions.

                    // This code does basically write a little computer program depending on various params.
                    //  Not massively simple.

                    // Copy document "a" and insert a string.
                    //  Is a fairly useful delta to be able to identify and use.

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
                } else {
                    console.trace();
                    throw 'Couldn\'t put Humpty together again';

                }


            } else if (doc_b_without_node_matching_doc_a_without_node) {

                console.log('doc_b_without_node_matching_doc_a_without_node', doc_b_without_node_matching_doc_a_without_node);

                // Could use another delta solution checker.


                const [a_node, b_node] = [
                    indexed_a.data.nodes[doc_b_without_node_matching_doc_a_without_node.a_node_index],
                    indexed_b.data.nodes[doc_b_without_node_matching_doc_a_without_node.b_node_index]
                ]
                const a_node_pos = [a_node.startIndex, a_node.endIndex];
                const b_node_pos = [b_node.startIndex, b_node.endIndex];
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

                // No (full) delta solution found.

                return standard_matching_system();
            }
        }

        const standard_matching_system = () => {

            /*

            

            */

            let encoded_b;
            if (typeof b === 'string') {

                // And the full html....?
                encoded_b = node_encoder.encode(b, b);

                //encoded_b = encode_node(indexed_a, b, o_a_b_matches_info, b);
            } else {
                //encoded_b = encode_node(indexed_a, b, o_a_b_matches_info);
                encoded_b = node_encoder.encode(b);
            }
            //console.log('encoded_b', encoded_b);

            if (abbreviate_instruction_property_names) {
                res.i = [encoded_b];
            } else {
                res.instructions = [encoded_b];
            }

            //return res;

        }


        //return standard_matching_system();
        standard_matching_system();


        
    }

    // but then would would res just be {}?

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