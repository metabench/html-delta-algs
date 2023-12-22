const {
    Parser
} = require('htmlparser2');
const {
    DomHandler
} = require('domhandler');
const render = require("dom-serializer").default;
const crypto = require('crypto');
const {arrayify, is_array, each} = require('lang-mini');
const calc_hash_256bit = value => value === undefined ? undefined : crypto.createHash('sha256').update(value).digest();
const {remake_html_to_els_structure, outerHTML, read_first_tag_name,
    render_as_childless, parse_str_html_node, iterate_node, assign_xpaths} = require('./tools');

// May want to improve on this.
//  Maybe first improve the structure - more abstractions, shorter code, holding off on features.
//  Or maybe keeping this here as one implementation of it will make sense.

// Or more like an Indexed_HTML_Document once it's constructed.
//  More than indexed really. Data in an expanded-upon state.

// Further functionality such as single element removal...

// For the moment want to work on logic to improve compression size, rather than really tight encoding.
//  A few more commands?
//  Maybe some kind of object simplification - check where possible.
//   Like not specifying children when it's an empty array.
//    Or even having a 'default alternative doc a', which will contain a variety of common HTML structures which can be referenced from it.

// Structure matches could be very useful for a multiple reconciliations strategy.
//  Could then have instructions to modify inner things.
//   Or a sequence of instructions to generate a node.
//    Seems to be like that anyway right now.
// A 'div' with children command may help.
// But def looks like it's now worth restructuring to a plugin-type system.
// Maybe...
// A VM type system could help too.
//  Would help make the instructions more 'official'.
//  May help with bytecode (though they could be a way that Instruction classes serialise).

// instruction.bin getter property perhaps.
//  Maybe use an Instruction_Encoder? Instruction_Codec (encode and decode)?

class Extendable_HTML_Indexer {

    constructor(spec = {html: ''}) {
        const inner = (spec) => {
            const {html, transformers} = spec;

            // data.by_node_index.hashes.untransformed

            this.map_transformers_by_name = this.map_transformers_by_name || new Map();

            const ensure_trbn = tr => this.map_transformers_by_name.has(tr.name) ? false : this.map_transformers_by_name.set(tr.name, tr);

            // but then an array of transformers.
            //  (full, node) => ...
            // each transformer should have a name, maybe description, maybe codename, maybe index int to rep them very concisely.
            // transformer(doc, node) (doc will always mean the full amount of HTML from the pov of the indexer. does not need to be an actual doc in terms of html spec)

            this.html = html;
            this.transformers = transformers; // (doc and node transformers)

            // The transformers loading definitely is messed up now.

            //console.log('a) transformers.length', transformers.length);
            //console.trace();

            for (const transformer of transformers) {
                //console.log('transformer', transformer);
                ensure_trbn(transformer);

            }

            // Making the JS obj instruction encoding more concise would help.
            //  Eg using arrays more, objects less, direct string representations too.
            //   avoiding writing 'ani' and 'c' when they could just be array items.
            //   





            // Could validate the transformers first.
            // Best to make subclass that actually adds a few by default.

            // But a re-rendered html?
            this.load_from_string(html);
            // Will the indexes (positions in str) of nodes be OK?

        }

        const tspec = typeof spec;
        if (tspec  === 'string') {
            inner({html: spec});

        } else if (tspec  === 'object') {
            inner(spec);
        }

        // have it take an object as well for its node processors?
        //  each of them kind of needs a name or code.
        //  Though want that to be nicely expressive.

        // Like a function name and / or description.
        //  Nice if they are objects.


        /*

        if (typeof html === 'string') {

            // Also need to setup its callback functions....
            //  Or sets of callback functions based on functionality.
            //  Could even provide it node and html transformation functions for it to index, and then to check against the index.





            this.html = html;
            this.load_from_string(html)
        } else {

            console.log('this.html', this.html);

            console.trace();
            throw 'NYI';
        }
        */
    }

    init_empty_this_dot_data() {

        // data.by_node_index.hashes.untransformed

        this.data = {
            nodes: [],
            by_node_index: [],
            node_indexes_by_hash: new Map(),
            // The hash of the values themselves. Can look up text nodes from here.
            node_indexes_by_xpath: new Map(),

            // Just the basics for now.
            transformed_node_indexes_by_hash: new Map() // by hash of html produced by transformation (eg doc with that node removed)
            
        }
        return this.data;
    }

    load_from_string(str_el) {

        const data = this.init_empty_this_dot_data();
        const {transformers} = this;
        let i_node = 0;
        // Need to parse it into a doc to start with.

        // May as well assign the xpaths and indexes.
        const doc_node = assign_xpaths(parse_str_html_node(str_el));
        this.doc = doc_node;

        iterate_node(doc_node, (node, p_idx, depth, stop, dont_descend) => {
            // And when we give iterate_node an array of nodes?
            // But iterate_node should be able to handle an array.
            if (is_array(node)) {
                console.trace();
                throw 'node should not be an array here.';
            }
            data.nodes.push(node);
            const idx = node.idx = data.nodes.length - 1;
            

            //console.log('[idx, depth]', [idx, depth]);

            // Seems like a case of saving a transformed version of the node to a hash index.
            
            if (node.xpath) {
                //data.nodes_by_xpath.set(node.xpath, node);
                data.node_indexes_by_xpath.set(node.xpath, idx);
            }
            
            const node_html = (node.type === 'text') ? node.data : render(node);
            const node_html_hash = calc_hash_256bit(node_html).toString('hex');

            const by_index_node_transfomed_info = {
                hashes: {
                    untransformed: node_html_hash
                }
            }

            data.by_node_index.push(by_index_node_transfomed_info)

            if (!data.node_indexes_by_hash.has(node_html_hash)) {
                data.node_indexes_by_hash.set(node_html_hash, idx);
            }

            // Then put it through these transformers.
            //  They will produce mapped values to save the indexes of by hash.

            // Some transformers could take much too long to process on larger docs.
            //  Need to be careful that they are O(N).

            if (is_array(transformers)) {
                //console.log('transformers.length', transformers.length);

                // Then the transformed hashes of the node as well.

                for (const transformer of transformers) {
                    const {name, fn, skip} = transformer, transformer_name = name;

                    //console.log('skip', skip);
                    //console.log('!skip', !skip);

                    if (!skip) {
                        if (typeof name !== 'string') {
                            throw 'transformer name must be a string.';
                        }

                        // The 'document without node' transformer perhaps takes too long rendering.
                        //  Maybe also the render without children?
                        // Re-rendering the doc without every node probably makes it O(N^2).
                        //  Could remove the node string from the doc by positions. Seems much better.
                        //   Maybe hashing a large doc for each node is too much as well?

                        const transformed = fn(doc_node, node);

                        if (transformed) {
                            const str_transformed = typeof transformed === 'string' ? transformed : render(transformed);

                            // When the transformer is not applicable, then str_transformed could be false.
                            // console.log('str_transformed', str_transformed);

                            if (str_transformed.length > 0) {
                                const hash_str_transformed = calc_hash_256bit(str_transformed).toString('hex');

                                by_index_node_transfomed_info.hashes.transformed = by_index_node_transfomed_info.hashes.transformed || {};
                                by_index_node_transfomed_info.hashes.transformed[transformer_name] = hash_str_transformed;
                                // hash it along with the transformation name...
                                //  Though there may be transformation params as well.
                                //   For the moment, all transformations like this will not produce further params.

                                // So need to hash its transformed value, but also then indicate what transformation was used.
                                //  need to indicate what the original node (index) was as well that was used as the node param in the transform fn.

                                // {node_index: ..., transformation_name: ...}
                                // And then just store that as the item in the map.

                                // Does look like we need a new map_transformed_node_indexes 
                                //  key: hash of string transformation result, value: {node_index, transformation_name}

                                // Only store it once???
                                //  Maybe an array of them would be better???
                                //  Maybe it does not matter (yet) as the transformers all just ref one node and have one name.


                                if (!data.transformed_node_indexes_by_hash.has(hash_str_transformed)) {
                                    const tn_obj = {node_index: idx, transformer_name: transformer.name};
                                    data.transformed_node_indexes_by_hash.set(hash_str_transformed, tn_obj);
                                }



                            }
                        }
                    }
                }
            }
            // Seems about it for the moment, will be flexible in terms of allowing for many transformer functions.

            if (node.type === 'text') {

            } else {

            }
            i_node++;
        });
    }

    find_identical_node(node) {
        if (node === undefined) {
            return undefined;
        } else {
            if (typeof node === 'string') {
                const html = node;
                const hash = calc_hash_256bit(html).toString('hex');
                const node_idx = this.data.node_indexes_by_hash.get(hash);
                if (typeof node_idx === 'number') {
                    return node_idx;
                }
            } else {
                const html = render(node);
                return this.find_identical_node(html);
            }
        }
    }

    has_node_with_html(str_html) {
        if (typeof str_html === 'string') {
            return this.data.node_indexes_by_hash.has(calc_hash_256bit(str_html).toString('hex'));
        } else {
            console.trace();
            throw 'str_html must be a string';
        }

    }

    find_hash_match(hash) {

        // Maybe find hash matches would be better....


        // check against the hashes of the nodes...

        if (this.data.node_indexes_by_hash.has(hash)) {
            const idx = this.data.node_indexes_by_hash.get(hash);
            const res = {
                type: 'node',
                node_index: idx
            }
            return res;

        }
        if (this.data.transformed_node_indexes_by_hash.has(hash)) {
            const t_obj = this.data.transformed_node_indexes_by_hash.get(hash);
            const res = {
                type: 'transformed',
                o_transform: t_obj
            }
            return res;

        }

        return false;

    }

    // Then when looking for matches for a node...
    //  Would / may need to apply the transformations to the node.

    // However, for delta finding may be worth looking into 2 extensive indexes of nodes and their transformed versions,
    //  looking for appropriate / useful direct matches between them.
    // Finding a direct match that solved the whole problem with a single transformation would be the best answer.
    // That would be a transformation such as removing or moving a particular node.

    // When it comes to spotting which node in doc a to add content to to produce doc b,
    //  we could compare these heavily indexed (and hashed) versions of doc and and b, and deduce that it's a doc b
    //  transformation to use.
    // That transformation being delete a specific node - and then we get the html match with doc a.
    //  That means we could express doc b as an instruction to to copy doc a from the root and insert specified children
    //  within a node, given by its index within doc a (more conside than xpath).

    // Or just writing whatever inside that node within the full doc a. That should make for a space saving using the delta.
    //  Need to investigate, find and encode the various space saving tricks (ie operations needed to transform doc a to doc b)

    // A large variety of O(N) tricks looks like a nice place to start.
    //  And if things do some iteration, could put in place limits like go max 50 nodes up, 2 nodes deep?
    // Finding transformations that bring the docs closer could be of use.

    // May want some kind of fitness function that rapidly assesses the closeness of the docs.
    //  Though that itself may be a kind of delta function.
    //   It could be an approximate, fast, and scoring oriented delta system.
    //    Ie checking for the number of 32 consecutive byte hash matches, could do so sparsely.
    //    Could make a very fast delta scoring system that does not need to find the deltas, just a numerical
    //     expression of how different they are. 0 could be exactly the same. 

    // Anyway....



























}
module.exports = Extendable_HTML_Indexer;


// Call a node handler, even this.handle_node ???
            //  Then there can be plugin node handlers on iteration.
            //  Realistically the node handler could have much more concise logic.
            //   Or less.

            // Could it maybe get a bunch of objects / hashes as results of a function (maybe interchangable / upgradable)
            //  and then indicate that some things, such as element attribute sets, can be extracted from nodes
            //   (some but not all nodes).

            // Something with a much more extensive collection of function calls to index and check for specific things will help.
            //  That way, observations of the coder in terms of what it should do can be encapsulated into single files / objects.


            // Checking for representaions by transformations...
            //  See about moving some of the current checks to a new infrastructure.
            
            
            // So, indexing the hash of the document itself, and being able to use it when answering 'what is' queries.
            // So to find a delta (or part of it), when we are looking for doc b or something within it, we can then ask the
            //  HTML_Indexer of doc "a" what that hash means to it - and it could then answer that it's the hash of doc "a" even.

            // If the indexer of doc "b" creates hashes that include doc b but with any specific doc b element removed, then we could spot a
            // direct match.

            // Spotting a direct match of things which have got a deterministically derivable transformation from doc "b" or something within it.
            // Seems like we need a single map of hashes per indexer...?
            //  Would be easier to find matches.

            // hash_html function.... renders if html, returns hex hash.
            //  

            // All the different hash maps would make comparisons more difficult.

            // Be able to look up matches in a single hash map of a node that has been transformed.
            //  So each transformer could have its own hash that then gets hashed with the hash of the transformed node.
            //   Multiple transformations could hash in turn on the results.

            // And not just transformations on the node itself - transformations on the whole document (or parts of it) by removing a
            //  specific node.

            // May be able to have iterative search function that keeps generating and then improving deltas, first getting working ones,
            //  then improving them. A GA could be appropriate, with it being able to (sometimes) copy transformations over from other
            //  deltas in the candidate population.

            // Anyway, to the coding...


            // Want to include the transformed docs in the current main hash set.

            // Basically computing and hashing transformed encodings either of the document or the node itself.
            //  (or something else???)

            // An encoding of how to get to the value (from doc a), then hash of the value itself.

            // So an encoding such as 'Copy node i, insert the following inside node i2'?
            //  Or insert the following within a specific string position.

            // The value of some transformed result hashed, with the transformation itself (hashed???)

            // Could have a bunch of (doc_a, node) transformation functions, that produces a result from both the
            //  "a" doc or snippet and the node itself within "a". Meaning removing that specific node, or all instances of it, from doc
            //  "a" would be a valid transformation. It does not just need to transform the node itself, but it's really taking doc "a"
            //  and the node as input.








        // Getting the structure will be a transformation.
        //  Mainly want to store the hashes refereing to node / transformed node indexes.
        //  Hashes will need to hold a ref to the transformation (prob best encoded somehow).

        // transformed_node_indexes_by_hash
        //  has of the html of the transformed node (or doc based on that node, such as removing it from the doc).

        // Don't think the text nodes need to be separate. ????? seems helpful actually. same with css and js being separate.
        //  Seems a useful thing to keep from previous version.

        //  Though maybe it would help for some types of optimisation.
        //  They are more clearly a non-tree type of data so may be worth keeping separately.
        //  Likely to be language (including computer language) of some sort.

        // The element attribute sets? Maybe are worth keeping and worth dealing with on a lower level?
        //  Or a transformer basically takes a node, if it has attributes, saves a hash of the set, and then allows lookup of other matching ones.
        //  Does like all sorts of things which are generatable from the node / element itself.

        // Maybe consider them non-text nodes.
        //  Special handling of text nodes makes a lot of sense.
        //  Then looks like all other types of nodes can be treated the same for the moment.

        // Maybe better to have a hash of the text nodes text.
        //  Or even a suffix tree of all of them.
        //   That would still be O(N) time to build.

        // Can make this an advanced algorithm with many simple tests so long as they all are O(N) timing.
        //  Many, but limited number of tests / transformations per node.
        //   with thousands it would still be O(N) - could be interesting.
        // Still, keep the internal data structures here minimal for the moment.

/*
            script_text_nodes_text: [],
            script_text_nodes_text_by_xpath: new Map(),
            script_text_nodes_text_indexes_by_hash: new Map(),


            style_text_nodes_text: [],
            style_text_nodes_text_indexes_by_hash: new Map(),



            element_text_nodes_text: [],
            element_text_nodes_text_indexes_by_hash: new Map(),


            element_structures: [],
            element_structure_indexes_by_hash: new Map(),


            element_attribute_sets: [],
            element_attribute_set_indexes_by_hash: new Map(),

            element_attribute_key_sets: [],
            element_attribute_key_set_indexes_by_hash: new Map(),
            element_attribute_keys: [],
            element_attribute_key_indexes_by_hash: new Map(),

            element_attribute_values: [],
            element_attribute_value_indexes_by_hash: new Map(),


            element_structures_with_empty_attrib_values: [],
            element_structures_with_empty_attrib_values_indexes_by_hash: new Map()
            */


        












            






            



            
