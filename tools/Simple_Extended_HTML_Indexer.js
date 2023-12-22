const Extendable_HTML_Indexer = require('./Extendable_HTML_Indexer');

const Doc_And_Node_Transformer = require('./Doc_And_Node_Transformer');

// Could just have a node transformer, does not require the doc ref.
const crypto = require('crypto');
const {arrayify, is_array, each} = require('lang-mini');
const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();
const {
    remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths
} = require('../tools/tools');

const {
    Parser
} = require('htmlparser2');
const {
    DomHandler
} = require('domhandler');
const render = require("dom-serializer").default;

// Does seem best at this stage to get the diff calculator to make 2 separate HTML indexes of a and b.
//  Then can do an O(N) all-at-once comparison.
// At this point, it can recognise that doc "a" is doc "b" with some node removed. In which case, it can then (later) use that info
//  to create the efficient command to build doc b.


const simple_default_transformers = require('./simple_default_transformers').filter(x => !x.skip);

// HTML_Transformer

// Doc_And_Node_Transformer

// OK, so now this uses the Extendable class as its base, and recreates much of the original Simple_HTML_Indexer.
//  Will also be easier to extend.

// Though seems better to further integrate the childless node indexing and matching further.
//  See if it can be expressed clearly in a line or two.

class Simple_Extended_HTML_Indexer extends Extendable_HTML_Indexer {
    constructor(spec) {

        // If the spec is html then...

        const inner = (spec) => {
            //const transformers = (spec.transformers = spec.transformers || []).filter(x => !x.skip);

            const transformers = (spec.transformers = spec.transformers || []);

            const set_existing_transformer_names = new Set(transformers.map(x => x.name));

            // And a map of transformers by name???
            //  Simple JS obj going out of fashion?

            



            //const tr_node_without_children = ;



            const ensure_tr = (tr) => {
                //console.log('tr.name', tr.name);
                if (!set_existing_transformer_names.has(tr.name)) {
                    transformers.push(tr);
                }
            };

            // Seems like the transformer set could be useful elsewhere, such as in the find_delta algorithm.

            // Simple_Transformer_Set perhaps...
            //  arr_simple_default_transformers ???

            //console.log('simple_default_transformers', simple_default_transformers);


            // But not sure why the matching's not working too...?


            //simple_default_transformers.filter(x => !x.skip).map(ensure_tr);
            simple_default_transformers.map(ensure_tr);

            //console.log('transformers.length', transformers.length);

            //ensure_tr();

            // render the doc here seems inefficient.

            //ensure_tr();


            //const map_transformers_by_name = 

            return spec;
            
        }

        if (typeof spec === 'string') {
            spec = inner({html: spec});
        } else {
            spec = inner(spec);
        }

        //console.log('spec', spec);

        //console.trace();
        //throw 'NYI';

        super(spec);


        

    }



    // So this works the same as before.
    //  Seems better to return the node itself?

    // This one seems just to search for a transformed version of the node
    //  Though a better / more general version would carry out the transformation on the node iself.
    // .doc would help for the indexer.
    //  The parsed htmlparser2 doc.



    // should be able to look up the transformers by name....

    //  Then call the transformer.

    find_transformed_version_of_node(node, transformer_name) {
        // Specify the transformation name...?

        if (typeof transformer_name === 'string') {
            const transformer = this.map_transformers_by_name.get(transformer_name);
            if (transformer.type === '(doc, node)') {
                const transformer_res = transformer.fn(this.doc, node);
                // and that's the transformed version....

                const hash_transformed_version = calc_hash_256bit(transformer_res).toString('hex');
                const o_transformed_node = this.data.transformed_node_indexes_by_hash.get(hash_transformed_version);

                if (o_transformed_node) {
                    // {node_index: idx, transformer_name: transformer.name}
                    //console.log('o_transformed_node', o_transformed_node);
                    const {node_index, transformer_name} = o_transformed_node;

                    return node_index;
                }

            } else if (transformer.type === '(doc)') {
                console.trace();
                throw 'NYI';
            } else {
                console.trace();
                throw 'NYI';
            }

        } else {
            console.trace();
            throw 'NYI';
        }

    }

    find_node_matching_as_childless = node => this.find_transformed_version_of_node(node, 'node without children');


    // Now have a nice minimal way to express it.
    // Nice to use arrow fns as class methods.

    /*

    _old_find_node_matching_as_childless = (node) => {
        if (node && node.children && node.children.length > 0) {
            const ch_html = render_as_childless(node);
            const hash = calc_hash_256bit(ch_html).toString('hex');

            // No, need to access the transformed nodes.
            //  Maybe it could access it under a different transformation???

            // And want to find the node itself, not the index.

            const o_transformed_node = this.data.transformed_node_indexes_by_hash.get(hash);

            if (o_transformed_node) {

                // {node_index: idx, transformer_name: transformer.name}
                //console.log('o_transformed_node', o_transformed_node);

                const {node_index, transformer_name} = o_transformed_node;

                return node_index;

            }

            //console.trace();

            //throw 'stop';



            //const node_idx = this.data.node_indexes_by_nodes_with_removed_children_hash.get(hash);
            //return node_idx;
        }
    }

    */


}

module.exports = Simple_Extended_HTML_Indexer;

