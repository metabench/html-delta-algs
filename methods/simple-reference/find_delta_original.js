const HTML_Delta = require('../../HTML_Delta');


// Using the extended one instead...???


const Simple_HTML_Indexer = require('../../tools/Simple_Extended_HTML_Indexer');


const {arrayify, is_array, each} = require('lang-mini');
const {remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths} = require('../../tools/tools');

// Even some shorthand representation of generated HTML would be helpful.

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


// May make a simplified version / core of this.
//  simple_find_delta for the moment?

// Make an extendable_find_delta?

// Seems like classes would be better for extension.

// However, a new find_delta function that loads both a and b into the extended html indexes with transformations,
//  then doing a different set of comparisons and test and producing the result in a different way.

// The transformers help it to look for something specific.
//   





const find_delta = (a, b, options = {abbreviate_instruction_names: true, abbreviate_instruction_property_names: true}) => {
    const {abbreviate_instruction_names, abbreviate_instruction_property_names} = options;
    const res = new HTML_Delta();


    if (a === b) {
        res.unchanged = true;
        return res;

    } else {
        const indexed_a = new Simple_HTML_Indexer(a);

        // Can look for matching or transformed versions of the node from doc a.


        // Encoding a node here is somewhat complex.
        //  Want an encoding system that refers as much as poss to what is available from doc a.


        // Does it match a transformed node from a? Will be question in other version.


        const encode_node = (arrayify(node => {
            const found_identical_node = indexed_a.find_identical_node(node);
            if (typeof found_identical_node === 'number') {
                const instr_n = 'copy node by "a" index'
                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                return [str_inst, found_identical_node];
                return ['copy node by "a" index', found_identical_node];
            } else {
                if (node.children) {
                    if (node.children.length > 0) {
                        const encoded_children = [];
                        const rendered_write_encoded_children = [];
                        for (const node_child of node.children) {
                            const encoded_node_child = encode_node(node_child);
                            if (encoded_node_child) {
                                if (is_array(encoded_node_child)) {
                                    encoded_children.push(encoded_node_child);
                                    if (encoded_node_child[0] === 'write') {
                                        rendered_write_encoded_children.push(render(node));
                                    }
                                } else {
                                    console.trace();
                                    throw 'stop';
                                }
                            }
                        }
                        if (encoded_children.length === rendered_write_encoded_children.length) {
                            const i_a_node_ref_childless_match = indexed_a.find_node_matching_as_childless(node);
                            if (i_a_node_ref_childless_match === undefined) {
                                const instr_n = 'write'
                                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                                return [str_inst, render(node)];
                            } else {
                                const instr_n = 'copy node by "a" index, replace children'
                                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                                if (abbreviate_instruction_property_names) {
                                    return [str_inst, {ani: i_a_node_ref_childless_match, c: encoded_children}];
                                } else {
                                    return [str_inst, {a_node_index: i_a_node_ref_childless_match, children: encoded_children}];
                                }
                                return res;
                            }
                            console.trace();
                            throw 'stop';
                        } else {
                            const node_html = render(node);

                            // That will need to look at the map of transformed nodes.



                            const i_a_node_ref_childless_match = indexed_a.find_node_matching_as_childless(node);
                            if (i_a_node_ref_childless_match === undefined) {
                                const instr_n = 'write'
                                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                                const res = [str_inst, render(node)];
                                return res;
                                return ['write', render(node)];
                            } else {
                                const instr_n = 'copy node by "a" index, replace children'
                                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                                if (abbreviate_instruction_property_names) {
                                    return [str_inst, {ani: i_a_node_ref_childless_match, c: encoded_children}]
                                } else {
                                    return [str_inst, {a_node_index: i_a_node_ref_childless_match, children: encoded_children}]
                                }
                            }
                        }
                    } else {
                        const i_a_node_ref_childless_match = indexed_a.find_node_matching_as_childless(node);
                        if (i_a_node_ref_childless_match === undefined) {
                            const instr_n = 'write'
                            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                            return [str_inst, render(node)];
                        } else {
                            const instr_n = 'copy node by "a" index, replace children'
                            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                            if (abbreviate_instruction_property_names) {
                                return [str_inst, {ani: i_a_node_ref_childless_match, c: encoded_children}]
                            } else {
                                return [str_inst, {a_node_index: i_a_node_ref_childless_match, children: encoded_children}]
                            }
                        }
                    }
                } else {
                    const instr_n = 'write'
                    const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                    return [str_inst, render(node)];
                }
            }
        }));
        const process_node = node => {
            if (Array.isArray(node)) {
                return node.map(x => process_node(x));
            } else {

                // So, find a node which has not been so transformed.



                const found_identical_node = indexed_a.find_identical_node(node);
                if (typeof found_identical_node === 'number') {
                    return ['identical', found_identical_node];
                } else {
                    const encoded = encode_node(node);
                    return ['encoded', encoded];
                }
            }
        }
        let instructions = [];
        const add_instruction = instruction => {
            instructions.push(instruction);
        }
        iterate_node(b, (node, idx, depth, stop, dont_descend) => {
            const node_res = process_node(node);
            if (node_res === undefined) {
                if (node.children) {
                    const _ch = node.children;
                    node.children = [];
                    const childless_html = render(node);
                    node.children = _ch;
                    if (node.children.length > 0) {
                        const idx_a_node_matching_childless_version_of_b_node = indexed_a.find_identical_node(childless_html);
                        if (idx_a_node_matching_childless_version_of_b_node !== undefined) {
                        }
                    }
                } else {
                }
            } else if (Array.isArray(node_res)) {
                const match_type = node_res[0];
                if (match_type === 'identical') {
                    const node_idx_in_a = node_res[1];
                    add_instruction(['copy node by "a" index', node_idx_in_a]);
                    dont_descend();
                } else if (match_type === 'encoded') {
                    const instruction = node_res[1];
                    if (is_array(instruction)) {
                        if (instruction.length === 2) {
                            let [instruction_name, instruction_param] = instruction;
                            if (map_instruction_names_by_codenames.has(instruction_name)) instruction_name = map_instruction_names_by_codenames.get(instruction_name);
                            if (instruction_name === 'write') {
                                add_instruction(instruction);
                                dont_descend();
                            } else if (instruction_name === 'copy node by "a" index, replace children') {
                                add_instruction(instruction);
                                dont_descend(); 
                            } else {
                                console.log('unknown instruction name: ' + instruction_name);
                                console.log('instruction_param', instruction_param);
                                console.trace();
                                throw 'stop';
                            }
                        }
                    }
                }
            }
        })
        res.i = instructions;
        //res.instructions = instructions;
    }
    return {
        m: method_codename,
        v: res
    }
}

module.exports = find_delta;