

const {
    method_name, method_codename, arr_instruction_names, arr_instruction_codenames,
    arr_instruction_property_names, 

    map_instruction_names_by_codenames, map_instruction_codenames_by_names, 

    arr_instruction_property_codenames,
    map_instruction_property_names_by_codenames, map_instruction_property_codenames_by_names,

    method_description
} = require('./method_consts');


const {
    Parser
} = require('htmlparser2');
const {
    DomHandler
} = require('domhandler');
const render = require("dom-serializer").default;
const crypto = require('crypto');
const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();

const Simple_HTML_Indexer = require('../../tools/Simple_Extended_HTML_Indexer');

// Need to improve find delta, maybe more commands, so that it can identify a delta that adds some html to a node.
//  Would come by spotting that a transformer on doc b, the node without children, produces a match for the root of doc a.

const {is_arr_of_arrs, is_array} = require('lang-mini');



//const Simple_HTML_Indexer = require('../../tools/Simple_HTML_Indexer');

const apply_delta = (a, o_delta) => {


    //console.log('o_delta', o_delta);


    const value = o_delta.value || o_delta.v;

    // Should not need a .value.



    //console.log('method_codename', method_codename);

    //console.log('method_name', method_name);

    //console.log('o_delta', o_delta);


    if (o_delta.m === method_codename || o_delta.method_name === method_name || o_delta.method === method_name) {

        // Need to give the indexer the transformers?
        //  They should be loaded by the indexer already.

        const idxd_a = new Simple_HTML_Indexer(a);
        //const {instructions} = value;
        let instructions;
        
        if (value) {
            instructions = value.i || value.instructions;
        } else {
            instructions = o_delta.i || o_delta.instructions;
        }
        

        if (instructions) {

            const decode_nodes = nodes => {
                let res = '';
                for (const node of nodes) {
                    res += decode_node(node);
                }
                return res;
            }

            // So we maybe are not always decoding nodes, but running instructions.
            //  Nodes will be given as an instruction always???


            // Some instructions won't be "node" instructions.

            const decode_node = node => {
                const instruction = node;
                let [name, param] = instruction;
                
                if (map_instruction_names_by_codenames.has(name)) name = map_instruction_names_by_codenames.get(name);
                //console.log('[name, param]', [name, param]);
                if (name === 'copy node by "a" index, replace children') {
                    //console.log('param', param);
                    const a_node_index = param.a_node_index || param.ani || 0; // ???? questionable. maybe do type checks.
                    const children = param.children || param.c;
                    const node_from_a = idxd_a.data.nodes[a_node_index];
                    //console.log('a_node_index', a_node_index);
                    //console.log('node_from_a', node_from_a);

                    if (!node_from_a) {
                        throw 'Node from "a" lookup failed';
                    }

                    if (node_from_a.type === 'text') {
                        const decoded_children = decode_nodes(children);
                        return decoded_children;
                        throw 'stop';
                        return ;
                    } else {
                        if (node_from_a.name !== undefined) {
                            let attrs = '';
                            if (node_from_a.attribs) {
                                for (const [k, v] of Object.entries(node_from_a.attribs)) {
                                    attrs += ' ' + k + '="' + v + '"';
                                }
                            }
                            const res = `<${node_from_a.name}${attrs}>${children.map(child => decode_node(child)).join('')}</${node_from_a.name}>`;
                            return res;
                        } else {
                            console.trace();
                            throw 'stop';
                        }
                    }
                } else if (name === 'copy doc "a"') {

                    // But copying doc "a" maybe is not a node instruction....

                    return idxd_a.html;
                } else if (name === 'copy node by "a" index') {
                    // 

                    const a_node_index = param;
                    const node_from_a = idxd_a.data.nodes[a_node_index];
                    //console.log('node_from_a', node_from_a);
                    //console.log('a_node_index', a_node_index);
                    return render(node_from_a);
                    console.trace();
                    throw 'stop';
                } else if (name === 'write') {
                    return param;
                } else {
                    console.log('instruction', instruction);
                    console.trace();
                    throw 'stop';
                    console.trace();
                    throw 'stop';
                }
            }
            let str_res = '';
            const process_instruction = instruction => {

                // is it an array of arrays?
                if (is_arr_of_arrs(instruction)) {

                    instruction.map(process_instruction);

                } else {

                    //console.log('apply_delta process_instruction instruction', instruction);
                    // But if it's 2 instructions in an array...?

                    // Maybe rendering htmlparser2 gets rid of the dtd.
                    //  Not entirely sure.

                    // Soon want to see the full document reconciliations working, and easy to specify.
                    //  Things like changing one class name to another...
                    //  These should be relatively small / simple challenges.
                    // Allowing for multiple possible reconciliations in O(N) time this should find a byte efficient way
                    //  to represent constructing doc b when we already have doc a.
                    let name, param;

                    if (is_array(instruction)) {
                        [name, param] = instruction;
                    } else if (typeof instruction === 'string') {
                        name = instruction;
                    }

                    //let 

                    //console.log('name', name);

                    if (map_instruction_names_by_codenames.has(name)) name = map_instruction_names_by_codenames.get(name);
                    let is_node_instruction = true;

                    // A node instruction
                    //  Yes, copying doc a is such.
                    //  Some others may be a string instruction???
                    

                    // Remove node by index...
                    //  Not a node fetching instruction, but a node instruction that needs to remove a node (by index) from the
                    //  current result document.
                    // Though could this be more efficiently put as a remove n string characters from string pos?
                    //  Would be a faster transform to apply.


                    // remove n characters from position.



                    if (name === 'copy node by "a" index, replace children') {
                        is_node_instruction = true;
                    } else if (name === 'copy node by "a" index') {
                        is_node_instruction = true;
                    } else if (name === 'copy doc "a"') {
                        is_node_instruction = false;


                    } else if (name === 'write') {
                        is_node_instruction = true;
                    } else if (name === 'insert string') {
                        is_node_instruction = false;
                    } else {
                        is_node_instruction = false;
                    }
                    if (is_node_instruction) {
                        const str_decoded_node = decode_node(instruction);
                        str_res += str_decoded_node;
                    } else {

                        // Need to run a string processing system on this....

                        if (name === 'insert string' || name === 'is') {
                            //str_res = str_res.

                            //console.log('');
                            //console.log('a) str_res', str_res);
                            console.log('param', param);

                            if (is_array(param)) {

                                const [str, pos] = param;

                                const part1 = str_res.substring(0, pos);
                                const part2 = str_res.substring(pos);

                                //console.log('part1', part1);

                                str_res = part1 + str + part2;


                            } else {
                                console.trace();
                                throw 'NYI';

                            }

                            

                            

                            //console.log('str_res', str_res);

                            //console.trace();
                            //throw 'stop';

                            //str_res = str_res.substring(0, param.p || param.position) + param.s || param.string + str_res.substring(param.p || param.position);
                            //console.log('is str_res', str_res);

                            //console.log('');
                        } else if (name === 'remove string' || name === 'rs') {
                            //str_res = str_res.

                            // But in what cases remove, in what cases insert...?

                            
                            const p = param.pos === undefined ? param.p : param.pos;
                            const l = param.length === undefined ? param.l : param.length;
                            //const {p, l} = param;

                            const part1 = str_res.substring(0, p);
                            const part2 = str_res.substring(p + l + 1);   
                            
                            //console.log('part1', part1);
                            //console.log('part2', part2);

                            //console.log('param', param);
                            
                            str_res = part1 + part2;

                            //console.log('str_res', str_res);
                            //console.trace();
                            //throw 'stop';


                            //console.trace();
                            //throw 'stop';

                            //const part1 = str_res.substring(0, param.p || param.position);
                            //const part2 = str_res.substring(param.p || param.position);

                            //console.log('part1', part1);

                            //str_res = part1 + (param.s || param.string) + part2;

                            //str_res = str_res.substring(0, param.p || param.position) + param.s || param.string + str_res.substring(param.p || param.position);
                            //console.log('str_res', str_res);
                        } else if (name === 'copy doc "a"' || name === 'ca') {
                            str_res = idxd_a.html;


                        } else {

                            // Now need the copy doc "a" instruction here.



                            console.log('instruction', instruction);

                            console.trace();
                            throw 'NYI';
                        }



                        
                    }

                }


                
            };
            //console.log('instructions', instructions);
            for (const instruction of instructions) {
                process_instruction(instruction);
            }
            return str_res;

        } else {
            console.trace();
            throw 'Instructions not found in Delta';
        }
        


        
    } else {
        throw 'Unsupported method_name: ' + o_delta.method_name;
    }
}

module.exports = apply_delta;