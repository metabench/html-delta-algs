// This should be able to encode all nodes (in terms of instructions that refer to doc a) - but may have very basic functionality that is general
//  purpose.

const {abbreviate_instruction_names, map_instruction_codenames_by_names} = require('../method_consts');

const {tof, is_array} = require('lang-mini');
const {remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths} = require('../../../tools/tools');
const render = require("dom-serializer").default;

    const red = str => '\x1b[31m' + str + '\x1b[0m';

class Base_Node_Encoder {
    constructor(spec = {}) {
        if (spec.indexed_a) this.indexed_a = spec.indexed_a;
        if (spec.html_b) this.html_b = spec.html_b;
        if (spec.doc_b) this.doc_b = spec.doc_b;

        //console.log('Object.keys(spec.indexed_a)', Object.keys(spec.indexed_a));

        // Should be able to do O(N) hash lookups itself here.
    }


    // The fill html should be of doc b - maybe that should be made clearer?
    //  Or that's the case when encoding things from doc b!

    encode(node, full_html) {
        //console.log('\nBase encode node');


        // The base encoder could possibly provide multiple encodings as the answer....
        // Maybe worth checking a few...?



        const t_node = tof(node);
        const {indexed_a} = this;

        const html_a = indexed_a.html;
        //console.log('html_a', html_a);
        //console.log('t_node', t_node);

        if (t_node === 'string') {
            const parsed_node = this.parsed_node = assign_xpaths(parse_str_html_node(node));

            // Full HTML of doc b that would be, where the node is from.


            return this.encode(parsed_node, full_html);
        } else if (t_node === 'array') {
            return node.map(node_in_array => this.encode(node_in_array, full_html));
        } else {

            const pos_node = [node.startIndex, node.endIndex + 1];
            //console.log('pos_node', red(JSON.stringify(pos_node, null, 0)));
            //console.log('node.name', node.name);
            //console.log('node', node);
            //console.log('node.children', node.children);


            //console.log('Object.keys(node)', Object.keys(node));
            //const rendered_node_html = render(node);

            // The most simple / basic 'write node' encoding.
            //  Want to check for other ways it could be encoded (better).

            // But maybe not here in the base class.

            // May want more encapsulated 'in case x, can encode node as y' system.




            //console.log('full_html', full_html);
            //console.trace();

            const full_html_node_substring = full_html.substring(...pos_node);
            //console.log('full_html_node_substring', full_html_node_substring);
            //console.log('node', node);
            //console.log('full_html.length', full_html.length);
            //console.log('rendered_node_html.length', rendered_node_html.length);
            
            //console.log('rendered_node_html', rendered_node_html);
            //console.trace();


            const instr_n = 'write';
            const str_inst = abbreviate_instruction_names ? map_instruction_codenames_by_names.get(instr_n) : instr_n;
            const instruction = [str_inst, full_html_node_substring];

            // Should just return the instruction???
            //  Maybe another part could assess encoding quality?

            return instruction;
            /*


            return {
                encoded: true,
                instruction
            }
            */
            
        }

        



    }
}

module.exports = Base_Node_Encoder;