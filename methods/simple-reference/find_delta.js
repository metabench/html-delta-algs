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

const HTML_Pair_Comparison = require('../../tools/HTML_Pair_Comparison');
const Node_Encoder = require('./Node_Encoder/General');
const fn_full_delta_solution_checks = require('./Delta_Solution_Check/Full/fn_checks');
const abbreviate_delta = require('./abbreviate_delta');


// Using an HTML_Pair_Comparison may work better.
//  Would like an easy way to specify some full document reconciliations.

// Could try delta encoding attempts???
//  Where the attempt is one piece of functionality together.

// Maybe a Delta_Finder class and class structure would be better.

// Def would be worth implementing a few more methods to encode the perfect deltas.
// Partial reconciliation chains could be effective too.


// More in-depth tests that test whether an available perfect method was used.
//  Could test whether a method better than the one being looked for was used instead.

// Maybe faster hashing will help.

const find_delta = (a, b, options = {abbreviate_instruction_names: abbreviate_instruction_names, abbreviate_instruction_property_names: abbreviate_instruction_property_names}) => {
    
    // Check against some 'perfect' delta encodings.
    // Not sure how 'doc with node removed' can be done without taking ages.



    
    const {abbreviate_instruction_names, abbreviate_instruction_property_names} = options;
    const res = new HTML_Delta();
    if (a === b) {
        res.unchanged = true;
        return res;
    } else {



        //const indexed_a = new Simple_HTML_Indexer(a), indexed_b = new Simple_HTML_Indexer(b);

        const comp_ab = new HTML_Pair_Comparison(a, b);

        const indexed_a = comp_ab.indexed_a, indexed_b = comp_ab.indexed_b;



        const res_full_solution_checks = fn_full_delta_solution_checks(comp_ab);


        if (res_full_solution_checks) {

            // Res itself should be a delta I think.

            // Should abbreviate it if necessary.
            //  abbreviate_delta(delta, o_abbreviation_settings)
            //console.log('res_full_solution_checks', res_full_solution_checks);

            const r2 = abbreviate_delta(res_full_solution_checks);

            //console.log('r2', r2);



            return r2;

            //console.log('res_full_solution_checks', res_full_solution_checks);
            //console.trace();
            //throw 'NYI';
        } else {

                // But that's always starting by encoding the first node (html).
            //  Need to look into recognising and using dull document delta transformations / instructions.
            //  A system of multiple and measured partial reconciliations could be very helpful.

            // Identifying whole doc matches (doc without node)...
            // Then also integrating diffs / deltas on specific nodes with their corresponding nodes.

            // The encoder could use the HTML_Pair_Comparison perhaps....

            // indexed_b.doc can be an array.
            //console.log('indexed_b.doc', indexed_b.doc);


            // The node encoder could have access to the comparison.
            //  Not quite sure how needed that would be.

            // See about first using a doc delta finder.
            //  And have it use the comparison.

            // Calling a single function to do multiple checks here would work best I think.





            const node_encoder = new Node_Encoder({
                indexed_a,
                html_b: b,
                doc_b: indexed_b.doc
            });

            // Use the full delta matching system.






            const standard_matching_system = () => {
                let encoded_b;
                if (typeof b === 'string') {
                    encoded_b = node_encoder.encode(b, b);
                } else {

                    // Otherwise what??? Render it???

                    encoded_b = node_encoder.encode(b);
                }
                if (abbreviate_instruction_property_names) {
                    res.i = [encoded_b];
                } else {
                    res.instructions = [encoded_b];
                }
            }
            standard_matching_system();

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