
// exact-elements-reference perhaps.

// This simple reference implementation has become quite long - before even getting into document reconstruction.

// Maybe a class for dealing with encoded references would help.
//  Want to make these as compact as possible.
//  While it's still simple.

// Also want to keep the algorithm really simple here.
//  Want to be able to use it in an interchangable way while leaving the capability for improved algorithms.
//   Getting deltas down to a few KBs will be very nice.
//   And storing those deltas in compressed arrays.


// Would be nice to apply a compression layer around this.
//  Could later make an upgraded delta encoder inside part (creating the instruction list), and then compressing them
//   further.

// Could look more at the enhanced string system to see if there could be a compression method that can be applied to
//  the results of the diff (string or html) operation.


// simple-reference-further-compressed

const {remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths} = require('../tools/tools');


const crypto = require('crypto');
const {
    Parser
} = require('htmlparser2');
const {
    DomHandler
} = require('domhandler');
const render = require("dom-serializer").default;

const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();

const HTML_Delta = require('../HTML_Delta');

const method_name = "simple-reference";
const method_codename = 'sr';

const {arrayify, is_array, each} = require('lang-mini');

const Simple_HTML_Indexer = require('../tools/Simple_HTML_Indexer');

const cheerio = require('cheerio');
// simple-reference-HTML_Indexer

// Is fairly complicated, even as the reference implementation.
//  Very simple in terms of commands.
//  Worth seeing about abstracting some of it.




// A version with no xpath assignment.
// Seems best to assign all xpaths first before returning them.
// Could make that optional.



// Could have a better abstracted check & store (hash) system.
//  Maybe a Node_Index class?

// get_node_indexable_characteristics(node)

// List of all command names available would help.
//  could have codenames for the commands as well. Like assembly (kind of).
//  A more compact JSON type compression would be nice to start with.


// An abbreviated instruction names option would help.

// Defining the instruction set?


const arr_instruction_names = [
    'copy node by "a" index',
    'copy node by "a" index, replace children',
    'write'
]
const arr_instruction_codenames = [
    'cani',
    'canirc',
    'w'
]

const map_instruction_names_by_codenames = new Map(arr_instruction_codenames.map((cn, i) => [cn, arr_instruction_names[i]]));
const map_instruction_codenames_by_names = new Map(arr_instruction_names.map((cn, i) => [cn, arr_instruction_codenames[i]]));

//console.log('map_instruction_names_by_codenames', map_instruction_names_by_codenames);
//console.log('map_instruction_codenames_by_names', map_instruction_codenames_by_names);

// And a map of instruction properties by their codewords...

const arr_instruction_property_names = [
    'a_node_index',
    'children'
]

const arr_instruction_property_codenames = [
    'ani',
    'c'
]

const map_instruction_property_names_by_codenames = new Map(arr_instruction_property_codenames.map((cn, i) => [cn, arr_instruction_property_names[i]]));
const map_instruction_property_codenames_by_names = new Map(arr_instruction_property_names.map((cn, i) => [cn, arr_instruction_property_codenames[i]]));


// The indexer could be in its own class...
//  The simple-reference version.

// HTML_Node_Indexer perhaps.

// More than just the reference delta method.







const method_description = `
A fast running, simple algorithm, looking to make some savings but not expecting very much from this simple reference implementation


Reference "a",
copy exact elements / nodes
provide the rest as HTML code to go at that place in the document.
can not insert inside any copied element.
just either copy an element (and everything inside it) or recreate the element as it appears in doc "b"

`


const create = (a, b, options = {abbreviate_instruction_names: true, abbreviate_instruction_property_names: true}) => {

    const {abbreviate_instruction_names, abbreviate_instruction_property_names} = options;

    // Checking if they are both the same to start with...
    //  Think that would be 'false', 0, or an empty array, or a reference to the whole thing, such as just 'a'.
    //  Or reference the root node and that would be fine.

    // Or consider that these are only 'write at cursor' operations.
    //  so the HTML_Delta could have an array of 'ops' or 'instructions'.


    const res = new HTML_Delta();
    //res.method_name = method_name;

    if (a === b) {

    } else {
        // Determine the differences.
        //  But here we basically go through 'b', seeing what from 'a' can be directly copied across.
        //   Depth-first I think here???
        //    As in it will find any direct copy at the shallowest node?
        //    Or rather, that when it builds any new elements, it can copy internal parts of them from parts of doc a.
        //    Seems like it's worth hashing all text, attributes????
        //   Though in this case, only giving direct reference copies of anything internal seems best.
        //    So it would go through the child nodes in doc b, looking for anything that's identical.

        //   Could see about identifying everything identical in 2 dom parses - and build hash maps at the same time.
        //    Though maybe only identify identical elements here.

        // Probably can be quite a simple algorithm after all.
        //   Then it should be clear where some enhancements can go.
        //   We can then compare perf with and without various enhancements.

        const indexed_a = new Simple_HTML_Indexer(a);

        // And the indexed system could take care of the hashing.
        //  Keeping the hashing processing out of the main algorithm would be nice.
        //indexed_a.find_identical_node(node);

        // Not so sure about this current version.

        const encode_node = (arrayify(node => {
            const found_identical_node = indexed_a.find_identical_node(node);

            if (typeof found_identical_node === 'number') {
                //items.push(['a node index', found_identical_node.index]);


                const instr_n = 'copy node by "a" index'

                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;

                return [str_inst, found_identical_node];


                return ['copy node by "a" index', found_identical_node];

                // Then won't need to traverse further inside...
            } else {

                // The node's children maybe don't have xpaths assigned yet.
                //  Could see about first assigning all xpaths throughout the document.
                //  


                // 

                
                // Will need to encode the node's children....
                //console.log('node.name', node.name);
                //console.log('!!node.children', !!node.children);

                if (node.children) {
                    //console.log('node.children.length', node.children.length);
                    

                    if (node.children.length > 0) {
                        // See if the childless version of the node matches any nodes within doc 'a'.

                        const encoded_children = [];

                        const rendered_write_encoded_children = [];

                        for (const node_child of node.children) {

                            const encoded_node_child = encode_node(node_child);

                            if (encoded_node_child) {

                                if (is_array(encoded_node_child)) {
                                    encoded_children.push(encoded_node_child);
                                    
                                    //console.log('encoded_node_child', encoded_node_child);

                                    if (encoded_node_child[0] === 'write') {
                                        rendered_write_encoded_children.push(render(node));
                                    }
                                } else {
                                    console.trace();
                                    throw 'stop';
                                }

                            }
                        }

                        //console.log('rendered_write_encoded_children', rendered_write_encoded_children);
                        //console.log('encoded_children', encoded_children);

                        
                        //console.log('[encoded_children.length, rendered_write_encoded_children.length]', [encoded_children.length, rendered_write_encoded_children.length]);

                        if (encoded_children.length === rendered_write_encoded_children.length) {

                            // See about copying a node over by index, and replace the children.
                            //  This will make for a smaller reference code size (when the method name is represented with an int or byte)

                            //console.log('rendered_write_encoded_children', rendered_write_encoded_children);

                            // Worth checking if the node without children is available in document a.

                            const i_a_node_ref_childless_match = indexed_a.find_node_matching_as_childless(node);

                            if (i_a_node_ref_childless_match === undefined) {

                                const instr_n = 'write'

                                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;

                                return [str_inst, render(node)];
                            } else {
                                //return ['', ]

                                const instr_n = 'copy node by "a" index, replace children'

                                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;


                                if (abbreviate_instruction_property_names) {
                                    return [str_inst, {ani: i_a_node_ref_childless_match, c: encoded_children}];
                                } else {
                                    return [str_inst, {a_node_index: i_a_node_ref_childless_match, children: encoded_children}];
                                }

                                
                                //console.log('res', res);
                                return res;
                            }


                            console.trace();
                            throw 'stop';







                            // Then all the children are write encoded.
                            //  But then what about the node itself?
                            //  Can that be encoded by referring to something in doc 'a' by reference?
                            //   Could address that case later.

                            //console.log('1) node.xpath', node.xpath);
                            //console.log('node.type', node.type);

                            

                        } else {
                            // 

                            const node_html = render(node);
                            //console.log('node_html', node_html);
                            //console.log('4) node.xpath', node.xpath);
                            //console.log('encoded_children', encoded_children);

                            // Node and children - need to copy over the node (incl attributes).
                            //  Could do that by reference to the index of the node in doc a.
                            //  An instruction that copies over the node, with attributes, without children.

                            // copy_node_replace_children(idx_node, arr_new_children)
                            //  Those children could be copies of what's in doc a if appropriate.

                            // The assign_xpaths function could deal with this too.


                            //console.log('node.index', node.index);
                            //console.log('node.idx', node.idx);




                            //console.trace();
                            //throw 'stop';

                            //

                            // Need to find the index of that node within a.
                            //  Possibly doing so by xpath is best.
                            //  Or see about matching nodes as childless - would keep attrs.




                            // copy node without children from a, then new children.
                            // copy node from a, replace children.

                            // copy node by "a" index, replace children

                            // Longer instructions will work well because of clarity for the moment.


                            /*
                            
                            const a_ch_node_index = indexed_a.find_node_matching_as_childless(node);

                            if (a_ch_node_index === undefined) {

                            } else {
                                return ['write', node_html];

                            }

                            */

                            //console.log('**** node.type', node.type);
                            //console.log('**** node.name', node.name);

                            const i_a_node_ref_childless_match = indexed_a.find_node_matching_as_childless(node);

                            if (i_a_node_ref_childless_match === undefined) {

                                const instr_n = 'write'
                                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                                const res = [str_inst, render(node)];
                                return res;

                                return ['write', render(node)];
                            } else {
                                //return ['', ]

                                const instr_n = 'copy node by "a" index, replace children'
                                const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;

                                if (abbreviate_instruction_property_names) {
                                    return [str_inst, {ani: i_a_node_ref_childless_match, c: encoded_children}]
                                } else {
                                    return [str_inst, {a_node_index: i_a_node_ref_childless_match, children: encoded_children}]
                                }

                                
                            }
                        }
                        // Are all the encoded children encoded as 'write'?
                    } else {

                        const i_a_node_ref_childless_match = indexed_a.find_node_matching_as_childless(node);

                        if (i_a_node_ref_childless_match === undefined) {
                            //return ['write', render(node)];

                            const instr_n = 'write'
                            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                            return [str_inst, render(node)];
                        } else {
                            //return ['', ]

                            const instr_n = 'copy node by "a" index, replace children'
                            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
                            //const res = [str_inst, render(node)];
                            //return res;

                            if (abbreviate_instruction_property_names) {
                                return [str_inst, {ani: i_a_node_ref_childless_match, c: encoded_children}]
                            } else {
                                return [str_inst, {a_node_index: i_a_node_ref_childless_match, children: encoded_children}]
                            }

                            //return [str_inst, {a_node_index: i_a_node_ref_childless_match, children: encoded_children}]
                        }

                        //console.log('2) node.xpath', node.xpath);
                        //return ['write', render(node)];
                    }

                } else {
                    //console.log('3) node.xpath', node.xpath);
                    //console.trace();
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

                //const node_html = render(node);

                const found_identical_node = indexed_a.find_identical_node(node);

                if (typeof found_identical_node === 'number') {
                    //items.push(['a node index', found_identical_node.index]);
                    return ['identical', found_identical_node];

                    // Then won't need to traverse further inside...
                } else {

                    // Should return something though.
                    //  Maybe encode the node....

                    const encoded = encode_node(node);
                    return ['encoded', encoded];


                    // Not so much to do here....
                    //  As the children get iterated into anyway....
                    //   Though they dont have to be.
                    //    Need to choose where that iteration takes place.
                    //    Maybe an encode_node function would be better than this, and would iterate inside the node.
                    //    And if nodes are not found, they are just encoded as the same original string.

                    // Then with write - may need to give the xpath or somthing similar to that.
                    //  Or the index of the node to write it into.
                    //  




                }
            }

        }

        let instructions = [];

        const add_instruction = instruction => {
            instructions.push(instruction);
        }

        // Possibly making to objects that contain loads of hashes for doc a, doc b.
        //  Then intelligently do a variety of comparisons.
        //   Identify longest matching hashes, and what they represent in the docs.
        //    Those could identify similar things, by having data stripped before hashing.

        // For the moment, keep this reference implementation simple.

        // Could do a 2nd internal node iteration in some cases.
        //  Iterate node, compare against what's in doc a.
        //  See if it does not find anything, then provide the whole node.

        // an encode_node function could be helpful.
        //  Definitely looks that way.
        //   Encode it based on what is available in document "a", possibly other things, even hard-coded values
        //   in some situations.
        //  Could even hard-code 250 or so of the most common English words.
        //   Mainly though want to refer to things in doc a, but can not rule out a really good delta
        //    encoding that referred to its own dictionaries.


        // encode_node also encoding child nodes too...




        // Can we get an xpath relevant in either a or b???
        iterate_node(b, (node, idx, depth, stop, dont_descend) => {

            const node_res = process_node(node);
            // But should node_res encode the node?
            //  Just provide info on it?


            //console.log('');
            //console.log('node_res', node_res);



            if (node_res === undefined) {

                if (node.children) {
                    const _ch = node.children;
                    node.children = [];
                    const childless_html = render(node);
                    node.children = _ch;

                    //console.log('childless_html', childless_html);
                    //console.log('node.children.length', node.children.length);

                    if (node.children.length > 0) {
                        const idx_a_node_matching_childless_version_of_b_node = indexed_a.find_identical_node(childless_html);

                        if (idx_a_node_matching_childless_version_of_b_node !== undefined) {
                            //console.log('idx_a_node_matching_childless_version_of_b_node', idx_a_node_matching_childless_version_of_b_node);

                            // add the instruction.
                            //  However, maybe the instruction would need to specify its child nodes too?
                            //   May need to be able to speficy instructions for generation all the child nodes for this instruction
                            //    to work well.

                            // copy from a, but with added children...




                        }
                        
                    }

                    // Can we grab the childless html from 'a'?


                } else {
                    //console.log('node has no children');
                    //const node_html = render(node);
                    //console.log('node_html', node_html);
                }

                

                // Does the childless HTML match any node in 'a'?




                // Could then see if that childless html matches any nodes in doc a.
                //  Or even the childless html of any nodes in doc a.

                // Detecting if any inner elements can be done by reference...

                // determine if we do a full-node-write to 'b'.




                // Could have this iterator here work out if any child nodes will compress by using a reference.



                // But then need to put together the child nodes of this node...
                //  But this iterator here does it.
                //  Could stop the descent and do something else.

                //  Need to be able to encode these along with references to any node in 'a'.
                //  However, providing all the HTML at once, if there is nothing in 'a' to refer to, may work best here.


                // At this point, 


            } else if (Array.isArray(node_res)) {
                const match_type = node_res[0];
                //console.log('2) node_res', node_res);
                //console.log('match_type', match_type);
                if (match_type === 'identical') {
                    const node_idx_in_a = node_res[1];

                    add_instruction(['copy node by "a" index', node_idx_in_a]);

                    dont_descend();

                } else if (match_type === 'encoded') {
                    // 
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
                                dont_descend(); // don't desc because we get the whole node copied from 'a'.
                            } else {
                                console.log('unknown instruction name: ' + instruction_name);
                                console.log('instruction_param', instruction_param);

                                console.trace();
                                throw 'stop';
                            }
                        }
                    }

                    


                    //console.log(JSON.stringify(node_res));

                }
            }
            


        })
        
        //console.log('instructions', JSON.stringify(instructions, null, 4));

        res.instructions = instructions;









    }



    return {
        m: method_codename,
        v: res
    }
}

// No Delta_Finder object being used for this?

const res = {
    codename: method_codename,
    create,
    apply: (a, o_delta) => {
        //const {value} = o_delta;
        const value = o_delta.value || o_delta.v;
        //console.log('method_codename', method_codename);
        if (o_delta.m === method_codename || o_delta.method_name === method_name) {
            //return this.apply(a, value);

            const idxd_a = new Simple_HTML_Indexer(a);

            const {instructions} = value;

            // So basically put together a new doc b by following the instructions.

            // Maybe just 'decode'???

            // Instruction processing more like a VM seems better.

            // A result string seems like it may work best?


            
            // May want to make and maintain a VM for this.

            // Some instructions will create HTML, and that's it.
            //  Others would carry out more complex ops on doc b.

            

            const decode_nodes = nodes => {
                let res = '';
                for (const node of nodes) {
                    res += decode_node(node);
                }
                return res;
            }

            const decode_node = node => {

                const instruction = node;
                //console.log('instruction', instruction);
                let [name, param] = instruction;

                if (map_instruction_names_by_codenames.has(name)) name = map_instruction_names_by_codenames.get(name);

                //console.log('instruction name', name);

                // Seems like the body is not being saved / referenced properly.
                //  


                if (name === 'copy node by "a" index, replace children') {
                    //is_node_instruction = true;
                    
                    const a_node_index = param.a_node_index || param.ani;
                    const children = param.children || param.c;

                    //let {a_node_index, children} = param;
                    // lookup the node from 'a'.
                    //console.log('a_node_index', a_node_index);
                    const node_from_a = idxd_a.data.nodes[a_node_index];



                    


                    if (node_from_a.type === 'text') {
                        //return 

                        //console.log('children', children);
                        const decoded_children = decode_nodes(children);
                        //console.log('decoded_children', decoded_children);
                        return decoded_children;
                        throw 'stop';
                        return ;
                        

                        //throw 'stop';
                    } else {

                        // The body element?
                        //  Seems like it's not being stored / indexed properly???



                        if (node_from_a.name !== undefined) {

                            //console.log('node_from_a.name', node_from_a.name);
                            //console.log('node_from_a', node_from_a);

                            //console.log('children', children);

                            let attrs = '';
                            if (node_from_a.attribs) {
                                for (const [k, v] of Object.entries(node_from_a.attribs)) {
                                    attrs += ' ' + k + '="' + v + '"';
                                }
                            }
                            //console.log('attrs', attrs);

                            //console.log('node_from_a.name', node_from_a.name);
                            //console.log('node_from_a.type', node_from_a.type);

                            const res = `<${node_from_a.name}${attrs}>${children.map(child => decode_node(child)).join('')}</${node_from_a.name}>`;
                            
                            //console.log('decode node res:', res);
                            return res;
                        } else {

                            console.trace();
                            throw 'stop';
                        }

                        

                    }

                    // render the attrs...


                } else if (name === 'copy node by "a" index') {
                    //is_node_instruction = true;

                    //console.log('instruction', instruction);
                    const a_node_index = param;
                    // lookup the node from 'a'.
                    //console.log('a_node_index', a_node_index);
                    const node_from_a = idxd_a.data.nodes[a_node_index];

                    return render(node_from_a);

                    console.trace();
                    throw 'stop';
                } else if (name === 'write') {
                    //is_node_instruction = true;
                    //console.log('instruction', instruction);
                    return param;

                    //console.trace();
                    //throw 'stop';
                } else {
                    //is_node_instruction = false;
                    console.log('instruction', instruction);

                    console.trace();
                    throw 'stop';

                    console.trace();
                    throw 'stop';
                }


            }
            let str_res = '';

            const process_instruction = instruction => {


                // Looks like it will need some nested processing.


                //console.log('instruction', JSON.stringify(instruction, null, 4));
                let [name, param] = instruction;

                if (map_instruction_names_by_codenames.has(name)) name = map_instruction_names_by_codenames.get(name);

                // see if it's a 'node instruction' to decode???

                let is_node_instruction = true;

                //console.log('name', name);
                // cr perhaps???
                if (name === 'copy node by "a" index, replace children') {
                    is_node_instruction = true;
                } else if (name === 'copy node by "a" index') {
                    is_node_instruction = true;
                } else if (name === 'write') {
                    is_node_instruction = true;
                } else {
                    is_node_instruction = false;
                }

                if (is_node_instruction) {
                    const str_decoded_node = decode_node(instruction);
                    //console.log('str_decoded_node', str_decoded_node);
                    str_res += str_decoded_node;



                } else {
                    console.trace();
                    throw 'NYI';
                }
            };

            for (const instruction of instructions) {
                process_instruction(instruction);
            }

            //console.log('method_name', method_name);
            //console.log('JSON.stringify(instructions)', JSON.stringify(instructions));


            //console.log('str_res', str_res);

            return str_res;
        } else {
            throw 'Unsupported method_name: ' + o_delta.method_name;
        }

    }
}

// Then can wrap this in something that uses a more compressed delta format, but still using this underneith.
//  See about encoding the deltas in a very small amount of space.




module.exports = res;